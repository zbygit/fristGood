window.onload = function() {

	//加载公共样式
	$("#header").load("header.html");
	$("#footer").load("footer.html");

	var html = "";
	$.ajax({
			type: "get",
			url: "./js/package.json",
			success: function(a) {
				for(var i = 0; i < a.length; i++) {
					html += '<li><img src="' + a[i].imgescr + '" /><p class="price">￥' + a[i].price + '</p><p class="listItemName" title="'+a[i].name+'" dataIndex="' + i + '">' + a[i].name + '</p>' +
						'<p class="do clearfix"><span class="collection"dataCol="' + i + '">收藏</span><span class="addCar">加入购物车</span></p> </li>';
				}
				$(".goodsListUl").html(html);
				init();
			}
		}

	)

	//筛选条件选择事件
	function setChoosed(obj, cla) {
		$.each(obj, function() {
			$(this).click(function() {
				$(this).addClass(cla).siblings().removeClass(cla);

				var li = '<span class="whatSet">' + $(this).parent().attr("dataClass") +
					'：</span><span class="setValue">' + $(this).html() + '</span><span class="setDel">×</span>';
				switch($(this).parent().attr("dataNum")) {
					case "0":
						$(".setList").children().eq(0).html(li);
						$(".setList").children().eq(0).css("border", " 1px dashed #FF0036");
						break;
					case "1":
						$(".setList").children().eq(1).html(li);
						$(".setList").children().eq(1).css("border", " 1px dashed #FF0036");
						break;
					case "2":
						$(".setList").children().eq(2).html(li);
						$(".setList").children().eq(2).css("border", " 1px dashed #FF0036");

						break;
					case "3":
						$(".setList").children().eq(3).html(li);
						$(".setList").children().eq(3).css("border", " 1px dashed #FF0036");

						break;
					default:
						break;
				}
			})
		})
	}
	//点击删除选择条件
	$(document).on("click", ".setDel", function() {
		$(this).parent().css("border", "none");
		var index = $(this).parent().attr("dataIndex");
		$(".contentList").eq(index).children().removeClass();
		$(this).parent().empty();
		var htmlArray = [];
		$.each($(".setList li"), function() {
			if($(this).html().length > 0) {
				htmlArray.push($(this).html());
			}
		})
		if(htmlArray.length == 0) {
			$("#setInfo").fadeOut();
		}
	})

	setChoosed($(".brandList li"), "pin_Active");
	setChoosed($(".priceList li"), "price_Active");
	setChoosed($(".colorList li"), "color_Active");
	setChoosed($(".classList li"), "class_Active");

	//设置筛选显示
	$(".contentList li").click(function() {
		$("#setInfo").fadeIn();
	})

	//历史记录列表名称
	$.each($(".likeGood"), function(i, item) {
		$(this).mouseenter(function() {
			$(this).children(".nameAll").fadeIn();
		}).mouseleave(function() {
			$(this).children(".nameAll").fadeOut();
		})
	});
	//初始化
	function init() {
		//收藏
		$.each($(".collection"), function() {
			$(this).click(function() {
				var collArry = ($.cookie('coll') == "null") || ($.cookie('coll') == undefined) ? [] : JSON.parse($.cookie('coll'));
				var dataCol = $(this).attr("dataCol");
				if($(this).hasClass("true")) {
					$(this).removeClass("true");
					var index = collArry.indexOf(dataCol);
					if(index > -1) {
						collArry.splice(index, 1);
					}
				} else {
					$(this).addClass("true");
					collArry.push(dataCol);
				}
				$.cookie('coll', JSON.stringify(collArry), {
					expires: 7
				});

			})
		})
		var coll = $.cookie("coll");
		if(coll != "null" & coll != undefined) {
			var colIndex = JSON.parse($.cookie('coll'));
			for(var i = 0; i < colIndex.length; i++) {
				$($(".collection")[colIndex[i]]).addClass("true");
			}
		}
		//进入详情页
		$(".listItemName").click(function() {
			window.open("details.html?goodIndex=" + $(this).attr("dataIndex"), "_self");
		})
		//加入购物车
		var goodNum = 1;
		$.each($(".addCar"), function() {
			$(this).click(function() {
				var goodsArryStr;
				var goodsArry = ($.cookie('goods') == "null") || ($.cookie('goods') == undefined) ? [] : JSON.parse($.cookie('goods'));
				var goodItem = {
					"imgSrc": "./" + $(this).parent().prevAll("img").attr("src"),
					"price": $(this).parent().prevAll(".price").html().split("￥")[1],
					"name": $(this).parent().prevAll(".listItemName").html(),
					"goodNum": goodNum
				}
				//判断商品是否已经存在，不存在为真，存在为假
				var notHave = true;
				//判断数据长度，
				if(goodsArry.length > 0) {
					//长度大于0时进行商品存在验证，如果存在，将当前的商品个数增加
					for(var i = 0; i < goodsArry.length; i++) {
						if(goodsArry[i].name == goodItem.name) {
							goodsArry[i].goodNum = parseInt(goodsArry[i].goodNum) + 1;
							notHave = false;
						}
					}
					//	如果不存在,将新数据添加到数组中
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
			})
		})
	}
}