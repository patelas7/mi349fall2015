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
