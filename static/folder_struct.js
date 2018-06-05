 $(document).ready(function(){
     $("#submit").click(function(){
       fr = new FileReader();
       var files = $('#upload_directory')[0].files;
       var fd = new FormData();
       for (var i = 0; i < files.length; ++i)
       {
            console.log(files[i].name);
            fd.append(files[i].name, files[i]);
       }
       $.post({
        url: "/fetch",
        data: fd,
        contentType: false,
        processData: false,
        success: function (data) {
            //$("#fetch_confirm").html(data);
            $("#result").html(data);
        }
        });
     });
 });