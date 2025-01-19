import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";
import { MindARThree } from "mindAR";

// const canvas = document.querySelector("#canvas");
const btnRL = document.querySelector("#rL");
const btnRR = document.querySelector("#rR");
const btnSI = document.querySelector("#sI");
const btnSO = document.querySelector("#sO");

const modelPath = "./assets/woman_dancing.glb";
// const modelPath = "./assets/cat_walking/scene.gltf";
// const audioPath = "./assets/cat_walking/meow.mp3";
const loaderGltf = new GLTFLoader();
// const loaderAudio = new THREE.AudioLoader();

let model, animations, mixer, audio, listener;
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
  const gltf = await new Promise((resolve) => {
    loaderGltf.load(modelPath, (gltf) => {
      resolve(gltf);
    });
  });
  model = gltf.scene;
  animations = gltf.animations;

  let size = 0.5;
  model.scale.set(size, size, size);
  model.position.set(0, -size, 0);
  anchor.group.add(model);

  mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(animations[0]);
  action.play();

  // const audioClip = await new Promise((resolve) => {
  //   loaderAudio.load(audioPath, (buffer) => {
  //     resolve(buffer);
  //   });
  // });

  // listener = new THREE.AudioListener();
  // camera.add(listener);
  // audio = new THREE.PositionalAudio(listener);
  // audio.setBuffer(audioClip);
  // audio.setRefDistance(100);
  // // audio.setLoop(true);
  
  // anchor.onTargetFound = () => {
  //   setInterval(() => {
  //     audio.isPlaying ? audio.pause() : audio.play();
  //   }, 5000);
  //   // audio.play();
  // } 
  // anchor.onTargetLost = () => {
  //   audio.pause();
  // } 

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
