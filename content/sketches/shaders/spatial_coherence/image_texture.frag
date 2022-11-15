precision mediump float;

// source (image or video) is sent by the sketch
uniform sampler2D texture;
varying vec2 texcoords2;

void main() {
    gl_FragColor = texture2D(texture, texcoords2);
}