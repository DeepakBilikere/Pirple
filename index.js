var http = require('http')
var url = require('url')

/**
 * Create a server
 */
var server = http.createServer((req, res) => {
    // Getting the path from request object

    var pathReceived = url.parse(req.url).path
    var trimmedPath = pathReceived.replace(/^\/|\/$/g, '')

    // creating a handler
    var handler = {
        'hello': (callback) => {
            callback({'msg' : 'Hello everyone'})
        },
        'notFound': (callback) => {
            callback({'msg' : 'Route not found'})
        }
    }

    // Creating a route
    var router = {
        'hello': handler.hello
    }

    var methodToBeCalled = trimmedPath == 'hello' ? router.hello : handler.notFound
    methodToBeCalled((msg) => {
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify(msg))
    })
})

server.listen(3000, () => {
    console.log('Server listening on port 3000')
})