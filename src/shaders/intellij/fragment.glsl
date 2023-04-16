// vUv
varying vec2 vUv;
uniform float uTime;

#define PI 3.1415926535897932384626433832795

float rand(vec2 c){
    return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float zeroToOneValue(float x) {
    return (cos(x * PI * 20.) + 1.) / 2.;
}
void main() {

    float x = (cos(vUv.x * PI * 20.) + 1.) / 2.;
    float y = zeroToOneValue(mod((vUv.y + vUv.x + uTime) * 1., 1.));
    vec3 s = vec3(y);

    vec3 stripes = s;
    gl_FragColor = vec4(stripes, 1.0);
}
