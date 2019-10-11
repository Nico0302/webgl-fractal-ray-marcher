import { condOffset, vec3String, floatString, setGlobalFloat, setGlobalVec3} from './utils';

export const Sphere = (r=1, c=[0,0,0], color=[1,1,1]) => ({
    color,
    glsl:  `de_sphere(p${condOffset(c)}, ${floatString(r)})`
});

export const Box = (s=[1,1,1], c=[0,0,0], color=[1,1,1]) => ({
    color,
    glsl: `de_box(p${condOffset(c)}, ${vec3String(s)})`
});

export const Tetrahedron = (r=1, c=[0,0,0], color=[1,1,1]) => ({
    color,
    glsl: `de_tetrahedron(p${condOffset(c)},${floatString(r)})`
});

export const InfCross = (r=1, c=[0,0,0], color=[1,1,1]) => ({
    color,
    glsl: `de_inf_cross(p${condOffset(c)},${floatString(r)})`
});

export const InfCrossXY = (r=1, c=[0,0,0], color=[1,1,1]) => ({
    color,
    // TODO: migrate t.glsl() to t.glsl
    glsl: `de_inf_cross_xy(p${condOffset( setGlobalVec3(c))}, ${floatString(setGlobalFloat(r))})`
});

export const InfLine = (r=1, n=[1,0,0], c=[0,0,0], color=[1,1,1]) => ({
    color,
    glsl: `de_inf_line(p${condOffset(c)}, ${vec3String(n)}, ${floatString(r)})`
});