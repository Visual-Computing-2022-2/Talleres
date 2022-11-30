precision mediump float;

uniform vec3 uLightPosition;
uniform vec3 position4;

uniform vec4 uMaterialColor;
uniform float BumpDensity;     // = 16.0

uniform float BumpSize;        // = 0.15
uniform float SpecularFactor;  // = 0.5

void main()
{
vec3 direction3 = uLightPosition - position4.xyz;
  vec3 reflected3 = reflect(-direction3, normalize(normal3));
  vec3 camera3 = -position4.xyz;
  float specular = max(0.0, dot(normalize(reflected3), normalize(camera3)));
  gl_FragColor = (ambient + specular) * uMaterialColor;


    vec3 uLightDir = uLightPosition - position4.xyz;
    vec3 litColor;
    vec2 c = BumpDensity * position4.xy;
    vec2 p = fract(c) - vec2(0.5);

    float d, f;
    d = p.x * p.x + p.y * p.y;
    f = 1.0 / sqrt(d + 1.0);

    if (d >= BumpSize){
        p = vec2(0.0);
        f = 1.0;
    }

    vec3 normDelta = vec3(p.x, p.y, 1.0) * f;

gl_FragColor = vec4(normDelta, 0.50) * uMaterialColor;
    litColor = uMaterialColor.xyz * max(dot(normDelta, uLightDir), 0.0);
    vec3 reflectDir = reflect(uLightDir, normDelta);
    float spec = max(dot(position4.xyz, reflectDir), 0.0);
    spec = pow(spec, 6.0);
    spec *= SpecularFactor;
    litColor = min(litColor + spec, vec3(1.0));

    //gl_FragColor = vec4(litColor, 1.0);
}