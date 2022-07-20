import React, { createContext, useContext, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { SuspenseWrapper } from "./components/SuspenseWrapper/SuspenseWrapper";
import "./App.css";

//import models and plane
import Tiles from "./components/Tiles/Tiles";

//import textures
import { textures } from "./textures";

//a React.context to be passed down to all models
export const PortalContext = createContext();

const { blackWhiteTiles } = textures.textureMaps;

const App = () => {
  //Camera
  const portal = useRef();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(-30, 50, -30);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  console.log("Parent rendered");
  return (
    <div className="main">
      <Canvas camera={camera} dpr={window.devicePixelRatio}>
        <ambientLight />
        <pointLight
          intensity={1}
          angle={1}
          penumbra={1}
          position={[-10, 15, -10]}
          castShadow
        />
        <OrbitControls />
        <Tiles texture={blackWhiteTiles} />
        <PortalContext.Provider value={portal}>
          <SuspenseWrapper />
        </PortalContext.Provider>
      </Canvas>
      <div className="portal" ref={portal}></div>
    </div>
  );
};
export default App;
