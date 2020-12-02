precision mediump float;

uniform float delta_x;
uniform sampler2D w;
uniform sampler2D obstacle_field;

varying vec2 UV;

vec2 map_with_offset(sampler2D tex, vec2 point, vec2 offset)
{
    float near_obstacle = texture2D(obstacle_field, point + offset).w;
    // Si point + offset es un obstaculo, entonces tambien tomamos point
    if (near_obstacle > 0.0)
    {
        return texture2D(tex, point).xy;
    }

    // Si todo esta bien entonces tomamos el offset y chao :)
    return texture2D(tex, point + offset).xy;
}

void main() {
    // vec2 wLeft  = texture2D(w, UV - vec2(delta_x, 0.0)).xy;
    // vec2 wRight = texture2D(w, UV + vec2(delta_x, 0.0)).xy;
    // vec2 wDown  = texture2D(w, UV - vec2(0.0, delta_x)).xy;
    // vec2 wUp    = texture2D(w, UV + vec2(0.0, delta_x)).xy;

    vec2 wLeft  = map_with_offset(w, UV, vec2(-delta_x, 0.0));
    vec2 wRight = map_with_offset(w, UV, vec2(+delta_x, 0.0));
    vec2 wDown  = map_with_offset(w, UV, vec2(0.0, -delta_x));
    vec2 wUp    = map_with_offset(w, UV, vec2(0.0, +delta_x));

    float half_rdx = 1.0 / (2.0 * delta_x);
    gl_FragColor = vec4(half_rdx * ((wRight.x - wLeft.x) + (wUp.y - wDown.y)), 0.0, 0.0, 1.0);
}