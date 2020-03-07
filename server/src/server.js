const path = require('path')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const socketIo = require('socket.io')(server);
const locationsRouter = require('./routes/locations')

const {streamLocations} = require('./controllers/locations')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Access-Token');
    next();
});

socketIo
    .of('/')
    .on('connection', streamLocations)

app
    .use(express.json())
    .use('/api/v1/locations', locationsRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))
    .get('*', (req, res) => res.sendFile(path
    .resolve(__dirname, '..', 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5001
server.listen(PORT,
    () => console.log(`Example app listening on port ${PORT}!`)
)