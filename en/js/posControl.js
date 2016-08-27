$(function(){
	//page3左侧菜单控制
	// pos.page3Menu();
	//page3内容上显示查看更多
	pos.caculateText();
	//page3查看收起更多控制
	pos.cutUp();
	// page3点击进入工作详情||点击城市的效果切换
	pos.showDetail();
	//职位详情页导航栏回跳
	pos.detailNav();
	//如果列表下没有项 就将图标换成小圆点
	// pos.changeIcon();
	// 点击内容切换
	// pos.changeText();
	// 应届生招聘的展开与合并
	pos.yingOpen();
});
var pos = {
	temp : '',
	page3Menu : function(){
		// 点击大项进行切换
		$('.menu').each(function(index , item){
			$(item).off('click').on('click' , function(){
				//如果点击的是当前active的
				if($(this).hasClass('active')){
					$(this).removeClass('active');
					$(this).parent('h1').next('ul').css('display' , 'none');
				}else{
					// 去除当前的active状态 包括h1和ul
					$('.p3-con-menu h1').each(function(ind , it){
						$(it).find('a').removeClass('active');
						$(it).next('ul').css('display' , 'none');
					})
					//添加到当前元素上
					var nextUl = $(this).parent('h1').next('ul');
					var sta = nextUl.css('display');
					if(sta == "none"){
						$(this).addClass('active');
						if(nextUl.hasClass('nothave')){
								nextUl.css('display' , 'none');
						}else{
								nextUl.css('display' , 'block');
						}
					}else{
						$(this).removeClass('active');
						nextUl.css('display' , 'none');
					}
				}

			})
		});
		//点击小项的active效果
		$('.p3-con-menu ul li a').each(function(index , item){
			$(item).off('click').on('click' , function(){
				$('.p3-con-menu ul li a').each(function(ind , it){
					$(it).removeClass('active');
				});
				$(item).addClass('active');
			})
		});

		//点击地区切换颜色
		$(".p3-nav li").each(function(){
			$(this).on("click",function(){
				$(".p3-nav .active").removeClass("active");
				pos.removeActive();
				if($(this).hasClass("yellow")){
					//点击大陆
					$(".p3-con-menu").removeAttr("class").addClass("p3-con-menu land-yellow");
					$(".text-job").removeAttr("class").addClass("p3-con-text text-job land-app");
					$(".text-detail").removeAttr("class").addClass("p3-con-text text-detail land-app");
					$(".mba").show();
					$(".yumiao").show();
					$(".yuke").show();
					$('.ying .nodot').removeClass('nodot').addClass('yellow');
					$('.ying ul').addClass('show').removeClass('nothave').find('li').eq(0).find('a').addClass('active');
					pos.temp = jobText.dalu;
				}
				if($(this).hasClass("blue")){
					//点击台湾
					$(".p3-con-menu").removeAttr("class").addClass("p3-con-menu tai-blue");
					$(".text-job").removeAttr("class").addClass("p3-con-text text-job tai-app");
					$(".text-detail").removeAttr("class").addClass("p3-con-text text-detail tai-app");
					$(".mba").show();
					$(".yumiao").hide();
					$(".yuke").hide();
					pos.temp = jobText.taiw;
				}
				if($(this).hasClass("green")){
					//点击香港
					$(".p3-con-menu").removeAttr("class").addClass("p3-con-menu gang-green");
					$(".text-job").removeAttr("class").addClass("p3-con-text text-job gang-app");
					$(".text-detail").removeAttr("class").addClass("p3-con-text text-detail gang-app");
					$(".mba").show();
					$(".yumiao").hide();
					$(".yuke").hide();
					pos.temp = jobText.gang;
				}
				if($(this).hasClass("red")){
					//点击美国
					$(".p3-con-menu").removeAttr("class").addClass("p3-con-menu amer-red");
					$(".text-job").removeAttr("class").addClass("p3-con-text text-job amer-app");
					$(".text-detail").removeAttr("class").addClass("p3-con-text text-detail amer-app");
					$(".mba").hide();
					$(".yumiao").hide();
					$(".yuke").hide();
					pos.temp = jobText.mei;
				}
				$(this).addClass("active");
				$('.p3-text-detail').html(pos.temp[0].txt);
				pos.caculateText();
			});
		});
	},
	caculateText : function(){
		$('.p3-text-detail').css('overflow' , 'auto').height('auto')
		var hei = $('.p3-text-detail').height();
		if(hei > 171){
			$('.p3-text-detail').height('170px').css('overflow' , 'hidden');
			$('.text-open-wp').show();
		}else{
			$('.text-open-wp').hide();
		}
	},
	cutUp : function(){
		$('.text-open').off('click').on('click' , function(){
			var sta = $('.p3-text-detail').css('overflow');
			if(sta == 'hidden'){
				$(this).addClass('active');
				$('.p3-text-detail').height('auto').css('overflow' , 'visible');
			}else{
				$(this).removeClass('active');
				$('.p3-text-detail').height('170px').css('overflow' , 'hidden');
			}
		})
	},
	showDetail : function(){
		// 点击进入详情
	    $('.job-title').each(function(index , item){
	    	$(item).off('click').on('click' , function(){
	    		// $('.text-detail').show();
				$('.text-job').hide();
				var dataName = $(item).attr('data-name');
				$('.text-detail[data-name='+dataName+']').show();
	    	})
	    });
		// 点击退出详情
		$('.back').off('click').on('click' , function(){
			$('.text-detail').hide();
			$('.text-job').show();
		});
		// 点击城市的切换效果
		$('.text-add li a').each(function(index , item){
			$(item).off('click').on('click' , function(){
				$('.text-add li a').each(function(inde , it){
					$(it).removeClass('active');
				});
				$('.job-list').each(function(inde , it){
					$(it).addClass('hidd');
				})
				$('.job-list').eq(index).removeClass('hidd');
				$(item).addClass('active');
			})
		})
	},
	detailNav:function(){
		$(".head-nav dl dt").on("click",function(){
			location.href = "index.html#"+$(this).attr("id");
		});
	},
	changeIcon : function(){
		var h1 = $('.p3-con-menu div h1');
		h1.each(function(index , item){
			if($(item).next('ul').find('li').length <= 0){
				$(item).find('a').removeClass('yellow').addClass('nodot');
			}
		})

	},
	changeText: function(){
		if(pos.temp == ''){
			pos.temp = jobText.dalu;
		}
		//点击左侧菜单的一级
		$('.p3-con-menu div h1').each(function(index , item){
			$(item).off('click').on('click' , function(){
				var dataId = $(this).attr('data-id');
				$.each(pos.temp , function(ind , it){
					if(it.pid == dataId){
						$('.p3-text-detail').html(it.txt);
						pos.caculateText();
						return false;
					}
				})

			})
		});
		// 点击左侧菜单的二级
		$('.ying ul li').each(function(index , item){
			$(item).off('click').on('click' , function(){
				var cid = $(item).attr('data-cid');
				var dataId = $('.ying h1').attr('data-id');
				$.each(pos.temp , function(ind , it){
					if(it.pid == dataId){
						if(it.id == cid){
							$('.p3-text-detail').html(it.txt);
							pos.caculateText();
						}
					}
				})
			})
		})
	},
	removeActive : function(){
		$('.p3-con-menu div h1').each(function(index , item){
			$(item).find('a').removeClass('active');
		});
		$('.p3-con-menu div ul li a').each(function(index , item){
			$(item).removeClass('active');
		});
		//默认让第一项active
		$('.ying h1 a').addClass('active');
		$('.ying .yellow').removeClass('yellow').addClass('nodot');
		$('.ying ul').removeClass('show').addClass('nothave').css('display' , 'none');
	},
	yingOpen : function(){
		$('#yingDl').off('click').on('click' , function(){
			var ul = $(this).parent('h1').next('ul');
			var ulStau = ul.css('display')
			if(ulStau == 'none'){
				ul.css('display' , 'block');
				$(this).addClass('active');
			}else{
				ul.css('display' , 'none');
				$(this).removeClass('active');
			}
		})
	}
}
