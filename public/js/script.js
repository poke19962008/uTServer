$(document).ready(function(){
  $.ajax({
    url: '/getFileList',
    method: 'GET',
  })
  .done(function(fileList){
    for(var i=0; i<fileList.length; i++){
      var index = i+1;
      $("#list_content").append("<tr><td>"+ index +"</td><td class=\"fileName\">"+ fileList[i] +"</td><td><button type=\"button\" class=\" download btn btn-default btn-sm\" name=\"button\"><span class=\"glyphicon glyphicon-download-alt\" aria-hidden=\"true\"></span></button></td><td><button type=\"button\" class=\"delete btn btn-default btn-sm\" name=\"button\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></button></td></tr>");
    }
  });
});
