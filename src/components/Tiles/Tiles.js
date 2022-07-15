import { LinearEncoding } from "three";
import { Plane, useTexture } from "@react-three/drei";
import { wrappingStyle } from "../../util";

export default function Tiles(props) {
  const texture = useTexture({ ...props.texture });
  wrappingStyle({ texture: texture, mode: "repeat", ratio: [4, 4] });
  return (
    <Plane
      receiveShadow
      position={[0, -0.3, 0]}
      args={[75, 75]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial {...texture} normalMap-encoding={LinearEncoding} />
    </Plane>
  );
}
