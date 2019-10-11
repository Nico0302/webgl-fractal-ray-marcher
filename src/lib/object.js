import { getId, makeColor } from './utils';

class FracObject {
    constructor() {
        this.trans = [];
        this.name = 'obj' + getId();
        this.color = `col_${this.name}(p)`;
        this.glsl = `de_${this.name}(p)`;
    }

    add(fold) {
        this.trans.push(fold);
    }

    forwardDecl() {
        return `float de_${this.name}(vec4 p);\nvec4 col_${this.name}(vec4 p);`;
    }

    compiled(nestedRefs) {
        let newRefs = [];
        let s = `float de_${this.name}(vec4 p) {
\tvec4 o = p;
\tfloat d = 1e20;\n`;
        this.trans.forEach(t => {
            if ('color' in t) {
                // type of geometry
                s += `\td = min(d, ${t.glsl});\n`;
                if ('forwardDecl' in t && !(t.name in nestedRefs)) {
                    // type of frac object
                    nestedRefs[t.name] = t;
                    newRefs.push(t);
                }
            } else if (!('orbit' in t)) {
                // type of fold
                s += t.glsl;
            }
        });
        s += `\treturn d;
}
vec4 col_${this.name}(vec4 p) {
\tvec4 o = p;
\tvec4 col = vec4(1e20);
\tvec4 newCol;
`;
        this.trans.forEach(t => {
            // TODO: Migrate Geo and Folds to ES6 functions
            if ('color' in t) {
                // type of geometry
                s += `\tnewCol = ${'forwardDecl' in t ? t.color : makeColor(t)};\n`
                s += `\tif (newCol.w < col.w) { col = newCol; }\n`;
            } else if ('orbit' in t) {
                // type of color
                s += t.orbit;
            } else {
                // type of fold
                s += t.glsl;
            }
        });
        s += `\treturn col;\n}\n`;
        newRefs.forEach(obj =>
            s += obj.compiled(nestedRefs)
        );
        return s;
    }
}

export default FracObject;