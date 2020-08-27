$(function(){
  var $form = $(".login_form")
  $form.on("submit",function(e){
    e.preventDefault()
    $.ajax({
      type:"post",
      url:"http://localhost:8080/api/v1/admin/user/login",
      data:$(this).serialize(),
      success:function(info){
        if(info.code ===200){
          console.log(123);
        }
      }


    })
  })
})