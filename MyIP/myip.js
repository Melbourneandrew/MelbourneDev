$(document).ready(function(){
  $.get("https://api.ipify.org/", function(data){
    $(".ip-text").html(data);
  });
});
