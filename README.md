adwords-auth
============

Module to obtaing access and refresh tokens to use with Google AdWords API.


###Usage
First get module via npm

    $ npm install adwords-auth

Use the module in your code

``` javascript
var auth = require('adwords-auth');
auth(clientId, clientSecret, redirectUri, function(err, tokens) {
    if (err) throw err;
    console.log(tokens);
});
```

###License

MIT
