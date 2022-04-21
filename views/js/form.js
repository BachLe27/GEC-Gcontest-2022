function validateFileType(input) {
   
   let filename = input.value;
   if (filename.toLowerCase().match(/\.(doc|docx|pdf|png|jpg|jpeg)$/i)) {
      document.getElementById('invalidFile').style.display = 'none';
      // console.log('valid');
   } else {
      document.getElementById('invalidFile').style.display = 'block';
      // console.log('invalid');
      input.value = '';
   }
}