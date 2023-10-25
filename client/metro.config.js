const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
    /** @type {import('expo/metro-config').MetroConfig} */
    const config = getDefaultConfig(__dirname, {
        // Enable CSS support.
        isCSSEnabled: true,
    });

    config.transformer.getTransformOptions =  async () => ({
        transform: {
            experimentalImportSupport: false,
            inlineRequires: false,
        },
    });

    config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json', 'mjs', 'style.js'];
    config.resolver.assetExts = ['glb', 'gltf', 'fbx', 'mlt', 'obj', 'png', 'jpg', 'html']

    return config;
});