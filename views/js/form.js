function validateFileType(input) {
   
   let filename = input.value;
   if (filename.toLowerCase().match(/\.(pdf)$/i)) {
      document.getElementById('invalidFile').style.display = 'none';
      // console.log('valid');
   } else {
      document.getElementById('invalidFile').style.display = 'block';
      // console.log('invalid');
      input.value = '';
   }
}

$('.datepicker').datepicker({
   format: 'dd/mm/yyyy'
});