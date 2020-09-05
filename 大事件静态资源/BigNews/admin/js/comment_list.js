$(function(){
  $.ajax({
    url:"http://localhost:8080/api/v1/admin/comment/search",
    success:function(info){
      // console.log(info);
      var strHtml = template("comment",info.data)
      $("tbody").html(strHtml)
      twbs(info)
    } 
  })
  var that
 var courPage = 1
  $("tbody").on("click","button",function(){
      // console.log(this);
      if($(this).hasClass("btn-warning")){
        that =this
        // console.log(this);
        // $.ajax({
        //   type:"post",
        //   url:"http://localhost:8080/api/v1/admin/comment/reject",
        //   data:{
        //     id:$(this).data("id")
        //   },
        //   success:function(info){
        //     console.log(info);
        //   }
        // })
        ajax("reject")
      }else if($(this).hasClass("btn-success")){
       that = this
       ajax("pass")
      }else{
       that = this
       ajax("delete")
       $.ajax({
        url:"http://localhost:8080/api/v1/admin/comment/search",
        data:{
          page:courPage
        },
        success:function(info){
          console.log(info);
          // console.log(courPage)
          
          var strHtml = template("comment",info.data)
          $("tbody").html(strHtml)
         if(info.data.totalPage==0){
          $("#pagination-demo").hide().next().show()
         }else{
          $("#pagination-demo").show().next().hide()
          console.log(courPage)
          if(info.data.data.length==0&& info.data.totalCount !=0){
            console.log(courPage);
          courPage -= 1
          }
          $("#pagination-demo").twbsPagination("changeTotalPages",info.data.totalPage,courPage)
         } 

        } 
      })

      }
  })
  function twbs(info){
    $('#pagination-demo').twbsPagination({
      first:"第一页",
      prev:"前一页",
      next:"后一页",
      last:"最后一页",
      totalPages: info.data.totalPage,
      visiblePages:6,
      onPageClick: function (event, page) {
          // console.log(page);
          courPage = page
          $.ajax({
            url:"http://localhost:8080/api/v1/admin/comment/search",
            data:{
              page:page
            },
            success:function(info){
              // console.log(info);
              var strHtml = template("comment",info.data)
              $("tbody").html(strHtml)
            }
          })
      }
  });
  }
  function ajax(url){
    // console.log(that);
    $.ajax({
      type:"post",
      url:"http://localhost:8080/api/v1/admin/comment/" + url,
      data:{
        id:$(that).data("id")
      },
      success:function(info){
        // console.log(info);
        $(that).parent().prev().text("已"+$(that).text())
      }
    })
  }
})