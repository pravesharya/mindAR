// import * as THREE from "three";
import { GLTFLoader } from 'GLTFLoader';
import { MindARThree } from "mindAR";

// let width = window.innerWidth;
// let height = window.innerHeight;

let model;
const modelPath = "./assets/bunny/scene.gltf";
const loader = new GLTFLoader();

const mindAR = new MindARThree({
  container: document.body,
  imageTargetSrc: "./assets/nutri.mind",
});

async function startMindAR() {

  loader.load(modelPath, (gltf) => {
    model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1);
  });

  const anchor = mindAR.addAnchor(0);
  anchor.group.add(model);

  await mindAR.start();

  const { renderer, camera, scene } = mindAR;
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

}
startMindAR();