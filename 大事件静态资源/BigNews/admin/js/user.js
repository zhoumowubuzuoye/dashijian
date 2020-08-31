$(function () {
  $.ajax({
    url: "http://localhost:8080/api/v1/admin/user/detail",
    success: function (info) {
      if (info.code == 200) {
        for (var k in info.data) {
          $(`form .${k}`).val(info.data[k])
        }
        $(".user_pic").attr("src", info.data.userPic)
      }
    }
  })
  $("#exampleInputFile").on("change", function () {
    var file = this.files[0]
    var url = URL.createObjectURL(file)
    $(".user_pic").attr("src", url)
  })
  $("form").on("submit", function (e) {
    e.preventDefault()
    var data = new FormData($("form")[0])
    console.log(123);
    $.ajax({
      type: "post",
      url: "http://localhost:8080/api/v1/admin/user/edit",
      contentType: false,
      processData: false,
      data: data,
      success: function (info) {
        console.log(info);
        if (info.code == 200) {
          $.ajax({
            url: "http://localhost:8080/api/v1/admin/user/info",
            success: function (info) {
              parent.$(".user_info img").attr("src", info.data.userPic)
              parent.$(".user_info span").html(`欢迎&nbsp;&nbsp;${info.data.nickname}`)
              parent.$(".user_center_link img").attr("src", info.data.userPic)
            }
          })
        }
      }

    })
  })
})














// $(function () {
//   $.ajax({
//     url: "http://localhost:8080/api/v1/admin/user/detail",
//     success: function (info) {
//       // console.log(info);
//       if (info.code == 200) {
//         console.log(123);
//         for (var k in info.data) {
//           $(`form .${k}`).val(info.data[k])
//         }
//         // console.log(123);
//         console.log(info.data.userPic);
//         $("form .user_pic").attr("src", info.data.userPic)

//       }
//     }
//   })
//   $("#exampleInputFile").on("change", function () {
//     var file = this.files[0]
//     var url = URL.createObjectURL(file)
//     $("form .user_pic").attr("src", url)
//   })
//   $("form").on("submit", function (e) {
//     e.preventDefault()
//     var data = new FormData($("form")[0])
//     $.ajax({
//       type: "post",
//       url: "http://localhost:8080/api/v1/admin/user/edit",
//       contentType: false,
//       processData: false,
//       data: data,
//       success: function (info) {
//         console.log(info);
//         if (info.code == 200) {
//           $.ajax({
//             url: "http://localhost:8080/api/v1/admin/user/info",
//             success: function (info) {
//               parent.$(".user_info img").attr("src", info.data.userPic)
//               parent.$(".user_info span").html(`欢迎&nbsp;&nbsp;${info.data.nickname}`)
//               parent.$(".user_center_link img").attr("src", info.data.userPic)
//             }
//           })
//         }
//       }

//     })
//   })
// })





























// $(function(){
//   $.ajax({
//     type:"get",
//     url:"http://localhost:8080/api/v1/admin/user/detail",
//     success:function(info){
//       // console.log(info);
//       for (var k in info.data){
//         // console.log( $(`form .${k}`),info.data[k]);
//         $(`form .${k}`).val(info.data[k])
//       }
//       $("form .user_pic").attr("src",info.data.userPic)
//     }
//   })
//   $("#exampleInputFile").on("change",function(){
//     var file = this.files[0]
//     var url = URL.createObjectURL(file)

//  $("form .user_pic").attr("src",url)

//   })
//   $("form").on("submit",function(e){
//     e.preventDefault()
//     var data = new FormData($("form")[0])   
//     $.ajax({
//       type:"post",
//       url:"http://localhost:8080/api/v1/admin/user/edit",
//       processData:false,
//       contentType:false,
//       data:data,
//       success:function(info){
//         if(info.code==200){
//           $.ajax({
//             url:"http://localhost:8080/api/v1/admin/user/info",
//             success:function(info){
//               parent.$(".user_info img").attr("src",info.data.userPic)
//               parent.$(".user_info span").html(`欢迎&nbsp;&nbsp;${info.data.nickname}`)
//               parent.$(".user_center_link img").attr("src",info.data.userPic)
//             }
//           })
//         }

//       }
//     })
//   })
// })