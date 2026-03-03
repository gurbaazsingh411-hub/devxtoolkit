import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float, Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { tools } from '@/data/tools';
import { useNavigate } from 'react-router-dom';

// Question block style arcade machine
function QuestionBlock({
  position,
  tool,
  onClick,
}: {
  position: [number, number, number];
  tool: typeof tools[0];
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const color = tool.color;

  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <Float speed={hovered ? 5 : 1.5} rotationIntensity={0} floatIntensity={hovered ? 0.8 : 0.2}>
        {/* Main question block body */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial
            color={hovered ? '#FFD700' : '#CC8800'}
            emissive={hovered ? '#FFD700' : '#886600'}
            emissiveIntensity={hovered ? 0.5 : 0.15}
          />
        </mesh>

        {/* Block border lines */}
        <mesh position={[0, 1, 0.66]}>
          <boxGeometry args={[1.1, 1.1, 0.01]} />
          <meshStandardMaterial
            color="#553300"
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* ? mark on front */}
        <Text
          position={[0, 1, 0.67]}
          fontSize={0.6}
          color={hovered ? '#FFFFFF' : '#553300'}
          font="/fonts/PressStart2P-Regular.ttf"
          anchorX="center"
          anchorY="middle"
        >
          ?
        </Text>

        {/* Tool name on top */}
        <Text
          position={[0, 1.75, 0]}
          fontSize={0.08}
          color={color}
          font="/fonts/PressStart2P-Regular.ttf"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
          rotation={[-0.3, 0, 0]}
        >
          {tool.name.toUpperCase()}
        </Text>

        {/* Pipe base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 8]} />
          <meshStandardMaterial color="#228B22" emissive="#115511" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.15, 8]} />
          <meshStandardMaterial color="#2ECC40" emissive="#115511" emissiveIntensity={0.2} />
        </mesh>

        {/* Glow */}
        <pointLight
          position={[0, 1, 1]}
          color={hovered ? '#FFD700' : color}
          intensity={hovered ? 3 : 0.5}
          distance={4}
        />

        {/* Floating coin when hovered */}
        {hovered && (
          <mesh position={[0, 2.2, 0]} rotation={[0, Date.now() * 0.005, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.04, 16]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} />
          </mesh>
        )}
      </Float>
    </group>
  );
}

// Brick platform
function BrickPlatform() {
  const bricks: [number, number, number][] = [];
  for (let x = -8; x <= 8; x += 1) {
    for (let z = -5; z <= 5; z += 1) {
      bricks.push([x, -0.5, z]);
    }
  }

  return (
    <group>
      {bricks.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.95, 0.5, 0.95]} />
          <meshStandardMaterial
            color={((pos[0] + pos[2]) % 2 === 0) ? '#8B4513' : '#A0522D'}
          />
        </mesh>
      ))}
    </group>
  );
}

// Mario pipe decoration
function Pipe({ position, height = 1.5 }: { position: [number, number, number]; height?: number }) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, height, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, height, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 8]} />
        <meshStandardMaterial color="#2ECC40" />
      </mesh>
    </group>
  );
}

// Cloud
function Cloud({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh><sphereGeometry args={[0.6, 8, 8]} /><meshStandardMaterial color="#ffffff" /></mesh>
      <mesh position={[0.5, 0.1, 0]}><sphereGeometry args={[0.5, 8, 8]} /><meshStandardMaterial color="#ffffff" /></mesh>
      <mesh position={[-0.5, 0.1, 0]}><sphereGeometry args={[0.5, 8, 8]} /><meshStandardMaterial color="#ffffff" /></mesh>
      <mesh position={[0, 0.3, 0]}><sphereGeometry args={[0.45, 8, 8]} /><meshStandardMaterial color="#ffffff" /></mesh>
    </group>
  );
}

const ArcadeLobby3D = () => {
  const navigate = useNavigate();

  const positions: [number, number, number][] = [
    [-4.5, 0, -2],
    [-1.5, 0, -2],
    [1.5, 0, -2],
    [4.5, 0, -2],
    [-4.5, 0, 2],
    [-1.5, 0, 2],
    [1.5, 0, 2],
    [4.5, 0, 2],
  ];

  return (
    <div className="w-full h-[60vh] md:h-[70vh]">
      <Canvas camera={{ position: [0, 6, 12], fov: 45 }} gl={{ antialias: true }}>
        {/* Mario sky gradient */}
        <color attach="background" args={['#1a2a5e']} />
        <fog attach="fog" args={['#1a2a5e', 12, 30]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} color="#FFF8DC" />
        <directionalLight position={[-5, 5, -5]} intensity={0.2} color="#87CEEB" />

        <Stars radius={40} depth={30} count={500} factor={2} fade speed={0.5} />

        {/* Title */}
        <Text
          position={[0, 5, -5]}
          fontSize={0.7}
          color="#E03030"
          font="/fonts/PressStart2P-Regular.ttf"
          anchorX="center"
        >
          SUPER DEVX BROS
        </Text>
        <Text
          position={[0, 4.2, -5]}
          fontSize={0.25}
          color="#FFD700"
          font="/fonts/PressStart2P-Regular.ttf"
          anchorX="center"
        >
          SELECT YOUR TOOL
        </Text>

        {/* Clouds */}
        <Cloud position={[-6, 6, -8]} />
        <Cloud position={[4, 7, -10]} />
        <Cloud position={[8, 5.5, -6]} />

        {/* Pipes decoration */}
        <Pipe position={[-7, -0.2, 0]} height={1} />
        <Pipe position={[7, -0.2, 0]} height={1.8} />
        <Pipe position={[-7, -0.2, -4]} height={2.2} />
        <Pipe position={[7, -0.2, -4]} height={1.2} />

        <BrickPlatform />

        {tools.map((tool, i) => (
          <QuestionBlock
            key={tool.id}
            position={positions[i]}
            tool={tool}
            onClick={() => navigate(`/tool/${tool.id}`)}
          />
        ))}

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={6}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2.3}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export default ArcadeLobby3D;
