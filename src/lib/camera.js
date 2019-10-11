const params = {
    antialiasingSamples: {
        name: 'ANTIALIASING_SAMPLES',
        int: true,
        default: 1
    },
    ambientOcclusionStrength: {
        name: 'AMBIENT_OCCLUSION_STRENGTH',
        default: 0.01
    },
    ambientOcclusionColorDelta: {
        name: 'AMBIENT_OCCLUSION_COLOR_DELTA',
        default: [0.8, 0.8, 0.8]
    },
    backgroundColor: {
        name: 'BACKGROUND_COLOR',
        default: [0.6, 0.6, 0.9]
    },
    depthOfFieldStrength: {
        name: 'DEPTH_OF_FIELD_STRENGTH',
        default: 0
    },
    depthOfFieldDistance: {
        name: 'DEPTH_OF_FIELD_DISTANCE',
        default: 5
    },
    diffuseEnabled: {
        name: 'DIFFUSE_ENABLED',
        default: false
    },
    diffuseEnhancedEnabled: {
        name: 'DIFFUSE_ENHANCED_ENABLED',
        default: true
    },
    exposure: {
        name: 'EXPOSURE',
        default: 1
    },
    fieldOfView: {
        name: 'FIELD_OF_VIEW',
        default: 60
    },
    fogEnabled: {
        name: 'FOG_ENABLED',
        default: false
    },
    glowEnabled: {
        name: 'GLOW_ENABLED',
        default: false
    },
    glowColorDelta: {
        name: 'GLOW_COLOR_DELTA',
        default: [-0.2, 0.5, -0.2]
    },
    glowSharpness: {
        name: 'GLOW_SHARPNESS',
        default: 4
    },
    lightColor: {
        name: 'LIGHT_COLOR',
        default: [1, 0.9, 0.6]
    },
    lightDirection: {
        name: 'LIGHT_DIRECTION',
        default: [-0.36, 0.48, 0.80]
    },
    lodMultiplier: {
        name: 'LOD_MULTIPLIER',
        default: 50
    },
    maxMarches: {
        name: 'MAX_MARCHES',
        int: true,
        default: 1000
    },
    maxDist: {
        name: 'MAX_DIST',
        default: 50
    },
    minDist: {
        name: 'MIN_DIST',
        default: 0.00001
    },
    motionBlurLevel: {
        name: 'MOTION_BLUR_LEVEL',
        int: true,
        default: 0
    },
    motionBlurRatio: {
        name: 'MOTION_BLUR_RATIO',
        default: 1
    },
    ods: {
        name: 'ODS',
        default: false
    },
    orthogonalProjection: {
        name: 'ORTHOGONAL_PROJECTION',
        default: false
    },
    orthogonalZoom: {
        name: 'ORTHOGONAL_ZOOM',
        default: 1
    },
    reflectionLevel: {
        name: 'REFLECTION_LEVEL',
        int: true,
        default: 0
    },
    reflectionAttenuation: {
        name: 'REFLECTION_ATTENUATION',
        default: 0.6
    },
    shadowsEnabled: {
        name: 'SHADOWS_ENABLED',
        default: true
    },
    shadowDarkness: {
        name: 'SHADOW_DARKNESS',
        default: 0.8
    },
    shadowSharpness: {
        name: 'SHADOW_SHARPNESS',
        default: 16
    },
    specularHighlight: {
        name: 'SPECULAR_HIGHLIGHT',
        int: true,
        default: 40
    },
    sunEnabled: {
        name: 'SUN_ENABLED',
        default: true
    },
    sunSize: {
        name: 'SUN_SIZE',
        default: 0.005
    },
    sunSharpness: {
        name: 'SUN_SHARPNESS',
        default: 2
    },
    vignetteForeground: {
        name: 'VIGNETTE_FOREGROUND',
        default: false
    },
    vignetteStrength: {
        name: 'VIGNETTE_STRENGTH',
        default: 0.5
    }
};

export default params;