import React, { createContext, useContext, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { SuspenseWrapper } from "./components/SuspenseWrapper/SuspenseWrapper";
import "./App.css";
import { useHelper } from "@react-three/drei";

import { PointLightHelper } from "three";

//a React.context to be passed down to all models
export const PortalContext = createContext();

const App = () => {
  //Camera
  const portal = useRef();
  const light = useRef();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(50, 60, 50);
  // camera.lookAt(new THREE.Vector3(0, 0, 0));

  return (
    <div className="main">
      <Canvas frameloop="demand" camera={camera} dpr={window.devicePixelRatio}>
        <ambientLight intensity={1} />
        <pointLight
          ref={light}
          intensity={1}
          penumbra={1}
          position={[30, 50, 50]}
          castShadow
        />

        <PortalContext.Provider value={portal}>
          <SuspenseWrapper />
        </PortalContext.Provider>
      </Canvas>
      <div className="portal" ref={portal}></div>
    </div>
  );
};
export default App;
