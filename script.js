import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";
import { MindARThree } from "mindAR";

let model;
const modelPath = "./assets/bunny/scene.gltf";
const loader = new GLTFLoader();

async function startMindAR() {

  const mindAR = new MindARThree({
    container: document.body,
    imageTargetSrc: "./assets/targetNutri.mind",
  });
  const anchor = mindAR.addAnchor(0);
  const { renderer, camera, scene } = mindAR;

  const light = new THREE.HemisphereLight(0xffffff, 10);
  scene.add(light);

  loader.load(modelPath, (gltf) => {
    model = gltf.scene;
    model.scale.set(0.25, 0.25, 0.25);
    model.position.set(0, 0, -1);
    model.rotation.set(90, 0, 0);
    anchor.group.add(model);
  });

  await mindAR.start();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}
startMindAR();
