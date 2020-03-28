$(function() {

	$(".login").click(function() {
		window.open("login.html", "_self");
	})
	$(".orange").click(function() {
		window.open("reg.html", "_self");
	})
	//点击logo图标返回首页
	$("#logoS").click(function() {
		window.open("index.html", "_self");
	})
	//	首页
	$(".goIndex").click(function() {
		window.open("index.html", "_self");
	})
	//商品列表
	$("#list").click(function() {
		window.open("goodsList.html", "_self");
	})
	//商品详情
	$("#detail").click(function() {
		window.open("details.html", "_self");
	})
	
	
	

	//禁止文字复制
	document.onselectstart = function() {
		return false;
	};
	//地区设置
	var cityShow = null;

	function cityHide() {
		cityShow = setTimeout(function() {
			$(".set_city").fadeOut(100);
		}, 500);
	}

	$(".address").on({
		mouseover: function() {
			$(".set_city").fadeIn(100);
		},
		mouseout: cityHide
	})
	$(".set_city").on({
		mouseover: function() {
			clearTimeout(cityShow);
		},
		mouseout: cityHide
	})

	//获取用户信息
	var loginedUser = $.cookie("loginedUser") == undefined || $.cookie("loginedUser") == null ? [] : JSON.parse($.cookie("loginedUser"));
	console.log("登录过得用户", loginedUser);
	//	if(loginedUser.length != 0) {
	//判断是否为注册用户登录
	var regUser = false;

	function setUser() {
		for(var i = 0; i < loginedUser.length; i++) {
			if(loginedUser[i].current == 1) {
				regUser = true;
				$(".orangeHover").html("您好，<span style='color:#ff5500'> " + loginedUser[i].name +
					"</span>&nbsp;&nbsp;<span id='exit' style='color:#ff5500'>退出</span>");
				$(".address").html(loginedUser[i].address == "" || loginedUser[i].address == undefined ? "请选择地址" : loginedUser[i].address);
				$.each($(".c_h span"), function() {
					if($(this).html() == loginedUser[i].address) {
						$(".c_h span").removeClass("c_check");
						$(this).addClass("c_check");
					}
				})
				$(".reg").hide();

				if(loginedUser[i].loginNum == 1) {
					setTimeout(function() {
						$('#welcome').show();
						$('#welcome').addClass('animated flip');
						console.log(loginedUser);
						for(var i = 0; i < loginedUser.length; i++) {
							if(loginedUser[i].current == 1) {
								loginedUser[i].loginNum = parseInt(loginedUser[i].loginNum) + 1;
							}
						}
						$.cookie('loginedUser', JSON.stringify(loginedUser), {
							expires: 7
						});
						setTimeout(function() {
							$('#welcome').fadeOut(500);
						}, 5000)
					}, 3000)
				}
			}
			//不为注册用户登录
		}

		if(!regUser) {
			$(".orangeHover").html("您好，<span style='color:#ff5500'>游客</span>");
		}
	}
	setUser();

	//设置用户地址
	//	var addressCookie = $.cookie("addressCookie") == undefined || $.cookie("addressCookie") == null ? "" : $.cookie("addressCookie");
	//	console.log(addressCookie);
	//	$(".address").html(addressCookie == "" ? "请选择地址" : addressCookie);

	$(".c_h span").click(function() {
		$(".c_h span").removeClass("c_check")
		$(this).addClass("c_check");
		$(".address").html($(this).html());
		for(var i = 0; i < loginedUser.length; i++) {
			if(loginedUser[i].current == 1) {
				loginedUser[i].address = $(this).html();
			}
		}
		$.cookie('loginedUser', JSON.stringify(loginedUser), {
			expires: 7
		});

	})
	//退出将当前登录的指标变成0
	$("#exit").click(function() {
		for(var i = 0; i < loginedUser.length; i++) {
			loginedUser[i].current = 0;
		}
		$.cookie('loginedUser', JSON.stringify(loginedUser), {
			expires: 7
		});
		window.open("login.html", "_self");
	})
	//购物车列表展示设置
	var show = null;

	function hideCar() {
		show = setTimeout(function() {
			$("#carList").fadeOut(1000);
			var goodCarArry = [];
			//获取当前购物车数据
			for(var i = 0; i < $(".itemGoodsNum").length; i++) {
				var goodItem = {
					"imgSrc": $($(".itemIcon img")[i]).attr("src"),
					"price": $($(".itemPriceNum")[i]).html(),
					"name": $($(".goodsNameCar")[i]).html(),
					"goodNum": $($(".itemGoodsNum")[i]).html()
				}
				goodCarArry.push(goodItem);
			}
			var goodsArryStr = JSON.stringify(goodCarArry);
			$.cookie('goods', goodsArryStr, {
				expires: 7
			});

		}, 500);

	}
	$("#carList").on({
		mouseover: function() {
			clearTimeout(show);
		},
		mouseout: hideCar
	})
	//搜索框事件
	// 搜索框记录
	var inputs = document.querySelector('#goodsText');
	var searchBtn = document.querySelector('.searchBtn');
	var sousuo = document.querySelector('#sousuo');

	function quchong(arr) {
		for(var i = 0; i < arr.length - 1; i++) {
			for(var j = i + 1; j < arr.length; j++) {
				if(arr[i] == arr[j]) {
					arr.splice(j, 1);
					j--;
				}
			}
		}
		return arr;
	}
	setInputText();

	function setInputText() {
		var inputsCookie = $.cookie('input');
		var inputsArry = inputsCookie == "null" || inputsCookie == undefined ? [] : JSON.parse(inputsCookie);
		$(searchBtn).click(function() {
			var inputText = $(inputs).val();
			if(inputText.trim().length > 0) {
				if(inputsArry.length > 9) {
					inputsArry.splice(0, 1);
					inputsArry.push(inputText);
				} else {
					inputsArry.push(inputText);
				}
				var newArry = quchong(inputsArry);

				$.cookie("input", JSON.stringify(newArry), {
					expires: 7
				})
			}
		})
		var inputHhtml = "";
		for(var i = 0; i < inputsArry.length; i++) {
			inputHhtml += "<p class='padingInput'> <a>" + inputsArry[i] + "</a></p>";
		}
		$(sousuo).html(inputHhtml);
	}

	var inputTextState = false;
	$(document).on("click", " .padingInput", function() {
		$(inputs).val($(this).children("a").html());
		inputText = true;

	})
	inputs.onfocus = function() {
		$(sousuo).slideDown();
		setInputText();

	}
	inputs.onblur = function() {
		if(inputTextState) {
			return;
		} else {
			$(sousuo).slideUp();
		}
	}
	//购物车显示隐藏事件
	$(".carBox").on({
		mouseover: function() {
			clearTimeout(show);
			$(".carListUl").html("");
			var goodsListInfo = $.cookie('goods');
			console.log(goodsListInfo);
			if(goodsListInfo != undefined && goodsListInfo != "null") {
				var goods = JSON.parse($.cookie('goods'));
				var html = "";
				for(var i = 0; i < goods.length; i++) {
					html += '<li class="fl"><div class="store clearfix"><span class="storeName">一号店</span>' +
						'<span class="goodsNums">共<i class="itemGoodsNum">' + goods[i].goodNum + '</i>件商品</span></div>' +
						'<div class="carItemInfo clearfix"><div class="itemIcon fl"><img src="' + goods[i].imgSrc +
						'" /></div><div class="itemInfo fl "><div class="chooseGood clearfix">' +
						'<div class="carItemTop clearfix"><p class="goodsNameCar fl">' + goods[i].name +
						'</p><div class="del fl">×</div></div><p class="colorSizeCar "><span class="color">深蓝</span>' +
						'<span class="size">140码</span> </p><div class="numPrice clearfix"><div class="setNum fl">' +
						'<div class="carAdd carDone fl">+</div><input type="text" class="fl carItemNum" name="carItemNum" value="' + goods[i].goodNum + '" />' +
						'<div class="carJian carDone fl">-</div></div><div class="itemPrice fr">￥<span class="itemPriceNum">' + goods[i].price +
						'</span></div></div></div></div></div><div class="news">参加一次促销，节约成本￥100元</div></li>';
				}
			}
			$(".carListUl").append(html);
			init();
			$("#carList").fadeIn(1000);
		},
		mouseout: hideCar
	})

	//页面初始化，购物车操作事件
	function init() {
		//购物车商品项删除
		$(".del").click(function() {
			$(this).parents("li").remove();
			emptyCar();
			setCarTotal();
			$.cookie('goods', null);
			var goodsArry = [];
			for(var i = 0; i < $(".carListUl li").length; i++) {
				var srcPath = $($(".carListUl li")[i]).find(".itemIcon").children("img").attr("src");
				var goodItem = {
					"imgSrc": srcPath,
					"name": $($(".carListUl li")[i]).find(".goodsNameCar").html(),
					"price": $($(".carListUl li")[i]).find(".itemPriceNum").html()
				}
				goodsArry.push(goodItem);
				var goodsArryStr = JSON.stringify(goodsArry);
				$.cookie('goods', goodsArryStr, {
					expires: 7
				});
			}

		})
		emptyCar();
		/*判断是否存在商品*/
		function emptyCar() {
			if($(".carListUl").children().length == 0) {
				$(".carPay").hide();
				$(".empty").show();

			} else {
				$(".carPay").show();
				$(".empty").hide();
			}
		}

		//进入页面时计算总价及商品数量
		setCarTotal();

		function setCarTotal() {
			var nowMoney = 0;
			var nowGoodsNum = 0;
			for(var i = 0; i < $(".itemPriceNum").length; i++) {
				$(".itemPriceNum").index = i;
				nowMoney += parseInt($($(".itemPriceNum")[i]).html()) * parseInt($($(".itemGoodsNum")[i]).html());
				nowGoodsNum += parseInt($($(".itemGoodsNum")[i]).html());
			}
			$(".totalMoney").html(nowMoney);
			$(".totalNum").html(nowGoodsNum);
		}

		//购物车价格计算
		var carItemNumArry = $(".carItemNum"); //商品数量
		var itemPriceNumArry = $(".itemPriceNum"); //商品单价
		var carAddArry = $(".carAdd"); //加号
		var carJianArry = $(".carJian"); //减号
		var carItemNumArry = $(".carItemNum"); //商品数量
		var itemGoodsNumArry = $(".itemGoodsNum"); //商品个数
		//加号点击
		for(var i = 0; i < carAddArry.length; i++) {
			carAddArry[i].index = i;
			$(carAddArry[i]).click(function() {
				var currentTotalMonry = parseInt($(".totalMoney").html()); //获取点击加号前的全部商品总价
				var currentTotalNum = parseInt($(".totalNum").html()); //获取点击加号前的全部商品总量
				var carItemNum = parseInt($(carItemNumArry[this.index]).val()); //单个商品数量
				carItemNum++; //单个商品数量增加
				$(carItemNumArry[this.index]).val(carItemNum); //设置当前点击加号的单个商品数量的输入框
				$(itemGoodsNumArry[this.index]).html(carItemNum); //设置当前点击加号的单个商品数量的显示文本
				var totalMoney = parseInt($(itemPriceNumArry[this.index]).html()) + currentTotalMonry; //设置全部商品总价
				$(".totalMoney").html(totalMoney); //增加后设置钱数
				currentTotalNum++; //全部商品个数增加
				$(".totalNum").html(currentTotalNum); //增加后设置全部商品个数
			})
		}
		//减号点击
		for(var i = 0; i < carJianArry.length; i++) {
			carJianArry[i].index = i;
			$(carJianArry[i]).click(function() {
				var currentTotalMonry = parseInt($(".totalMoney").html()); //获取点击加号前的全部商品总价
				var currentTotalNum = parseInt($(".totalNum").html()); //获取点击加号前的全部商品总量
				var carItemNum = parseInt($(carItemNumArry[this.index]).val()); //单个商品数量
				if(carItemNum <= 1) {
					$("#num").val(1);
					return;
				} else {
					carItemNum--; //单个商品数量减少
					$(carItemNumArry[this.index]).val(carItemNum); //设置当前点击加号的单个商品数量的输入框
				}
				$(itemGoodsNumArry[this.index]).html(carItemNum); //设置当前点击加号的单个商品数量的显示文本
				totalMoney = currentTotalMonry - parseInt($(itemPriceNumArry[this.index]).html()); //设置全部商品总价
				$(".totalMoney").html(totalMoney); //增加后设置钱数
				currentTotalNum--; //全部商品个数减少
				$(".totalNum").html(currentTotalNum); //增加后设置全部商品个数
			})
		}
		//商品数量输入
		var num = /^[1-9]+$/

		for(var i = 0; i < carItemNumArry.length; i++) {
			carItemNumArry[i].index = i;
			var oldNum;
			$(carItemNumArry[i]).focus(function() {
				oldNum = parseInt($(this).val());
			}).blur(function() {
				var ifs = num.test($(this).val());
				var price = parseInt($(itemPriceNumArry[this.index]).html());
				if(!ifs) {
					$(this).val(oldNum);
					return;
				} else {
					var newNum = parseInt($(this).val());
					$(itemGoodsNumArry[this.index]).html(newNum);
					var nu = Math.abs(oldNum - newNum);
					if(oldNum > newNum) {
						$(".totalMoney").html(parseInt($(".totalMoney").html()) - nu * price);
						$(".totalNum").html(parseInt($(".totalNum").html()) - nu);
					} else {
						$(".totalMoney").html(parseInt($(".totalMoney").html()) + nu * price);
						$(".totalNum").html(parseInt($(".totalNum").html()) + nu);

					}

				}
			})
		}

	}

})