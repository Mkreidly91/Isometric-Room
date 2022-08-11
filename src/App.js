import React, { createContext, useContext, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { SuspenseWrapper } from "./components/SuspenseWrapper/SuspenseWrapper";
import "./App.css";
import { useHelper } from "@react-three/drei";

import { OrthographicCamera, PointLightHelper } from "three";

//a React.context to be passed down to all models
export const PortalContext = createContext();

const App = () => {
  //Camera
  const portal = useRef();
  const light = useRef();

  // const camera = new THREE.PerspectiveCamera(
  //   60,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );
  // camera.position.set(50, 50, 50);
  // camera.lookAt(new THREE.Vector3(0, 0, 0));

  const aspect = window.innerWidth / window.innerHeight;
  const d = 60;
  const camera = new THREE.OrthographicCamera(
    -d * aspect,
    d * aspect,
    d,
    -d,
    0.1,
    1000
  );
  camera.position.set(10, 10, 10);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  console.log(camera);

  return (
    <div className="main">
      <Canvas frameloop="demand" camera={camera} dpr={window.devicePixelRatio}>
        <ambientLight intensity={2} />
        <PortalContext.Provider value={portal}>
          <SuspenseWrapper />
        </PortalContext.Provider>
      </Canvas>
      <div className="portal" ref={portal}></div>
    </div>
  );
};
export default App;
