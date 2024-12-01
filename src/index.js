const express = require('express');
//agregado
const rutaimage = require('./routes/index');

const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require ('uuid/v4');
//
const app = express();
require('./database');
//
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views')); 
app.set('view engine', 'ejs');                   

//agregado
//imp body parser
//const bodyParser = require('body-parser')
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: 'true'}))


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//app.use(multer({ dest: path.join(__dirname, 'public/img/uploads')}).single('image'));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) =>{
        cb(null, uuid() + path.extname(file.originalname));
    }
});
app.use(multer({ storage: storage }).single('image'));


//routes
//app.use(require('./routes/index'));
//agreg
app.use('/api/image', rutaimage);

//
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`); //${app.get('port')}`)
});
