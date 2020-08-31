$(function(){
  $("form").on("submit",function(e){
    e.preventDefault()
    console.log(123);
    $.ajax({
      type:"post",
      url:"http://localhost:8080/api/v1/admin/user/login",
      data:$("form").serialize(),
      success:function(info){
        localStorage.setItem("token",info.token)
        location.href = "./index.html"
      }
    })
  })
})




















// $(function(){
//   var $form = $(".login_form")
//   $form.on("submit",function(e){
//     e.preventDefault()
//     $.ajax({
//       type:"post",
//       url:"http://localhost:8080/api/v1/admin/user/login",
//       data:$(this).serialize(),
//       success:function(info){
//         $("#myModal").modal('show')
//         $(".modal-body p").text(info.msg)
//         if(info.code ===200){
//           localStorage.setItem("token",info.token)
//           $('#myModal').on('hidden.bs.modal', function (e) {
//             console.log(123);
//             location.href ="./index.html"
//           })
//         }
//       }


//     })
//   })
// })