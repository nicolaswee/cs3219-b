const {override} = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
    'default-src': "'none'",
    'base-uri': "'self'",
    'object-src': "'none'",
    'script-src': ["'unsafe-inline'", "'self'"],
    'script-src-elem': ["'unsafe-inline'", "'self'"],
    'script-src-attr': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'", "'self'", "fonts.googleapis.com"],
    'style-src-elem': ["'self'", "'unsafe-inline'", "'self'", "fonts.googleapis.com"],
    'style-src-attr': ["'self'", "'unsafe-inline'", "'self'", "fonts.googleapis.com"],
    'img-src': [ "instaclone-images.s3-ap-southeast-1.amazonaws.com", "'self'", "data:"],
    'font-src': ["'self'", "fonts.gstatic.com"],
    'connect-src': ["'self'", "api.simp.social" ,"ecs-alb-578013642.ap-southeast-1.elb.amazonaws.com"],
    'media-src': ["'self'", "data:"],
    'object-src': ["'self'"],
    'prefetch-src': ["'self'"],
    'child-src': ["'self'"],
    'frame-src': ["'self'"],
    'worker-src': ["'self'"],
    'form-action': ["'self'"],
    'base-uri': ["'self'"],
    'manifest-src': ["'self'", "manifest.json"]
};

function addCspHtmlWebpackPlugin(config) {
    config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));

    return config;
}

module.exports = {
    webpack: override(addCspHtmlWebpackPlugin),
};