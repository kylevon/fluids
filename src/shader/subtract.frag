precision mediump float;

uniform float delta_x;
uniform sampler2D p;
uniform sampler2D w;
uniform sampler2D obstacle_field;
varying vec2 UV;

float map_with_offset(sampler2D tex, vec2 point, vec2 offset)
{
    float near_obstacle = texture2D(obstacle_field, point + offset).w;
    // // Si point + offset es un obstaculo, entonces tambien tomamos point
    if (near_obstacle > 0.0)
    {
        return texture2D(tex, point).x;
    }

    // Si todo esta bien entonces tomamos el offset y chao :)
    return texture2D(tex, point + offset).x;
}

void main() {
    // float pLeft  = texture2D(p, UV - vec2(delta_x, 0.0)).x;
    // float pRight = texture2D(p, UV + vec2(delta_x, 0.0)).x;
    // float pDown  = texture2D(p, UV - vec2(0.0, delta_x)).x;
    // float pUp    = texture2D(p, UV + vec2(0.0, delta_x)).x;

    float pLeft  = map_with_offset(p, UV, vec2(-delta_x, 0.0));
    float pRight = map_with_offset(p, UV, vec2(+delta_x, 0.0));
    float pDown  = map_with_offset(p, UV, vec2(0.0, -delta_x));
    float pUp    = map_with_offset(p, UV, vec2(0.0, +delta_x));

    vec4 color = texture2D(w, UV);
    float half_rdx = 1.0 / (2.0 * delta_x);
    color.xy -= half_rdx * vec2((pRight - pLeft), (pUp - pDown));

    gl_FragColor = color;
}