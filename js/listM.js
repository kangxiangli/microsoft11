$(function(){
  listCon.goBack();
  listCon.switchItem();
  listCon.initPg6();
});

var listCon = {
  cityObj:{
      dalu:"大陆",
      taiwan:"台湾",
      xianggang:"香港",
      meiguo:"美国"
  },
  goBack:function(){
      $("#back").on("tap",function(){
          history.back();
      });
      $("#backIndex").on("tap",function(){
          location.href  = "mMicrosoft.html#1";
      });
  },
  //第六页选项切换效果
  switchItem:function(){
      //招聘类型效果切换
      $(".pg6-nav-box li").on("tap",function(){
          $(".pg6-nav-box .active").removeClass("active");
          $(this).addClass("active");
      });
      //向左按钮切换
      $(".last-btn").on("tap",function(){
          var cen = $(".center-con .show");
          var pre = $(".center-con .show").prev();
          if(pre.length){
              pre.addClass("show");
              cen.removeClass("show");
          }
          if($("#fst").hasClass("show"))
              $(this).addClass("btn-disabled");
          $(".next-btn").removeClass("btn-disabled");
      });

      //向右按钮切换
      $(".next-btn").on("tap",function(){
          var cen = $(".center-con .show");
          var next = $(".center-con .show").next();
          if(next.length){
              next.addClass("show");
              cen.removeClass("show");
          }
          if($("#lst").hasClass("show"))
              $(this).addClass("btn-disabled");
          $(".last-btn").removeClass("btn-disabled");
      });
      //城市效果切换
      $(".sec2 ul li").on("tap",function(){
          $(".sec2 ul .active").removeClass("active");
          $(this).addClass("active");
      });

      $(".sec3 ul li").on("tap",function(){
          location.href="posDetailM.html";
      });
  },
  initPg6:function(){
      var parastr = location.hash;
      var city = parastr.substr(1);
      $(".pg6-tit").html(this.cityObj[city]);
  }
}
