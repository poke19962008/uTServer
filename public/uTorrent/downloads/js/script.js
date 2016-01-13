$(document).ready(function(){
  $.ajax({
    url: '../getFileList',
    method: 'GET',
  })
  .done(function(fileList){
    for(var i=0; i<fileList.length; i++){
      var index = i+1;
      $("#list_content").append("<tr><td>"+ index +"</td><td>"+ fileList[i] +"</td><td><a target=\"_blank\" href=\"../downloadFile?file="+ fileList[i] +"\"><span class=\"glyphicon glyphicon-download-alt\" aria-hidden=\"true\"></span></a></td><td><a id=\"remove\" href=\"#\" alt=\""+ fileList[i] +"\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a></td></tr>");
    }

    $('#remove').click(function (){
      $.ajax({
        url: '../deleteFile',
        method:'GET',
        data: {
          file: $(this).attr('alt'),
        }
      })
      .done(function (msg){
        if(msg == 'success')
          location.reload(true);
        else
          alert('Error deleting file. Try again later.');
      });
    });
  });

});
