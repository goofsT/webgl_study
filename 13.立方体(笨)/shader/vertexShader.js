let vertexShader= /*glsl*/`
        attribute vec3 a_position;
        attribute vec3 a_color;
        uniform mat4 u_rotateMatrix;
        varying vec3 v_color;
        void main(){
            v_color=a_color;
            gl_Position=u_rotateMatrix*vec4(a_position,1.0);
        }
        `
export default vertexShader

/*
    区分大小写 分号结尾

    数据类型：
        简单：
                数字：int float  1!=1.0
                类型转换: float r=float(1)  float r=float(true)   int i=int(1.0)
                布尔: true(1)   false(0)
        复杂：
                向量(Vector):vec2 vec3 vec4
                    vec4 color=vec4(1.0,0.0,0.0,1.0)
                    color.x  color.y color.z color.w  
                    color.s  color.t color.q color.p
                    color.r  color.g color.b color.a
                矩阵(Matrix):mat2 mat3 mat4
                    //平移矩阵，x轴平移0.5
                    mat4 translateMatrix=mat4(
                        1.0,0.0,0.0,0.0,
                        0.0,1.0,0.0,0.0,
                        0.0,0.0,1.0,0.0,
                        0.5,0.0,0.0,1.0
                    )
                    translateMatrix[0][1] 获取第一行第二个
    
    变量:
        变量名：a-z A-Z 0-9 _ 非保留 非gl_开头    
        变量声明：数据类型 + 变量名=值
                  vec2 r=vec2(1.0,2.0);

    计算：
        前后类型一直
    循环:
            for(let i=0;i<10;i++){

            }
    函数：
            有返回值
            int sum(int x,int y){
                retunr x;
            }
            无返回值
            void test(int x){

            }  
          

*/