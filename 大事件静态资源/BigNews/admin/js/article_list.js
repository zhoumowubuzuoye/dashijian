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
  $.ajax({
    url:"http://localhost:8080/api/v1/admin/article/query",
    success:function(info){
      console.log(info);
      var str = template("allclass",info.data)
      $("tbody").html(str)
      if(info.data.totalCount==0){
        // console.log(123);
        $("#pagination-demo").hide().next().show()
      }else{
        $("#pagination-demo").show().next().hide()
        // console.log(456);
      }
      twbs(info)
    }
  })

 var currentPage=1
  function twbs(res){
    $("#pagination-demo").twbsPagination({
      totalPages: res.data.totalPage, 
      visiblePages: 6, 
      first: '第一页',
      last: '最后一页',
      prev: '上一页',
      next: '下一页',
      initiateStartPageClick:false,
      onPageClick:function(e,page){
        //  $('#page-content').text('Page' + page)
        // page表示当前被单击的页码值
       
        currentPage = page,
        $.ajax({
          type: 'get',
          url: "http://localhost:8080/api/v1/admin/article/query",
          data: {
            key: $('#myForm input[name=key]').val(), // 关键词
            type: $('#selCategory').val(), // 文章分类 
            state: $('#selStatus').val(), // 文章状态
            page: page,
            perpage: 6 // 页面中显示的数据条数
          },
          success: function (res) {
            // console.log(res)
            // 2.2 将获取到的第1页文章数据渲染到页面中
            if (res.code == 200) {
              // 3.2 将服务器响应回来的数据渲染到页面上
              var htmlStr = template('allclass', res.data)
              $('tbody').html(htmlStr)
            }
          }
        })

      }

    })
  }
  $("#myForm").on("submit",function(e){
    e.preventDefault()
    // console.log(123);
    $.ajax({
      url:"http://localhost:8080/api/v1/admin/article/query",
      data:{
        key:$("form [name=key]").val(),
        type:$("form [name=type]").val(),
        state:$("form [name=state]").val(),
        page:1,
        perpage:6
      },
      success:function(info){
        console.log(info);
        var str = template("allclass",info.data)
        $("tbody").html(str)
        if(info.data.totalCount==0){
          // console.log(123);
          $("#pagination-demo").hide().next().show()
        }else{
          $("#pagination-demo").show().next().hide()
          // console.log(456);
          $("#pagination-demo").twbsPagination("changeTotalPages",info.data.totalPage,1)
        }
      }
    })
  })
  $("#myModal").on("shown.bs.modal",function(e){
    
    window.indexId=$(e.relatedTarget).data("id")
    console.log(indexId);
  })
  $(".delSure").on("click",function(){

    $.ajax({
      type:"post",
      url:"http://localhost:8080/api/v1/admin/article/delete",
      data:{
        id:indexId
      },
      success:function(info){
        console.log(info);
        $.ajax({
          url:"http://localhost:8080/api/v1/admin/article/query",
          data:{
            key:$("form [name=key]").val(),
            type:$("form [name=type]").val(),
            state:$("form [name=state]").val(),
            page:currentPage,
            perpage:6
          },
          success:function(info){
            console.log(info);
            var str = template("allclass",info.data)
            $("tbody").html(str)
            if(info.data.totalCount==0&&info.data.data.length == 0){
              console.log(123);
              $("#pagination-demo").hide().next().show()
            }else{
              $("#pagination-demo").show().next().hide()
              console.log(456);
              console.log(currentPage);
              if (info.data.data.length == 0) {
                currentPage -= 1
                console.log(currentPage);
              }
              $("#pagination-demo").twbsPagination("changeTotalPages",info.data.totalPage,currentPage)
            }
          }
        })
        $("#myModal").modal("hide")
      
      }
    })
  })
})