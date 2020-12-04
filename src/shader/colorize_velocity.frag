precision mediump float;

uniform sampler2D velocity_field;
uniform float magnitude_scale;

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
    // Velocidad en ese punto
    vec2 v = texture2D(velocity_field, UV).xy;
    // Ángulo del vector velocidad, de 0 a 2pi
    float theta = atan(v.y, v.x);
    // normalizado de 0 a 1
    theta /= 2.0*PI;

    // Magnitud del vector velocidad
    float m = length(v);
    // magnificada para que sea mas visible
    m *= magnitude_scale;
    // normalizada de 0 a pi/2 (ya que m > 0)
    m = atan(m);
    // de 0 a 0.5
    m /= PI;
    // de 0 a 1
    m *= 2.0;

    // Angulo es hue, magnitud es value, saturacion es 100%
    vec3 hsv = vec3(theta, 1.0, m);

    gl_FragColor = vec4(hsv2rgb(hsv), 1.0);
}
