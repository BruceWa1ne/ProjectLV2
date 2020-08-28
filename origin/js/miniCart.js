			// 渲染小购物车
			var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
			// 获取元素
			var $cartContainer = $("#cartContainer");

			function renderMini() {
				shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
				$cartContainer.empty();

				shoppingCart.forEach(value => {
					$cartContainer.append(`
				  <div class="row mini-cart-item ">
					<a href="#" class="cart_list_product_img">
					<img class="attachment-shop_thumbnail" src="${value.goods_small_logo}" alt="04" />
					</a>
					<div class="mini-cart-info">
					<a href="./productDetail.html?id=${value.goods_id}" class="cart_list_product_title">${value.goods_name}</a>
					<div class="cart_list_product_quantity">${value.count} 件<span
					class="amount">￥${value.goods_price}</span></div>
					</div>
					<a title="删除此商品" class="remove" href="javascript:void(0)"><i
					class="fa fa-trash-o" data-id="${value.goods_id}"></i></a>
					</div>`);
				})
			}

			// 计算总价函数
			function miniCheck() {
				// 根据数组中所有拥有isChecked属性的对象价格和数量相乘再累计
				var sumPrice = 0;
				shoppingCart.forEach(value => {
					sumPrice += value.goods_price * value.count;
				});
				totalSum.innerHTML = "￥" + sumPrice;
			}


			// 更新本地储存数据
			function miniReset() {
				localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
			}
			renderMini();
			miniCheck();

			// 委托模式添加点击事件
			var cartContainer = document.getElementById("cartContainer");
			cartContainer.onclick = function (e) {
				// 判断点击到的是否是删除
				if (e.target.className === 'fa fa-trash-o') {
					console.log(1111);
					// 获取id
					var id = e.target.getAttribute("data-id");
					console.log(id);
					// 根据id找到对应的索引
					var goodsInfoIndex = shoppingCart.findIndex(value => {
						return value.goods_id === id;
					});
					console.log(goodsInfoIndex)
					// 删除数据
					shoppingCart.splice(goodsInfoIndex, 1);
					miniReset();
					renderMini();
					miniCheck();
					reCount();
					return;
				}
			}