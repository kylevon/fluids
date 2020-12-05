precision mediump float;

uniform sampler2D pressure_field;

varying vec2 UV;

#define PI 3.14159265359

// All components are in the range [0…1], including hue.
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
    // presión en ese punto
    float p = texture2D(pressure_field, UV).x;
    // normalizada de -pi/2 a pi/2
    p = atan(p * 1000.0);
    // de -0.5 a 0.5
    p /= PI;
    // de 0 a 1
    p += 0.5;

    // hue. p=0 es azul, p=1 es rojo
    float h = 2.0 * (1.0 - p) / 3.0;

    vec3 hsv = vec3(h, 1.0, 1.0);

    gl_FragColor = vec4(hsv2rgb(hsv), 1.0);
}
