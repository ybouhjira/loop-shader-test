// vUv
varying vec2 vUv;
uniform float uTime;
uniform vec3 uFirstColor;
uniform vec3 uSecondColor;


float zeroToOneValue(float x) {
    return (cos(x * PI * 20.) + 1.) / 2.;
}

vec3 hsvToRgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec3 s = vUv.y * uFirstColor + (1. - vUv.y) * uSecondColor;
    //vec3 s = vec3(y);
    csm_DiffuseColor = vec4(
        s
    , 1.0);
}
