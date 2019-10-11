import * as math from 'mathjs';
import {
    getGlobal,
    setGlobalVec3,
    setGlobalFloat,
    vec3Eq,
    floatString,
    vec3String
} from './utils';

export const FoldPlane = (n=[1,0,0], d=0) => {
    let glsl = '';

    if (vec3Eq(n, [1,0,0])) {
        glsl = `\tp.x = abs(p.x - ${floatString(d)}) + ${floatString(d)};\n`;
    } else if (vec3Eq(n, [0,1,0])) {
        glsl = `\tp.y = abs(p.y - ${floatString(d)}) + ${floatString(d)};\n`;
    } else if (vec3Eq(n, [0,0,1])) {
        glsl = `\tp.z = abs(p.z - ${floatString(d)}) + ${floatString(d)};\n`;
    } else if (vec3Eq(n, [-1,0,0])) {
        glsl = `\tp.x = -abs(p.x + ${floatString(d)}) - ${floatString(d)};\n`;
    } else if (vec3Eq(n, [0,-1,0])) {
        glsl = `\tp.y = -abs(p.y + ${floatString(d)}) - ${floatString(d)};\n`;
    } else if (vec3Eq(n, [0,0,-1])) {
        glsl = `\tp.z = -abs(p.z + ${floatString(d)}) - ${floatString(d)};\n`;
    } else {
        glsl = `\tplaneFold(p, ${vec3String(n)}, ${floatString(d)});\n`;
    }

    return { glsl };
};

export const FoldAbs = (c=[0,0,0]) => ({
    glsl: vec3Eq(c, [0,0,0]) ?
        '\tp.xyz = abs(p.xyz);\n' :
        `\tabsFold(p, ${vec3String(c)});\n`
});

export const FoldSierpinski = () => ({
    glsl: '\tsierpinskiFold(p);\n'
});

export const FoldMenger = () => ({
    glsl: '\tmengerFold(p);\n'
});

export const FoldScaleTranslate = (s=1, t=[0,0,0]) => {
    let glsl = '';
    if (s !== 1) {
        if (typeof s === 'number' && s >= 0) {
            glsl += `\tp *= ${floatString(s)};\n`;
        } else {
            glsl += `\tp.xyz *= ${floatString(s)};\n`;
            glsl += `\tp.w *= abs(${floatString(s)});\n`;
        }
    }
    if (!math.deepEqual(t, [0,0,0])) {
        glsl += `\tp.xyz += ${vec3String(t)};\n`;
    }
    return { glsl };
};

export const FoldScaleOrigin = (s=1) => ({
    glsl: s !== 1 ?
        `\tp = p*${floatString(s)};p.w = abs(p.w);p += o;\n` :
        '\tp += o;\n'
});

export const FoldBox = (r=[1,1,1]) => ({
    glsl: `\tboxFold(p,${vec3String(r)});\n`
});

export const FoldSphere = (minR=0.5, maxR=1) => ({
    glsl: `\tsphereFold(p,${floatString(minR)},${floatString(maxR)});\n`
})

export const FoldRotateX = (a) => ({
    glsl: typeof a === 'number' ?
        `\trotX(p, ${floatString(math.sin(a))}, ${floatString(math.cos(a))});\n` :
        `\trotX(p, ${floatString(a)});\n`
});

export const FoldRotateY = (a) => ({
    glsl: typeof a === 'number' ?
        `\trotY(p, ${floatString(Math.sin(a))}, ${floatString(Math.cos(a))});\n` :
        `\trotY(p, ${floatString(a)});\n`
});

export const FoldRotateZ = (a) => ({
    glsl: typeof a === 'number' ?
        `\trotZ(p, ${floatString(math.sin(a))}, ${floatString(math.cos(a))});\n` :
        `\trotZ(p, ${floatString(a)});\n`
});

export const FoldRepeatX = (m) => ({
    glsl: `\tp.x = abs(mod(p.x - ${floatString(m)}/2.0,${floatString(m)}) - ${floatString(m)}/2.0);\n`
});

export const FoldRepeatY = (m) => ({
    glsl: `\tp.y = abs(mod(p.y - ${floatString(m)}/2.0,${floatString(m)}) - ${floatString(m)}/2.0);\n`
});

export const FoldRepeatZ = (m) => ({
    glsl: `\tp.z = abs(mod(p.z - ${floatString(m)}/2.0,${floatString(m)}) - ${floatString(m)}/2.0);\n`
});

export const FoldRepeatXYZ = (m) => ({
    glsl: `\tp.xyz = abs(mod(p.xyz - ${floatString(m)}/2.0,${floatString(m)}) - ${floatString(m)}/2.0);\n`
});