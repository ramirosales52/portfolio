import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Tech stack logos with positions
const techStack = [
  { name: 'React', color: '#61DAFB' },
  { name: 'NestJS', color: '#E0234E' },
  { name: 'Expo', color: '#000020' },
  { name: 'Git', color: '#F05032' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'MongoDB', color: '#47A248' }
]

function TechLogo({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[0]) * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

interface TechAnimationProps {
  className?: string
}

export function TechAnimation({ className }: TechAnimationProps) {
  // Calculate positions in a circle
  const logoPositions = useMemo(() => {
    return techStack.map((_, index) => {
      const angle = (index / techStack.length) * Math.PI * 2
      const radius = 3
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      return [x, 0, z] as [number, number, number]
    })
  }, [])

  return (
    <div className={`w-full h-96 bg-black/20 rounded-lg overflow-hidden ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {techStack.map((tech, index) => (
          <TechLogo
            key={tech.name}
            position={logoPositions[index]}
            color={tech.color}
          />
        ))}
      </Canvas>

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Stack Tecnológico</h3>
          <p className="text-white/70 text-sm">Tecnologías que domino</p>
        </div>
      </div>
    </div>
  )
}