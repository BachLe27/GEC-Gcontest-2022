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

$(document).ready(function() {
   $('#dtVerticalScrollExample').DataTable({
     "scrollY": "200px",
     "scrollCollapse": true,
   });
   $('.dataTables_length').addClass('bs-select');
 });