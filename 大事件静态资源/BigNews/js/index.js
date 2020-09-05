$(function(){
  // 导航栏获取
  $.ajax({
    url:"http://localhost:8080/api/v1/index/category",
    success:function(info){
        var strHtml = template("allClass",info)
        $(".menu .level_two").html("<li class='up'></li>"+strHtml)
        $(".menu .left_menu").html(strHtml)
      
    }
  })
  // 热点图片获取
  $.ajax({
    url:"http://localhost:8080/api/v1/index/hotpic",
    success:function(info){
      var str = template("hot-Pic",info)
      $(".focus_list").html(str)
    }
  })
  // 最新资讯获取
  $.ajax({
    url:"http://localhost:8080/api/v1/index/latest",
    success:function(info){
      if(info.code==200){
        var strHtml = template("hot-info",info)
        $(".common_news").html(strHtml)
      }

    }
  })
  //热门排行
  $.ajax({
    url:"http://localhost:8080/api/v1/index/rank",
    success:function(info){
      if(info.code==200){
        var strHtml = template("rank",info)
        $(".hotrank_list").html(strHtml)
      }
    }
  })
  // 热门评论
  $.ajax({
    url:"http://localhost:8080/api/v1/index/latest_comment",
    success:function(info){
      if(info.code==200){
        var strHtml = template("latest_comment",info)
        $(".comment_list").html(strHtml)
      }
    }
  })
  // 焦点关注
  $.ajax({
    url:"http://localhost:8080/api/v1/index/attention",
    success:function(info){
      console.log(info);
      if(info.code==200){
        var strHtml = template("guanzhu_list",info)
        $(".guanzhu_list").html(strHtml)
      }
    }
  })
  // 主页搜索功能
  $(".search_btn").on("click",function(){
    window.location.href = './list.html?search=' + $('.search_txt').val()
  })
})