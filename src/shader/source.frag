precision mediump float;

uniform float pixel_size;
uniform vec2 incoming_flow;
uniform sampler2D velocity_field;

varying vec2 UV;

void main()
{
  vec2 velocity = texture2D(velocity_field, UV).xy;

  if (UV.x < pixel_size)
  {
    velocity = incoming_flow;
  }

  gl_FragColor = vec4(velocity, 1.0, 1.0);
}
