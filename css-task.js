const { src, dest } = require("gulp");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const minify = require("gulp-minify-css");
const header = require("gulp-header");
const moment = require("moment");
const rename = require("gulp-rename");

function cleanCss(glob) {
    return () => src(glob, { read: false }).pipe(clean());
}

function concatCss(glob, destination, options = {}) {
    return () => src(glob).pipe(concat(destination)).pipe(dest(options.baseDir));
}

function minifyCss(glob, destination, options = {}) {
    return () => src(glob).pipe(concat(destination)).pipe(rename({ suffix: ".min" })).pipe(minify()).pipe(header("/* <%= name %> <%= time %> */\n", {
        name: options.name,
        time: moment().format("YY-MM-DD HH:mm:ss"),
    })).pipe(dest(options.baseDir));
}

module.exports = {
    concatCss,
    minifyCss,
    cleanCss,
};
