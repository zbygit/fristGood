$(function() {
	//加载公共样式
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	var goodIndex = window.location.search.split("=")[1];
	$.ajax({
		type: "get",
		url: "./js/package.json",
		async: true,
		success: function(data) {
			$(".imgShow").attr("src", data[goodIndex].imgescr);
			$("#imgPath").val(data[goodIndex].imgescr);
			$("#currentImg").attr("src", data[goodIndex].imgescr);
			$("#det_name").html(data[goodIndex].name);
			$("#det_other").html(data[goodIndex].det_other);
			$("#price").html(data[goodIndex].price);
			$("#referPrice").html(data[goodIndex].reference);
		}
	});

	//加入购物车
	$("#car").click(function() {
		var goodNames = $("#det_name").html();
		var num = +$("#num").val();
		var goodsArry = ($.cookie('goods') == "null") || ($.cookie('goods') == undefined) ? [] : JSON.parse($.cookie('goods'));
		var goodItem = {
			"imgSrc": "./" + $("#imgPath").val(),
			"price": $("#price").html(),
			"name": $("#det_name").html(),
			"goodNum": num
		}

		//判断商品是否已经存在，不存在为真，存在为假
		var notHave = true;
		//判断数据长度，
		if(goodsArry.length > 0) {
			//长度大于0时进行商品存在验证，如果存在，将当前的商品个数增加
			for(var i = 0; i < goodsArry.length; i++) {
				if(goodsArry[i].name == goodItem.name) {
					console.log(parseInt(goodsArry[i].goodNum));
					goodsArry[i].goodNum = parseInt(goodsArry[i].goodNum) + num;
					notHave = false;
				}
			}
			//				如果不存在,将新数据添加到数组中
			if(notHave) {
				goodsArry.push(goodItem);
				notHave = false;
			}
		} else { //如果长度为0直接添加新数据
			goodsArry.push(goodItem);
		}
		goodsArryStr = JSON.stringify(goodsArry);
		$.cookie('goods', goodsArryStr, {
			expires: 7
		});
		layer.msg('该商品已加入购物车，您可前往购物车查看', {
			icon: 1,
			offset: 'c',
			time: 3000
		});
		console.log(goodNames);
		console.log(goodsArry);
	})
	//左侧商品名称显示
	$.each($(".likeGood"), function(i, item) {
		$(this).mouseenter(function() {
			$(this).children(".nameAll").fadeIn();
		}).mouseleave(function() {
			$(this).children(".nameAll").fadeOut();
		})
	});
	//商品图片展示切换
	for(var i = 0; i < $(".smallIcon").length; i++) {
		$($(".smallIcon")[i]).mouseover(function() {
			$(this).addClass('smallIconActive').parent().siblings().children().removeClass("smallIconActive");
			$(".imgShow").attr("src", $(this).attr("src"));
		})
	}
	//分享
	$("#share").hover(function() {
		$(".shareWay").fadeToggle();
	})
	//关注商品
	var focus = 0;
	$("#focus").click(function() {
		focus++;
		if(focus % 2 == 1) {
			$(this).css("background", "url(image/public/fous_yes.png)no-repeat 12px center");
		} else {
			$(this).css("background", "url(image/public/fous_no.png) no-repeat 12px center");

		}
	})
	//组合套餐
	var goodsPriceArry = [10, 20, 30]; //商品单价
	var checkArry = $(":checkbox");

	for(var i = 0; i < checkArry.length; i++) {
		checkArry[i].index = i;
		$(checkArry[i]).click(function() {
			setTotalPrice();
		});
	}

	function setTotalPrice() {
		var priceAll = 0;
		var chooseItem = [];
		for(var i = 0; i < checkArry.length; i++) {
			checkArry[i].index = i;
			if($(checkArry[i]).prop("checked")) {
				chooseItem.push(checkArry[i].index);
			}
		}
		for(var i = 0; i < chooseItem.length; i++) {
			priceAll += goodsPriceArry[chooseItem[i]] * parseInt($("#totalGroup").val());
		}
		$("#priceAll").html(priceAll);
	}
	var num = /^[1-9]+$/
	var oldNum, newNum;
	$("#totalGroup").on({
		"focus": function() {
			oldNum = $(this).val();
		},
		"blur": function() {
			newNum = $(this).val();
			if(!num.test(newNum)) {
				$(this).val(oldNum)
			} else {
				setTotalPrice();
			}
		}
	})

	//尺码及颜色选择
	$("#sizeList li").click(function() {
		$(this).addClass("choose").siblings().removeClass("choose");
	})
	$("#colorList li").click(function() {
		$(this).addClass("choose").siblings().removeClass("choose");
	})
	//选项切换
	$.each($(".changeArea li"), function(i, item) {
		$(this).click(function() {
			$(this).addClass("areaActive").siblings().removeClass("areaActive");
			console.log($(this).index());
			$(".showContent>div:eq(" + $(this).index() + ")").show().siblings().hide();
		})
	});

	//数量增加/减少
	$("#up").click(function() {
		var newNum = parseInt($("#num").val());
		newNum++;
		$("#num").val(newNum)
	})

	$("#num").on({
		"focus": function() {
			oldNum = $(this).val();
		},
		"blur": function() {
			newNum = $(this).val();
			if(!num.test(newNum)) {
				$(this).val(oldNum)
			}
		}
	})
	$("#down").click(function() {
		var newNum = parseInt($("#num").val());
		if(newNum <= 1) {
			$("#num").val(1);
			return;
		} else {
			newNum--;
			$("#num").val(newNum);
		}
	})

	//好评度
	var cooment = parseInt($("#good").html()) + parseInt($("#center").html()) + parseInt($("#poor").html());
	$("#bigNum").html(parseInt(parseInt($("#good").html()) / cooment * 100) + "%");
	for(var i = 0; i < $(".proCon").length; i++) {
		$(".proCon")[i].index = i;

		$($(".proCon")[i]).css("width", parseInt(parseInt($($(".comNum")[i]).html()) / cooment * 100) + "%");
	}

	//评论
	$("#startWrite").click(function() {
		$("#msgBox").fadeIn(100);
	})
	//设置头像
	for(var i = 0; i < $("#face img").length; i++) {
		$($("#face img")[i]).click(function() {
			$(this).addClass("current").siblings().removeClass("current");
		})
	}
	//发送平轮
	$("#sendBtn").click(function() {
		var userName = $("#userName").val(),
			userIcon = $(".current").attr("src"),
			userText = $("#conBox").val();
		userName = userName == "" ? "匿名用户" : userName;
		if(userText != "") {
			var myDate = new Date();
			var da = myDate.getDate();
			var mon = myDate.getMonth() + 1
			mon = mon < 10 ? "0" + mon : mon;
			da = da < 10 ? "0" + da : da;
			var dates = myDate.getFullYear() + "-" + mon + "-" + da;
			var html = '<li class="fl"><div class="uesrInfo fl">' +
				'<p> <img class="userImg" src="' + userIcon + '" /><span>' + userName +
				'</span></p></div><div class="goodsBase fl"><p>颜色分类:红色</p><p>型号:43cm</p>' +
				'</div><div class="commentText fl">' +
				'<p>' + userText + '</p><p>' + dates + '</p></div></li>';
			$(".commentlist").append(html);

			$("#userName").val(""),
				$(".current").attr("src", "image/public/face1.gif"),
				$("#conBox").val("");
			$("#msgBox").fadeOut(100);
		} else {
			alert("既然来了就随便说点啥吧！！！");
		}

	})
	//取消发送
	$("#closeBtn").click(function() {
		$("#userName").val(""),
			$(".current").attr("src", "image/public/face1.gif"),
			$("#conBox").val("");
		$("#msgBox").fadeOut(100);
	})

})