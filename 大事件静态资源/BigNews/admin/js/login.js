$(function(){
  var $form = $(".login_form")
  $form.on("submit",function(e){
    e.preventDefault()
    $.ajax({
      type:"post",
      url:"http://localhost:8080/api/v1/admin/user/login",
      data:$(this).serialize(),
      success:function(info){
        $("#myModal").modal('show')
        $(".modal-body p").text(info.msg)
        if(info.code ===200){
          window.localStorage.setItem("token", backData.token);
          $('#myModal').on('hidden.bs.modal', function (e) {
            location.herf ="./index.html"
          })
        }
      }


    })
  })
})