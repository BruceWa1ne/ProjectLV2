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
			Cookie.clear();
			alert("已退出");
			location.reload();
		}

		function reload() {
			location.reload();
		}

		// 先从本地存储中把数据拿出来
		var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
		console.log(shoppingCart);

		// 根据数组渲染购物车
		var table = document.querySelector("table");

		function render() {
			var isAllCheck = shoppingCart.every(value => {
				return value.isChecked;
			});

			var str = `	
				           <thead>
								<tr>
									<th><input class="allCheck" type="checkbox" ${isAllCheck ? "checked" : ""}>&nbsp;&nbsp;&nbsp;全选</th>
									<th colspan="3" class="product-name">商品 (ID) </th>
									<th class="product-price">价格</th>
									<th class="product-quantity">数量</th>
									<th class="product-operate">操作</th>
									<th class="remove-product">删除</th>
								</tr>
							</thead>
							<tbody>`;
			shoppingCart.forEach(value => {
				str += `
					<tr class="cart_item">
						            <th scope="row"><input data-id="${value.goods_id}" class="singleCheck" ${value.isChecked ? "checked" : ""} type="checkbox"/></th>
									<th scope="row">${value.goods_id}</th>
									<td class="product-thumbnail">
										<a href="#"><img width="114" height="130" alt="04"
												class="attachment-shop_thumbnail wp-post-image"
												src="${value.goods_small_logo}">
										</a>
									</td>
									<td class="product-name" title="${value.goods_name}">
										<a href="./productDetail.html?id=${value.goods_id}"><span style="display: inline-block;width: 300px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${value.goods_name}</span></a>
									</td>
									<td class="product-price">
										<span class="amount">${value.goods_price}</span>
									</td>
									<td class="product-quantity">
										<span class="amount">${value.count}</span>
									</td>
									<td class="product-operate">
                                    <button type="button" class="btn btn-success increase" data-id="${value.goods_id}"> + </button >&nbsp;
									<button type="button" data-id="${value.goods_id}" class="btn btn-success decrease"> - </button>
									</td>
									<td class="remove-product">
										<a title="Remove this item" class="remove" href="javascript:void(0)">
										<span class="icon-close" data-id="${value.goods_id}"></span>
										</a>
									</td>
								</tr>
								`;
			});
			str += `</tbody>`;
			table.innerHTML = str;
		}

		// 计算总价函数
		function checkIn() {
			// 根据数组中所有拥有isChecked属性的对象价格和数量相乘再累计
			var sumPrice = 0;
			shoppingCart.forEach(value => {
				if (value.isChecked) {
					sumPrice += value.goods_price * value.count;
				}
			});
			sum.innerHTML = "￥" + sumPrice;
			totalSUM.innerHTML = "￥" + sumPrice;
		}

		// 更新本地储存数据
		function upDate() {
			localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
		}
		render();
		renderMini();
		miniCheck();
		checkIn();

		// 委托模式添加点击事件
		table.onclick = function (e) {
			if (e.target.className === 'allCheck') {
				// 全选
				shoppingCart.forEach(value => {
					value.isChecked = e.target.checked;
				});
				render();
				checkIn();
			}

			if (e.target.className === "singleCheck") {
				// 首先确定是哪一件商品
				// 从input上获取id
				var id = e.target.getAttribute("data-id");
				// 根据id从数组中找到对应的商品信息
				var goodsInfo = shoppingCart.find(value => {
					return value.goods_id === id;
				})
				// 将当前的input状态与goodsInfo的isChecked设置为一个值
				goodsInfo.isChecked = e.target.checked;
				render();
				checkIn();
				upDate();
				miniReset();
				return;
			}

			// 判断是否点击到加号
			if (e.target.className.includes("increase")) {
				// 获取id
				var id = e.target.getAttribute("data-id");
				// 根据id从数组中找到相应数据
				var goodsInfo = shoppingCart.find(value => {
					return value.goods_id === id;
				});
				// 增加数据中的count值
				goodsInfo.count++;
				render();
				checkIn();
				miniCheck();
				upDate();
				return;
			}

			// 判断是否点击到减号
			if (e.target.className.includes("decrease")) {
				// 获取id
				var id = e.target.getAttribute("data-id");
				// 根据id从数组中找到相应数据
				var goodsInfo = shoppingCart.find(value => {
					return value.goods_id === id;
				});
				// 增加数据中的count值
				goodsInfo.count--;
				if (goodsInfo.count <= 1) {
					alert("至少要购买一件商品哦！");
					goodsInfo.count = 1;
				}
				render();
				checkIn();
				reCount();
				upDate();
				return;
			}

			// 判断点击到的是否是删除
			if (e.target.className === 'icon-close') {
				// 获取id
				var id = e.target.getAttribute("data-id");
				console.log(id);
				// 根据id找到对应的索引
				var goodsInfoIndex = shoppingCart.findIndex(value => {
					return value.goods_id === id;
				});
				// 删除数据
				shoppingCart.splice(goodsInfoIndex, 1);
				render();
				checkIn();
				upDate();
				reCount();
				return;
			}
		}