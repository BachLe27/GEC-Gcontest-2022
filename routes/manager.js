const express = require('express');
const router = express.Router();
const path = require('path');
const bcrpyt = require('bcrypt');
const moment = require('moment');
const XLSX = require('xlsx');
const {check, validationResult} = require('express-validator');
const User = require('../model/User');
const Form = require('../model/Form');

// @route   GET /login
// @desc    Login page
// @access  Public
router.get('/', (req, res) => {
   res.sendFile('login.html', {root: path.join(__dirname, '../views')});
}) 


// @route   POST /login
// @desc    Login with password and user
// @access  Public
router.post('/',[
   check('username', 'Username is required.').not().isEmpty(),
   check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
   }

   const {username, password} = req.body;

   try {
      let user = await User.findOne({username});

      if(!user) {
         res.status(400).json({errors: [{msg: 'User does not exist!'}]});
         return;
      }

      const isMatch = await bcrpyt.compare(password, user.password);

      if (!isMatch) {
         return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})
      }

      else {
        
         if (user.isAdmin == true) {
            let formList = [];
            Form.find({}, (err, forms) => {
               forms.forEach(form => {
                  formList.push(form);
               });
               // console.log(formList);
               res.render('forms', {
                  formList: formList
               });
            });
         }
         else {
            res.sendFile('contest.html');
         }
      }
      // res.send('Login...');
   } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
   }
})

router.post('/export', (req, res) => {
   
   let formList = []
   Form.find({}, (err, forms) => {
      
      formList.push(forms[0].field);

      forms.forEach(form => {
         formList.push(form.input);
      })
      
      let wb = XLSX.utils.book_new();

      let ws = XLSX.utils.aoa_to_sheet(formList);
      let down = __dirname+"/Vòng1.xlsx";
      
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, down);
      res.download(down);
   })
})

module.exports = router;