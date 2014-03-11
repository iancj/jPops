// jQuery Alert Dialogs Plugin
// Version 3.0
// iancj
// 2014-02-24
// Visit http://github.com/iancj/jPops for more information

jQuery.jPops={
	conf:{
		title:"提示",//标题
		content:"内容",//内容
		width:"auto",//宽度
		height:"auto",//高度
		okBtnTxt:"确定",//确定按钮文字
		cancelBtnTxt:"取消",//取消按钮文字
		showBtns:true,//是否显示按钮组
		verticalOffset:0,//垂直偏移量
		horizontalOffset:0,//水平偏移量
		overlayOpacity: 0.5,// 遮罩层透明度
		overlayColor: "#000",// 遮罩层背景色
		callback:null,//默认回调函数
		okCallback:null,//确定按钮回调函数
		cancelCallback:null//取消按钮回调函数
	},
	alert:function(options){
		var opts=$.extend({},this.conf,options);//合并配置参数
			opts.type="alert";//设定为alert类型

		this.showAlerts(opts);
	},
	confirm:function(options){
		var opts=$.extend({},this.conf,options);//合并配置参数
			opts.type="confirm";//设定为confirm类型

		this.showAlerts(opts);
	},
	custom:function(options){
		var opts=$.extend({},this.conf,options);//合并配置参数
			opts.type="custom";//设定为custom类型

		this.showAlerts(opts);
	},
	message:function(options){
		this.conf.timing=1500;//信息窗显示时间
		var opts=$.extend({},this.conf,options);//合并配置参数
			opts.type="message";//设定为message类型
			
		this.showAlerts(opts);
	},
	showAlerts:function(opts){
		var self=this;

		if($("#jpops").length<1){
			var html='<div id="jpops" style="display:none;">'+
				        '<div class="jpops-title">'+
				            '<div id="jpops-title-txt"></div>'+
				            '<a href="###" id="jpops-close"></a>'+
				        '</div>'+
				        '<div id="jpops-container"></div>'+
				        '<div id="jpops-actions">'+
				            '<a href="###" class="btn btn-blue" id="jpops-btn-ok">确定</a>'+
				            '<a href="###" class="btn" id="jpops-btn-cancel">取消</a>'+
				        '</div>'+
				    '</div>';

			$("body").append(html);
		}

		var $jpops=$("#jpops"),//窗体
			$title=$("#jpops-title-txt"),//标题
			$content=$("#jpops-container"),//内容容器
			$actions=$("#jpops-actions"),//按钮容器
			$btnClose=$("#jpops-close"),//关闭按钮
			$btnOk=$("#jpops-btn-ok"),//确定按钮
			$btnCancel=$("#jpops-btn-cancel");//取消按钮

		$title.text(opts.title);//赋值标题
		$btnOk.text(opts.okBtnTxt);//按钮文字
		$btnCancel.text(opts.cancelBtnTxt);//按钮文字

		//控制显示内容
		switch(opts.type){
			case "message":
				$content.html('<p style="padding:30px 0;font-size:14px;">'+opts.content+'</p>');
				$actions.hide();
				break;
			case "alert":
				$content.html('<p style="padding:30px 0;font-size:14px;">'+opts.content+'</p>');
				if(opts.showBtns){
					$actions.show();
					$btnCancel.hide();
				}
				else{
					$actions.hide();
				}
				break;
			case "confirm":
				$content.html('<p style="padding:30px 0;font-size:14px;">'+opts.content+'</p>');
				if(opts.showBtns){
					$actions.show();
					$btnCancel.show();
				}
				else{
					$actions.hide();
				}
				break;
			case "custom":
				$content.html(opts.content);
				if(opts.showBtns){
					$actions.show();
					$btnCancel.show();
				}
				else{
					$actions.hide();
				}
				break;
		}

		//绑定事件
		//确定按钮
		$btnOk.bind("click",function(){
			var callback_return=false;
			//执行回调函数
			if(opts.callback!=null){
				callback_return=opts.callback(true);
			}
			else if(opts.okCallback!=null){
				callback_return=opts.okCallback();
			}
			//回调函数返回true时隐藏窗口
			if(callback_return){
				self.hideAlerts();//隐藏弹窗
				opts.callback=null;//清空回调函数
				opts.okCallback=null;
			}
		});
		//取消按钮
		$btnCancel.bind("click",function(){
			var callback_return=false;
			//执行回调函数
			if(opts.callback!=null){
				callback_return=opts.callback(false);
			}
			else if(opts.cancelCallback!=null){
				callback_return=opts.cancelCallback();
			}
			//回调函数返回true时隐藏窗口
			if(callback_return){
				self.hideAlerts();//隐藏弹窗
				opts.callback=null;//清空回调函数
				opts.cancelCallback=null;
			}
		});
		//关闭窗口
		$btnClose.bind("click",function(){
			self.hideAlerts(self);
			opts.callback=null;//清空回调函数
			opts.okCallback=null;
			opts.cancelCallback=null;
		});
		
		$jpops.show();//显示窗口

		//控制窗体样式
		if(opts.width!="auto"){
			$jpops.width(parseInt(opts.width));
		}
		else{
			switch(opts.type){
				case "message":
				case "alert":
				case "confirm":
					$("#jpops").css("width",400);//最小窗口宽度为400px
					break;
				case "custom":
					//限制自定义弹窗的最大宽度
					if($("#jpops").width()>=900){
						$("#jpops").width(900);
					}
					else if($("#jpops").width()<500){
						$("#jpops").width(500);
					}
					break;
			}
		}
		
		if(opts.height!="auto"){
			$content.height(parseInt(opts.height));
		}

		this.showOverlay(opts);//显示遮罩
		this.reposition(opts);//重置窗口到屏幕中心

		//绑定信息提示的定时事件
		if(opts.type=="message"){
			var handler_hideMessage=function(){
				var callback_return=true;
				if(opts.callback!=null){
					callback_return=opts.callback();
				}
				if(callback_return){
					self.hideAlerts();//隐藏弹窗
					opts.callback=null;//清空回调函数
				}
			}
			if(self.timer){
				clearTimeout(self.timer);
			}
			self.timer=setTimeout(handler_hideMessage,opts.timing);
		}
	},
	hideAlerts:function(){
		$("#jpops").hide().removeAttr("style");
		$("#jpops-container").removeAttr("style");
		this.hideOverlay();//隐藏遮罩
	},
	showOverlay:function(options){

		if($("#jpops-overlay").length<1){
			$("body").append('<div id="jpops-overlay"></div>');
			var body_height=$("body").height(),
				win_height=$(window).height(),
				overlay_height=0;

			if(body_height<win_height){
				overlay_height=win_height;
			}
			else{
				overlay_height=body_height;
			}

			$("#jpops-overlay").css({
				"position": 'absolute',
				"zIndex": 99998,
				"top": '0px',
				"left": '0px',
				"width": '100%',
				"height": overlay_height,
				"background": options.overlayColor,
				"opacity": options.overlayOpacity
			});
		}

		$("#jpops-overlay").show();
	},
	hideOverlay:function(){
		$("#jpops-overlay").hide();
	},
	showLoading:function(options){
		var opts=$.extend({},this.conf,options);//合并配置参数

		if($("#jpops-loading").length<1){
			var html='<div id="jpops-loading" style="display:none;"></div>';
			$("body").append(html);
		}
		this.showOverlay(opts);

		var $loading=$("#jpops-loading");

		$loading.css({
			"top":$(window).scrollTop()+$(window).height()/2-$loading.outerHeight()/2,
			"left":$(window).width()/2-$loading.outerWidth()/2
		});

		$loading.fadeIn(300);
	},
	hideLoading:function(){
		$("#jpops-loading").fadeOut(300);
		this.hideOverlay();
	},
	reposition:function(options){
		//更新窗体位置
		var $jpops=$("#jpops"),//窗体
			$title=$("#jpops-title-txt"),//标题
			$content=$("#jpops-container"),//内容容器
			$actions=$("#jpops-actions"),//按钮容器
			jpops_width=$jpops.outerWidth(),//窗体宽度
			jpops_height=$jpops.outerHeight(),//窗体高度
			win_width=$(window).width(),//浏览器窗口宽度
			win_height=$(window).height(),//浏览器窗口高度
			verticalOffset=0,//垂直偏移值
			horizontalOffset=0;//水平偏移值

		if(options){
			verticalOffset=options.verticalOffset,//水平偏移
			horizontalOffset=options.horizontalOffset//垂直偏移;
		}

		//当弹窗高度超出窗口高度时，进行调整
		if(jpops_height>=win_height){
			var con_height=win_height-$title.height()-$actions.height()-100;
			$content.css({
				"height":con_height,
				"overflow":"auto"
			});
			jpops_height=$("#jpops").outerHeight();
		}
		//重置弹窗的位置为屏幕中心
		$("#jpops").css({
			"top":$(window).scrollTop()+win_height/2-jpops_height/2+horizontalOffset,
			"left":win_width/2-jpops_width/2+verticalOffset
		});
	},
	timer:null
};