
window.onload = function () {
    // 轮播图
    var obj = {
        li: document.querySelectorAll('.lbt>li'),
        left: document.querySelector('.lbt>.left'),
        right: document.querySelector('.lbt>.right'),
        span: document.querySelectorAll('.lbt>.dot>span'),
        lbt: document.querySelector('.new')
    }
    var num = 0,
        index = 0
    obj.left.onclick = function () {
        fn(false)
    }
    obj.right.onclick = function () {
        fn(true)
    }
    function fn(a) {

        if (a) {
            num = index
            index++
            if (index > 3) index = 0
        } else {
            num = index
            index--
            if (index < 0) index = 3
        }
        
        obj.li[num].style.display = 'none'
        obj.li[index].style.display = 'block'
        obj.span[num].style.backgroundColor = 'white'
        obj.span[num].style.color = '#333'
        obj.span[index].style.backgroundColor = '#333'
        obj.span[index].style.color = 'white'
        num = index
    }
    var tim = setInterval(function () {
        fn(true)
    }, 3000)
    obj.lbt.onmouseenter = function () {
        clearInterval(tim)
    }
    obj.lbt.onmousemove = function () {
        clearInterval(tim)
    }
    obj.lbt.onmouseleave = function () {
        tim = setInterval(function () {
            fn(true)
        }, 3000)
    }
    for (var i = 0; i < obj.span.length; i++) {
        obj.span[i].index = i
        obj.span[i].onmouseenter = function () {
            obj.li[index].style.display = 'none'
            obj.li[this.index].style.display = 'block'    
            obj.span[index].style.backgroundColor = 'white'
            obj.span[index].style.color = '#333'
            obj.span[this.index].style.backgroundColor = '#333'
            obj.span[this.index].style.color = 'white'
            num = index
            index = this.index
            console.log(this.index)
        }

    }
    var h3 = document.querySelector('#logo-bottom>.h3'),
        ul = document.querySelector('#logo-bottom>.secondary')
    h3.onmouseenter=function(){
        ul.style.display='block'
    }
    h3.onmouseleave=function(){
        ul.style.display = 'none'
    }
    ul.onmouseenter = function () {
        ul.style.display = 'block'
    }
    ul.onmouseleave = function () {
        ul.style.display = 'none'
    }
    // 鼠标移到图片时会向右平移
    var $arr = $('#center img')
    $arr.addClass('pou')
    $.each($arr,function(i,n){
        $($arr[i]).hover(function(){
            $(this).stop().animate({
               
                left:30
            })
        },function(){
                $(this).stop().animate({

                    left: 0
                })
        })
    })
//
//	    // 让搜索栏固定定位
//  var search = document.querySelector('.content')
    var top=document.querySelector('#top')
//  var reg=/\bfix\b/
//  var clas=search.className
//  if (document.documentElement.scrollTop > 1100) {
//      search.className += ' fix'
//  } else {
//      search.className = clas
//  }
    if (document.documentElement.scrollTop > 3200) {
        top.style.display = 'block'
    } else {
        top.style.display = 'none'
    }
    window.onscroll=function(){
//      if (document.documentElement.scrollTop>1100){
//          var cla = search.className
//          if(reg.test(cla)){
//
//          }else{
//              search.className += ' fix'
//          }
//          
//      }else{
//          search.className = clas
//      }
        if (document.documentElement.scrollTop>3200){
            top.style.display='block'
        }else{
            top.style.display = 'none'
        }
    }
    top.onclick=function(e){
       gun=setInterval(tims,20)  
        $('document').bind('mousewheel', function (event, delta) { return false; });    
    }
   
    function tims() {
        
        var top = 50
        document.documentElement.scrollTop -= top
        if (document.documentElement.scrollTop<=0){
            document.documentElement.scrollTop=0
            clearInterval(gun)
        }
    }

    
    //页面跳转
    $("#goList").click(function  () {
    	window.open("goodsList.html","_self");
    })
}

