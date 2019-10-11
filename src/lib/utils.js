import * as math from 'mathjs';

export const normalize = x => x / math.norm(x);

export const normSq = v => math.dot(v, v);

export const norm = v => math.norm(v);

export const getId = () => 
    Math.random().toString(36).substr(2, 9);

export const toVec3 = v => [v, v, v];

export const toString = x => {
    if (typeof x === 'boolean') {
        return x ? '1' : '0';
    } else if (Array.isArray(x)) {
        return vec3String(x);
    } else {
        return x.toString();
    }
};

export const floatString = x => 
    typeof x === 'string' ?
        '_' + x :
        (x % 1 === 0) ? x + '.0' : x.toString();

export const vec3String = v => {
    if (typeof v === 'string') {
        return '_' + v;
    } else if (typeof v === 'number') {
        return `vec3(${floatString(v)})`;
    } else if (Array.isArray(v)) {
        return `vec3(${floatString(v[0])},${floatString(v[1])},${floatString(v[2])})`;
    }
};

export const vec3Eq = (v, val) => {
    if (typeof v === 'string') {
        return false;
    }
    for (let i=0; i < 3; i++) {
        if (v[i] !== val[i])
            return false;
    }
    return true;
};

/**
 * Subtract a number from a vector.
 * 
 * @param {Number[]} v 
 * @param {Number} x 
 */
export const vsub = (v, w) =>
    math.subtract(v.slice(0, 3), w);

export const clamp = (v, min, max) => 
    v.map(x => Math.min(Math.max(x, min), max))

export const smin = (a, b, k) => {
    const h = Math.min(Math.max(0.5 + 0.5*(b - a)/k, 0.0), 1.0);
    return b*(1 - h) + a*h - k*h*(1.0 - h);
};

export const getGlobal = k => {
    if (typeof k === 'string')
        return _GLOBAL_VARS[k];
    else if (Array.isArray(k)) {
        return k.map(i => getGlobal(i));
    } else {
        return k;
    }
};

export const setGlobalVal = (k, v) =>
    _GLOBAL_VARS[k] = v;

export const setGlobalFloat = k => {
    if (typeof k === 'string')
        _GLOBAL_VARS[k] = 0;
    return k;
};

export const setGlobalVec3 = k => {
    if (typeof k === 'string') {
        _GLOBAL_VARS[k] = toVec3(0);
        return k;
    } else if (typeof k === 'number') {
        return toVec3(k);
    } else if (Array.isArray(k)) {
        k.forEach(key => {
            if (typeof key === 'string')
                _GLOBAL_VARS[key] = 0.0;
        });
        return k;
    }
};

export const condOffset = p =>
    (typeof p === 'string' || p > 0) ?
        ` - vec4(${vec3String(p)}, 0)` :
        '';

export const condSubtract = p =>
    (typeof p === 'string' || p > 0) ?
        ` - ${floatString(p)}` :
        '';

export const makeColor = geo => {
    if (Array.isArray(geo.color)) {
        return `vec4(${vec3String(geo.color)}, ${geo.glsl})`;
    } else if (geo.color === 'orbit' || geo.color === 0) {
        return `vec4(orbit, ${geo.glsl})`;
    } else {
        throw new Error('Invalid coloring type');
    }
};

export var _GLOBAL_VARS = {};