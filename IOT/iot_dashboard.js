$(function(document){

  $.get('/indra-data', function(data){
    $("#header").html(JSON.stringify(data));
  })

  $('#fetch-data').click(function(){
    $.get('/indra-data', function(data){
      $("#header").html(JSON.stringify(data));
    })
  })

  $('#drop-collection').click(function(){
    $.get('/indra-drop', function(data){
      console.log(data);
    })
  })
})
