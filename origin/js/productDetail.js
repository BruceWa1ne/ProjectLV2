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
    // 获得URL中queryString部分的id
    // 获取指定部分
    var getParam = function (key) {
        var queryString = location.search.slice(1);
        var arr = queryString.split("&");
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            var subArr = arr[i].split("=");
            console.log(subArr);
            if (key === subArr[0]) {
                return subArr[1];
            }
        }
    }

    var id = getParam("id");
    var $box = $("#box");

    $.get("/php/getGoodsInfoById.php", {
        id
    }, function ({
        error,
        data
    }) {
        $box.html(`
    <div class="col-lg col-md col-sm ">
            <div class="row">
                <div class="product_gallery_img">
                    <div class="col-lg-7 col-md-7 col-sm-7 ">
                        <div class="product_gallery">
                            <ul id="gallery_imgs">
                                <li><a class="fancybox" data-fancybox-group="group"
                                        href="img/product-gallery/full2.jpg"><img
                                            src="${data.goods_big_logo}" alt="" /></a></li>
                            </ul>
                            <div class="bxpage_slider" id="bx-pager">
                                <a data-slide-index="0" href=""><img class="select"
                                        src="${data.goods_small_logo}" alt="thumb2.jpg" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5 ">
                        <div class="product_info">
                            <div class="info">
                                <h6 class="name">${data.goods_name}</h6>
                                <div class="star-rating  ">
                                    <span style="width:80%"><strong class="rating"> </strong> </span>
                                </div>
                                <span class="price"><span class="amount">￥${data.goods_price}</span></span>
                                    <h3>当前库存：  ${data.goods_number} 件</h3>
                                    <button type="button" class="btn btn-danger">加入购物车</button>
                                <p>Capicola chuck tongue, anim consequat leberkas laborum ut enim bacon. Ribeye
                                    hamburger pastrami nisi ad consectetur dolor exercitation pork belly officia
                                    brisket pariatur mollit nulla turkey. Est dolore nulla cupidatat pork chop.
                                    Sausage officia pastrami chicken.</p>
                            </div>
                            <div class="social_icons">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-envelope-o"></i></a>
                                <a href="#"><i class="fa fa-pinterest"></i></a>
                                <a href="#"><i class="fa fa-google-plus"></i></a>
                            </div>
                            <div class="product_meta">
                                <span class="posted_in">类别: <a rel="tag" href="#">${data.cat_one_id}</a>, <a
                                        rel="tag" href="#">${data.cat_two_id}</a>.</span>
                                <span class="tagged_as">标签: <a rel="tag" href="#">${data.cat_three_id}</a>, <a rel="tag"
                                        href="#">${data.cat_id}</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ${data.goods_introduce}
        `);
    }, "json");

})