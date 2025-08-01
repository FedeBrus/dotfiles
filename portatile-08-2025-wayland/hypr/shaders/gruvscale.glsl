precision mediump float;
varying vec2 v_texcoord;
uniform sampler2D tex;

void main() {
  vec4 this_colour = texture2D(tex, v_texcoord); 
  float brightness = (this_colour.r + this_colour.g + this_colour.b) / 3.0;

  vec3 target_colour = vec3(0.971, 0.909, 0.748); // #ebdbb2
  vec3 final_colour = brightness * target_colour;

  gl_FragColor = vec4(final_colour, 1.0);
}

