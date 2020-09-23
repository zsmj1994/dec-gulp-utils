const { src, dest } = require("gulp");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const vars = require("postcss-simple-vars");



function compileLess2Css(glob, destination, options = {}) {
    const UrlVariables = options.vars || {};

    return () => src(glob).pipe(less()).pipe(postcss([
        vars({ variables: () => UrlVariables })]
    )).pipe(dest(destination));
}

module.exports = {
    compileLess2Css
};
