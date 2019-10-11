import getVertexSource from './vert.glsl';
import getFragmentSource from './frag.glsl';
import cameraParams from './camera';
import { floatString, toString, toVec3, setGlobalVal, _GLOBAL_VARS } from './utils';

class Shader {
    constructor(renderingContext, obj) {
        this.gl = renderingContext;
        this.obj = obj;
        this.keys = {};
    }

    set(key, val) {
        if (key in _GLOBAL_VARS) {
            const curVal = _GLOBAL_VARS[key];
            if (typeof val === 'number' && typeof curVal === 'number')
                val = toVec3(val);
            setGlobalVal(key, val);
            if (this.keys.includes(key)) {
                const keyUniformLocation = this.keys[key];
                if (typeof val === 'number') {
                    this.gl.uniform1f(keyUniformLocation, val);
                } else {
                    this.gl.uniform3fv(keyUniformLocation, Float32Array(val));
                }
            }
        } 
    }

    get(key) {
        return _GLOBAL_VARS[key];
    }

    compile(cameraOptions={}) {
        let defineCode = '';
        Object.keys(cameraParams).map(key => {
            const param = cameraParams[key];
            const rawValue = cameraOptions[key] !== undefined ? cameraOptions[key] :  param.default; 
            const value = typeof rawValue === 'number' && !param.int ?
                floatString(rawValue) :
                toString(rawValue);
            defineCode += `#define ${param.name} ${value}\n`;
        });
        defineCode += `#define DE de_${this.obj.name}\n`;
        defineCode += `#define COL col_${this.obj.name}`;

        let nestedRefs = {};
        let spaceCode = this.obj.compiled(nestedRefs);

        let forwardDeclCode = '';
        Object.keys(nestedRefs).map(key =>
            forwardDeclCode += nestedRefs[key].forwardDecl()
        );
        spaceCode = forwardDeclCode + spaceCode;

        let varCode = '';
        Object.keys(_GLOBAL_VARS).map(key => {
            const type = typeof _GLOBAL_VARS[key] === 'number' ? 'float' : 'vec3';
            varCode += `uniform ${type} _${key};\n`;
        });

        const vertexSource = getVertexSource();
        const fragmentSource = getFragmentSource({ defineCode, varCode, spaceCode });

        const program = this.compileProgram(vertexSource, fragmentSource);

        Object.keys(_GLOBAL_VARS).forEach(key =>
            this.keys = this.gl.getUniformLocation(program, '_' + key)    
        );

        return program;
    }

    compileShader(shaderSource, shaderType) {
        const shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.log(shaderSource);
            throw new Error(this.gl.getShaderInfoLog(shader));
        }
    
        return shader;
    }

    compileProgram(vertexSource, fragmentSource) {
        let vertexShader = null;
        let fragmentShader = null;
        const program = this.gl.createProgram();

        if (vertexSource) {
            console.log('Compiling Vertex Shader...');
            vertexShader = this.compileShader(vertexSource, this.gl.VERTEX_SHADER);
            this.gl.attachShader(program, vertexShader);
        }
        if (fragmentSource) {
            console.log('Compiling Fragment Shader...');
            fragmentShader = this.compileShader(fragmentSource, this.gl.FRAGMENT_SHADER);
            this.gl.attachShader(program, fragmentShader);
        }

        this.gl.bindAttribLocation(program, 0, 'vPosition');
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS))
            throw new Error(this.gl.getProgramInfoLog(program));

        if (vertexShader) {
            this.gl.detachShader(program, vertexShader);
            this.gl.deleteShader(vertexShader);
        }
        if (fragmentShader) {
            this.gl.detachShader(program, fragmentShader);
            this.gl.deleteShader(fragmentShader);
        }

        return program;
    }
}

export default Shader;