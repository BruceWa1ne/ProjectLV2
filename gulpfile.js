var {series, src, dest, watch} = require("gulp");

var minifyCss = require("gulp-cssmin");
var minifyHtml = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
var clean = require("gulp-clean");

function doCss() {
    return src("./origin/css/**/*.css")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(dest("./publish/css"));
}

function doJS() {
    return src(["./origin/js/**/*.js"])
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(uglify())
    .pipe(dest("./publish/js"));
}


function doHTML() {
    return src("./origin/**/*.html")
    .pipe(minifyHtml({
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        minifyCSS:true,
        minifyJS:true
    }))
    .pipe(dest("./publish/"))
}

function doFont(){
    return src("./origin/fonts/**/*.*")
    .pipe(dest("./publish/fonts/"))
}

function doResource() {
    return src("./origin/resource/**/*.*")
    .pipe(dest("./publish/resource/"))
}


function doClean() {
    return src("./publish/", {read: false, allowEmpty: true})
    .pipe(clean())
}

function webServer() {
        // 定位资源 
        return src("./origin")
        .pipe(webserver({
            host: "localhost",
            port: 3001,
            livereload: true,
            open: "./index.html",
            proxies: [
                {
                 source:"/php/",
                 target:"http://10.3.147.119/php/"
                }
            ]
        }))
}
function refresh() {
    return watch("./origin", series(doClean, [doCss, doHTML, doJS, doResource,doFont]))
}

module.exports.webserver = webserver;
module.exports.doResource = doResource;
module.exports.a = series(doClean, [doCss, doHTML, doJS, doResource], webServer);
module.exports.aa = series(webServer, refresh);