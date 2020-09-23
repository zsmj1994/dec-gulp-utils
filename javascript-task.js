const { src, dest } = require("gulp");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const header = require("gulp-header");
const rename = require("gulp-rename");
const moment = require("moment");

function cleanJavascript(glob) {
    return () => src(glob, { read: false }).pipe(clean());
}

function concatJavascript(glob, destination, options = {}) {
    return () => {
        return src(glob, options).pipe(concat(destination)).pipe(dest(options.baseDir, options));
    };
}

function minifyJavascript(glob, destination, options = {}) {

    return () => src(glob, options).pipe(concat(destination)).pipe(rename({ suffix: ".min" })).pipe(uglify({ ie8: true })).pipe(header("/** <%= name %> <%= time %> */\n", {
        name: options.name,
        time: moment().format("YY-MM-DD HH:mm:ss"),
    })).pipe(dest(options.baseDir));
}

module.exports = {
    cleanJavascript,
    concatJavascript,
    minifyJavascript,
};
