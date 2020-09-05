$(function () {
  var id = window.utils.utiles(location.search).id
  $.ajax({
    url: "http://localhost:8080/api/v1/admin/category/list",
    success: function (info) {
      var htmlStr = template("alloption", info)
      $("[name=categoryId]").html(htmlStr)
    }
  })
  jeDate("#testico", {
    onClose: false,
    minDate: '2015-06-16 10:20:25',
    maxDate: '2025-06-16 18:30:35',
    format: 'YYYY-MM-DD '
  });
  var E = window.wangEditor
  var editor = new E('#div1')
  editor.create()
  $.ajax({
    url: "http://localhost:8080/api/v1/admin/article/search",
    data: {
      id: id
    },
    success(info) {
      console.log(info.data.categoryId);
      $(".article_cover").attr("src", info.data.cover)
      $("#inputTitle").val(info.data.title)
      $("[name=categoryId]").val(info.data.categoryId)
      $(".jeinput").val(info.data.date)
      editor.txt.html(info.data.content)

    }
  })
  $("#inputCover").on("change", function () {
    var file = this.files[0]
    var url = URL.createObjectURL(file)
    $(".article_cover").attr("src", url)
  })
  $("#form").on("click", ".btn", function (e) {
    e.preventDefault()
    var data = new FormData($("#form")[0])
    data.append("id", id)
    data.append("content", editor.txt.html())
    if ($(this).hasClass("btn-success")) {
      data.append("state", "已发布")
    } else {
      data.append("state", "草稿")
    }
    $.ajax({
      type: "post",
      url: "http://localhost:8080/api/v1/admin/article/edit",
      data: data,
      processData: false,
      contentType: false,
      success: function (info) {
        if(info.code==200){
          history.back()
        }
      }
    })
  })
})