/**
 * 
 * @param {*} gl gl对象
 * @param {*} vsSource  顶点着色器代码
 * @param {*} fsSource  片元着色器代码
 * @returns 
 */
export function initShaders(gl, vsSource, fsSource) {
    const program = gl.createProgram();//创建程序对象
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (vertexShader && fragShader) {
        //添加着色器
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        let linked = gl.getProgramParameter(program, gl.LINK_STATUS)
        if (linked) {
            gl.useProgram(program)
            gl.program = program;
            return true;
        } else {
            //链接时出错
            let error = gl.getProgramInfoLog(program)//获取错误信息
            console.log('link program error! ' + error);
            gl.deleteProgram(program)
            gl.deleteShader(FShader)
            gl.deleteShader(VShader)
            return false
        }
    } else {
        return false
    }

}
/**
 * 
 * @param {*} gl gl对象
 * @param {*} type 着色器类型
 * @param {*} source 着色器代码
 * @returns 
 */
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (compiled) {
        return shader
    } else {
        //编译时出错
        let error = gl.getShaderInfoLog(shader)
        console.log('compile shader error! ' + error);
        gl.deleteShader(shader)
        return null
    }
}

//合成器
export class Compose {
    constructor() {
        this.parent = null;
        this.children = [];
    }
    add(child) {
        child.parent = this;
        this.children.push(child);
    }
    //基于当前时间更新对象状态
    update(t) {
        this.children.forEach(child => {
            child.update(t);
        });
    }
}

//时间轨
export class Track {
    constructor(target) {
        this.target = target;//时间轨目标对象
        this.parent = null;//父对象 只能是合成对象
        this.start = 0;//时间轨建立时间
        this.timeLen = 5;//时间轨总长度
        this.loop = false;//是否循环
        /**
         * keyMap:关键帧集合
         * 结构：
         * [
         *     [
         *         对象属性1，
         *          [
         *              [时间1,值1],//关键帧
]                       [时间2,值2]//关键帧
         *          ]
         *      ],
         *      ...
         *  ]
         */
        this.keyMap = new Map();
    }
    update(t) {
        const { keyMap, timeLen, target, loop, start } = this;
        let time = t - start;
        if (loop) {
            time = time % timeLen;;
        }
        for (const [key, fms] of keyMap.entries()) {
            const last = fms.length - 1;//最后一帧索引
            if (time < fms[0][0]) {
                target[key] = fms[0][1];//第一帧状态
            } else if (time > fms[last][0]) {
                // console.log(key, '最后一帧');
                target[key] = fms[last][1];//最后一帧状态
            } else {
                // console.log(key, '中间帧');
                target[key] = this.getValBetweenFms(time, fms, last);//两个关键帧之间
            }
        }
    }
    //获取两个关键帧之间的值
    /**
     * 思路：
     * 1.遍历所有关键帧
     * 2.判断当前时间在哪两个关键帧之间
     * 3.根据两个关键帧的时间和状态，组合点斜式方程
     * 4.根据点斜式求解状态
     */
    getValBetweenFms(time, fms, last) {
        for (let i = 0; i < last; i++) {
            const fm1 = fms[i];
            const fm2 = fms[i + 1];
            if (time >= fm1[0] && time <= fm2[0]) {
                const delta = {
                    x: fm2[0] - fm1[0],
                    y: fm2[1] - fm1[1]
                }
                //y=kx+b
                const k = delta.y / delta.x;;
                const b = fm1[1] - k * fm1[0];
                return k * time + b;
            }
        }
    }
}
