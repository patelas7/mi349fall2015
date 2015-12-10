function backHome(){
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
