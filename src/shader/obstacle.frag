precision mediump float;

uniform sampler2D obstacle_field;
uniform sampler2D background_image;

varying vec2 UV;

void main()
{
    // Que tan obstaculo es esta celda. 0 = no es obstaculo, 1 = 100% obstaculo
    // float obstacle_percentage = texture2D(obstacle_field, UV).w;
    float obstacle_percentage = 0.0;

    vec3 obstacle_color = vec3(0.0, 0.0, 0.0);

    vec3 color = texture2D(background_image, UV).xyz;

    gl_FragColor = vec4(mix(color, obstacle_color, obstacle_percentage), 1.0);
}
