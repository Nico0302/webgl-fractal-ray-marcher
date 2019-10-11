import { m4, getContext, isWebGL2 } from 'twgl.js';
import createFps from 'fps-indicator';
import GUI from './gui';
import Shader from './lib/shader';

var state = {
    gl: null,
    program: null,
    canvas: null,
    ui: {
        dragging: false,
        mouse: {
            lastX: -1,
            lastY: -1,
        },
        pressedKeys: {},
    },
    animation: {},
    app: {
        angle: {
            x: 0,
            y: 45,
        },
        eye: {
            roll: 0
        },
        distance: 25
    },
};

function onload() {
    const canvas = document.createElement('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // init webgl rendering context
    const gl = getContext(canvas, {
        alpha: false,
        antialias: false,
        powerPreference: 'high-performance',
        depth: true
    });

    if (!isWebGL2(gl)) {
        window.alert('Dein Browser unterstützt kein WebGL2!');
        return null;
    }

    state.gl = gl;
    state.canvas = canvas;

    createFps();
    const gui = new GUI();
    bindInput();

    gui.onUpdateScene = options => {
        state.program = initProgram(gl, options);
    }
    gui.updateScene();

    function animationCallback(timestamp) {
        updateState();
        // draw this frame
        draw(gl);

        // request the next frame of animation
        window.requestAnimationFrame(animationCallback);
    };

    window.requestAnimationFrame(animationCallback);
}

function bindInput() {
    state.canvas.addEventListener('mousemove', mousemove, false);
    state.canvas.addEventListener('mousedown', mousedown, false);
    state.canvas.addEventListener('mouseup', mouseup, false);
    state.canvas.addEventListener('wheel', mousewheel, false);
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
}

function updateState() {
    const speed = 0.05;
    if (state.ui.pressedKeys[37]) {
        // left
        state.app.eye.roll += speed;
    } else if (state.ui.pressedKeys[39]) {
        // right
        state.app.eye.roll -= speed;
    }
}

function keydown(event) {
    state.ui.pressedKeys[event.keyCode] = true;
}

function keyup(event) {
    state.ui.pressedKeys[event.keyCode] = false;
}

function mousewheel(event) {
    if (state.app.distance - Math.sign(event.deltaY) >= 0) {
        state.app.distance -= Math.sign(event.deltaY);
    }
}

function mousedown(event) {
    const x = event.clientX;
    const y = event.clientY;
    const rect = event.target.getBoundingClientRect();
    // If we're within the rectangle, mouse is down within canvas.
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
        state.ui.mouse.lastX = x;
        state.ui.mouse.lastY = y;
        state.ui.dragging = true;
    }
}

function mouseup(event) {
    state.ui.dragging = false;
}

function mousemove(event) {
    const x = event.clientX;
    const y = event.clientY;
    if (state.ui.dragging) {
        // The rotation speed factor
        // dx and dy here are how for in the x or y direction the mouse moved
        const factor = 500 / state.canvas.height;
        const dx = factor * (x - state.ui.mouse.lastX);
        const dy = factor * (y - state.ui.mouse.lastY);

        // update the latest angle
        if (state.app.angle.x + dy <= 180
            && state.app.angle.x + dy >= -180) {
            state.app.angle.x += dy;
            state.app.angle.y -= dx;
        }
    }
    // update the last mouse position
    state.ui.mouse.lastX = x;
    state.ui.mouse.lastY = y;
}

function initProgram(gl, options) {
    const shader = new Shader(gl, options.example);
    const program = shader.compile(options.camera);
    console.log('Compiled!');

    const positionAttributeLocation = gl.getAttribLocation(program, 'vPosition');
    // create and bind position buffer for fullscreen vertex
    const positionBuffer = gl.createBuffer();
    const fullscreenQuad = [-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, 1.0, 0.0];
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fullscreenQuad), gl.STATIC_DRAW);

    const vao = gl.createVertexArray();

    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.bindVertexArray(vao);
    const ipdUniformLocation = gl.getUniformLocation(program, "iIPD");
    gl.uniform1f(ipdUniformLocation, 0.04);

    return program;
}

function draw(gl) {
    const matUniformLocation = gl.getUniformLocation(state.program, 'iMat');
    // const prevMatUniformLocation = gl.getUniformLocation(state.program, 'iPrevMat');
    const resUniformLocation = gl.getUniformLocation(state.program, 'iResolution');

    state.canvas.width = window.innerWidth;
    state.canvas.height = window.innerHeight;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.uniform2fv(resUniformLocation, [state.canvas.width, state.canvas.height]);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const { angle, distance } = state.app;

    const x = Math.sin(angle.y * Math.PI / 360)
        * Math.cos(state.app.angle.x * Math.PI / 360);
    const y = Math.sin(angle.x * Math.PI / 360);
    const z = Math.cos(angle.y * Math.PI / 360)
        * Math.cos(angle.x * Math.PI / 360);

    let mvp = distance <= 0 ?
        m4.lookAt([0,0,0], [-x,-y,-z], [0,1,0]) :
        m4.lookAt([x*distance,y*distance,z*distance], [0,0,0], [0,1,0]);

    m4.axisRotate(mvp, [0,0,1], state.app.eye.roll, mvp);
    gl.uniformMatrix4fv(matUniformLocation, false, mvp);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

onload();