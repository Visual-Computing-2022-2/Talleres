precision mediump float;
uniform vec2 iMouse;
uniform vec2 iResolution;
varying vec2 texcoords2;
uniform sampler2D texture;

void main()
{   
    //Convert to UV coordinates, accounting for aspect ratio
    vec2 uv = texcoords2.xy;
    
    //at the beginning of the sketch, center the magnifying glass.
    //Thanks to FabriceNeyret2 for the suggestion
    vec2 mouse = iMouse.xy;
    if (mouse == vec2(0.0))
        mouse = iResolution.xy / 2.0;
    
    //UV coordinates of mouse
    vec2 mouse_uv = mouse / iResolution;
    
    //Distance to mouse
    float mouse_dist = distance(uv, mouse_uv);
    
    //Draw the texture
	vec4 fragColor = texture2D(texture, texcoords2);
    
    //Draw the outline of the glass
    if (mouse_dist < 0.1)
        fragColor = vec4(0.1, 0.1, 0.1, 1.0);
    
    //Draw a zoomed-in version of the texture
    if (mouse_dist < 0.3)
        fragColor = texture2D(texture, (texcoords2.xy + mouse_uv)/2.0);
    gl_FragColor = fragColor;
}