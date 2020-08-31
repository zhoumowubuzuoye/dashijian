$(function(){
 function rander(){
  $.ajax({
    url:"http://localhost:8080/api/v1/admin/category/list",
    success:function(info){
      // console.log(info);
      var str =template("tel",info)
      $("tbody").html(str)
    }
  })
 }
 rander()
 console.log($("#bigmodel")[0]);
 $("#bigmodel").on("shown.bs.modal",function(e){
   console.log(e.relatedTarget);
   if(e.relatedTarget.id=="xinzengfenlei"){
    $(this).find("h4").text("新建文章")
    $("form")[0].reset()
    $("[name=id]").val("")
   }else{
    $(this).find("h4").text("修改文章")
    $.ajax({
      url:"http://localhost:8080/api/v1/admin/category/search",
      data:{
        id:$(e.relatedTarget).data("id")
      },
      success:function(info){
        console.log(info);
        if(info.code ==200){
          for(var k in info.data[0]){
            console.log(info.data[0] );
            $(`form [name=${k}]`).val(info.data[0][k])
          }
        }
      }
    })
   }
 })
 $(".sureedit").on("click",function(){
   $.ajax({
     type:"post",
     url:$("[name=id]").val()?"http://localhost:8080/api/v1/admin/category/edit":"http://localhost:8080/api/v1/admin/category/add",
     data:$("form").serialize(),
     success:function(info){
      console.log(info);
      rander()
      $("#bigmodel").modal("hide")
     }
   })
 })
 $("#smallmodel").on("shown.bs.modal",function(e){
  console.log(e.relatedTarget);
   window.smallmodelId = $(e.relatedTarget).data("id")
 })
 $(".suredel").on("click",function(){
   $.ajax({
     type:"post",
     url:"http://localhost:8080/api/v1/admin/category/delete",
     data:{
       id:smallmodelId
     },
     success:function(info){
      console.log(info);
      if(info.code==204){
        rander()
        $("#smallmodel").modal("hide")
      }
     }
   })
 })
})