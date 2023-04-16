import './style.css'
import {
    AmbientLight, BoxGeometry, Color,
    DirectionalLight,
    IcosahedronGeometry,
    Mesh,
    MeshPhysicalMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import vertexShader from './shaders/intellij/vertex.glsl';
import fragmentShader from './shaders/intellij/fragment.glsl';
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import {GUI} from "dat.gui";

const renderer = new WebGLRenderer({
    antialias: true,
});
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new Scene();
renderer.setClearColor('#192428', 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const COLOR1 = '#00ffd1';
const COLOR2 = '#ff8700';

let myShaderMaterial = new CustomShaderMaterial({
    baseMaterial: MeshPhysicalMaterial,
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: {
            value: 0,
        },
        uFirstColor: {
            value: new Color(COLOR1),
        },
        uSecondColor: {
            value: new Color(COLOR2),
        }
    },
    roughness: 0.1,
    clearcoat: 0.1,
    flatShading: true,
    color: 0xff00ff,
});
let mesh = new Mesh(
    new IcosahedronGeometry(2, 100),
    //new PlaneGeometry(5, 5, 1000, 1000),
    myShaderMaterial,
);
mesh.receiveShadow = true;
scene.add(
    mesh,
    new AmbientLight('#ffffff', 0.5),
);

const directionalLight = new DirectionalLight('#ffffff', 1);
directionalLight.position.set(3, 3, 3);
scene.add(directionalLight);

new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

let gui = new GUI();
gui.addColor({color: '#ff00ff'}, 'color').onChange((color) => {
    mesh.material.color.set(color);
});


let timeChange = 5000;
//gui.add(mesh.material, 'roughness', 0, 1, 0.01);
gui.add(mesh.material.uniforms.uTime, 'value', 500, 5000).onChange((value) => {
    timeChange = value;
});

gui.add(mesh.material, 'flatShading').onChange((value) => {
    mesh.material.flatShading = value;
    mesh.material.needsUpdate = true;
});

gui.addColor({color: COLOR1}, 'color').onChange((color) => {
    mesh.material.uniforms.uFirstColor.value.set(color);
});

gui.addColor({color: COLOR2}, 'color').onChange((color) => {
    mesh.material.uniforms.uSecondColor.value.set(color);
});

function animate() {
    requestAnimationFrame(animate);
    mesh.material.uniforms.uTime.value = performance.now() / timeChange;
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})
