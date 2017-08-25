var express = require('express'),
    stylus = require('stylus'), // stylus related
    logger = require('morgan')
    bodyParser = require ('body-parser'); 

var env =  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {     // stylus related
    return stylus(str).set('filename',path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');
app.use (logger('dev'));

//app.use(bodyparser());    older version  
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(stylus.middleware({  // stylus related

    src: __dirname + '/public',
    compile: compile

}));

app.use(express.static (__dirname + '/public'));

app.get('*', function(req, res) {
    res.render('index');
});

var port=3000;
app.listen(port);
console.log('Listening on port ' + port + '....');