(function(window){
var utils = {
  utiles:function(str){
    // console.log(location.search);
    var str = location.search
    str =str.slice(1)
    // console.log(str);
    var arr = str.split("&")
    
    // console.log(arr);
    
    var arr2 = []
    // console.log(123);
    var obj = {}
    for(var i = 0 ; i < arr.length; i++){
      arr2.push(arr[i].split("="))
      // console.log(arr2);
      obj[arr2[i][0]]=arr2[i][1]
      // console.log(obj);
    }
    return window.obj = obj
   }
}
 window.utils =utils
})(window)