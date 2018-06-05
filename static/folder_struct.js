 function contains(filepath, subst)
 {
    var a = -1, b = -1;
    for (var j = 0; j < filepath.length; ++j)
    {
        if ((filepath[j] == '/') && (a == -1)) a = j + 1;
        else if ((filepath[j] == '/') && (b == -1)) b = j;
        else if (filepath[j] == '/') break;
    }
    if ((a != -1) && (b != -1))
        return (filepath.substring(a, b) == subst);
    else return false;
 }

 $(document).ready(function(){
     $("#submit").click(function(){
       fr = new FileReader();
       var files = $('#upload_directory')[0].files;
       var fd = new FormData();
       for (var i = 0; i < files.length; ++i)
       {
            filepath = files[i].webkitRelativePath;
            if (!contains(filepath, 'Batch')) fd.append(filepath, files[i]);
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