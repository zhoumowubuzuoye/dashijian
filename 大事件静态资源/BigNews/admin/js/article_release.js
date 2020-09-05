$(function () {
  $.ajax({
    url: "http://localhost:8080/api/v1/admin/category/list",
    success: function (info) {
      console.log(123);
      var htmlstr = template("opt", info)
      console.log(htmlstr);
      $("[name=categoryId").html(htmlstr)
    }

  })
  $("[name=cover]").on("change", function () {

    var file = this.files[0]
    var url = URL.createObjectURL(file)
    console.log($(this).prev());
    $(this).prev().attr("src", url)
  })
  jeDate("#testico", {
    onClose: false,
    theme: { bgcolor: "#00A680", pnColor: "#00DDAA" },
    format: "YYYY-MM-DD "
  });
  var E = window.wangEditor
  var editor = new E('#editor')
  editor.create();
  $("#myform").on("click", ".btn", function (e) {
    e.preventDefault()
    // var data = new FormData($("#form")[0])
    var data = new FormData($('#myform')[0])
    console.log(data);
    data.append("content", editor.txt.html())
    if ($(this).hasClass('btn-release')) {
      data.append("state", "已发布")
    } else {
      data.append("state", "草稿")
    }
    console.log(data);
    $.ajax({
      type: "post",
      url: "http://localhost:8080/api/v1/admin/article/publish",
      contentType: false,
      processData: false,
      data: data,
      success: function (info) {
        console.log(info);
        history.back()
      }
    })
  })

})