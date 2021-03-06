// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e4);}
float random (in vec2 st) { return fract(1e4 * sin(17.0 * st.x + st.y * 0.1) * (0.1 + abs(sin(st.y * 13.0 + st.x)))); }

float pattern(vec2 st, vec2 v, float t) {
    vec2 p = floor(st+v);
    return step(t, random(100.+p*.000001)+random(p.x)*0.5 );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    if (u_resolution.x>u_resolution.y) {
        st.x *= u_resolution.x/u_resolution.y;
    } else {
        st.y *= u_resolution.y/u_resolution.x;
    }
    vec2 grid = vec2(100.0,50.);
    st *= grid;

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction

    vec2 vel = vec2(u_time*2.*max(grid.x,grid.y)); // time
    vel *= vec2(-1.,0.0) * random(1.0+ipos.y); // direction

    // Assign a random value base on the integer coord
    vec2 offset = vec2(0.3,0.);
    float pct = 0.5;//u_mouse.x/u_resolution.x;

    vec3 color = vec3(0.);
    color.r = pattern(st+offset,vel,0.5+pct);
    color.g = pattern(st,vel,0.5+pct);
    color.b = pattern(st-offset,vel,0.5+pct);

    // Margins
    color *= step(0.2,fpos.y);

    gl_FragColor = vec4(color,1.0);
}
