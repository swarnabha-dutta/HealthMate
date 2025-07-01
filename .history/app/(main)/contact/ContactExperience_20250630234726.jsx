import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const ContactExperience = () => {
return (
        <Canvas
          shadows
          camera={{ position: [0, 1.6, 7], fov: 35 }}
          style={{ background: "#d07d36", borderRadius: "32px" }}
        >
            <ambientLight intensity={0.5} color="#fff4e6" />

        <directionalLight position={[5, 5, 3]} intensity={2.5} color="#ffd9b3" />

        <directionalLight
        position={[5, 9, 1]}
        castShadow
        intensity={2.5}
        color="#ffd9b3"
        />

        <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={0}
        maxAzimuthAngle={0}
        />

        <group scale={[1, 1, 1]}>
            <mesh
            receiveShadow
            position={[0, -1.5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            >
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#a46b2d" />
            </mesh>
        </group>

        <group scale={0.034} position={[0, -1.45, 0]} castShadow>
        <group scale={0.032} position={[0, -1.4, 0]} castShadow>
        <Computer />
        </group>
    </Canvas>
  );
};

export default ContactExperience;