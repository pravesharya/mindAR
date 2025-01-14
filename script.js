import * as THREE from "three";
import { MindARThree } from "mindAR";

// console.log(window.MINDAR.IMAGE);
// const mindArThree = window.MINDAR.IMAGE.MindARThree;
let width = window.innerWidth;
let height = window.innerHeight;

const mindAR = new MindARThree({
  container: document.body,
  imageTargetSrc: "./assets/nutri.mind",
});
console.log(mindAR);

async function startMindAR() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  // anchor = mindAR.createAnchor();
  const anchor = mindAR.addAnchor(0);
  anchor.group.add(cube);
  console.log(anchor);

  await mindAR.start();

  const { renderer, camera, scene } = mindAR;
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

  //   function animate() {
  //     requestAnimationFrame(animate);
  //     //   cube.rotation.y += 0.01;
  //     renderer.render(scene, camera);
  //   }
  //   animate();
}
startMindAR();

// window.addEventListener("resize", () => {
//   width = window.innerWidth;
//   height = window.innerHeight;
//   renderer.setSize(width, height);
//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();
// //   BG.width = width;
//   BG.height = height;
// });
