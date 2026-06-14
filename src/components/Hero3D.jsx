import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 9

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // ---- Particle field (warm ember dust) ----
    const COUNT = 1800
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const palette = [new THREE.Color('#e4e4e7'), new THREE.Color('#a1a1aa'), new THREE.Color('#71717a'), new THREE.Color('#ffffff')]
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const pMat = new THREE.PointsMaterial({
      size: 0.035, vertexColors: true, transparent: true, opacity: 0.8,
      blending: THREE.AdditiveBlending, depthWrite: false
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ---- Wireframe icosahedron (hero centerpiece, right side) ----
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.6, 1),
      new THREE.MeshBasicMaterial({ color: 0xd4d4d8, wireframe: true, transparent: true, opacity: 0.28 })
    )
    wire.position.set(4.5, 0.5, -2)
    scene.add(wire)

    // Inner glowing core
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.1, 2),
      new THREE.MeshStandardMaterial({
        color: 0x101012, metalness: 0.9, roughness: 0.25,
        emissive: 0xd4d4d8, emissiveIntensity: 0.55
      })
    )
    core.position.copy(wire.position)
    scene.add(core)

    // Orbit ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.012, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x71717a, transparent: true, opacity: 0.5 })
    )
    ring.position.copy(wire.position)
    ring.rotation.x = Math.PI / 2.4
    scene.add(ring)

    // Small satellite orb on the ring
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    )
    scene.add(orb)

    // ---- Lights ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.35))
    const warm = new THREE.PointLight(0xd4d4d8, 60, 40)
    warm.position.set(6, 4, 4)
    scene.add(warm)
    const amber = new THREE.PointLight(0x71717a, 40, 40)
    amber.position.set(-6, -3, 5)
    scene.add(amber)

    // ---- Mouse parallax ----
    let mx = 0, my = 0, tx = 0, ty = 0
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)

    // ---- Animate ----
    let raf
    const clock = new THREE.Clock()
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // ease mouse
      mx += (tx - mx) * 0.04
      my += (ty - my) * 0.04

      wire.rotation.y = t * 0.18
      wire.rotation.x = Math.sin(t * 0.25) * 0.25
      core.rotation.y = -t * 0.3
      core.scale.setScalar(1 + Math.sin(t * 1.6) * 0.05)
      ring.rotation.z = t * 0.25

      // satellite orbit
      const a = t * 0.7
      orb.position.set(
        wire.position.x + Math.cos(a) * 3.4,
        wire.position.y + Math.sin(a) * 3.4 * Math.cos(Math.PI / 2.4) * 0.55,
        wire.position.z + Math.sin(a) * 3.4 * 0.8
      )

      particles.rotation.y = t * 0.015 + mx * 0.05
      particles.rotation.x = my * 0.04
      particles.position.y = Math.sin(t * 0.3) * 0.25

      camera.position.x = mx * 0.6
      camera.position.y = -my * 0.4
      camera.lookAt(2, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-0 pointer-events-none opacity-90" />
}
