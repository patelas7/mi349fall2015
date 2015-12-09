var user = '';
$(document).ready(function(){
  setCSS();
  $("#userNewButton").click(function(){
    var title = $('#userNewTitle').val();
    var hint = $('#userNewHint').val();
    if( title == "" || hint == ""){
      alert("Fill in both title and hint");
    }
    else{
      sessionStorage.setItem("word", "This isn't a bad test");
      sessionStorage.setItem("hint", "This is a hint");
      document.location.href = 'game.html';
    }
  });
});

function setCSS(){
  $(".container").css({"background-color":"#68838B"});
  $('#welcome').css({"font-size": "40px", "left" : "20%"});
  $('#welcome').text("Welcome " + sessionStorage.username);
}
