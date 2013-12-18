// jQuery Alert Dialogs Plugin
// Version 2.0
// iancj
// 2013-12-02
// Visit http://github.com/iancj for more information

jQuery.jPops={
	conf:{
		//type:"alert",//弹窗类型
		title:"提示",//标题
		content:"内容",//内容
		width:400,//宽度
		height:"auto",//高度
		minHeight:130,//最小高度
		minWidth:"auto",//最小宽度
		okButton:"确定",//确定按钮文字
		cancelButton:"取消",//取消按钮文字
		verticalOffset:0,//Y轴偏移量
		horizontalOffset:0,//X轴偏移量
		overlayOpacity: 0.5,// 遮罩层透明度
		overlayColor: "#000",// 遮罩层背景色
		clickToClose:true,//是否点击确定按钮移除窗口
		callback:null//回调函数
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
	prompt:function(options){
		this.conf.defaultValue="";
		var opts=$.extend({},this.conf,options);//合并配置参数
			opts.type="prompt";//设定为prompt类型

		this.showAlerts(opts);
	},
	message:function(options){
		this.conf.messageType="info";//信息窗类型
		this.conf.messageTimging=1500;//信息窗显示时间
		this.conf.messageAutoHide=true;//是否自动隐藏
		var opts=$.extend({},this.conf,options);//合并配置参数
			opts.type="message";//设定为message类型
			
		this.showAlerts(opts);
	},
	progress:function(options){
		if(this.timer){
			clearTimeout(this.timer);
		}

		this.conf.width=500;
		this.conf.progressPer=10;
		this.conf.progressType="";
		this.conf.progressActived=false;

		var opts=$.extend({},this.conf,options);//合并配置参数
			opts.type="progress";//设定为progress类型

		if($(".popup-progress").length != 1){
			var html='<div class="popup-progress">'+
				'<h4 class="content"></h4>';
				if(opts.progressActived){
					html+='<div class="progress progress-striped active">';
				}
				else{
					html+='<div class="progress">';
				}
				html+='<div class="bar"></div></div></div>';

			$("body").append(html);
		}
		var pop=$(".popup-progress"),
			popContent=pop.find(".content"),
			popProgress=pop.find(".progress"),
			popBar=pop.find(".bar"),
			pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 

		popContent.text(opts.content);
		popBar.css("width",opts.progressPer+"%").removeClass("bar-info bar-warning bar-success bar-danger").addClass("bar-"+opts.progressType);

		if(opts.progressActived){
			popProgress.addClass("progress-striped active")
		}
		else{
			popProgress.removeClass("progress-striped active")
		}

		pop.show().css({
			"width":opts.width,
			"top":150,
			"left":"50%",
			"textAlign":"center",
			"position": pos,
			"zIndex": 99999
		});

		this.reposition(opts);
		this.showOverlay(opts);
	},
	progressUpdate:function(options){
		var pop=$(".popup-progress"),//进度条容器
			prgContent=pop.find(".content"),//文字描述
			prgProgress=pop.find(".progress"),//进度条外层
			prgBar=prgProgress.find(".bar");//进度条

		var opts=$.extend({},this.conf,options);//合并配置参数
		opts.type="progress";//设定为progress类型
		opts.width=options.width;

		for(key in options){
			switch(key){
				case "content":
					prgContent.text(opts.content);
					break;
				// case "width"://更新进度条容器总体宽度
				// 	pop.css("width",opts.width);
				// 	break;
				case "progressPer"://更新进度条百分比
					prgBar.css("width",opts.progressPer+"%");
					break;
				case "progressType"://更新进度条类型
					prgBar.removeClass("bar-info bar-warning bar-success bar-danger").addClass("bar-"+opts.progressType);
					break;
				case "progressActived"://更新进度条动画状态
					if(opts.progressActived){
						prgProgress.removeClass("progress-striped active")
					}
					else{
						prgProgress.addClass("progress-striped active")
					}
				case "callback":
					if(opts.callback){
						opts.callback(true);
						opts.callback=null;
					}
			}
		}

		// this.reposition(opts);
	},
	progressHide:function(){
		$(".popup-progress").hide().css("width","auto");
		this.hideOverlay();
	},
	showAlerts:function(opts){
		if($(".popup-container").length<1){
			var html='<div class="popup-container">' +
						'<h1 class="popup-title"></h1>' +
						'<a href="javascript:;" class="popup-close"></a>'+
						'<div class="popup-content">' +
							'<div class="popup-message"></div>' +
							'<div class="popup-prompt"><input type="text"></div>'+
						'</div>' +
						'<div class="popup-panel">'+
							'<a href="javascript:;" class="btn btn-primary popup-ok"></a> '+
    						'<a href="javascript:;" class="btn popup-cancel"></a>'+
						'</div>'+
					'</div>';

			$("body").append(html);
		}
		this.showOverlay(opts);
		if(this.timer){
			clearTimeout(this.timer);
		}
		
		var self=this,
			pop=$(".popup-container"),//主窗体
			popTitle=pop.find(".popup-title"),//标题
			popContent=pop.find(".popup-content"),//内容区域
			popMessage=pop.find(".popup-message"),//信息区域
			popPrompt=pop.find(".popup-prompt"),//prompt
			popPanel=pop.find(".popup-panel"),//panel
			btnOk=pop.find(".popup-ok"),//确定按钮
			btnCancel=pop.find(".popup-cancel"),//取消按钮
			btnClose=pop.find(".popup-close");//关闭按钮

		popPrompt.hide();//隐藏prompt
		popPanel.show();//按钮组

		switch(opts.type){//alert类型不显示取消按钮
			case "alert":btnCancel.hide();break;
			case "confirm":btnCancel.show();break;
			case "prompt":
				popPrompt.show();
				btnCancel.show();
				popPrompt.find("input").val(opts.defaultValue).focus().select();
				break;
			case "message":
				popPanel.hide();
				pop.removeClass("info warning success danger").addClass(opts.messageType);
				break;
		}

		popTitle.text(opts.title);//更新标题
		popMessage.html(opts.content);//更新内容
		btnOk.text(opts.okButton);//更新确定按钮文字
		btnCancel.text(opts.cancelButton);//更新取消按钮文字

		// if(pop.outerHeight()>=$(window).height()){
		// 	var popContentHeight=$(window).height()-80-popTitle.outerHeight()-popPanel.outerHeight();
		// 	popContent.css({
		// 		"height":popContentHeight,
		// 		"overflow-y":"auto"
		// 	});
		// }

		pop.show().css({
			width:opts.width,
			height:opts.height,
			minWidth:opts.minWidth,
			minHeight:opts.minHeight
		});

		self.reposition(opts);//更新窗体位置

		if(opts.type!="message"){
			//确定按钮事件
			btnOk.click(function(){
				//触发callback是否自动关闭窗口
				if(opts.clickToClose){
					self.hideAlerts();
				}

				if(opts.callback){
					if(opts.type=="prompt"){
						var val=$(".popup-container").find(".popup-prompt input").val();
						opts.callback(val);
					}
					else{
						opts.callback(true);
					}
					
					if(opts.clickToClose){
						opts.callback=null;
					}
				}

				return false;
			});

			// 取消按钮事件
			btnCancel.click(function(){
				if(opts.callback){
					if(opts.type=="prompt"){
						opts.callback(null);
					}
					else{
						opts.callback(false);
					}
					opts.callback=null;
				}
				self.hideAlerts();
				return false;
			});

			//关闭按钮事件
			btnClose.click(function(){
				self.hideAlerts();
				return false;
			});
		}
		else{//当类型为message时
			var handler_closeMsg=function(){
				pop.removeClass(opts.messageType);
				btnClose.unbind("click");
				if(opts.callback){
					opts.callback(true);
					opts.callback=null;
				}
				self.hideAlerts();
			};

			//计时器
			if(opts.messageAutoHide){
				self.timer=setTimeout(handler_closeMsg,opts.messageTimging);
			}
			
			//关闭按钮事件
			btnClose.click(handler_closeMsg);
		}
	},
	hideAlerts:function(){
		$(".popup-container").remove();
		this.hideOverlay();
	},
	showOverlay:function(options){
		var opts=$.extend({},this.conf,options);

		if($(".popup-overlay").length<1){
			$("body").append('<div class="popup-overlay"></div>');
			$(".popup-overlay").css({
				"position": 'absolute',
				"zIndex": 99998,
				"top": '0px',
				"left": '0px',
				"width": '100%'
			});
		}
		$(".popup-overlay").css({
			"height": $("body").height(),
			"background": opts.overlayColor,
			"opacity": opts.overlayOpacity
		}).show();

		$("body").css("overflow","hidden");
	},
	hideOverlay:function(){
		$(".popup-overlay").hide();
		$("body").css("overflow","auto");
	},
	showLoading:function(options){
		// if(options){
		// 	for(key in options){
		// 		switch(key){
		// 			case "showOverlay":
		// 			if(options[key]){
		// 				this.showOverlay(options);
		// 			}
		// 		}
		// 	}
		// }
		if($(".popup-loading").length<1){
			var html='<div class="popup-loading" style="display:none;"></div>';
			$("body").append(html);
		}
		this.showOverlay();
		$(".popup-loading").fadeIn(300);

	},
	hideLoading:function(){
		$(".popup-loading").fadeOut(300);
		this.hideOverlay();
	},
	reposition:function(options){
		//更新窗体位置
		opts=$.extend({},this.conf,options);
		switch(opts.type){
			case "alert":
			case "confirm":
			case "message":
			case "prompt":
				var pop=$(".popup-container"),//弹窗主体
					popContent=pop.find(".popup-content"),//内容
					popTitle=pop.find(".popup-title"),//标题
					popPanel=pop.find(".popup-panel"),//panel
					windowHeight=$(window).height(),
					windowWidth=$(window).width(),
					popHeight=pop.outerHeight(),
					position = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 

				if(pop.outerHeight()>=$(window).height()){
					var popContentHeight=$(window).height()-80-popTitle.outerHeight()-popPanel.outerHeight();
					popContent.css({
						"height":popContentHeight,
						"overflow-y":"auto"
					});
				}
				else{
					popContent.css({
						"height":"auto"
					});
				}

				pop.css({
					"position": position,
					"zIndex": 99999
				});

				var top = (($(window).height()/2) - (pop.outerHeight()/2)) + opts.verticalOffset,
					left = (($(window).width()/2) - (pop.outerWidth()/2)) + opts.horizontalOffset;

				if( top < 0 ) top = 0;
				if( left < 0 ) left = 0;
				
				// IE6 fix
				if( $.browser.msie && parseInt($.browser.version) <= 6 ) {
					top = top + $(window).scrollTop();
				}

				pop.css({
					"top": top + 'px',
					"left": left + 'px'
				});



				break;
			case "progress":
				$(".popup-progress").css({
					"marginLeft":-opts.width/2
				});
				break;
		}
		

		$(".popup-overlay").height( $(document).height() );
	},
	timer:null
};