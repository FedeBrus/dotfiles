#version 320 es
precision mediump float;

in vec2 v_texcoord;
out vec4 fragColor;

uniform sampler2D tex;

void main() {
    vec4 color = texture(tex, v_texcoord);
    float gray = (color.r + color.g + color.b) / 3.0;
    fragColor = vec4(vec3(gray), 1.0);
}

