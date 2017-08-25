var express = require('express'),
    stylus = require('stylus'), // stylus related
    logger = require('morgan')
    bodyParser = require ('body-parser'),
    mongoose = require('mongoose'); 

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



mongoose.connect('mongodb://localhost/projectk');
var db =  mongoose.connection;
db.on('error', console.error.bind(console,'connection error...'));
db.once('open', function callback(){
    console.log('projectk db opened');
})
var messageSchema =  mongoose.Schema({message: String});
var Message =  mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err,messageDoc){
    mongoMessage = messageDoc.message;
})


app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
})


app.get('*', function(req, res) {
    res.render('index',{
        mongoMessage: mongoMessage
    });
});

var port=3000;
app.listen(port);
console.log('Listening on port ' + port + '....');
