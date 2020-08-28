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


		// 渲染商品列表
		var goodsArr = [];

		// 获取元素
		var $paginationContainer = $("#paginationContainer");

		// 发送AJAX 渲染分页结构
		$.ajax({
				url: "/php/getGoods.php",
				type: "GET",
				data: {},
				dataType: "json"
			})
			.then(function (data) {
				if (!data.error) {
					goodsArr = data.msg;
					// 渲染12条数据
					var p = new Pagination(paginationContainer, data.msg, 0, 12);
					p.display(function (arr) {
						console.log(arr);
						var str = `
							<div class="row">
				            	<div class="col-lg-15 col-md-15 col-sm-15 ">
					        		<div class="row">
						   				<div class="category_right_area">
											<div class="cat_all_aitem">
												<div class='short-width-slider'>
													<div class='cat_slider'>
										`;
						// 渲染12个div
						arr.forEach(value => {
							str += `
								<div class="single_item">
									<div class='item'>
										<div class="product_img">
											<img src="${value.goods_small_logo}" alt="" />
										</div>
										<div class="addtocart_area">
											<a href="javascript:void(0)">
												<div class="cart-icons" >
													<strong><span class="fa fa-shopping-cart"></span></strong>
													<span class="cart-icon-handle"></span>
													<span class="add-to-cart-text" data-id="${value.goods_id}">加入购物车</span>
												</div>
											</a>
											<div class="wish_src">
												<a href="./productDetail.html?id=${value.goods_id}"><span class="fa fa-search"></span></a>
												<a href="#"><span class="fa fa-heart"></span></a>
											</div>
										</div>
									</div>
									<div class="info ">
										<h6 class="name"><a href="./productDetail.html?id=${value.goods_id}" style:"display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;">${value.goods_name}</a></h6>
										<div class="star-rating two_star ">
											<span style="width:80%"><strong class="rating"> </strong> </span>
										</div>
										<span class="price"><span class="amount">￥${value.goods_price}</span></span>
									</div>
									<div class="inner">
										<div class="inner-text">热卖</div>
									</div>
								</div>
										`;
						});
						str += `						</div>
								    					</div>
							        				</div>
						            			</div>
					                		</div>
				                    	</div>
									</div>`;
						return str;
					});
				} else {
					throw new Error("请求数据失败");
				}
			})
			.catch(function (err) {
				console.log(err);
			})

		// 委托事件给购物车按钮添加点击事件
		$paginationContainer.click(function (e) {
			// 通过e.target判断元素是否是购物车按钮
			if (e.target.className.toLowerCase() === "add-to-cart-text") {
				var goodsID = e.target.getAttribute("data-id");
				console.log("点击到购物车按钮，商品ID是" + goodsID);
				// 实现数组查询功能
				var goodsInfo = goodsArr.find((value) => {
					console.log(goodsID);
					return value.goods_id === goodsID;
				})
				// 1 先将本地存储中的数组取出
				var shoppingCartString = localStorage.getItem("shoppingCart") || "[]";
				// 2 转为数组
				var shoppingCartArr = JSON.parse(shoppingCartString);
				// 判断数组中是否存在这个对象
				var isExists = shoppingCartArr.find(value => value.goods_id === goodsID);
				// 根据判定执行不同的业务逻辑
				if (isExists) {
					isExists.count++;
				} else {
					// 3 往数组中添加选中对象
					goodsInfo.count = 1;
					shoppingCartArr.push(goodsInfo);
				}
				// 重新转换成字符串存储到本地存储中
				localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
				alert("添加成功");
				renderMini();
				miniCheck();
				reCount();
			}

		});