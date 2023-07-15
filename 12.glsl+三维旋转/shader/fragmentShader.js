let fragmentShader = /*glsl*/ `
        precision mediump float;
        void main(){
            vec4 color=vec4(0.0,0.0,0.0,1.0);
            gl_FragColor=vec4(1.0,0.0,0.0,1.0);

        }
        `
export default fragmentShader