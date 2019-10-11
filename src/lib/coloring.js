
import { vec3Eq, vec3String } from './utils';

export const OrbitInitZero = () => ({
    orbit: '\tvec3 orbit = vec3(0.0);\n'
});

export const OrbitInitInf = () => ({
    orbit: '\tvec3 orbit = vec3(1e20);\n'
});

export const OrbitInitNegInf = () => ({
    orbit: '\tvec3 orbit = vec3(-1e20);\n'
});

export const OrbitMin = (scale=[1,1,1], origin=[0,0,0]) => ({
    orbit: vec3Eq(orbit, [0,0,0]) ?
        `\torbit = min(orbit, p.xyz*${vec3String(scale)});\n` :
        `\torbit = min(orbit, (p.xyz - ${vec3String(origin)})*${vec3String(scale)});\n`
});

export const OrbitMinAbs = (scale=[1,1,1], origin=[0,0,0]) => ({
    orbit: `\torbit = min(orbit, abs((p.xyz - ${vec3String(origin)})*${vec3String(scale)}));\n`
});

export const OrbitMax = (scale=[1,1,1], origin=[0,0,0]) => ({
    orbit: `\torbit = max(orbit, (p.xyz - ${vec3String(origin)})*${vec3String(scale)});\n`
});

export const OrbitMaxAbs = (scale=[1,1,1], origin=[0,0,0]) => ({
    orbit: `\torbit = max(orbit, abs((p.xyz - ${vec3String(origin)})*${vec3String(scale)}));\n`
});

export const OrbitSum = (scale=[1,1,1], origin=[0,0,0]) => ({
    orbit: `\torbit += (p.xyz - ${vec3String(origin)})*${vec3String(scale)};\n`
});

export const OrbitSumAbs = (scale=[1,1,1], origin=[0,0,0]) => ({
    orbit: `\torbit += abs((p.xyz - ${vec3String(origin)})*${vec3String(scale)});\n`
});