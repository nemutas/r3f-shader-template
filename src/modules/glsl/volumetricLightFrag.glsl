uniform sampler2D tDiffuse;
uniform vec2 u_lightPosition;
uniform float u_exposure;
uniform float u_decay;
uniform float u_density;
uniform float u_weight;
uniform int u_samples;
varying vec2 v_uv;

const int MAX_SAMPLES = 100;

void main() {
  vec2 texCoord = v_uv;
  vec2 deltaTextCoord = texCoord - u_lightPosition;
  vec4 color = texture2D(tDiffuse, texCoord);
  deltaTextCoord *= 1.0 / float(u_samples) * u_density;
  float illuminationDecay = 1.0;

  for(int i = 0; i < MAX_SAMPLES; i++) {
    if(i == u_samples) break;
    texCoord -= deltaTextCoord;
    vec4 tex = texture2D(tDiffuse, texCoord);
    tex *= illuminationDecay * u_weight;
    color += tex;
    illuminationDecay *= u_decay;
  }

  gl_FragColor = color * u_exposure;
}