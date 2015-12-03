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

       $.post('http://webdev.cse.msu.edu/~patelas7/MI349/FinalPhp/login.php',{username: user, password: password, method: "login"}, function(data){
         alert(data);
       }).fail(function(e){
         console.log(e.message);
       });
       return false;

     }

  });

});
