// jQuery Alert Dialogs Plugin
//
// Version 1.1
// iancj
// 2013-12-02
//
// Visit http://github.com/iancj for more information
//
// 
//
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
		type:"alert",						// 弹出类型[alert|confirm|prompt|message]
		title:"alert",						// jPop的标题
		content:"",							// jPop的内容
		value:"",							// jpop prompt类型的默认值
		messageOpts:{						// 弹出类型为message时的配置
			type:"info",					// 弹出类型为message时的状态
			timing:1500						// 显示时间
		},
		callback:function(){}				// 回调函数
	},
	opts=$.extend(def,options);

	switch(opts.type){
		case "alert":
		case "confirm":
		case "prompt":_showAlerts(opts.title,opts.content,opts.value,opts.type,opts.callback);break;
		case "message":_showMessage(opts.content,opts.messageOpts.timing,opts.messageOpts.type,opts.callback);break;
	}
	
	function _showAlerts(title, msg, value, type, callback) {	
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
			position: pos,
			zIndex: 99999
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

	function _showMessage(msg,timing,type,callback){
		if($("#jPop_msg").length != 1){
			$("body").append("<div id='jPop_msg'></div>");
			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			$("#jPop_msg").hide().css({
				position: pos,
				zIndex: 99999
			});
        }

        if(window.jPopTimer){
        	clearTimeout(window.jPopTimer);
        }

        var jPop_msg=$("#jPop_msg");

        jPop_msg.text(msg).removeClass("info warning success danger").addClass(type).fadeIn(500);

		_reposition(jPop_msg);

		window.jPopTimer=setTimeout(function(){
			jPop_msg.fadeOut(500);
		},timing);

		if(callback) callback(true);

	}

	function _hideAlerts() {
		$("#popup_container").remove();
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
};