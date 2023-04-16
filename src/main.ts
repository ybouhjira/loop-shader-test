import './style.css'
import {
    AmbientLight, IcosahedronGeometry,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera, PlaneGeometry,
    Scene,
    ShaderMaterial,
    SphereGeometry,
    WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import vertexShader from './shaders/intellij/vertex.glsl';
import fragmentShader from './shaders/intellij/fragment.glsl';

const renderer = new WebGLRenderer({
    antialias: true,
});
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new Scene();
renderer.setClearColor('#0082b5', 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


let mesh = new Mesh(
    new IcosahedronGeometry(2, 100),
    //new PlaneGeometry(5, 5, 1000, 1000),
    new ShaderMaterial(
        {
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: {value: 0},
            }
        }
    ),
);
scene.add(
    mesh,
    new AmbientLight('#ffffff', 1),
);

new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;


function animate() {
    requestAnimationFrame(animate);
    mesh.material.uniforms.uTime.value = performance.now() / 5000;
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})
