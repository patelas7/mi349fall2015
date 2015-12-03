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
     var password = $('#password').val();

     if(user == '' || password == ''){
       alert("Fill in both username and password");
     }
     else{
       var postData = {
         'username' : user,
         'password' : password;
         'method' : 'login'
       };
       $.post('http://webdev.cse.msu.edu/~patelas7/MI349/FinalPhp/login.php', postData, )
       $.ajax({
         type: "POST",
         url: "postForm.ajax.php",
         data: $("#myForm").serialize(),
         dataType: "json",

         success: function(msg){
           $("#formResponse").removeClass('error');
           $("#formResponse").removeClass('success');
           $("#formResponse").addClass(msg.status);
           $("#formResponse").html(msg.message);

         },
         error: function(e){
           console.log(e.message);
         }
       });
       //make sure the form doesn't post
       return false;*/
     }

  });

});
