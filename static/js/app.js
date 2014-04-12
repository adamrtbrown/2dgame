require.config({
    paths: {
        jquery: 'lib/jquery-1.10.2.min',
        md5 : 'lib/md5-min',
        Game : 'app/Game',
        Editor : 'app/Editor'
    }
});

requirejs(["app/main"]);

