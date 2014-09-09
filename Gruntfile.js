module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.',
                    index: 'index.html',
                }
            }
        },

        jshint:{
            options:{
                // позволяет обявлять переменные только camelcase нотацией
                camelcase:true,
                // запрещает использовать неопределенные переменные
                undef:true,
                //  режим разработки (позволяет использовать console, alert)
                devel:true,
                // не позволяет использовать условные и операторы ветвления без фигурных скобок
                curly:true,
                // не позволяет использовать == или !=. Только === или !==. Хард мод :D
                eqeqeq: true,
                // не позволяет объявлять переменные, но не использовать
                unused:true,
                // устанавливает максимальную длину строки
                maxlen: 80
            },
            '<% pkg.name %>':{
                src:[ 'src/js/*.js' ]
            }
        },
        // конкатенация js файлов
        concat: {
            dist: {
                src: ['src/js/file1.js', 'src/js/file2.js'],
                dest: 'dest/build.js'
            },
        },
        // минификация js файлов
        uglify: {
            options: {
                stripBanners:true,
                banner: "/** Project - instagram. Developer - dron */\n"
            },
            build: {
                src: 'dest/build.js',
                dest: 'dest/build.min.js'
            }
        },
        // минификация css файлов
        cssmin:{
            with_banner:{
                options:{
                    banner:'/* Instagram styles */'
                },
                files:{
                    'dest/style.min.css':['src/css/style1.css', 'src/css/style2.css']
                }
            }
        },
        // просмотр за изменениями
        watch:{
            scripts:{
                files:['src/js/*.js'],
                tasks:['jshint', 'concat', 'uglify']
            },
            css:{
                files:['src/css/*.css'],
                tasks:['concat', 'cssmin']      
            }
        }
    });

    // подгружаем необходимые плагины
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');


    // формируем задачу по-умолчанию
    grunt.registerTask('default', ['connect', 'jshint', 'concat', 'uglify', 'cssmin', 'watch']);
};