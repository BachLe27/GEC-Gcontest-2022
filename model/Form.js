const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({

   field: [mongoose.Schema.Types.Mixed],
   input: [mongoose.Schema.Types.Mixed]


   // name: {
   //    type: String,
   // },

   // DOB: {
   //    type: Date,
   // },

   // gender: {
   //    type: String,
   // },

   // phone: {
   //    type: String,
   // },

   // email: {
   //    type: String,
   // },

   // university: {
   //    type: String,
   // },

   // session: {
   //    type: String,
   // },

   // team: {
   //    type: Boolean,
   // }

});

module.exports = Form = mongoose.model('form', FormSchema);