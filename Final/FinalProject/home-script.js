var script = '';

$(document).ready(function(){

   $("#signInButton").click(function(){
     $(".containerOverlay").css({"display":"block"});
     $(".signInForm").fadeIn();
     $(".signInForm").css({"visibility":"visible","display":"block"});
   });

   $("#closeButton").click(function(){
     $(".signInForm").fadeOut();
     $(".signInForm").css({"visibility":"hidden","display":"none"});
     $(".containerOverlay").css({"display":"none"});
   });

   $("#loginButton").click(function(){
     var user = $('#user').val();
     var pass = $('#password').val();

     if(user == '' || pass == ''){
       alert("Fill in both username and password");
     }
     else{

       var data = {'username':user,'password':pass, 'method':'login'};
       script = 'login.php';

       sendPost(script, data).done(function(data) {
           alert(data);
       })
       .fail(function(xhr, textStatus, errorThrown){
           alert(xhr.responseText);
       });
      /*  $.ajax({
          url: 'http://webdev.cse.msu.edu/~patelas7/MI349/FinalPhp/login.php',
          type: 'POST',
          contentType:'application/json',
          data: JSON.stringify(data),
          dataType:'json',
          success: function(data){
            //On ajax success do this
              console.log();
             },
          error: function(xhr, ajaxOptions, thrownError) {
             //On error do this

               if (xhr.status == 200) {

                   alert(ajaxOptions);
               }
               else {
                   alert(xhr.status);
                   alert(thrownError);
               }
           }
        });*/
     }
  });

  $("#createButton").click(function(){
    $(".containerOverlay").css({"display":"block"});
    $(".createForm").fadeIn();
    $(".createForm").css({"visibility":"visible","display":"block"});
  });

  $("#closeCreate").click(function(){
    $(".createForm").fadeOut();
    $(".createForm").css({"visibility":"hidden","display":"none"});
    $(".containerOverlay").css({"display":"none"});
  });

  $('#signUpButton').click(function(){
    var user = $('#userCreate').val();
    var pass = $('#passwordCreate').val();
    var repass = $('#passwordReCreate').val();
    if(user == '' || pass == '' || repass == ''){
      alert("Fill in all fields of the form");
    }
    else if (pass != repass){
      alert("Passwords do not match!");
    }
    else{

      var data = {'username':user,'password':pass, 'method':'create'};

       $.ajax({
         url: 'http://webdev.cse.msu.edu/~patelas7/MI349/FinalPhp/login.php',
         type: 'POST',
         contentType:'application/json',
         data: JSON.stringify(data),
         dataType:'json',
         success: function(data){
           //On ajax success do this
             console.log(data);
            },
         error: function(xhr, ajaxOptions, thrownError) {
            //On error do this

              if (xhr.status == 200) {

                  alert(ajaxOptions);
              }
              else {
                  alert(xhr.status);
                  alert(thrownError);
              }
          }
       });
    }
 });

 $("#burgerIcon").click(function(){
   if($('.sideMenu').is(':visible')){
     $(".sideMenu").css({"visibility":"hidden","display":"none"});
   }
   else{
      $(".sideMenu").css({"visibility":"visible","display":"block"});
   }
 });

});


function sendPost(script, data) {
    var url = 'http://webdev.cse.msu.edu/~patelas7/MI349/FinalPhp/' + script;
    return $.ajax({
        url:  url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json'
    });

}
