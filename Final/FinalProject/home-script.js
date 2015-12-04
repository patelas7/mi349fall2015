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
       /*$.post("http://webdev.cse.msu.edu/~patelas7/MI349/FinalPhp/login.php",
        {username: user, password: pass, method: "login"},
        function(data, textStatus, jqXHR)
        {
          console.log(data);
        //data - response from server
      }, 'json').fail(function(jqXHR, textStatus, errorThrown)
        {
          alert(textStatus);
        });
        return false;*/

      /* $.ajax({

         url : "http://webdev.cse.msu.edu/~patelas7/MI349/FinalPhp/login.php",
         type: "POST",
         dataType : "json",
         data: {username:user, password:pass, method:"login"},
         success:function(data) { alert(data); },
         error: function() {alert("error"); }



       });
       return false;*/

      /* $.post('http://webdev.cse.msu.edu/~patelas7/MI349/FinalPhp/login.php',{'username': user, 'password': password, 'method': 'login'}, function(data){
         alert(data);
       }).fail(function(e){
         console.log(e.message);
       });
       return false;*/

     }

  });

});
