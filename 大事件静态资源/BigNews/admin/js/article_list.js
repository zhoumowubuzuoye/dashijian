$(function(){
 function show(){
  $.ajax({
    type:"get",
    url:"http://localhost:8080/api/v1/admin/article/query",
    data:{
      type:$("#selCategory").val().trim(),
      status:$("#selStatus").val().trim(),
      page:1,
      perpage:6
    },
    success:function (info){
      if(info.code===200){
        var str = template("allclass",info.data)
        $("tbody").html(str)
      }else{
        alert("服务器出错")
      }

    }
  })
 }
 show()
 $.ajax({
   url:"http://localhost:8080/api/v1/admin/category/list",
   success:function(info){
    var str = template("alloption",info)
    $("form #selCategory").html(str)
   }
 })
 
 $("form").on("change","#selCategory",function(){
   console.log(123);
   $.ajax({
     url:"http://localhost:8080/api/v1/admin/article/query",
     data:{
       key:$("#selCategory").val().trim(),
       type:$("#selCategory").val().trim(),
       status:$("#selStatus").val().trim(),
       page:1,
       perpage:6

     },
     success:function(info){
      var str =template("allclass",info.data)
      $("tbody").html(str)
     }
   })
 })
})