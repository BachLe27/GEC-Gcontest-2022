
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

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

   if (formID != form.currentForm) {
      res.redirect(`/form/${form.currentForm}`);
   }

   res.sendFile(`form${req.params.formID}.html`, {root: path.join(__dirname, '../views/form')});
})

router.post('/:formID', (req, res) => {
   
   let nextForm = (parseInt(req.params.formID) + 1);

   const formID = parseInt(req.params.formID);

   let form = app.get('form');


   switch(formID) {
      case 1: 
         for (let x in req.body) {
            form.field.push(x);
            form.input.push(req.body[x]);
         }
         
         form.currentForm = nextForm;

         app.set('form', form);

         res.redirect(`/form/${nextForm}`);
         break;

      case 2:
         for (let x in req.body) {
            form.field.push(x);
            form.input.push(req.body[x]);
         }

         form.currentForm = nextForm;
         app.set('form', form);

         if (form.input[form.input.length - 1] == 'Chưa') {
            const sendForm = new Form({
               field: form.field,
               input: form.input
            }) 
            sendForm.save();
            res.sendFile('success.html', {root: path.join(__dirname, '../views/form')});
         }

         else {
            res.redirect(`/form/${nextForm}`);
         }

         
         break;
      case 3: 
         
         for (let x in req.body) {
            form.field.push(x);
            form.input.push(req.body[x]);
         }

         app.set('form', form);

         if (form == undefined) {
            res.redirect('/form');
         }

         
         // console.log(form);
         
         const sendForm = new Form({
            field: form.field,
            input: form.input
         }) 

         sendForm.save();
         
         res.sendFile('success.html', {root: path.join(__dirname, '../views/form')});
         break;
      default:
         res.sendFile('form.html', {root: path.join(__dirname, '../views/form')});
         break;
   }
   
   
})


module.exports = router;


