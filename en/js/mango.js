/**
 * Created by Administrator on 2016/7/18.
 */
var d = {
    event:{
        mouseWheel:'mouseWheel',
        key:'key',
        touch:'touch'
    },//绑定事件
    der:0.1,//拖动的范围
    page:'.page',//默认class
    moveCssObj:'.con',//有css3动画的class
    dir:'l',//运动方向，v --> 垂直; l --> 水平
    movementForm:'cube',//运动形式 ， slide --> 滑动；hideIn --> 淡入淡出； cube --> 魔方
    start:0, //开始的贞 数字
    isClick:true,//是否允许click事件
    duration:500,//运动时间，单位毫秒
    isLoop:false,//是否循环,
    preLoad:[],//预加载图片的url数组
    preCallback:function(){},//预加载的回调
    change:function(data){
        if(data.cur == 2){
            document.title = '这是第三章页面';
        }
    },//正在运动
    beforeChange:function(data){
        if(data.next == 2){
            document.title='这是第二章页面';
        }
    },//运动前
    afterChange:function(data){
        if(data.prev == 2){
            document.title='这是第4章页面';
        }
    }//运动之后
};

function preventdefault(e){
    //一般用在鼠标或键盘事件上
    if(e && e.stopPropagation){
        //W3C取消冒泡事件
        e.stopPropagation();
        e.preventDefault();
    }else{
        //IE取消冒泡事件
        window.event.cancelBubble = true;
    }
};
function Mango(obj,option){
    this.obj = obj;//最外面的盒子对象
    this.o = option || {};//传参
    //默认值start
    this.o.event = this.o.event || {  mouseWheel:'mouseWheel',
                                    key:'key',
                                    touch:'touch'};
    this.o.der =this.o.der ||  0.1;
    this.o.page = this.o.page || '.page';
    this.o.moveCssObj = this.o.moveCssObj || '.con';
    this.o.dir = this.o.dir || 'v';
    this.o.movementForm = this.o.movementForm || 'slide';
    this.o.start = this.o.start || 0;
    this.o.duration = this.o.duration || 500;
    this.o.isLoop = this.o.isLoop || false;
    this.o.preLoad = this.o.preLoad || [];
    this.o.preCallback = this.o.preCallback || function(){};
        //默认值end
    this.pages = this.obj.find(this.o.page);//所有的pages
    this.pagesLength = this.pages.length;//page的个数
    this.parent = this.obj.parent();//盒子的父级
    this.width = this.parent.width();//宽度
    this.height = this.parent.height();//高度
    this.startY = 0;
    this.startX = 0;
    this.disX = 0;
    this.disY = 0;
    this.sub = 0;
    this.cur = -1;
    this.next = 1;
    this.prev = 0;
    this.flage = false;
    this.stopMove = true;
    this.move = true;
    this.init();
};
Mango.prototype.init = function(){
    //判断浏览器
    var that = this;
    var agent = navigator.userAgent.toLowerCase();//获取浏览器信息
    var reIe = new RegExp("msie (\[56789]\\.\\d+);");
    that.isIe = reIe.test(agent);
    that.ff = agent.indexOf('firefox');
    if(that.isIe){
        //低级浏览器
        that.isIeLower = true;
    }else{
        //高级浏览器
        that.isIeLower = false;//是否是低级浏览器
    }
    that.update();
};
Mango.prototype.update = function(){
    var that = this;
    that.height = $(window).height();
    that.width = $(window).width();
    if(that.o.dir == 'l' && that.o.movementForm == 'slide'){
        that.pages.width(that.width);
        that.obj.width(that.width * that.pagesLength);
    }
    if(that.o.movementForm == 'hideIn'){
        for(var i = 0;i<that.pagesLength;i++){
            that.pages.eq(i).css({
                'z-index':(that.pagesLength - i),
                'opacity':'0'
            });
        }
    }
    if(that.o.movementForm == 'cube'){
        that.o.dir == 'l' && that.pages.addClass('cube-page-l');
        that.obj.addClass('cube');
    }
    that.pages.height(that.height);
    that.eventInit();
    //that.moveTo(that.o.satart,true);
    function callBack(){
        that.o.preCallback();
        that.moveTo(that.o.satart,true);
    }
    that.preload(that.o.preLoad,callBack);
};
Mango.prototype.eventInit = function(){
    var that = this;
    if(that.o.event.mouseWheel === 'mouseWheel'){
        that.mouseHandle();
    }
    if(that.o.event.key === 'key'){
        that.keyHandle();
    }
    if(that.o.event.touch === 'touch'){
        that.touchHandle();
    }
};
Mango.prototype.touchHandle = function(){
    var that = this;
    that.obj.on('touchstart',function(e){
        that.startX = e.targetTouches[0].pageX;
        that.startY = e.targetTouches[0].pageY;
        //preventdefault(e);
    });
    that.obj.on('touchend',function(e){
        that.disX = e.changedTouches[0].pageX - that.startX;
        that.disY = e.changedTouches[0].pageY - that.startY;
        that.sub = that.o.dir === 'v' ? that.disY/that.height : that.disX/that.width;
        if(Math.abs(that.sub) > that.o.der){
            that.moveTo();
        }
        //preventdefault(e);
    });
};
Mango.prototype.keyHandle = function(){
    var that = this;
    $(document).on('keyup',function(e){
        var oEvent = e || event;
        switch(oEvent.keyCode){
            case 37:
                that.sub=1;
                that.moveTo();
                //preventdefault&&preventdefault(oEvent);
                break;
            case 38:
                that.sub=1;
                that.moveTo();
                //preventdefault&&preventdefault(oEvent);
                break;
            case 39:
                that.sub=-1;
                that.moveTo();
                //preventdefault&&preventdefault(oEvent);
                break;
            case 40:
                that.sub=-1;
                that.moveTo();
                //preventdefault&&preventdefault(oEvent);
                break;
        }
    });
};
Mango.prototype.mouseHandle = function(){
    var that = this;
    function moveMouse(e){
        var oEvent = e || window.event;
        var bDown = oEvent.wheelDelta ? oEvent.wheelDelta < 0 : oEvent.detail > 0;
        that.sub = bDown ? -1 : 1;
        if(Math.abs(that.sub) > that.o.der){
            that.moveTo();
        }
        //preventdefault && preventdefault(oEvent);
    }
    if(typeof document.addEventListener != "undefined"){
        if(that.ff < 0){
            that.obj[0].addEventListener('mousewheel',moveMouse);
        }else{
            that.obj[0].addEventListener('DOMMouseScroll',moveMouse);
        }
    }else{
        ///that.obj[0].attachEvent('mousewheel',moveMouse);
        that.obj[0].onmousewheel = moveMouse;
    }
};
Mango.prototype.moveTo = function(next,noamin){
    var that = this;
    var cur = that.cur;
    if(that.move == false || that.stopMove == false){return false;}
    that.indexChange(next);
    //console.log(that.prev,that.cur,that.next);
    if(cur == that.cur && !that.o.isLoop){return false;}
    that.o.beforeChange && that.o.beforeChange({
        next: that.next,
        cur: that.cur,
        that:that
    });
    that.image();
    if(that.o.movementForm == 'slide'){
        if(that.isIeLower == true){
            that.moveIe(noamin);
            that.obj.addClass('fullPage-wp-ie');
        }else{
            that.moveSlid(noamin);
            that.obj.addClass('fullPage-wp');
        }
        that.pages.addClass('fullPage-page');
        if(that.o.dir == 'l'){
            that.pages.addClass('fullPage-dir-h')
        }
    }else if(that.o.movementForm == 'hideIn'){
        that.momveHideIn();
        that.obj.addClass('fullpage-hideIn-wp');
        that.pages.addClass('hideIn-page');
    }else if(that.o.movementForm == 'cube'){
        that.moveCube(noamin);
    }
    that.change();
    var timmer = setTimeout(function() {
        clearTimeout(timmer);
        that.after();
        that.move=true;
    }, that.o.duration);
    that.move=false;
};
Mango.prototype.moveSlid = function(noamin){
    var that = this;
    var xPx = 0, yPx = 0;
    that.o.dir === 'v' ?  yPx = -that.cur * that.height:xPx = -that.cur * that.width;
    that.obj.css({
        'WebkitTransform' : 'translate3d('+xPx+'px,'+yPx+'px,0)',
        '-webkit-transform' : 'translate3d('+xPx+'px,'+yPx+'px,0)',
        'transform' : 'translate3d('+xPx+'px,'+yPx+'px,0)'
    });
    if(!noamin){
        if(!that.obj.hasClass('anim')){
            that.obj.addClass('anim');
        }
    }else{
        if(that.obj.hasClass('anim')){
            that.obj.removeClass('anim');
        }
    }
};
Mango.prototype.moveIe = function(noamin){
    var that = this;
    var xPx = 0, yPx = 0;
    if(that.o.dir === 'v'){
        yPx = -that.cur * that.height;
        if(!noamin){
            that.obj.animate({
                'top' : yPx+'px'
            },that.o.duration);
        }else{
            that.obj.css({
                'top' : yPx+'px'
            });
        }
    }else{
        xPx = -that.cur * that.width;
        if(!noamin){
            that.obj.animate({
                'left' : xPx+'px'
            },that.o.duration);
        }else{
            that.obj.css({
                'left' : xPx+'px'
            });
        }
    }
};
Mango.prototype.moveCube = function(noamin){
    var that = this;
    var height = $(window).height()/2;
    var width = $(window).width()/2;
    var oCur = that.pages.eq(that.prev);
    var oNext = that.pages.eq(that.cur);
    if(that.sub ==  0){
        that.pages.eq(that.cur).show().css('z-index','2');
        if(that.o.dir == 'v'){
            that.pages.eq(that.next).css({
                '-webkit-transform':'rotateX(-90deg) translateY('+height+'px) translateZ('+height+'px)',
                'transform':'rotateX(-90deg) translateY('+height+'px) translateZ('+height+'px)'
            }).show();
        }
        if(that.o.dir == 'l'){
            that.pages.eq(that.next).css({
                '-webkit-transform':'rotateY(90deg) translateX('+width+'px) translateZ('+width+'px)',
                'transform':'rotateY(90deg) translateX('+width+'px) translateZ('+width+'px)'
            }).show();
        }
        return false;
    }
    if(that.o.dir == 'v'){
        if(that.sub < 0){
            that.ani(oNext,{
                '-webkit-transform':'rotateX(-90deg) translateY('+height+'px) translateZ('+height+'px)',
                'transform':'rotateX(-90deg) translateY('+height+'px) translateZ('+height+'px)'
            },30,function(){
                oNext.show();
                that.ani(oCur,{
                    '-webkit-transform':'rotateX(90deg) translateY(-'+height+'px) translateZ('+height+'px)',
                    'transform':'rotateX(90deg) translateY(-'+height+'px) translateZ('+height+'px)',
                    'z-index':'2'
                },50);
                that.ani(oNext,{
                    '-webkit-transform':'rotateX(0deg) translateY(0px) translateZ(0px)',
                    'transform':'rotateX(0deg) translateY(0px) translateZ(0px)',
                    'display':'block',
                    'z-index':'0'
                },50);
            });
        }
        if(that.sub > 0){
            oNext.css({
                'transform':'rotateX(90deg) translateY(-'+height+'px) translateZ('+height+'px)'
            }).show();
            var timmer3 = setTimeout(function(){
                clearTimeout(timmer3);
                oCur.css({
                    '-webkit-transform':'rotateX(-90deg) translateY('+height+'px) translateZ('+height+'px)',
                    'transform':'rotateX(-90deg) translateY('+height+'px) translateZ('+height+'px)',
                    'z-index':'2'
                });
                oNext.css({
                    '-webkit-transform':'rotateX(0deg) translateY(0px) translateZ(0px)',
                    'transform':'rotateX(0deg) translateY(0px) translateZ(0px)',
                    'display':'block',
                    'z-index':'0'
                });
            },30);
        }
    }
    if(that.o.dir == 'l'){
        if(that.sub < 0){
            oNext.css({
                '-webkit-transform':'rotateY(90deg) translateX('+width+'px) translateZ('+width+'px)',
                'transform':'rotateY(90deg) translateX('+width+'px) translateZ('+width+'px)'
            }).show();
            var timmer4 = setTimeout(function(){
                clearTimeout(timmer4);
                oCur.css({
                    '-webkit-transform':'rotateY(-90deg) translateX(-'+width+'px) translateZ('+width+'px)',
                    'transform':'rotateY(-90deg) translateX(-'+width+'px) translateZ('+width+'px)',
                    'z-index':'2'
                });
                oNext.css({
                    '-webkit-transform':'rotateY(0deg) translateX(0px) translateZ(0px)',
                    'transform':'rotateY(0deg) translateX(0px) translateZ(0px)',
                    'display':'block',
                    'z-index':'0'
                });
            },30);
        }
        if(that.sub > 0){
            oNext.css({
                '-webkit-transform':'rotateY(-90deg) translateX(-'+width+'px) translateZ('+width+'px)',
                'transform':'rotateY(-90deg) translateX(-'+width+'px) translateZ('+width+'px)'
            }).show();
            var timmer3 = setTimeout(function(){
                clearTimeout(timmer3);
                oCur.css({
                    '-webkit-transform':'rotateY(90deg) translateX('+width+'px) translateZ('+width+'px)',
                    'transform':'rotateY(90deg) translateX('+width+'px) translateZ('+width+'px)',
                    'z-index':'2'
                });
                oNext.css({
                    '-webkit-transform':'rotateY(0deg) translateX(0px) translateZ(0px)',
                    'transform':'rotateY(0deg) translateX(0px) translateZ(0px)',
                    'display':'block',
                    'z-index':'0'
                });
            },30);
        }
    }
    var timmer = setTimeout(function(){
        clearTimeout(timmer);
        oCur.hide().css('z-index','0');
        oNext.css({
            'z-index':'2'
        });
    },200);

};
Mango.prototype.momveHideIn = function(){
    var that = this;
    var curZindex = that.pagesLength - 1;
    var nextZindex = that.pagesLength - 2;
    var prevZindex = that.pagesLength - 3;
    for(var i = 0;i < that.pagesLength;i++){
        that.pages.eq(i).css('z-index',0);
        if(i == that.cur){
            that.pages.eq(i).css('z-index',curZindex);
            that.pages.eq(i).animate({'opacity':'1'},that.o.duration);
        }
        if(i == that.next){
            that.pages.eq(i).css('z-index',nextZindex);
        }
        if(i == that.prev){
            that.pages.eq(i).css('z-index',prevZindex);
            that.pages.eq(i).animate({'opacity':'0'},that.o.duration)
        }
    }
};
Mango.prototype.indexChange = function(next){
    var that = this;
    var cur = that.cur;
    var prev = that.prev;
    that.prev = cur;
    that.fix();
    if(next || next==0){
        that.cur = next;
        that.flage = true;
    }
    if(that.prev == that.cur){
        that.prev = prev;
        that.cur = cur;
    }
};
Mango.prototype.fix = function(){
    var that = this;
    if(that.flage == false && that.sub > 0){return false;}
    if(that.sub > 0){
        that.cur -- ;
        that.flage = true;
    }
    if(that.sub < 0 || that.flage == false){
        that.cur ++ ;
        that.flage = true;
    }
    if(that.cur < 0  && !that.o.isLoop){
        that.cur = 0;
    }else if(that.cur < 0 && that.o.isLoop){
        that.cur = that.pagesLength-1;
    }
    if(that.cur > that.pagesLength-1 && !that.o.isLoop){
        that.cur = that.pagesLength-1;
    }else if(that.cur > that.pagesLength-1 && that.o.isLoop){
        that.cur = 0;
    }
    if(that.sub > 0){
        that.next = that.cur - 1;
    }
    if(that.sub < 0){
        that.next = that.cur + 1;
    }
    if(that.next < 0){
        that.next = that.pagesLength-1;
    }
    if(that.next > that.pagesLength-1){
        that.next = 0;
    }
};
Mango.prototype.stop = function(){
    var that = this;
    that.stopMove = false;
};
Mango.prototype.start = function(){
    var that = this;
    that.stopMove = true;
};
Mango.prototype.image = function(){
    var that = this;
    var oCur = that.pages.eq(that.cur);
    var aImage = oCur.find('img');
    for(var i = 0;i < aImage.length;i++){
        aImage.eq(i).attr('src',aImage.eq(i).attr('data-src'));
    }
};
Mango.prototype.testAnim = function(obj,x){
    obj.removeClass(x).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass(x);
    });
};
Mango.prototype.change = function(){
    var that = this;
    var aObj = that.pages.eq(that.cur).find(that.o.moveCssObj);
    if(that.isIe){
        for(var i = 0;i<aObj.length;i++){
            var index = i;
            (function(index){
                var obj = aObj.eq(index);
                obj.css('visibility','inherit');
            })(index);
        }
        return false;
    }
    for(var i = 0;i<aObj.length;i++){
        var index = i;
        (function(index){
            var obj = aObj.eq(index);
            var timmer = setTimeout(function(){
                obj.css('visibility','inherit');
                that.testAnim(obj,obj.attr('data-animate'));
                clearTimeout(timmer);
            },obj.attr('data-time'));
        })(index);
    }
    that.o.change && that.o.change({
        prev: that.prev,
        cur: that.cur,
        that:that
    });
};
Mango.prototype.after = function(){
    var that = this;
    if(that.prev == -1){return false;}
    var aObj = that.pages.eq(that.prev).find(that.o.moveCssObj);
    for(var i = 0;i<aObj.length;i++){
        aObj.eq(i).css('visibility','hidden');
    }
    that.o.afterChange && that.o.afterChange({
        prev: that.prev,
        cur: that.cur,
        that:that
    });
};
Mango.prototype.preload = function(arr,callBack){
    var count = 0;
    if(arr.length == 0){
        callBack();
        return false;
    }
    for(var i = 0;i < arr.length;i++){
        var oImage = new Image();
        oImage.src = arr[i];
        if(oImage.complete){
            count ++;
            if(count == arr.length){
                callBack();
            }
            return false;
        }
        oImage.onload = function(){
            count ++;
            if(count == arr.length){
                callBack();
            }
        };
    }
};
Mango.prototype.ani = function(obj,json,time,cb){
    var timmer = setTimeout(function(){
        clearTimeout(timmer);
        for(var key in json){
            obj.css(key,json[key]);
        }
        cb && cb();
    },time);
}
