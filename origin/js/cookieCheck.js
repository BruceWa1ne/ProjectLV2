// 前端检测cookie
function getCookie(key) {
    var cookieStr = document.cookie;
    var arr = cookieStr.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var subArr = arr[i].split("=");
        if(subArr[0] === key){
            return subArr[1];
        }
    }
}
var isLogin = getCookie("islogin");
if(!isLogin){
    alert("请先去登录账户哦！")
    location.href = "./login.html#" + location.href; 
}
// 设置cookie
function setCookie(key,value){
    document.cookie = key + "=" + value;
}
// 清除cookie
function clearCookie(key){
    document.cookie = key + "=" + "aaa;max-age=-1";
}