adwords-auth
============

Module to obtaing access and refresh tokens to use with Google AdWords API.


###Usage
First get module via npm

    $ npm install adwords-auth

Get both the refresh and the access token (redirectUri could be e.g. http://localhost:3000):
``` javascript
var auth = require('adwords-auth');
auth.getTokens(clientId, clientSecret, redirectUri, function(err, tokens) {
    if (err) throw err;
    console.log(tokens);
});
```
Get a new access token
``` javascript
var auth = require('adwords-auth');
auth.refresh(clientId, clientSecret, refreshToken, function(err, token) {
    if (err) throw err;
    console.log(token);
});
```


###License

MIT
