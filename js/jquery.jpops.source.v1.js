// jQuery Alert Dialogs Plugin
// Version 1.1
// iancj
// 2013-12-02
// Visit http://github.com/iancj for more information

jQuery.jPop=function(options){
	var def={
		verticalOffset: -75,                // 垂直偏移量（px）
		horizontalOffset: 0,                // 水平偏移量（px）
		repositionOnResize: true,           // 当页面改变大小时自动调整位置
		overlayOpacity: .50,                // 遮罩层透明度
		overlayColor: '#000',               // 遮罩层背景色
		okButton: '确定',        			// 确定按钮的显示文字
		okButtonClass:"btn btn-primary",	// 确定按钮的样式
		cancelButton: '取消',				// 取消按钮的显示文字
		cancelButtonClass:"btn",			// 取消按钮的样式
		type:"",						// 弹出类型[alert|confirm|prompt|message|progress]
		title:"alert",						// jPop的标题
		content:"",							// jPop的内容
		value:"",							// jpop prompt类型的默认值
		callback:function(){},				// 回调函数
		closeProgress:false
	},
	messageOpts={							// 弹出类型为message时的配置
		type:"info",						// 弹出类型为message时的状态[info|success|warning|danger]
		timing:1500							// 显示时间
	},
	progressOpts={							// 弹出类型为progress时的配置
		width:400,							// 滚动条总宽度
		percent:10,							// 滚动条当前百分比
		type:"info",						// 滚动条样式[info|success|warning|danger]
		isactive:true						// 是否显示动画
	},
	updateProgress={						// 更新进度条的参数
		percent:10,
		content:""
	};
	opts=$.extend(def,options);
	opts.messageOpts=$.extend(messageOpts,options.messageOpts);
	opts.progressOpts=$.extend(progressOpts,options.progressOpts);
	opts.updateProgress=$.extend(updateProgress,options.updateProgress);


	if(opts.closeProgress){
		opts.type="progress";
		_hideAlerts();
	}

	if($("#popup_progress").length == 1){
		$("#popup_progress").find(".bar").css({"width":opts.updateProgress.percent+"%"});
		if(opts.updateProgress.content && opts.updateProgress.content!="" && opts.updateProgress.content!=undefined){
			$("#popup_progress").find(".title").text(opts.updateProgress.content);
		}
	}

	switch(opts.type){
		case "alert":
		case "confirm":
		case "prompt":_showAlerts(opts.content,opts.title,opts.value,opts.type,opts.callback);break;
		case "message":_showMessage(opts.content,opts.title,opts.messageOpts.timing,opts.messageOpts.type,opts.callback);break;
		case "progress":_showProgress(opts.content, opts.progressOpts.width, opts.progressOpts.percent, opts.progressOpts.type, opts.progressOpts.isactive, opts.callback);break;
	}


	
	//弹窗类型
	function _showAlerts(msg, title, value, type, callback) {	
		if(window.jPopTimer){
        	clearTimeout(window.jPopTimer);
        }
		_hideAlerts();
		_overlay('show');
		
		$("body").append(
		  '<div id="popup_container">' +
		    '<h1 id="popup_title"></h1>' +
		    '<a href="javascript:;" class="popupIcon"><i class="gicon-remove white"></i></a>'+
		    '<div id="popup_content">' +
		      '<div id="popup_message"></div>' +
			'</div>' +
		  '</div>');

		$("#popup_container .popupIcon").click(_hideAlerts);
		
		// IE6 Fix
		var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
		
		$("#popup_container").css({
			"position": pos,
			"zIndex": 99999
		});
		
		$("#popup_title").text(title);
		$("#popup_content").addClass(type);
		$("#popup_message").html(msg);
		
		_reposition();
		_maintainPosition(true);
		
		switch(type) {
			case 'alert':
				$("#popup_message").after('<div id="popup_panel"><input type="button" class="'+opts.okButtonClass+'" value="' + opts.okButton + '" id="popup_ok" /></div>');
				$("#popup_ok").click( function() {
					_hideAlerts();
					callback(true);
				});
			break;
			case 'confirm':
				$("#popup_message").after('<div id="popup_panel"><input type="button" class="'+opts.okButtonClass+'" value="' + opts.okButton + '" id="popup_ok" /> <input type="button" class="'+opts.cancelButtonClass+'" value="' + opts.cancelButton + '" id="popup_cancel" /></div>');
				$("#popup_ok").click( function() {
					_hideAlerts();
					if( callback ) callback(true);
				});
				$("#popup_cancel").click( function() {
					_hideAlerts();
					if( callback ) callback(false);
				});
			break;
			case 'prompt':
				$("#popup_message").append('<div><input type="text" id="popup_prompt" /></div>').after('<div id="popup_panel"><input type="button" class="'+opts.okButtonClass+'" value="' + opts.okButton + '" id="popup_ok" /> <input type="button" class="'+opts.cancelButtonClass+'" value="' + opts.cancelButton + '" id="popup_cancel" /></div>');
				$("#popup_prompt").width( $("#popup_message").width());
				$("#popup_ok").click( function() {
					var val = $("#popup_prompt").val();
					_hideAlerts();
					if( callback ) callback( val );
				});
				$("#popup_cancel").click( function() {
					_hideAlerts();
					if( callback ) callback( null );
				});
				if( value ) $("#popup_prompt").val(value);
				$("#popup_prompt").focus().select();
			break;
		}

		opts.okButton="确定";
		opts.cancelButton="取消";
		
	}

	//消息类型
	function _showMessage(msg,title,timing,type,callback){

		if($("#popup_container").length != 1){
			var html='<div id="popup_container" class="'+type+'">' +
					'<h1 id="popup_title">'+title+'</h1>' +
					'<a href="javascript:;" class="popupIcon"><i class="gicon-remove white"></i></a>'+
					'<div id="popup_content">' +
						'<div id="popup_message">'+msg+'</div>' +
					'</div>' +
				'</div>';

			$("body").append(html);

			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			$("#popup_container").hide().css({
				"position": pos,
				"zIndex": 99999
			});


        }

        $(".popupIcon").click(_hideAlerts);

        if(window.jPopTimer){
        	clearTimeout(window.jPopTimer);
        }

        var popup_container=$("#popup_container");

        _overlay("show");
        popup_container.show();

		_reposition(popup_container);

		window.jPopTimer=setTimeout(function(){
			_hideAlerts();
			if(callback) callback(true);
		},timing);
	}

	//全屏遮罩进度条
	function _showProgress(msg,width,percent,type,isactive,callback){
		if(opts.closeProgress){
			return;
		}

		if($("#popup_progress").length != 1){
			var html='<div id="popup_progress" style="width:'+width+'px;">'+
				'<h4 class="title">'+msg+'</h4>';
				if(isactive){
					html+='<div class="progress progress-striped active">';
				}
				else{
					html+='<div class="progress">';
				}
				html+='<div class="bar bar-'+type+'" style="width:'+percent+'%;"></div></div></div>';
			$("body").append(html);

			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 

			$("#popup_progress").hide().css({
				"top":130,
				"left":"50%",
				"marginLeft":-width/2,
				"textAlign":"center",
				"position": pos,
				"zIndex": 99999
			});
		}

		var progress=$("#popup_progress");

		progress.show();
		_overlay("show");
		
	}
	
	function _hideAlerts() {
		$("#popup_container").remove();
		$("#popup_progress").hide();
		_overlay('hide');
		_maintainPosition(false);
	}
		
	function _overlay(status) {
		switch( status ) {
			case 'show':
				_overlay('hide');
				$("body").append('<div id="popup_overlay"></div>');
				$("#popup_overlay").css({
					position: 'absolute',
					zIndex: 99998,
					top: '0px',
					left: '0px',
					width: '100%',
					height: $(document).height(),
					background: opts.overlayColor,
					opacity: opts.overlayOpacity
				});
			break;
			case 'hide':
				$("#popup_overlay").remove();
			break;
		}
	}
		
	function _reposition(dom) {
		if(!dom){
			dom=$("#popup_container");
		}
		
		var top = (($(window).height() / 2) - (dom.outerHeight() / 2)) + opts.verticalOffset;
		var left = (($(window).width() / 2) - (dom.outerWidth() / 2)) + opts.horizontalOffset;
		if( top < 0 ) top = 0;
		if( left < 0 ) left = 0;
		
		// IE6 fix
		if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
		
		dom.css({
			top: top + 'px',
			left: left + 'px'
		});
		$("#popup_overlay").height( $(document).height() );
	}
		
	function _maintainPosition(status) {
		if( opts.repositionOnResize ) {
			switch(status) {
				case true:
					$(window).bind('resize', _reposition);
				break;
				case false:
					$(window).unbind('resize', _reposition);
				break;
			}
		}
	}

	
		function progress(){
			console.log("asd")
		}
	
};