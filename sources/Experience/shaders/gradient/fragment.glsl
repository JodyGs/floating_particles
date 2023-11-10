uniform float uTime;
uniform vec3 uEndColor;
uniform vec3 uStartColor;

varying vec2 vUv;

float random2d(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {

  vec3 finalColor = mix(uStartColor, uEndColor, vUv.y);

  finalColor += random2d(vUv) * 0.005;

   gl_FragColor = vec4(finalColor, 1.0);
}