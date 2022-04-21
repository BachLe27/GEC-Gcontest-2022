
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const upload = require('../helpers/filehelper');

// @route   GET /
// @desc    Form
// @access  Public
router.get('/', (req, res) => {
   res.sendFile('form.html', {root: path.join(__dirname, '../views/form')});
   app.set('form', {currentForm: 1});
}) 

router.get('/:formID', (req, res) => {
   
   let formID = parseInt(req.params.formID);

   if (formID == 1) {
      app.set('form', {currentForm: 1, field: [], input: []});
   }
   
   let form = app.get('form');
   // console.log(form);

   // User skip 
   if (form == undefined) res.redirect('/form');

   res.sendFile(`form${req.params.formID}.html`, {root: path.join(__dirname, '../views/form')});
})


router.post('/1', upload.single('CV1'), (req, res) => {
   let form = app.get('form');
   let file = req.file;

   for (let x in req.body) {
      if (form.field.includes(x)) {
         form.input[form.field.indexOf(x)] = req.body[x];
      } else {
         form.field.push(x);
         form.input.push(req.body[x]);
      }
   }
   // console.log(file);
   form.field.push('CV1');
   form.input.push(file.path);
   
   app.set('form', form);

   res.redirect('/form/2');
})

router.post('/2', (req, res) => {
   console.log(req.body);
   let form = app.get('form');

   if (form == undefined) res.redirect('/form');

   for (let x in req.body) {
      if (form.field.includes(x)) {
         form.input[form.field.indexOf(x)] = req.body[x];
      } else {
         form.field.push(x);
         form.input.push(req.body[x]);
      }
   }

   app.set('form', form);

   if (form.input[form.input.length - 1] == 'Chưa') {
      const sendForm = new Form({
         field: form.field,
         input: form.input
      }) 
      sendForm.save();
      res.sendFile('success.html', {root: path.join(__dirname, '../views/form')});
   } else {
      res.redirect(`/form/3`);
   }
})

router.post('/3', 
   upload.fields([
      {
         name: 'CV2', maxCount: 1
      }, 
      {
         name: 'CV3', maxCount: 1
      }
   ]), (req, res) => { 
      const files = req.files;
      // console.log(files['CV2']);
      // res.send('oke');
   let firstCVIndex = 8;
   let secondCVIndex = 15;

   let form = app.get('form'), cnt = 1;
   if (form == undefined) res.redirect('/form');

   let file = req.file;

   for (let x in req.body) {
      cnt++;
      if (form.field.includes(x)) {
         form.input[form.field.indexOf(x)] = req.body[x];
      } else {
         form.field.push(x);
         form.input.push(req.body[x]);
      }

      let link = "https://gecftu.com/manager/cv/uploads/";
      if (cnt == firstCVIndex) {
         form.field.push('CV2');
         form.input.push(files['CV2'][0].path);
      }

      if (cnt == secondCVIndex) {
         form.field.push('CV3');
         form.input.push(files['CV3'][0].path);
      }
   }

   const sendForm = new Form({
      field: form.field,
      input: form.input
   }) 

   sendForm.save();
   res.sendFile('success.html', {root: path.join(__dirname, '../views/form')});
})

// router.post('/:formID',  (req, res) => {
   
//    let nextForm = (parseInt(req.params.formID) + 1);

//    const formID = parseInt(req.params.formID);

//    let form = app.get('form');


//    switch(formID) {
//       case 1: 
//          for (let x in req.body) {
//             if (form.field.includes(x)) {
//                form.input[form.field.indexOf(x)] = req.body[x];
//             } else {
//                form.field.push(x);
//                form.input.push(req.body[x]);
//             }
//          }
         
//          form.currentForm = nextForm;

//          app.set('form', form);

//          res.redirect(`/form/${nextForm}`);
//          break;

//       case 2:
//          for (let x in req.body) {

//             if (form.field.includes(x)) {
//                form.input[form.field.indexOf(x)] = req.body[x];
//             } else {
//                form.field.push(x);
//                form.input.push(req.body[x]);
//             }

//          }

//          form.currentForm = nextForm;
//          app.set('form', form);

//          if (form.input[form.input.length - 1] == 'Chưa') {
//             const sendForm = new Form({
//                field: form.field,
//                input: form.input
//             }) 
//             sendForm.save();
//             res.sendFile('success.html', {root: path.join(__dirname, '../views/form')});
//          }

//          else {
//             res.redirect(`/form/${nextForm}`);
//          }

//          break;
//       case 3: 
         
//          for (let x in req.body) {

//             if (form.field.includes(x)) {
//                form.input[form.field.indexOf(x)] = req.body[x];
//             } else {
//                form.field.push(x);
//                form.input.push(req.body[x]);
//             }

//          }

//          app.set('form', form);

//          // console.log(form);
         
//          const sendForm = new Form({
//             field: form.field,
//             input: form.input
//          }) 

//          sendForm.save();
         
//          res.sendFile('success.html', {root: path.join(__dirname, '../views/form')});
//          break;
//       default:
//          res.sendFile('form.html', {root: path.join(__dirname, '../views/form')});
//          break;
//    }
   
// })


module.exports = router;


