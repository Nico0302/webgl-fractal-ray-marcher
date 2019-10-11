import dat from 'dat.gui';
import * as examples from './examples';
import cameraParams from './lib/camera';
import { dotMultiply, dotDivide } from 'mathjs';

class GUI {
    constructor() {
        this.onUpdateScene = () => {};
        this.gui = new dat.GUI();

        this.sceneProps = {
            example: 'sierpinskiTetrahedron',
            camera: this._getDefaultCameraProps()
        };

        this.gui.add(this.sceneProps, 'example', Object.keys(examples)).onFinishChange(this.updateScene.bind(this));
        const camera = this.gui.addFolder('camera');
        camera.add(this, 'updateScene');
        camera.add(this.sceneProps.camera, 'antialiasingSamples', 1, 8).step(1);
        camera.add(this.sceneProps.camera, 'ambientOcclusionStrength', 0, 0.05);
        camera.addColor(this.sceneProps.camera, 'backgroundColor', 1, 8);
        camera.add(this.sceneProps.camera, 'depthOfFieldStrength', 0, 20);
        camera.add(this.sceneProps.camera, 'depthOfFieldDistance', 0, 100);
        camera.add(this.sceneProps.camera, 'diffuseEnabled');
        camera.add(this.sceneProps.camera, 'diffuseEnhancedEnabled');
        camera.add(this.sceneProps.camera, 'exposure', 0.1, 10);
        camera.add(this.sceneProps.camera, 'fieldOfView', 20, 120);
        camera.add(this.sceneProps.camera, 'fogEnabled');
        camera.add(this.sceneProps.camera, 'glowEnabled');
        camera.add(this.sceneProps.camera, 'glowSharpness', 1, 100);
        camera.addColor(this.sceneProps.camera, 'lightColor');
        camera.add(this.sceneProps.camera, 'lodMultiplier', 0, 100);
        camera.add(this.sceneProps.camera, 'maxMarches', 10, 10000).step(1);
        camera.add(this.sceneProps.camera, 'maxDist', 0.5, 200);
        camera.add(this.sceneProps.camera, 'minDist', 0.000001, 0.01);
        camera.add(this.sceneProps.camera, 'ods');
        camera.add(this.sceneProps.camera, 'orthogonalProjection');
        camera.add(this.sceneProps.camera, 'orthogonalZoom', 0.5, 50);
        camera.add(this.sceneProps.camera, 'reflectionLevel', 0, 8).step(1);
        camera.add(this.sceneProps.camera, 'reflectionAttenuation', 0.25, 1);
        camera.add(this.sceneProps.camera, 'shadowsEnabled');
        camera.add(this.sceneProps.camera, 'shadowDarkness', 0, 1);
        camera.add(this.sceneProps.camera, 'shadowSharpness', 1, 100);
        camera.add(this.sceneProps.camera, 'specularHighlight', 0, 1000).step(1);
        camera.add(this.sceneProps.camera, 'sunEnabled');
        camera.add(this.sceneProps.camera, 'sunSize', 0.0001, 0.05);
        camera.add(this.sceneProps.camera, 'sunSharpness', 0.1, 10);
        camera.add(this.sceneProps.camera, 'vignetteForeground');
        camera.add(this.sceneProps.camera, 'vignetteStrength', 0, 1.5);
    }

    _getDefaultCameraProps() {
        let cameraProps = {};

        for (let [key, value] of Object.entries(cameraParams)) {
            if (['backgroundColor', 'lightColor'].includes(key)) {
                cameraProps[key] = dotMultiply(value.default, 255);
            } else {
                cameraProps[key] = value.default;
            }
        }

        return cameraProps;
    }

    updateScene() {
        const { example, camera } = this.sceneProps;
        this.onUpdateScene({
            example: examples[example](),
            camera: {
                ...camera,
                backgroundColor: dotDivide(camera.backgroundColor,255),
                lightColor: dotDivide(camera.lightColor, 255)
            }
        });
    }
}

export default GUI;