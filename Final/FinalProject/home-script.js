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
            data = {'method': 'retrieve', 'username': user};
            sendPost('game.php', data).done(function(res){
              if(res.hasGame == false){
                sessionStorage.setItem("savedGame", false);
              }
              else{
                sessionStorage.setItem("json", res);
              }
              document.location.href = 'userPage.html';
            }).final(function(xhr, textStatus, errorThrown){
              alert(xhr.responseText);
            });

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

function showMenu(){
  if($('.sideMenu').is(':visible')){
    $(".sideMenu").css({"visibility":"hidden","display":"none"});
  }
  else{
     $(".sideMenu").css({"visibility":"visible","display":"block"});
  }
}

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
