import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";
import { MindARThree } from "mindAR";

const btnRL = document.querySelector("#rL");
const btnRR = document.querySelector("#rR");
const btnSI = document.querySelector("#sI");
const btnSO = document.querySelector("#sO");

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

  // Wait for model to load
  await new Promise((resolve) => {
    loader.load(modelPath, (gltf) => {
      model = gltf.scene;
      resolve();
    });
  });

  // Now we can safely work with the model
  model.scale.set(0.25, 0.25, 0.25);
  model.position.set(0, 0, -1);
  anchor.group.add(model);

  await mindAR.start();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}
startMindAR();

btnRL.addEventListener("click", () => {
  model.rotation.y -= 0.5;
});
btnRR.addEventListener("click", () => {
  model.rotation.y += 0.5;
});
btnSI.addEventListener("click", () => {
  model.scale.x += 0.1;
  model.scale.y += 0.1;
  model.scale.z += 0.1;
});
btnSO.addEventListener("click", () => {
  model.scale.x -= 0.1;
  model.scale.y -= 0.1;
  model.scale.z -= 0.1;
});
