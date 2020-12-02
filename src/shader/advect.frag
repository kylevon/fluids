precision mediump float;

uniform float delta_x;
uniform float delta_t;
uniform sampler2D color_field_texture;
uniform sampler2D vec_field_texture;
uniform sampler2D obstacle_field;
varying vec2 UV;

bool is_inside(vec2 coord)
{
    return texture2D(obstacle_field, coord).w > 0.0;
}

vec2 limit(vec2 outside, vec2 inside)
{
    const int iter = 10;

    vec2 middle = outside;

    for(int i = 0; i < iter; i++)
    {
        middle = mix(outside, inside, 0.5);

        if(is_inside(middle))
        {
            inside = middle;
        }
        else
        {
            outside = middle;
        }
    }
    return middle;
}

void main() {

    vec2 u = texture2D(vec_field_texture, UV).xy;
    vec2 pastCoord = UV - (0.5 * delta_t * u);

    // Valor del campo retrocediendo en esa dirección
    vec4 color = texture2D(color_field_texture, pastCoord);



    // Si soy un obstáculo no tengo color ni velocidad
    float obstacle = texture2D(obstacle_field, UV).w;
    if(obstacle > 0.0)
    {
        color = vec4(0.0, 0.0, 0.0, 0.0);
    }
    else
    {
        // Si caigo en un obstáculo debo buscar el punto antes del obstáculo
        // float from_obstacle = texture2D(obstacle_field, pastCoord).w;
        if(is_inside(pastCoord))
        {
            // conservo mi color/velocidad
            color = texture2D(color_field_texture, UV);
        }
    }

    // TODO manejar el caso en que ambos extremos quedan fuera pero esa linea cruza el obstáculo

    gl_FragColor = color;
}


