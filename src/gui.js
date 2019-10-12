import dat from 'dat.gui';
import * as examples from './examples';
import cameraParams from './lib/camera';
import { dotMultiply, dotDivide, abs } from 'mathjs';

class GUI {
    constructor() {
        this.onUpdateScene = () => {};
        this.gui = new dat.GUI();

        this.sceneProps = {
            example: 'menger',
            camera: this._getDefaultCameraProps()
        };

        this.gui.add(this.sceneProps, 'example', Object.keys(examples)).onFinishChange(this.updateScene.bind(this));
        const camera = this.gui.addFolder('camera');
        
        camera.add(this, 'updateScene');
        camera.add(this.sceneProps.camera, 'antialiasingSamples', 1, 8).step(1);
        camera.add(this.sceneProps.camera, 'ambientOcclusionStrength', 0, 0.05);
        camera.addColor(this.sceneProps.camera, 'backgroundColor', 1, 8);

        const depthOfField = camera.addFolder('depthOfField');
        depthOfField.add(this.sceneProps.camera, 'depthOfFieldStrength', 0, 20);
        depthOfField.add(this.sceneProps.camera, 'depthOfFieldDistance', 0, 100);

        const diffuse = camera.addFolder('diffuse');
        diffuse.add(this.sceneProps.camera, 'diffuseEnabled');
        diffuse.add(this.sceneProps.camera, 'diffuseEnhancedEnabled');

        camera.add(this.sceneProps.camera, 'exposure', 0.1, 10);
        camera.add(this.sceneProps.camera, 'fieldOfView', 20, 120);
        camera.add(this.sceneProps.camera, 'fogEnabled');

        const glow = camera.addFolder('glow');
        glow.add(this.sceneProps.camera, 'glowEnabled');
        glow.addColor(this.sceneProps.camera.glowColorDelta, 'color');
        glow.add(this.sceneProps.camera.glowColorDelta, 'invertR');
        glow.add(this.sceneProps.camera.glowColorDelta, 'invertG');
        glow.add(this.sceneProps.camera.glowColorDelta, 'invertB');
        glow.add(this.sceneProps.camera, 'glowSharpness', 1, 100);

        const light = camera.addFolder('light');
        light.addColor(this.sceneProps.camera, 'lightColor');
        const lightDirection = light.addFolder('lightDirection');
        lightDirection.add(this.sceneProps.camera.lightDirection, 'x', -1, 1);
        lightDirection.add(this.sceneProps.camera.lightDirection, 'y', -1, 1);
        lightDirection.add(this.sceneProps.camera.lightDirection, 'z', -1, 1);

        camera.add(this.sceneProps.camera, 'lodMultiplier', 0, 100);
        camera.add(this.sceneProps.camera, 'maxMarches', 10, 10000).step(1);
        camera.add(this.sceneProps.camera, 'maxDist', 0.5, 200);
        camera.add(this.sceneProps.camera, 'minDist', 0.000001, 0.01);

        const motionBlur = camera.addFolder('motionBlur');
        motionBlur.add(this.sceneProps.camera, 'motionBlurLevel', 0, 10).step(1);
        motionBlur.add(this.sceneProps.camera, 'motionBlurRatio', 0, 1);

        camera.add(this.sceneProps.camera, 'ods');

        const orthogonal = camera.addFolder('orthogonal');
        orthogonal.add(this.sceneProps.camera, 'orthogonalProjection');
        orthogonal.add(this.sceneProps.camera, 'orthogonalZoom', 0.5, 50);

        const reflection = camera.addFolder('reflection');
        reflection.add(this.sceneProps.camera, 'reflectionLevel', 0, 8).step(1);
        reflection.add(this.sceneProps.camera, 'reflectionAttenuation', 0.25, 1);

        const shadows = camera.addFolder('shadows');
        shadows.add(this.sceneProps.camera, 'shadowsEnabled');
        shadows.add(this.sceneProps.camera, 'shadowDarkness', 0, 1);
        shadows.add(this.sceneProps.camera, 'shadowSharpness', 1, 100);

        camera.add(this.sceneProps.camera, 'specularHighlight', 0, 1000).step(1);

        const sun = camera.addFolder('sun');
        sun.add(this.sceneProps.camera, 'sunEnabled');
        sun.add(this.sceneProps.camera, 'sunSize', 0.0001, 0.05);
        sun.add(this.sceneProps.camera, 'sunSharpness', 0.1, 10);

        const vignette = camera.addFolder('vignette');
        vignette.add(this.sceneProps.camera, 'vignetteForeground');
        vignette.add(this.sceneProps.camera, 'vignetteStrength', 0, 1.5);
    }

    _getDefaultCameraProps() {
        let cameraProps = {};

        for (let [key, value] of Object.entries(cameraParams)) {
            switch (key) {
                case 'backgroundColor':
                case 'lightColor':
                    cameraProps[key] = dotMultiply(value.default, 255);
                    break;
                case 'glowColorDelta':
                    cameraProps[key] = {
                        color: dotMultiply(abs(value.default), 255),
                        invertR: value.default[0] < 0,
                        invertG: value.default[1] < 0,
                        invertB: value.default[2] < 0
                    };
                    break;
                case 'lightDirection':
                    cameraProps[key] = {
                        x: value.default[0],
                        y: value.default[1],
                        z: value.default[2]
                    };
                    break;
                default:
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
                lightColor: dotDivide(camera.lightColor, 255),
                glowColorDelta: dotDivide(
                    dotMultiply(camera.glowColorDelta.color, [
                        camera.glowColorDelta.invertR ? -1 : 1,
                        camera.glowColorDelta.invertG ? -1 : 1,
                        camera.glowColorDelta.invertB ? -1 : 1
                    ]), 255),
                lightDirection: Object.values(camera.lightDirection)
            }
        });
    }
}

export default GUI;