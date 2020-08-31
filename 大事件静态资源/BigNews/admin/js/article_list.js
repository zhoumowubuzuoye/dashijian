$(function () {

  $.ajax({
    url: "http://localhost:8080/api/v1/admin/category/list",
    success: function (info) {
      // console.log(info);
      if (info.code == 200) {
        var str = template("alloption", info)
        $("#selCategory").html(str)
      }
    }
  })
function rander(){
  
  $.ajax({
    url: "http://localhost:8080/api/v1/admin/article/query",
    data: {
      type: $("#selCategory").val(),
      state: $("#selStatus").val(),
      page: "",
      perpage: 6
    },
    success: function (info) {
      console.log(info);
      str = template("allclass", info.data)
      $("tbody").html(str)

    }
  })
}
rander()
  $("form").on("submit",function(e){
    console.log($("#selCategory").val(),$("#selStatus").val());
    e.preventDefault()
    rander()
  })
  $("#myModal").on("shown.bs.modal",function(e){
    window.index = $(e.relatedTarget).data("id")
    console.log(index);
  })
  $(".delSure").on("click",function(){
    $.ajax({
      type:"post",
      url:"http://localhost:8080/api/v1/admin/article/delete",
      data:{
        id : index
      },
      success:function(info){
        console.log(info);
        if(info.code==204){
          $("#myModal").modal("hide")
          rander()
        }
      }


    })
  })
})