precision mediump float;

uniform float delta_x;
uniform float delta_t;
uniform sampler2D color_field_texture;
uniform sampler2D vec_field_texture;
uniform sampler2D obstacle_field;
varying vec2 UV;

bool is_inside_obstacle(vec2 coord)
{
    return texture2D(obstacle_field, coord).w > 0.0;
}

vec2 limit(vec2 outside, vec2 inside)
{
    const int iter = 3;

    vec2 middle = outside;

    for(int i = 0; i < iter; i++)
    {
        middle = mix(outside, inside, 0.5);

        if(is_inside_obstacle(middle))
        {
            inside = middle;
        }
        else
        {
            outside = middle;
        }
    }
    return outside;
}

vec2 detect_jump(vec2 from, vec2 to)
{
    const int steps = 3;

    for(int i = 1; i <= steps; i++)
    {
        float step_i = float(i) / float(steps + 1);

        vec2 intermediate = mix(from, to, step_i);

        if(is_inside_obstacle(intermediate))
        {
            return limit(from, intermediate);
        }
    }

    return to;
}

void main() {

    vec2 u = texture2D(vec_field_texture, UV).xy;
    vec2 pastCoord = UV - (0.5 * delta_t * u);

    // Valor del campo retrocediendo en esa direccion
    vec4 color = texture2D(color_field_texture, pastCoord);



    // Si soy un obstaculo no tengo color ni velocidad
    float obstacle = texture2D(obstacle_field, UV).w;
    if(obstacle > 0.0)
    {
        color = vec4(0.0, 0.0, 0.0, 0.0);
    }
    else
    {
        // Si caigo en un obstaculo debo buscar el punto antes del obstaculo
        if(is_inside_obstacle(pastCoord))
        {
            color = texture2D(color_field_texture, limit(UV, pastCoord));
        }
        // Podriamos estar en el caso en que pasamos por encima del obstaculo
        else
        {
            color = texture2D(color_field_texture, detect_jump(UV, pastCoord));
        }
    }

    gl_FragColor = color;
}


