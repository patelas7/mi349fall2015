var title = '';
$(document).ready(function(){
  getSaved();
  setCSS();
  $("#userNewButton").click(function(){
    var title = $('#userNewTitle').val();
    var hint = $('#userNewHint').val();
    var word = $('#userNewWord').val();
    if( title == "" || hint == "" || word == ""){
      alert("Fill in both title and hint");
    }
    else if(title.length > 25 )
      alert("Title is too big");
    else{
      sessionStorage.setItem("word", word);
      sessionStorage.setItem("hint", hint);
      sessionStorage.setItem("title", title);
      document.location.href = 'game.html';
    }
  });
});

function setCSS(){

  $(".container").css({"background-color":"#68838B"});
  $('#welcome').css({"font-size": "40px", "left" : "20%"});
  $('#welcome').text("Welcome " + sessionStorage.username);
}

function getJSON(){
  $.each($.parseJSON(sessionStorage.json), function() {
    alert("here");
    //console.log(this);
	   //alert(obj.Title);
  });
}

function getSaved(){
  var data = {'method': 'retrieve', 'username': sessionStorage.username};
  var script = 'game.php';
  sendPost(script, data).done(function(data) {
      if(data.hasGame == false){
        sessionStorage.setItem("savedGame", false);
      }
      else{
        var jsonp = '[{"Lang":"jQuery","ID":"1"},{"Lang":"C#","ID":"2"}]';

        var lang = '';
        console.log(data);
        console.log($.parseJSON(jsonp));
        $.each(data, function(){
          console.log(this['Title']);
        });
      //  console.log($.parseJSON(data));

        //sessionStorage.setItem("json", data);
      //  getJSON();
      }
  })
  .fail(function(xhr, textStatus, errorThrown){
      alert(xhr.responseText);
  });

}
