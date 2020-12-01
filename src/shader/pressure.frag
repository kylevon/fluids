precision mediump float;

uniform sampler2D velocity_field;
uniform sampler2D pressure_gradient;
uniform sampler2D pressure_field;

varying vec2 UV;

void main()
{
    vec2 dXdt = texture2D(velocity_field, UV).xy;
    vec2 dPdX = texture2D(pressure_gradient, UV).xy;

    float dPdt = dot(dXdt, dPdX);

    float P = texture2D(pressure_field, UV).x;

    gl_FragColor = vec4(P + dPdt, 0.0, 0.0, 1.0);
}
