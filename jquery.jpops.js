// jQuery Alert Dialogs Plugin
//
// Version 1.0
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
		dialogClass: null,                  // 在弹出窗最外层加上一个自定义的样式
		type:"alert",						// 弹出类型
		title:"alert",						// jPop的标题
		message:"",							// jPop的内容
		value:"",							// jpop prompt类型的默认值
		callback:function(){}				// 回调函数
	},
	opts=$.extend(def,options);

	_show(opts.title,opts.message,opts.value,opts.type,opts.callback);

	function _show(title, msg, value, type, callback) {	
		_hide();
		_overlay('show');
		
		$("body").append(
		  '<div id="popup_container">' +
		    '<h1 id="popup_title"></h1>' +
		    '<a href="javascript:;" class="popupIcon"><i class="gicon-remove white"></i></a>'+
		    '<div id="popup_content">' +
		      '<div id="popup_message"></div>' +
			'</div>' +
		  '</div>');

		$("#popup_container .popupIcon").click(_hide);
		
		if( opts.dialogClass ) $("#popup_container").addClass(opts.dialogClass);
		
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
					_hide();
					callback(true);
				});
			break;
			case 'confirm':
				$("#popup_message").after('<div id="popup_panel"><input type="button" class="'+opts.okButtonClass+'" value="' + opts.okButton + '" id="popup_ok" /> <input type="button" class="'+opts.cancelButtonClass+'" value="' + opts.cancelButton + '" id="popup_cancel" /></div>');
				$("#popup_ok").click( function() {
					_hide();
					if( callback ) callback(true);
				});
				$("#popup_cancel").click( function() {
					_hide();
					if( callback ) callback(false);
				});
			break;
			case 'prompt':
				$("#popup_message").append('<div><input type="text" id="popup_prompt" /></div>').after('<div id="popup_panel"><input type="button" class="'+opts.okButtonClass+'" value="' + opts.okButton + '" id="popup_ok" /> <input type="button" class="'+opts.cancelButtonClass+'" value="' + opts.cancelButton + '" id="popup_cancel" /></div>');
				$("#popup_prompt").width( $("#popup_message").width());
				$("#popup_ok").click( function() {
					var val = $("#popup_prompt").val();
					_hide();
					if( callback ) callback( val );
				});
				$("#popup_cancel").click( function() {
					_hide();
					if( callback ) callback( null );
				});
				if( value ) $("#popup_prompt").val(value);
				$("#popup_prompt").focus().select();
			break;
		}

		opts.okButton="确定";
		opts.cancelButton="取消";
		
	}

	function _hide() {
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
		
	function _reposition() {
		var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + opts.verticalOffset;
		var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + opts.horizontalOffset;
		if( top < 0 ) top = 0;
		if( left < 0 ) left = 0;
		
		// IE6 fix
		if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
		
		$("#popup_container").css({
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