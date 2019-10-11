import FracObject from './lib/object';
import { 
    OrbitInitInf,
    OrbitInitZero,
    OrbitMinAbs,
    OrbitMax,
    OrbitSum
} from './lib/coloring';
import { 
    FoldAbs,
    FoldRotateY,
    FoldRotateX,
    FoldRepeatXYZ,
    FoldScaleTranslate,
    FoldScaleOrigin,
    FoldMenger,
    FoldSierpinski,
    FoldPlane,
    FoldSphere,
    FoldBox
} from './lib/fold';
import { 
    Box,
    Sphere,
    Tetrahedron
} from './lib/geo';

export const sierpinskiTetrahedron = () => {
    const obj = new FracObject();
	for (let i=0; i < 9; i++) {
		obj.add(FoldSierpinski());
		obj.add(FoldScaleTranslate(2, -1));
    }
    obj.add(Tetrahedron(1, [0,0,0], [0.8,0.8,0.5]));
    return obj;
};

export const menger = () => {
    const obj = new FracObject();
	for (let i=0; i < 20; i++) {
		obj.add(FoldAbs());
        obj.add(FoldMenger());
        obj.add(FoldScaleTranslate(3, [-2,-2,0]));
		obj.add(FoldPlane([0,0,-1], -1));
    }
    obj.add(Box(4,8, [0.8,0.2,0.2]));
    return obj;
};

export const infiniteSpheres = () => {
    const obj = new FracObject();
    obj.add(FoldRepeatXYZ(5));
    obj.add(Sphere());
    return obj;
};

export const butterweedHills = () => {
    const obj = new FracObject();
    obj.add(OrbitInitZero());
	for (let i=0; i < 30; i++) {
		obj.add(FoldAbs());
		obj.add(FoldScaleTranslate(1.5, [-1,-0.5,-0.2]));
        obj.add(OrbitSum([0.5, 0.03, 0]))
        obj.add(FoldRotateX(3.61));
		obj.add(FoldRotateY(2.03));
    }
    obj.add(Sphere(1, [0,0,0], 'orbit'));
    return obj;
};

export const mandelbox = () => {
    const obj = new FracObject();
    obj.add(OrbitInitInf());
	for (let i=0; i < 9; i++) {
		obj.add(FoldBox(1));
		obj.add(FoldSphere(0.5, 1));
        obj.add(FoldScaleOrigin(2));
        obj.add(OrbitMinAbs(1));
    }
    obj.add(Box(6, [0,0,0], 'orbit'));
    return obj;
};

export const snowStadium = () => {
    const obj = new FracObject();
    obj.add(OrbitInitInf());
	for (let i=0; i < 30; i++) {
		obj.add(FoldRotateY(3.33));
		obj.add(FoldSierpinski());
		obj.add(FoldRotateX(0.15));
		obj.add(FoldMenger());
		obj.add(FoldScaleTranslate(1.57, [-6.61, -4, -2.42]));
		obj.add(OrbitMinAbs(1));
    }
    obj.add(Box(4.8, [0,0,0], 'orbit'));
    return obj;
};

export const mausoleum = () => {
    const obj = new FracObject();
    obj.add(OrbitInitZero());
	for (let i=0; i < 9; i++) {
		obj.add(FoldBox(0.34));
		obj.add(FoldMenger());
        obj.add(FoldScaleTranslate(3.28, [-5.27,-0.34,0]));
        obj.add(FoldRotateX(Math.PI/2));
        obj.add(OrbitMax([0.42,0.38,0.19]));
    }
    obj.add(Box(2, [0,0,0], 'orbit'));
    return obj;
};

export const treePlanet = () => {
    const obj = new FracObject();
    obj.add(OrbitInitInf());
	for (let i=0; i < 29; i++) {
		obj.add(FoldRotateY(0.44));
		obj.add(FoldAbs());
        obj.add(FoldMenger());
        obj.add(OrbitMinAbs([0.24,2.28,7.6]));
		obj.add(FoldScaleTranslate(1.3, [-2,-4.8,0]));
        obj.add(FoldPlane([0,0,-1], 0));
    }
    obj.add(Box(4.8, [0,0,0], 'orbit'));
    return obj;
};