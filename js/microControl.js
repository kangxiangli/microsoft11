$(function(){
	//头部滑动 以及点击头部的显隐
	// control.headHover();
	//头部滑动 以及点击头部"机会在微软"跳转
	control.headClick();
	// page1下的消息滚动
	control.msg();
	// 点击p5的导航栏切换效果
	control.p5Nav();
	// p4划过头像效果 以及点击小点点切换效果
	control.hoverPer();
	// page1的切换效果
	control.p1Change();

	//从机会在微软跳转到详情页
	// control.switchDetail();
	//从机会在微软跳转到详情页 切换显示风格
	control.switchArea();

	//利用js判断屏幕大小 用以设置招聘日程和宣讲行程
	control.setP1frame();
	control.animat();
	//从详情页导航跳回首页
	control.initIndex();
	// 中英文繁体字的切换
	// control.changeLang();
	//监控带滚动条的 让mango动画停止
	control.listenRoll();
	//宣讲行程里的切换
	control.changTrain();
	//立即申请
	control.immApply();
})
var mango = new Mango($('#wp') , {
	change : function(e){
		$('.head-nav dl dt').each(function(index , item){
    		$(item).removeClass('active');
    	});
    	$('.page .con').hide();
		$('.page').eq(e.cur).find('.con').show();
		switch(e.cur){
			case 0:
				$('.head-nav dl dt').eq(0).addClass('active');
				break;
			case 1:
				$('.head-nav dl dt').eq(1).addClass('active');
				break;
			case 2:
				$('.head-nav dl dt').eq(2).addClass('active');
				break;
			case 3:
				$('.head-nav dl dt').eq(3).addClass('active');
				break;
			case 4:
				$('.head-nav dl dt').eq(4).addClass('active');
				// 让第一部分显示
				$('.p4-con-0').each(function(index , item){
	            	$(item).addClass('hidd');
	            });
	            //让第一个点显示
	            $('.p4-dot-ls-p4 li a').each(function(inde , it){
					$(it).removeClass('active');
				})
				$('.p4-dot-ls-p4 li a').eq(0).addClass('active');
            	$('.p4-con-0').eq(0).removeClass('hidd');
				break;
			case 5:
				$('.head-nav dl dt').eq(5).addClass('active');
				break;
			default:
				$('.head-nav dl dt').eq(0).addClass('active');
		}
	}
});
var control = {
	headHover : function(){
		// hover
		/*$('.head-nav').on({
			'mouseover' : function(){
				$('.head-menu-bg').addClass('head-menu-hover-bg');
				$('.head').removeClass('head-bg').css('overflow' , 'visible');
			},
			'mouseleave' : function(){
				$('.head-menu-bg').removeClass('head-menu-hover-bg');
				$('.head').css('overflow' , 'hidden').addClass('head-bg');
			}
		});*/
		// click
		/*$('.nav-first').off('click').on('click' , function(){
			$('.p2 , .p3 , .p4 , .p5').hide();
			$('.p1').show();
			//$(".head-nav dl .nav-first").css("border-bottom","5px solid #fff");
		});
		$('.nav-sec').off('click').on('click' , function(){
			$('.p1 , .p3 , .p4 , .p5').hide();
			$('.p2').show();
			//$(".head-nav dl .nav-sec").css("border-bottom","5px solid #1ca5ec");
		});
		$('.nav-thi').off('click').on('click' , function(){
			$('.p1 , .p2 , .p4 , .p5').hide();
			$('.p3').show();
			//$(".head-nav dl .nav-thi").css("border-bottom","5px solid #feb82c");
		});
		$('.nav-four').off('click').on('click' , function(){
			$('.p1 , .p2 , .p3 , .p5').hide();
			$('.p4').show();
			//$(".head-nav dl .nav-four").css("border-bottom","5px solid #81b822");
		});
		$('.nav-five').off('click').on('click' , function(){
			$('.p1 , .p2 , .p3 , .p4').hide();
			$('.p5').show();
			//$(".head-nav dl .nav-five").css("border-bottom","5px solid #ef5122");
		});*/
	},
	headClick:function(){
		//首页导航
		$("#chance dd a").each(function(){
			$(this).on("click",function(){
				var  param = $(this).attr("name");
				location.href =  "posDetailW.html#"+param;
			});
		});
		$("#detchance dd a").each(function(){
			$(this).on("click",function(){
				var  param = $(this).attr("name");
				switch(param){
					case "land":
						$(".p3-nav .yellow").click();
						break;
					case "tai":
						$(".p3-nav .blue").click();
						break;
					case "gang":
						$(".p3-nav .green").click();
						break;
					case "american":
						$(".p3-nav .red").click();
						break;
				}
			});
		});
	},



	msg : function(){
		// 点击显示弹出层
		$('.msg-list li a').each(function(index , item){
			$(item).off('click').on('click' , function(){
				$('.tip-wp').show();
			})
		});
		//点击隐藏弹出层
		$('.x').off('click').on('click' , function(){
			$('.tip-wp').hide();
		});
		setInterval(function(){
			$('.msg-list').animate({marginTop : '-50px'} , 2000 , function(){
				$('.msg-list li').eq(0).appendTo($('.msg-list'));
				$('.msg-list').css({marginTop : '0'});
			});
		} , 3000)

	},
	p5Nav : function(){
		$('.p5-ls-wp ul li a').each(function(index , item){
			$(item).off('click').on('click' , function(){
				$('.p5-ls-wp ul li a').each(function(inde , it){
					$(it).removeClass('active');
				});
				$(item).addClass('active');
				$('.p5-text-wp').each(function(inde , it){
					$(it).addClass('hidd');
				});
				$('.p5-text-wp').eq(index).removeClass('hidd');
			})
		})
	},
	hoverPer : function(){
		//头像hover效果
		$('.list-per li').off('mouseover , mouseleave').on({
			mouseover : function(){
				$(this).find('.per-info').show();
			},
			mouseleave : function(){
				$(this).find('.per-info').hide();
			}
		});
		//点击小点点切换效果
		//page2
		$('.p4-dot-ls-p2 li a').each(function(index , item){
			$(item).off('click').on('click' , function(){
				$('.p4-dot-ls-p2 li a').each(function(inde , it){
					$(it).removeClass('active');
				})
				$(item).addClass('active');
				$('.p2-text-box').each(function(inde , it){
					$(it).addClass('hidd');
					if(index == inde){
						$(it).removeClass('hidd');
					}
					if(index == 0){
						$('.p2-tit').html('微软中国');
						$('#more').attr('href' , 'http://news.microsoft.com/zh-cn/#sm.000fqrw3fofwf3i11pk1rardqgl1h');
					}
					if(index == 1){
						$('.p2-tit').html('微软香港');
						$('#more').attr('href' , 'https://www.microsoft.com/en-hk');
					}
					if(index == 2){
						$('.p2-tit').html('微软台湾');
						$('#more').attr('href' , 'https://www.microsoft.com/taiwan/about/default.aspx');
					}
				});
			})
		});
		//page4
		$('.p4-dot-ls-p4 li a').each(function(index , item){
			$(item).off('click').on('click' , function(){
				$('.p4-dot-ls-p4 li a').each(function(inde , it){
					$(it).removeClass('active');
				})
				$(item).addClass('active');
				$('.p4-con-0').each(function(inde , it){
					$(it).addClass('hidd');
					if(index == inde){
						$(it).removeClass('hidd');
					}
				})
			})
		});
		//点击page4的头像
		$('.list-per li').each(function(index , item){
			$(item).off('click').on('click' , function(){
				$('.p4-dot-ls-p4 li a').each(function(inde , it){
					$(it).removeClass('active');
				})
				$('.p4-dot-ls-p4 li a').eq(index+1).addClass('active');
				$('.p4-con-0').each(function(inde , it){
					$(it).addClass('hidd');
					if(index+1 == inde){
						$(it).removeClass('hidd');
					}
				})
			})
		});
	},
	p1Change : function(){
		$("#train").off('click').on('click' , function(){
			$('.p1-m').hide();
			$('.head').hide();
			$('.p1-bg-0').show();
			$('.p1-train').show();
		});
		$("#recruitDate").off('click').on('click' , function(){
			$('.p1-m').hide();
			$('.head').hide();
			$('.p1-bg-0').show();
			$('.p1-resurit').show();
		});
		$('#trainX').off('click').on('click' , function(){
			$('.p1-m').show();
			$('.head').show();
			$('.p1-bg-0').hide();
			$('.p1-train').hide();
		});
		$('#recruitX').off('click').on('click' , function(){
			$('.p1-m').show();
			$('.head').show();
			$('.p1-bg-0').hide();
			$('.p1-resurit').hide();
		});

	},

	navObj:{
		nav1:".nav-first",
		nav2:".nav-sec",
		nav3:".nav-thi",
		nav4:".nav-four",
		nav5:".nav-five",
	},
	initIndex:function(){
		var parastr = location.hash;
		if(parastr){
			var item = parastr.substr(1);
			var itemClass = this.navObj[item];
			$(itemClass).click();
		}
	},
	switchDetail:function(){
		$(".p3-m-list a").each(function(){
			$(this).on("click",function(){
				var  param = $(this).attr("name");
				 //location.href =  "posDetail.html#"+param;
				window.open("posDetailW.html#"+param);//新窗口管理

			})
		})
	},
	switchArea:function(){
		//$(".p3-con-menu .show").removeClass("show");
		var parastr = location.hash;
		if(parastr){
			var item = parastr.substr(1);
			switch(item){
				case "land1":
					$(".p3-nav .yellow").click();
					$(".ying h1 a").click();
					break;
				case "land2":
					$(".p3-nav .yellow").click();
					$(".mba h1 a").click();
					break;
				case "land3":
					$(".p3-nav .yellow").click();
					$(".yumiao h1 a").click();
					break;
				case "land4":
					$(".p3-nav .yellow").click();
					$(".yuke h1 a").click();
					break;
				case "tai1":
					$(".p3-nav .blue").click();
					$(".yumiao").hide();
					$(".yuke").hide();
					$(".ying h1 a").click();
					break;
				case "tai2":
					$(".p3-nav .blue").click();
					$(".yumiao").hide();
					$(".yuke").hide();
					$(".mba h1 a").click();
					break;
				case "gang1":
					$(".p3-nav .green").click();
					$(".yumiao").hide();
					$(".yuke").hide();
					$(".ying h1 a").click();
					break;
				case "gang2":
					$(".p3-nav .green").click();
					$(".yumiao").hide();
					$(".yuke").hide();
					$(".mba h1 a").click();
					break;
				case "american1":
					$(".p3-nav .red").click();
					$(".mba").hide();
					$(".yumiao").hide();
					$(".yuke").hide();
					$(".ying h1 a").click();
					break;
			}
		}
	},
	setP1frame : function(){
		var hei = $(window).height();
		if(hei > 679){
			// 设置招聘进程
			$('.train-img').height(565);
			$('.p1-train').height(650);
			$('.p1-train').css('marginTop' , '-325px');
			// 设置宣讲行程
			$('.resurit-img').height(594);
			$('.p1-resurit').height(679);
			$('.p1-resurit').css('marginTop' , '-339.5px');
		}
	},
	animat : function(){
		$(".nav-first").off('click').on("click",function(){
			mango.move = true;
            mango.moveTo(0,true);
            active($(this).find('a'));
    	});
    	$(".nav-sec").off('click').on("click",function(){
			mango.move = true;
            mango.moveTo(1,true);
            active($(this).find('a'));
    	});
    	$(".nav-thi").off('click').on("click",function(){
			mango.move = true;
            mango.moveTo(2,true);
            active($(this).find('a'));
    	});
    	$(".nav-four").off('click').on("click",function(){
			mango.move = true;
            mango.moveTo(3,true);
            active($(this).find('a'));
            $('.p4-con-0').each(function(index , item){
            	$(item).addClass('hidd');
            });
            $('.p4-con-0').eq(0).removeClass('hidd');
    	});
        $(".nav-five").off('click').on("click",function(){
			mango.move = true;
            mango.moveTo(4,true);
            active($(this).find('a'));
        });
        function active(obj){
        	$('.head-nav dl dt').each(function(index , item){
        		$(item).removeClass('active');
        	});
        	$(obj).parent('dt').addClass('active');
        }
	},
	changeLang : function(){
		$('.head-lang-nav li a').each(function(index , item){
			$(item).off('click').on('click' , function(){
				$('.head-lang-nav li a').each(function(inde , it){
					$(it).removeClass('active');
				});
				$(this).addClass('active');
				$('#langId').val(index);

				var dataNum = $('.p2-tit').attr('data-num');
				// 中文 仅将微软全貌的文字进行切换
				if(index == 0){
					if(dataNum == 0 || dataNum == 3 || dataNum == 6){
						$('.p2-tit').html('微软中国');
					}else if(dataNum == 1 || dataNum == 4 || dataNum == 7){
						$('.p2-tit').html('微软香港');
					}else if(dataNum == 2 || dataNum == 5 || dataNum == 8){
						$('.p2-tit').html('微软台湾');
					}
				//繁体
				}else if(index == 1){
					if(dataNum == 0 || dataNum == 3 || dataNum == 6){
						$('.p2-tit').html('微软中国（繁体）');
					}else if(dataNum == 1 || dataNum == 4 || dataNum == 7){
						$('.p2-tit').html('微软香港（繁体）');
					}else if(dataNum == 2 || dataNum == 5 || dataNum == 8){
						$('.p2-tit').html('微软台湾（繁体）');
					}
					// 暂时将微软台湾的介绍改为繁体 演示使用
					$(".p2-text-box[name='tai']").html(textDetail.taiF);
				//英文
				}else if(index == 2){
					if(dataNum == 0 || dataNum == 3 || dataNum == 6){
						$('.p2-tit').html('微软中国（英文）');
					}else if(dataNum == 1 || dataNum == 4 || dataNum == 7){
						$('.p2-tit').html('微软香港（英文）');
					}else if(dataNum == 2 || dataNum == 5 || dataNum == 8){
						$('.p2-tit').html('微软台湾（英文）');
					}
				}
			})
		});

	},
	listenRoll : function(){
		$('.roll').each(function(index , item){
			$(item).mouseenter(function(event) {
				mango.stop();
			});
			$(item).mouseleave(function(event) {
				mango.start();
			});
		});
	},
	changTrain : function(){
		$('#trainLand').off('click').on('click' , function(){
			remAc();
			$('.train-c-img').attr('src' , 'imgW/page1_train_land.png');
			$('.train-ying').addClass('yellow active');
			$('.train-mba').addClass('yellow');
			$('.train-kind ul').css('marginLeft' , '0');
			$(this).addClass('active');
		});
		$('#trainTai').off('click').on('click' , function(){
			remAc();
			$('.train-c-img').attr('src' , 'imgW/page1_train_tai.png');
			$('.train-ying').addClass('blue active');
			$('.train-mba').addClass('blue');
			$('.train-kind ul').css('marginLeft' , '33.204%');
			$(this).addClass('active');
		});
		$('#trainGang').off('click').on('click' , function(){
			remAc();
			$('.train-c-img').attr('src' , 'imgW/page1_train_gang.png');
			$('.train-ying').addClass('green active');
			$('.train-mba').addClass('green');
			$('.train-kind ul').css('marginLeft' , '66.408%');
			$(this).addClass('active');
		});
		function remAc(){
			$('.train-nav ul li').each(function(index , item){
				$(item).find('a').removeClass('active')
			});
			$('.train-ying').removeClass('green yellow blue active');
			$('.train-mba').removeClass('green yellow blue active');
		};
		// 应届生 mba切换
		$('.train-kind ul li').each(function(index , item){
			$(item).find('a').off('click').on('click' , function(){
				$('.train-kind ul li a.active').removeClass('active');
				$(this).addClass('active');
			})
		})
	},
	immApply : function(){
		$('#immApply').off('click').on('click' , function(){
				window.open("posDetailW.html");//新窗口管理
		})
	}
}
$(function(){
	$(window).resize(function(){
			mango.update();
			var yPx = mango.height * mango.cur;
			$('#wp').css({
				'WebkitTransform' : 'translate3d(0px,-'+yPx+'px,0)',
				'-webkit-transform' : 'translate3d(0px,-'+yPx+'px,0)',
				'transform' : 'translate3d(0px,-'+yPx+'px,0)'
			});
	});

})
