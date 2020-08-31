$(function(){
  $.ajax({
    url:"http://localhost:8080/api/v1/admin/user/info",
    success:function(info){
      console.log(info);
      $(".user_info img").attr("src",info.data.userPic)
      $(".user_center_link img").attr("src",info.data.userPic)
      $(".user_info span").html(`欢迎&nbsp;&nbsp;${info.data.nickname}`)
    }
  })
  $(".logout").on("click",function(){
    localStorage.removeItem("token")
    location.href = "./login.html"
  })
  $(".level01").click(function(){
    console.log( $(this).addClass("active").siblings("div").removeClass("active").end().siblings("ul").slideUp().siblings(".second").find("b"));
    $(this).addClass("active").siblings("div").removeClass("active").end().siblings("ul").slideUp().siblings(".second").find("b").removeClass("rotate0")
    console.log(123);
    if($(this).index()==1){
      $("b").toggleClass("rotate0")
      $(".level02").stop().slideToggle()
      $(".level02 li").eq(0).click()

    }
  })

  $(".level02 li").click(function(){
    $(this).addClass("active").siblings().removeClass("active")
  })
})



















// $(function(){
//   var $usepic = $(".user_info img")
//   var $header = $(".header_bar img")
//   var $exit = $(".user_center_link .exit")
//   $.ajax({
//     type:"get",
//     url:"http://localhost:8080/api/v1/admin/user/info",
//     success:function(info){
//       console.log(info);
//       if(info.code===200){
//         console.log(info);
//         $(".user_info span").html(`欢迎&nbsp;&nbsp;${info.data.nickname}`)
//         $usepic.attr("src",info.data.userPic)
//         $header.attr("src",info.data.userPic)
//       }
//     }
//   })
//   $exit.on("click",function(){
//     localStorage.removeItem("token")
//     location.href="./login.html"
//   })
//   $(".level01").on("click",function(){
//     $(this).addClass("active").siblings("div").removeClass("active")
//     if($(this).index()===1){
//       $(" .level02").slideToggle()
//       $(this).find("b").toggleClass("rotate0")
//     }
//   })
//   $(".level02 li").on('click',function(){
//     $(this).addClass("active").siblings().removeClass("active")
//   })
// })