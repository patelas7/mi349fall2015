var script = 'login.php';

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

       sendPost(script, data).done(function(data) {
         if(data.login == false)
             alert(data.error);
         else{
             sessionStorage.setItem('username', user);
             document.location.href = 'userPage.html';
         }
       })
       .fail(function(xhr, textStatus, errorThrown){
           alert(xhr.responseText);
       });

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
    else if(user.length > 14 )
      alert("Username is too big");
    else if (pass != repass){
      alert("Passwords do not match!");
    }
    else{

      var data = {'username':user,'password':pass, 'method':'create'};

      sendPost(script, data).done(function(data) {
          if(data.create == false)
              alert(data.error);
          else{
            sessionStorage.setItem("username", user);
            document.location.href = 'userPage.html';
          }
      })
      .fail(function(xhr, textStatus, errorThrown){
          alert(xhr.responseText);
      });
    }
 });

 $("#burgerIcon").click(function(){
   showMenu();
 });

});
