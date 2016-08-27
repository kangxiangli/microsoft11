/**
 * Created by hulijuan on 2016/8/10.
 */
$(function(){
    micro.btnSkip();
    micro.swicthPlace();
    micro.initBack();
    micro.clickAdd();
});
var mango = new Mango($('#wp'));
var  micro = {
    cityObj:{
        dalu:"大陆",
        taiwan:"台湾",
        xianggang:"香港",
        meiguo:"美国"
    },
    initBack:function(){
        var  para = location.hash;
        if(para == '#add'){
            mango.move = true;
            mango.moveTo(1,true);
        }else{
            mango.move = true;
            mango.moveTo(3,true);
        }

    },
    btnSkip:function(){
        $(".btns.btn2").on("tap",function(){
            mango.moveTo(1,true);
        });
        $(".btns.btn3").on("tap",function(){
            mango.moveTo(2,true);
        });
    },

    //第五页选项切换效果
    swicthPlace:function(){
        $(".pg5-box li").on("tap",function(){
            location.href = "posList.html#"+$(this).attr("id");;
        });
    },
    // 点击城市进入相应的地点页
    clickAdd:function(){
      $('.cities-box li a').each(function(index , item){
        $(item).off('click').on('click' , function(){
          // window.open('plan.html');
          location.href = 'plan.html';
        })
      })
    }


}
