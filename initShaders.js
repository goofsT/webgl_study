 //初始化着色器
export function createShader(gl, type, source) {
    let shader = gl.createShader(type)
    gl.shaderSource(shader, source)

    gl.compileShader(shader)
    //判断编译时出错
    let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (compiled) {
        return shader
    } else {
        let error = gl.getShaderInfoLog(shader)//获取编译时错误
        console.log('compile shader error! ' + error);
        gl.deleteShader(shader)
        return null
    }
}
//创建着色器程序
export function createProgram(gl, FShader, Vshader) {
    let program = gl.createProgram()//创建
    if (!program) return null

    //为Program添加着色器
    gl.attachShader(program, FShader)
    gl.attachShader(program, Vshader)


    gl.linkProgram(program)
    let linked = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (linked) {
        return program
    } else {
        let error = gl.getProgramInfoLog(program)//获取编译时错误
        console.log('link program error! ' + error);
        gl.deleteProgram(program)
        gl.deleteShader(FShader)
        gl.deleteShader(VShader)
        return null
    }
    return program
}

//初始化着色器程序
export  function initShader(gl, vertexSource, fragmentSource) {
    //创建着色器
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)

    //创建着色器程序
    let program = createProgram(gl, fragmentShader, vertexShader)
    if(program){
        gl.useProgram(program)
        gl.program=program  //方便后续使用
        return true
    }
    console.log("Failed to create program");
    return false
}
