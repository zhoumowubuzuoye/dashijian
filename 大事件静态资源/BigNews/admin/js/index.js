$(function(){
  var $usepic = $(".user_info img")
  var $header = $(".header_bar img")
  var $exit = $(".user_center_link .exit")
  $.ajax({
    type:"get",
    url:"http://localhost:8080/api/v1/admin/user/info",
    success:function(info){
      console.log(info);
      if(info.code===200){
        $usepic.attr("src","http://localhost:8080/icon.jpg")
        $header.attr("src","http://localhost:8080/icon.jpg")
      }
    }
  })
  $exit.on("click",function(){
    localStorage.removeItem("token")
    location.href="./login.html"
  })
  $(".level01").on("click",function(){
    $(this).addClass("active").siblings("div").removeClass("active")
    if($(this).index()===1){
      $(" .level02").slideToggle()
      $(this).find("b").toggleClass("rotate0")
    }
  })
  $(".level02 li").on('click',function(){
    $(this).addClass("active").siblings().removeClass("active")
  })
})