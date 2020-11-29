precision mediump float;

uniform float delta_x;
uniform bool should_reflect;
uniform sampler2D vector_field;
uniform sampler2D boundary;

varying vec2 UV;

void main() {
    vec2 normal = texture2D(boundary, UV).xy;
    vec2 offset = delta_x * normal;

    // Valor del campo antes del obstaculo
    vec2 incoming = texture2D(vector_field, UV + offset).xy;

    if (should_reflect)
    {
        incoming = reflect(incoming, normal);
    }

    gl_FragColor = vec4(incoming, 0.0, 1.0);
}


