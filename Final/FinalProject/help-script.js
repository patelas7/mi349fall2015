$(document).ready(function(){
  $(".container").css({"background-color":"#ffffe5"});
  $("#homeIcon").click(function(){
    if(sessionStorage.username != null){
      var data = {'method':'logout', 'username' : sessionStorage.username};
      sendPost('login.php', data).done(function(data) {
          if(data.logout == false)
              alert(data.error);
          else{
            document.location.href = 'home.html';
          }
      })
      .fail(function(xhr, textStatus, errorThrown){
          alert(xhr.responseText);
      });
    }
    document.location.href = 'home.html';
  });
});
