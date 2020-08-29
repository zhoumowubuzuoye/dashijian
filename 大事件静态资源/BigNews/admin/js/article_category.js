$(function () {
  function newArc(){
    $.ajax({
      type: "get",
      url: "http://localhost:8080/api/v1/admin/category/list",
      success:function(info){
        data = info.data
        var str = template("tel",info)
        $("tbody").html(str)
        console.log(data);
      }
    })
  }
  var num 
  var data
  var $arcName =$("[name=name")
  var $arcClass = $("[name=slug]")
  var $arcId =$("[name=id]")
  newArc()
  
  $("tbody").on("click",".delbtn",function(){
    $('#smallmodel').modal('show')
    num = $(this).attr("index-id")
  })
    $(".suredel").on("click",function(){
      $.ajax({
        type:"post",
        url:"http://localhost:8080/api/v1/admin/category/delete",
        data:{
          id:num
        },
        success:function(){
          newArc()
          $('#smallmodel').modal('hide')
        }
      })
    })
    $("tbody").on("click",".editbtn",function(){
      $("#bigmodel").modal("show").find("h4").text("修改爱好")
      num = $(this).attr("index-id")
      console.log(num);
      for(var i = 0 ; i < data.length; i++){
        if(data[i].id==num){
          console.log(i);
          $arcName.val(data[i].name) 
          $arcClass.val(data[i].slug)
          $arcId.val(num)
          break
        }
      }
    })
    $(".sureedit").on("click",function(){
      console.log($("form").serialize());
      $.ajax({
        type:"post",
        url:"http://localhost:8080/api/v1/admin/category/edit",
        data:$("form").serialize(),
        success:function(info){
          if(info.code == 200){
            newArc()
            
          }
        complete:function(){
          $("#bigmodel").modal("hide")
        }
      })
    })

})