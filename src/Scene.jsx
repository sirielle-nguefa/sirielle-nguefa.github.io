import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const COUNT = 3600
const K = 4

// Générateur pseudo-aléatoire déterministe : le nuage est identique à chaque visite
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}
function gauss(r) {
  const u = Math.max(r(), 1e-6)
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r())
}

const CENTERS = [
  [-1.25, 0.85, 0.2],
  [1.3, 0.65, -0.35],
  [-0.75, -1.0, -0.25],
  [1.0, -0.95, 0.4],
]

function buildGeometry() {
  const r = rng(7)
  const start = new Float32Array(COUNT * 3)
  const end = new Float32Array(COUNT * 3)
  const cluster = new Float32Array(COUNT)
  const rand = new Float32Array(COUNT)
  for (let i = 0; i < COUNT; i++) {
    // état initial : bruit uniforme dans une boîte
    start[i * 3] = (r() - 0.5) * 5.2
    start[i * 3 + 1] = (r() - 0.5) * 3.8
    start[i * 3 + 2] = (r() - 0.5) * 2.4
    // état final : quatre gaussiennes
    const k = i % K
    const c = CENTERS[k]
    const spread = 0.32 + (k % 2) * 0.08
    end[i * 3] = c[0] + gauss(r) * spread
    end[i * 3 + 1] = c[1] + gauss(r) * spread
    end[i * 3 + 2] = c[2] + gauss(r) * spread * 0.8
    cluster[i] = k
    rand[i] = r()
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(start.slice(), 3))
  g.setAttribute('aStart', new THREE.BufferAttribute(start, 3))
  g.setAttribute('aEnd', new THREE.BufferAttribute(end, 3))
  g.setAttribute('aCluster', new THREE.BufferAttribute(cluster, 1))
  g.setAttribute('aRand', new THREE.BufferAttribute(rand, 1))
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 6)
  return g
}

const vertex = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute float aCluster;
  attribute float aRand;
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vMix;
  varying float vCluster;
  void main() {
    // chaque point part avec un léger décalage : la convergence se lit comme un processus
    float p = clamp(uProgress * 1.45 - aRand * 0.45, 0.0, 1.0);
    p = p * p * (3.0 - 2.0 * p);
    vec3 pos = mix(aStart, aEnd, p);
    float drift = mix(0.06, 0.025, p);
    pos += drift * vec3(
      sin(uTime * 0.55 + aRand * 31.0),
      cos(uTime * 0.47 + aRand * 17.0),
      sin(uTime * 0.38 + aRand * 11.0)
    );
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.75 + aRand * 0.6) / -mv.z;
    vMix = p;
    vCluster = aCluster;
  }
`

const fragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uC0;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform float uAlpha;
  varying float vMix;
  varying float vCluster;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.32, d);
    vec3 c = vCluster < 0.5 ? uC0 : vCluster < 1.5 ? uC1 : vCluster < 2.5 ? uC2 : uC3;
    vec3 col = mix(uBase, c, smoothstep(0.35, 0.95, vMix));
    gl_FragColor = vec4(col, edge * uAlpha);
    #include <colorspace_fragment>
  }
`

function readPalette() {
  const s = getComputedStyle(document.documentElement)
  const get = (n) => new THREE.Color(s.getPropertyValue(n).trim() || '#888888')
  return {
    base: get('--point'),
    c: [get('--c0'), get('--c1'), get('--c2'), get('--c3')],
    dark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  }
}

function Cloud({ progressRef, reduced }) {
  const geometry = useMemo(buildGeometry, [])
  const group = useRef()
  const centroids = useRef()
  const { gl, size } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const smooth = useRef(reduced ? 1 : 0)

  const material = useMemo(() => {
    const p = readPalette()
    return new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uProgress: { value: reduced ? 1 : 0 },
        uTime: { value: 0 },
        uSize: { value: 26 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uBase: { value: p.base },
        uC0: { value: p.c[0] },
        uC1: { value: p.c[1] },
        uC2: { value: p.c[2] },
        uC3: { value: p.c[3] },
        uAlpha: { value: p.dark ? 0.9 : 0.85 },
      },
    })
  }, [reduced])

  // Suit le thème clair/sombre du système
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => {
      const p = readPalette()
      material.uniforms.uBase.value = p.base
      ;['uC0', 'uC1', 'uC2', 'uC3'].forEach((k, i) => (material.uniforms[k].value = p.c[i]))
      material.uniforms.uAlpha.value = p.dark ? 0.9 : 0.85
    }
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [material])

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    material.uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 2)
    material.uniforms.uSize.value = size.width < 700 ? 20 : 26
  }, [gl, size, material])

  useFrame((state, dt) => {
    const target = reduced ? 1 : progressRef.current
    smooth.current += (target - smooth.current) * Math.min(1, dt * 3.2)
    const p = smooth.current
    material.uniforms.uProgress.value = p
    if (!reduced) material.uniforms.uTime.value = state.clock.elapsedTime

    if (group.current) {
      const g = group.current
      const tx = pointer.current.y * 0.18
      const ty = pointer.current.x * 0.32 + (reduced ? 0 : state.clock.elapsedTime * 0.04)
      g.rotation.x += (tx - g.rotation.x) * 0.04
      g.rotation.y += (ty - g.rotation.y) * 0.04
    }
    if (centroids.current) {
      const show = THREE.MathUtils.smoothstep(p, 0.82, 1)
      centroids.current.children.forEach((m) => {
        m.material.opacity = show
        m.scale.setScalar(0.6 + show * 0.4)
      })
    }
  })

  return (
    <group ref={group} position={[size.width < 900 ? 0 : 0.35, 0, 0]}>
      <points geometry={geometry} material={material} />
      <group ref={centroids}>
        {CENTERS.map((c, i) => (
          <mesh key={i} position={c}>
            <ringGeometry args={[0.07, 0.085, 48]} />
            <meshBasicMaterial color={readPalette().c[i]} transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function Scene({ progressRef, reduced }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      aria-hidden="true"
    >
      <Cloud progressRef={progressRef} reduced={reduced} />
    </Canvas>
  )
}
