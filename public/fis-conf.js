fis.set('project.ignore', [
    'source/**',
    'assets/stylus/**',
    'assets/js/libs/zepto.min.js',
    'release/**',
    'fis-conf.js',
    '.DS_Store'
]);

fis.match('::package', {
    postpackager: fis.plugin('loader')
});


fis.match('assets/js/libs/*.js', {
    packTo: 'assets/js/libs/base.js',
    release: ''
});

fis.match('*.js', {
    optimizer: fis.plugin('uglify-js', {
        mangle: {
            except: 'exports, module, require, define'
        }
    })
});

fis.match('assets/js/libs/zepto.min.js', {
    packOrder: -100
});
fis.match('assets/js/libs/jquery.min.js', {
    packOrder: -100
});

fis.match('assets/js/libs/jweixin-1.0.0.js', {
    packOrder: -90
});

fis.media('qa').match('**', {
    deploy: [
        fis.plugin('skip-packed'),
        fis.plugin('local-deliver', {
            to: '../release/test'
        })
    ]
});

function getVersion(){
    var _now = new Date();
    return + checkTime(_now.getDate()) + checkTime(_now.getHours()) + checkTime(_now.getMinutes()) + checkTime(_now.getSeconds());

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    }
}

fis.media('pro').match('**', {
    deploy: [
        fis.plugin('skip-packed'),
        fis.plugin('local-deliver', {
            to: '../release/' + getVersion()
        })
    ]
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor', {
        type: 'pngquant',
        quality: '30-50'
    })
});

fis.match('*.css', {
    isCssLike: false
})
