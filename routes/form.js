
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


   console.log(form);
   if (form == undefined) res.redirect('/form');

   if (formID == 2) {

      if (form == undefined) res.redirect('/form/1');

      if (form == undefined || form.input.length != 11) { 
         res.redirect('/form/1');
      }
   }

   if (formID == 3) {

      if (form == undefined) res.redirect('/form/1');

      if (form == undefined || form.input.length != 12) { 
         res.redirect('/form/1');
      }
   }

   // console.log(form);

   // User skip 
   
   
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
   if (file != undefined) {
      form.field.push('CV1');
      form.input.push(file.path);
   } else {
      form.field.push('CV1');
      form.input.push('-');
   }

   app.set('form', form);

   res.redirect('/form/2');
})

router.post('/2', (req, res) => {
   // console.log(req.body);
   let form = app.get('form');

   if (form == undefined) res.redirect('/form');

   if (form.input.length != 11) { 
      res.redirect('/form/1');
   }

   for (let x in req.body) {
      if (form.field.includes(x)) {
         form.input[form.field.indexOf(x)] = req.body[x];
      } else {
         form.field.push(x);
         form.input.push(req.body[x]);
      }
   }

   app.set('form', form);

   if (form.input[form.input.length - 1] == 'Chưa có team') {
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
   let firstCVIndex = 12;
   let secondCVIndex = 22;

   let form = app.get('form'), cnt = 1;

   if (form == undefined) res.redirect('/form');

   if (form.input.length != 12) { 
      res.redirect('/form/1');
   }

   for (let x in req.body) {
      cnt++;
      if (form.field.includes(x)) {
         form.input[form.field.indexOf(x)] = req.body[x];
      } else {
         form.field.push(x);
         form.input.push(req.body[x]);
      }

      if (cnt == firstCVIndex) {
         form.field.push('CV2');
         if (files['CV2'] != undefined) {
            form.input.push(files['CV2'][0].path); 
         } else {
            form.input.push('-');
         }
      }

      if (cnt == secondCVIndex) {
         form.field.push('CV3');
         if (files['CV3'] != undefined) {
            form.input.push(files['CV3'][0].path); 
         } else {
            form.input.push('-');
         }
      }
   }

   if (form.input.length != 34) {
      res.redirect('/form/1');
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


