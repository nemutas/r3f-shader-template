uniform float u_time;
uniform float u_scale;
uniform sampler2D u_matcap;
varying vec3 v_pos;
varying vec3 v_normal;
varying vec3 v_eye;

void layer(inout float alpha, float distortion, float radius, float space) {
	float inRadius = 1.0 - radius + space;
	alpha *= smoothstep(radius, radius + 0.002, distortion);
	alpha += smoothstep(inRadius, inRadius + 0.002, 1.0 - distortion);
}

#include './matcap.glsl'

void main() {
  vec2 uv = matcap(v_eye, v_normal);
  vec4 tex = texture2D(u_matcap, uv);

  vec3 p = v_pos; // length = 1
  p += 0.1 * cos(u_scale * 3.7 * p.yzx + 1.4 * u_time + vec3(2.2, 3.4, 0.5));
  p += 0.1 * cos(u_scale * 3.0 * p.zxy + 1.0 * u_time + vec3(1.2, 3.4, 2.5));
  p += 0.3 * cos(u_scale * 5.0 * p.yzx + 2.6 * u_time + vec3(4.2, 1.4, 1.0));
  p += 0.3 * cos(u_scale * 7.5 * p.zxy + 3.6 * u_time + vec3(12.2, 3.4, 3.2));

  float distortion = length(p);

  float alpha = smoothstep(0.01, 0.01 + 0.002, 1.0 - distortion);
  layer(alpha, distortion, 0.9, 0.03);
  layer(alpha, distortion, 0.7, 0.03);
  layer(alpha, distortion, 0.5, 0.03);
  layer(alpha, distortion, 0.3, 0.03);

  gl_FragColor = vec4(tex.rgb, alpha);
}