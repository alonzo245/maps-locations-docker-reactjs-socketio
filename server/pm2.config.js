module.exports = [
    {
        script: 'src/server.js',
        name: 'server_api',
        exec_mode: 'cluster',
        instances: 1
    }
]