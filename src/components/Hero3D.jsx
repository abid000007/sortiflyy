import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Crisp round dot (solid disc, minimal halo) — no glow.
function makeDotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.65, 'rgba(255,255,255,1)')
  grd.addColorStop(0.85, 'rgba(255,255,255,0.5)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export default function Hero3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const W = () => window.innerWidth
    const H = () => window.innerHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050505, 0.04)

    const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 100)
    camera.position.z = 9

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W(), H())
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const dot = makeDotTexture()

    // ---- Particle dust (faint, crisp) ----
    const COUNT = 1400
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const palette = [new THREE.Color('#e4e4e7'), new THREE.Color('#a1a1aa'), new THREE.Color('#71717a'), new THREE.Color('#ffffff')]
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 0.045, map: dot, vertexColors: true, transparent: true, opacity: 0.5, depthWrite: false
    }))
    scene.add(particles)

    // ===================================================================
    //  CONSTELLATION — drifting nodes, synapse lines, travelling signals,
    //  and cursor-reactive links. World space so cursor maths stays correct.
    // ===================================================================
    const NODES = 110
    const REACH = 2.4
    const bounds = { x: 14, y: 7.5, z: 5 }
    const nodePos = new Float32Array(NODES * 3)
    const nodeVel = new Float32Array(NODES * 3)
    for (let i = 0; i < NODES; i++) {
      nodePos[i * 3] = (Math.random() - 0.5) * bounds.x * 2
      nodePos[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2
      nodePos[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2
      nodeVel[i * 3] = (Math.random() - 0.5) * 0.013
      nodeVel[i * 3 + 1] = (Math.random() - 0.5) * 0.013
      nodeVel[i * 3 + 2] = (Math.random() - 0.5) * 0.013
    }
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3))
    const nodes = new THREE.Points(nodeGeo, new THREE.PointsMaterial({
      size: 0.1, map: dot, color: 0xeef0f5, transparent: true, opacity: 0.95, depthWrite: false
    }))
    scene.add(nodes)

    // synapse lines (all pairs within REACH)
    const maxSeg = (NODES * (NODES - 1)) / 2
    const linePos = new Float32Array(maxSeg * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
    const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
      color: 0x8990a8, transparent: true, opacity: 0.32, depthWrite: false
    }))
    scene.add(lines)

    // the edge each signal is currently crossing (subtle highlight)
    const PULSES = 60
    const hotPos = new Float32Array(PULSES * 6)
    const hotGeo = new THREE.BufferGeometry()
    hotGeo.setAttribute('position', new THREE.BufferAttribute(hotPos, 3))
    const hotLines = new THREE.LineSegments(hotGeo, new THREE.LineBasicMaterial({
      color: 0xdfe3ef, transparent: true, opacity: 0.4, depthWrite: false
    }))
    scene.add(hotLines)

    // travelling signal dots
    const pulseFrom = new Int16Array(PULSES)
    const pulseTo = new Int16Array(PULSES)
    const pulseT = new Float32Array(PULSES)
    const pulseSpeed = new Float32Array(PULSES)
    const pulsePos = new Float32Array(PULSES * 3)
    const findNeighbour = (i) => {
      const ix = i * 3
      const start = Math.floor(Math.random() * NODES)
      for (let s = 0; s < NODES; s++) {
        const j = (start + s) % NODES
        if (j === i) continue
        const dx = nodePos[ix] - nodePos[j * 3]
        const dy = nodePos[ix + 1] - nodePos[j * 3 + 1]
        const dz = nodePos[ix + 2] - nodePos[j * 3 + 2]
        if (dx * dx + dy * dy + dz * dz < REACH * REACH) return j
      }
      return (i + 1 + Math.floor(Math.random() * (NODES - 1))) % NODES
    }
    for (let p = 0; p < PULSES; p++) {
      pulseFrom[p] = Math.floor(Math.random() * NODES)
      pulseTo[p] = findNeighbour(pulseFrom[p])
      pulseT[p] = Math.random()
      pulseSpeed[p] = 0.006 + Math.random() * 0.013
    }
    const pulseGeo = new THREE.BufferGeometry()
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3))
    const pulses = new THREE.Points(pulseGeo, new THREE.PointsMaterial({
      size: 0.16, map: dot, color: 0xffffff, transparent: true, opacity: 1, depthWrite: false
    }))
    scene.add(pulses)

    // cursor-reactive links + cursor node
    const CURSOR_REACH = 4
    const cursorLinePos = new Float32Array(NODES * 6)
    const cursorLineGeo = new THREE.BufferGeometry()
    cursorLineGeo.setAttribute('position', new THREE.BufferAttribute(cursorLinePos, 3))
    const cursorLines = new THREE.LineSegments(cursorLineGeo, new THREE.LineBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0.55, depthWrite: false
    }))
    scene.add(cursorLines)
    const cursorDot = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3)),
      new THREE.PointsMaterial({ size: 0.22, map: dot, color: 0xffffff, transparent: true, opacity: 0.9, depthWrite: false })
    )
    scene.add(cursorDot)

    const smooth = (t) => t * t * (3 - 2 * t)

    const updateNetwork = (cursor3D, cursorActive) => {
      for (let i = 0; i < NODES; i++) {
        for (let a = 0; a < 3; a++) {
          const k = i * 3 + a
          nodePos[k] += nodeVel[k]
          const lim = a === 0 ? bounds.x : a === 1 ? bounds.y : bounds.z
          if (nodePos[k] > lim || nodePos[k] < -lim) nodeVel[k] *= -1
        }
      }
      let s = 0
      for (let i = 0; i < NODES; i++) {
        const ix = i * 3
        for (let j = i + 1; j < NODES; j++) {
          const jx = j * 3
          const dx = nodePos[ix] - nodePos[jx]
          const dy = nodePos[ix + 1] - nodePos[jx + 1]
          const dz = nodePos[ix + 2] - nodePos[jx + 2]
          if (dx * dx + dy * dy + dz * dz < REACH * REACH) {
            linePos[s++] = nodePos[ix]; linePos[s++] = nodePos[ix + 1]; linePos[s++] = nodePos[ix + 2]
            linePos[s++] = nodePos[jx]; linePos[s++] = nodePos[jx + 1]; linePos[s++] = nodePos[jx + 2]
          }
        }
      }
      lineGeo.setDrawRange(0, s / 3)
      lineGeo.attributes.position.needsUpdate = true
      nodeGeo.attributes.position.needsUpdate = true

      for (let p = 0; p < PULSES; p++) {
        pulseT[p] += pulseSpeed[p]
        if (pulseT[p] >= 1) {
          pulseT[p] = 0
          pulseFrom[p] = pulseTo[p]
          pulseTo[p] = findNeighbour(pulseFrom[p])
          pulseSpeed[p] = 0.006 + Math.random() * 0.013
        }
        const f = pulseFrom[p] * 3, to = pulseTo[p] * 3
        const e = smooth(pulseT[p])
        pulsePos[p * 3] = nodePos[f] + (nodePos[to] - nodePos[f]) * e
        pulsePos[p * 3 + 1] = nodePos[f + 1] + (nodePos[to + 1] - nodePos[f + 1]) * e
        pulsePos[p * 3 + 2] = nodePos[f + 2] + (nodePos[to + 2] - nodePos[f + 2]) * e
        hotPos[p * 6] = nodePos[f]; hotPos[p * 6 + 1] = nodePos[f + 1]; hotPos[p * 6 + 2] = nodePos[f + 2]
        hotPos[p * 6 + 3] = nodePos[to]; hotPos[p * 6 + 4] = nodePos[to + 1]; hotPos[p * 6 + 5] = nodePos[to + 2]
      }
      pulseGeo.attributes.position.needsUpdate = true
      hotGeo.attributes.position.needsUpdate = true

      let c = 0
      if (cursorActive) {
        for (let i = 0; i < NODES; i++) {
          const ix = i * 3
          const dx = nodePos[ix] - cursor3D.x
          const dy = nodePos[ix + 1] - cursor3D.y
          const dz = nodePos[ix + 2] - cursor3D.z
          if (dx * dx + dy * dy + dz * dz < CURSOR_REACH * CURSOR_REACH) {
            cursorLinePos[c++] = cursor3D.x; cursorLinePos[c++] = cursor3D.y; cursorLinePos[c++] = cursor3D.z
            cursorLinePos[c++] = nodePos[ix]; cursorLinePos[c++] = nodePos[ix + 1]; cursorLinePos[c++] = nodePos[ix + 2]
          }
        }
        cursorDot.position.copy(cursor3D)
      }
      cursorDot.visible = cursorActive
      cursorLineGeo.setDrawRange(0, c / 3)
      cursorLineGeo.attributes.position.needsUpdate = true
    }

    // ---- Centerpiece: rotating wireframe shell + ring + orbiting dot ----
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.6, 1),
      new THREE.MeshBasicMaterial({ color: 0xb9bcc6, wireframe: true, transparent: true, opacity: 0.2 })
    )
    wire.position.set(4.5, 0.5, -2)
    scene.add(wire)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.01, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x9a9ca6, transparent: true, opacity: 0.4 })
    )
    ring.position.copy(wire.position)
    ring.rotation.x = Math.PI / 2.4
    scene.add(ring)

    const orb = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3)),
      new THREE.PointsMaterial({ size: 0.18, map: dot, color: 0xffffff, transparent: true, opacity: 0.95, depthWrite: false })
    )
    scene.add(orb)

    // ---- Mouse parallax + cursor projection ----
    let mx = 0, my = 0, tx = 0, ty = 0
    let cursorActive = false
    const ndc = new THREE.Vector2(0, 0)
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const cursor3D = new THREE.Vector3()
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
      ndc.set(tx, -ty)
      cursorActive = true
    }
    const onLeave = () => { cursorActive = false }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)

    // ---- Animate ----
    let raf
    const clock = new THREE.Clock()
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      mx += (tx - mx) * 0.04
      my += (ty - my) * 0.04

      wire.rotation.y = t * 0.18
      wire.rotation.x = Math.sin(t * 0.25) * 0.25
      ring.rotation.z = t * 0.25

      const a = t * 0.7
      orb.position.set(
        wire.position.x + Math.cos(a) * 3.4,
        wire.position.y + Math.sin(a) * 3.4 * Math.cos(Math.PI / 2.4) * 0.55,
        wire.position.z + Math.sin(a) * 3.4 * 0.8
      )

      particles.rotation.y = t * 0.015 + mx * 0.05
      particles.rotation.x = my * 0.04
      particles.position.y = Math.sin(t * 0.3) * 0.25

      if (cursorActive) {
        raycaster.setFromCamera(ndc, camera)
        raycaster.ray.intersectPlane(plane, cursor3D)
      }
      updateNetwork(cursor3D, cursorActive)

      camera.position.x = mx * 0.6
      camera.position.y = -my * 0.4
      camera.position.z = 9 + Math.sin(t * 0.2) * 0.4
      camera.lookAt(2, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = W() / H()
      camera.updateProjectionMatrix()
      renderer.setSize(W(), H())
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      dot.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-0 pointer-events-none opacity-95" />
}
