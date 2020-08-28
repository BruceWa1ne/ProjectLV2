// 显示登录用户名
function load_data() {
    var oCookie = document.cookie.split(';');
    for (var i = 0; i < oCookie.length; i++) {
        var temp = oCookie[i].split('=');
        if (i == 1) {
            console.log(temp);
            $("#usershow").html(" 尊敬的用户 : " + temp[1] + " 欢迎您 ！" +
                `<a href="javascript:void(0)" onclick="clearCookie()">退出</a>`);
        }
    }
}

function clearCookie() {
    let username = Cookie.get("username");
    let password = Cookie.get("password");
    console.log(username, password);
    Cookie.clear();
    alert("已退出");
    location.reload();
}

$(function () {

    var goodsCateArr = {};

    var $cateContainer = $("#cateContainer");

    $.ajax({
            url: "/php/getCate.php",
            type: "GET",
            data: {},
            dataType: "json"
        })
        .then(function (data) {
            if (!data.error) {
                goodsCateArr = data.msg;
                var str = "";
                goodsCateArr.forEach(value => {
                    str += `<div class="single_item col-lg-3 col-md-3 col-xs-12 col-sm-3">`;
                    str += `
                            <div class='item'>
                            <div class="product_img">
                            <img src="${value.goods_small_logo}" alt="" />
                            </div>
                            <div class="addtocart_area">
                            <a href="#">
                            <div class="cart-icons">
                            <strong><span class="fa fa-shopping-cart"></span>
                            </strong>
                            <span class="cart-icon-handle"></span>
                            <span class="add-to-cart-text">加入购物车</span>
                            </div>
                            </a>
                            <div class="wish_src">
                            <a href="#"><span class="fa fa-search"></span></a>
                            <a href="#"><span class="fa fa-heart"></span></a>
                            </div>
                            </div>
                            </div>
                            <div class="info">
                            <p class="name"><a href="./html/productDetail.html?id=${value.goods_id}">${value.goods_name}</a></p>
                            <div class="star-rating">
                            <span style="width:80%"><strong class="rating"> </strong>
                            </span>
                            </div>
                            <span class="price"><span class="amount">￥${value.goods_price}</span></span>
                            <div class="inner">
                            <div class="inner-text">新品</div>
                            </div>
                            </div>
                            `; 
                    str += `</div>`;
                });

                $cateContainer.html(str);
            } else {
                throw new Error("请求数据失败");
            }
        })
        .catch(function (err) {
            console.log(err);
        })

})