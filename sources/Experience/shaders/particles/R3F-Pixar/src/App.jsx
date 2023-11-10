import * as THREE from "three";
import React, { Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function Balloon({ z }) {
	const ref = React.useRef();

	const { nodes, materials } = useGLTF("/pixar-v1-transformed.glb");
	const { viewport, camera } = useThree();
	const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

	const [data] = React.useState({
		x: THREE.MathUtils.randFloatSpread(2),
		y: THREE.MathUtils.randFloatSpread(height),
		rX: Math.random() * Math.PI,
		rY: Math.random() * Math.PI,
		rZ: Math.random() * Math.PI,
	});

	useFrame((state) => {
		ref.current.rotation.set(
			(data.rX += 0.005),
			(data.rY += 0.02),
			(data.rZ += 0.0003)
		);
		ref.current.position.set(data.x * width, (data.y += 0.12), z);
		if (data.y > height) {
			data.y = -height;
		}
	});

	return (
		<group ref={ref} scale={0.01}>
			<mesh
				geometry={nodes.Pixar_Ball_yellow_with_red_star_0.geometry}
				material={materials.yellow_with_red_star}
				position={[0, 100, 0]}
				rotation={[-0.65, 0.14, 0.11]}
				scale={100}
			/>
		</group>
	);
}

export default function App({ count = 100, depth = 80 }) {
	return (
		<>
			<Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }}>
				<color attach="background" args={["#87cefa"]} />
				<spotLight position={[10, 10, 10]} intensity={0.2} />
				<Suspense fallback={null}>
					<Environment preset="sunset" />
				</Suspense>
				{Array.from({ length: count }, (_, i) => (
					<Balloon key={i} z={-(i / count) * depth - 20} />
				))}
				<EffectComposer>
					<DepthOfField
						target={[0, 0, depth / 2]}
						focalLength={0.5}
						bokehScale={5}
						height={700}
					/>
				</EffectComposer>
			</Canvas>
		</>
	);
}
