varying vec3 v_pos;
varying vec3 v_normal;
varying vec3 v_eye;

void main() {
  v_pos = normalize(position);
  v_normal = normalize(normalMatrix * normal);

  vec4 mvPos = modelViewMatrix * vec4( position, 1.0 );
  v_eye = normalize(mvPos.xyz);

  gl_Position = projectionMatrix * mvPos;
}