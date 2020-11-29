precision mediump float;

uniform float delta_x;
uniform float scale;
uniform sampler2D vector_field;
uniform sampler2D boundary;

varying vec2 UV;

void main() {
    float eps = delta_x;
    vec2 normal_vector = texture2D(boundary, UV).xy;
    vec2 offset = vec2(normal_vector.x * delta_x, normal_vector.y * delta_x);
    if (UV.x - 0.0 < eps) {
        offset = vec2(delta_x, 0.0);
        if (offset.x == delta_x * normal_vector.x && offset.y == delta_x * normal_vector.y)
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            return;
        }
    } else if (1.0 - UV.x < eps) {
        offset = vec2(-delta_x, 0.0);
        if (offset.x == delta_x * normal_vector.x && offset.y == delta_x * normal_vector.y)
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            return;
        }
    } else if (UV.y - 0.0 < eps) {
        offset = vec2(0.0, delta_x);
        if (offset.x == delta_x * normal_vector.x && offset.y == delta_x * normal_vector.y)
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            return;
        }
    } else if (1.0 - UV.y < eps) {
        offset = vec2(0.0, -delta_x);
        if (offset.x == delta_x * normal_vector.x && offset.y == delta_x * normal_vector.y)
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            return;
        }
    } else {
        if (offset.x == 0.0 && offset.y == 0.0)
        {
            gl_FragColor = vec4(-1.0, 0.0, 0.0, 1.0);
            return;
        }
        gl_FragColor = texture2D(vector_field, UV);
        return;
    }
    vec2 col = scale * texture2D(vector_field, UV + offset).xy;
    gl_FragColor = vec4(col, 0.0, 1.0);
}

/*void main() {*/
    /*float eps = delta_x;*/
    /*vec2 normal_vector = delta_x * texture2D(boundary, UV).xy;*/
    /*vec2 offset = vec2(normal_vector.x * delta_x, normal_vector.y * delta_x);*/
    /*} else {*/
        /*gl_FragColor = texture2D(vector_field, UV);*/
        /*return;*/
    /*}*/
    /*vec2 col;*/
    /*if (scale == 1) {*/
        /*col = scale * texture2D(vector_field, UV + offset).xy;*/
    /*}*/
    /*else {*/
        /*vec2 incident_vector = texture2D(vector_field, UV + offset).xy;*/
        /*col = incident_vector - 2.0 * dot(incident_vector, normal_vector)*/
                    /** normal_vector;*/
    /*}*/
    /*gl_FragColor = vec4(col, 0.0, 1.0);*/
/*}*/

