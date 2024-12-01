
const { Router} = require('express');
const router = Router();
//const express = require('express');
//const router = express.Router();

const Image = require('../models/Image');

//Agregado 

//obtener todos los pacientes
//router.get('/obtenerimages', (req, res) =>{
//  ModeloImages.find({}, function(docs, err){
//   if (!err) {
//       res.send(docs)
//   }else{
//       res.send(err)
//   }
//})
//})

//router.get('/',  (req,res) => {
//  res.send('index page');
//});


router.get('/', async (req,res) => {
  const images = await Image.find();
  console.log(images);  
  res.render('index', { images });
      
}); 


router.get('/instrumentos', async (req,res) => {
const images = await Image.find();
return res.json(images);
});

router.get('/upload', (req,res) => {
  res.render('upload');
});

router.post('/upload', async (req,res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.price = req.body.price;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

   await image.save();

   res.redirect('/api/image/');
});

router.get('/:id', (req,res) => {
  res.send('Profile image');
});

router.get('/:id/delete', (req,res) => {
  res.send('Image deleted');
});

/*
router.get('/image', async (req,res) => {
  const images = await Image.find();
  res.render('index', { images });
});

router.get('/upload', (req,res) => {
  res.render('upload');
});

router.post('/upload', async (req,res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

     await image.save();

     res.redirect('/');
});

router.get('/image/:id', (req,res) => {
  res.send('Profile image');
});

router.get('/image/:id/delete', (req,res) => {
   res.send('Image deleted');
});
*/

module.exports = router;
