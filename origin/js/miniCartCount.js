		// 渲染小购物车的计数器
		// 先从本地存储中把数据拿出来
		var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

		// 获取计数器元素
		var $cartCount = $("#cartCount");
		
		function reCount(){
			$cartCount.empty();
			$cartCount.append(`<strong>${shoppingCart.length}</strong>`);
		}
		reCount();
		