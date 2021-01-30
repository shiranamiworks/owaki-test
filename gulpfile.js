const gulp = require("gulp");
const sass = require("gulp-sass");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const browser = require("browser-sync");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const mozjpeg = require("imagemin-mozjpeg");
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('connect', function() {
  return connect.server({
    root: './html/',
    port: 3000,
    livereload: true
  });
});
gulp.task('imagemin', function (done) {
  gulp.src('src/static/images/**/*.{jpg,jpeg,png,gif,svg}')
  .pipe(imagemin(
    [
      pngquant({ quality: [.65,.80], speed: 1 }),
      mozjpeg({ quality: 80 }),
      imagemin.svgo(),
      imagemin.gifsicle()
    ]
  ))
    .pipe(gulp.dest('html/static/images/'));
  done();
  
//    .pipe(browser.reload({stream:true}));
});
gulp.task('sass', function (done) {
    gulp.src("src/scss/*.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest("./html/static/css"))
    .pipe(connect.reload({stream:true}));
  done();
//    .pipe(browser.reload({stream:true}));
});
gulp.task('ejs', function (done) {
   gulp.src(
       ["src/**/*.ejs",'!' + "src/**/_*.ejs"] //参照するディレクトリ、出力を除外するファイル
    )
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({extname: ".html"})) //拡張子をhtmlに
    .pipe(gulp.dest("html/"))//出力先
    .pipe(connect.reload({stream:true}));
  done();
//    .pipe(browser.reload({stream:true}));
});
/*gulp.task("server", function() {
    return browser({
        server: {
            baseDir: "html/"
        }
    });
});*/

gulp.task("watch", function() {  
  gulp.watch('src/**/*.ejs',gulp.series('ejs'),function(done){
    console.log("modified-ejs");
    done();
  });
  gulp.watch('src/scss/**/*.scss',gulp.series('sass'),function(done){
    console.log("modified-scss");
    done();
  });
  gulp.watch('src/static/images/**/*.{jpg,jpeg,png,gif,svg}',gulp.series('imagemin'),function(done){
    console.log("modified-img");
    done();
  });
});

gulp.task('default', gulp.parallel( 'sass', 'ejs','imagemin',"connect",'watch' ), function(){
});
