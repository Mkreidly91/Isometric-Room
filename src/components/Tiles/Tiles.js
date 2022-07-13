import { LinearEncoding } from "three";
import { Plane, useTexture } from "@react-three/drei";

export default function Tiles(props) {
  const textures = useTexture({ ...props.texture });

  return (
    <Plane
      receiveShadow
      position={[0, -0.3, 0]}
      args={[75, 75]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial {...textures} normalMap-encoding={LinearEncoding} />
    </Plane>
  );
}
