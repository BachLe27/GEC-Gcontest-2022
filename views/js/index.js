$(".bi-list").click(function(){ 
   $(".bi-list").addClass("d-none");
   $(".bi-x-lg").removeClass("d-none");
});


$(".bi-x-lg").click(function(){ 
   $(".bi-x-lg").addClass("d-none");
   $(".bi-list").removeClass("d-none");
});

