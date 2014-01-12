({
    baseUrl: "./js",
    paths: {
        jquery: 'lib/jquery-1.10.2.min',
        md5 : 'lib/md5-min',
        Game : 'app/Game'
    },
    "include": [
        "require"
    ],
    "exclude": [],
    "optimize": "uglify2",
    name: "app",
    out: "main-built.js",
    insertRequire : ["app"]
})