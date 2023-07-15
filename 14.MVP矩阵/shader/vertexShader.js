let vertexShader= /*glsl*/`
        attribute vec3 a_position;
        attribute vec3 a_color;
        uniform mat4 u_rotateMatrix;//旋转矩阵
        uniform mat4 u_translateMatrix;//平移矩阵
        uniform mat4 u_scaleMatrix;//缩放矩阵
        uniform mat4 u_viewMatrix;//视图矩阵
        uniform mat4 u_orthoMatrix;//正交投影
        uniform mat4 u_perspectiveMatrix;//透视矩阵
        varying vec3 v_color;
        void main(){
            v_color=a_color;
            //模型矩阵 从右往左依次改变
            mat4 modelMatrix=u_scaleMatrix*u_rotateMatrix*u_translateMatrix;
           //p  v   m
            gl_Position=u_perspectiveMatrix*u_viewMatrix*modelMatrix*vec4(a_position,1.0);
        }
        `
export default vertexShader