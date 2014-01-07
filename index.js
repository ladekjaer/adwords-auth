var url = require('url');
var http = require('http');
var https = require('https');
var open = require('open');

var options = {
    hostname: 'accounts.google.com',
    port: 443,
    path: '/o/oauth2/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

var authRequestUrl = 'https://accounts.google.com/o/oauth2/auth';
    authRequestUrl += '?scope=' + encodeURIComponent('https://adwords.google.com/api/adwords');
    authRequestUrl += '&response_type=code';
    authRequestUrl += '&access_type=offline';
    authRequestUrl += '&approval_prompt=force';

module.exports = function(clientId, clientSecret, redirectUri, callback) {
    authRequestUrl += '&client_id=' + clientId;
    authRequestUrl += '&redirect_uri=' + encodeURIComponent(redirectUri);

    var httpServer = http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('You can now close this browser.');
        if (req.url.indexOf('code=') != -1) {
            authorizationCode = url.parse(req.url, true).query.code;
            getTokens(clientId, clientSecret, redirectUri, authorizationCode, function(err, tokens) {
                httpServer.close();
                for (var i = 0; i < sockets.length; i++) {
                    sockets[i].destroy();
                }
                callback(err, JSON.parse(tokens));
            });
        }
    });
    httpServer.listen(3000, 'localhost');

    var sockets = [];
    httpServer.on('connection', function(socket) {
        sockets.push(socket);
    });

    open(authRequestUrl);
}

function getTokens(clientId, clientSecret, redirectUri, authorizationCode, callback) {
            var request = https.request(options, function(response) {
                response.setEncoding('utf8');
                response.on('data', function(chunk) {
                    callback(null, chunk);
                    return;
                });
            });
            request.on('error', function(err) {
                callback(err, null);
                return;
            });
            request.write('code=' + authorizationCode);
            request.write('&client_id=' + clientId);
            request.write('&client_secret=' + clientSecret);
            request.write('&redirect_uri=' + redirectUri);
            request.write('&grant_type=authorization_code');
            request.end();
}
