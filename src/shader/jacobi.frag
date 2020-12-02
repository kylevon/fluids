precision mediump float;

uniform float delta_x;
uniform float alpha;
uniform float r_beta;
uniform sampler2D x;
uniform sampler2D b;
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
    // vec2 xLeft  = texture2D(x, UV - vec2(delta_x, 0.0)).xy;
    // vec2 xRight = texture2D(x, UV + vec2(delta_x, 0.0)).xy;
    // vec2 xDown  = texture2D(x, UV - vec2(0.0, delta_x)).xy;
    // vec2 xUp    = texture2D(x, UV + vec2(0.0, delta_x)).xy;

    vec2 xLeft  = map_with_offset(x, UV, vec2(-delta_x, 0.0));
    vec2 xRight = map_with_offset(x, UV, vec2(+delta_x, 0.0));
    vec2 xDown  = map_with_offset(x, UV, vec2(0.0, -delta_x));
    vec2 xUp    = map_with_offset(x, UV, vec2(0.0, +delta_x));

    vec2 bCenter = texture2D(b, UV).xy;

    vec2 average = r_beta * (xLeft + xRight + xUp + xDown + alpha*bCenter);

    float obstacle = texture2D(obstacle_field, UV).w;
    // Si point es un obstaculo, toma valor CERO
    if (obstacle > 0.0)
    {
        average = vec2(0.0, 0.0);
    }

    gl_FragColor = vec4(average, 0.0, 1.0);
}
