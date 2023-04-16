varying vec2 vUv;
uniform float uTime;

#define PI 3.1415926535897932384626433832795

float zeroToOneValue(float x) {
    return (cos(x * PI * 20.) + 1.) / 2.;
}

void main() {
    vUv = uv;

    float x = (cos(vUv.x * PI * 20.) + 1.) / 2.;
    float y = zeroToOneValue(mod((vUv.y + vUv.x + uTime) * 1., 1.));
    vec3 s = vec3(y);

    vec3 stripes = s;
    vec3 pos = position + normal * stripes * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
