// jQuery Alert Dialogs Plugin
// Version 4.0
// iancj
// 2014-02-24
// Visit http://github.com/iancj/jPops for more information

(function($,document,window){

	var defaults={
		title:"提示",
		width:"auto",
		height:"auto",
		minWidth:400,
		minHeight:200,
		onOpen:false,
		onClosed:false
	};

	function JBox(param){
		this.title=param.title;
		this.selector=param.selector;
		this.$content=param.$content || null;
		this.$curParent=null;
	}

	JBox.prototype.create=function(opts,callback){
		var	title=this.title,//弹窗显示的标题
			selector=this.selector,//弹窗的目标选择器
			$content=null,//弹出的内容
			$curParent=null;//弹出内容原先所在的容器

			this.$content= $content = this.$content ? this.$content : $(selector);
			this.$curParent = $curParent = $content.parent();

		//append  html
		var $jbox=$('<div class="jbox"></div>'),
			$jbox_title=$('<div class="jbox-title"></div>'),
			$jbox_container=$('<div class="jbox-container"></div>');

			$jbox_title.append(
				'<div class="jbox-title-txt">'+title+'</div>',
				'<a href="###" class="jbox-close"></a>'
				)

			$jbox_container.append($content);

			$jbox.append($jbox_title,$jbox_container);

			$("body").append($jbox);

			_reposition($jbox,opts);

			//每个弹窗的关闭事件
			$jbox.find(".jbox-close").one("click",function(){
				$content.appendTo($curParent);//还原节点
				if(opts.onClosed){
					opts.onClosed();
				}
				$jbox.remove();
			});

			//回返弹窗jquery对象并执行回调
			if($jbox){
				if(callback){
					callback($jbox);
				}
			}
	}

	// *****************
	// 私有方法
	// *****************
	function _reposition($ele,options){
		var width=$ele.outerWidth(),
			height=$ele.outerHeight(),
			windowHeight=$(window).height(),
			titleHeight=$ele.find(".jbox-title").outerHeight(),
			$container=$ele.find(".jbox-container"),
			opts=$.extend({},defaults,options);

		if(opts.width=="auto"){
			if(width<opts.minWidth){
				width=opts.minWidth;
			}
			if(width>900){
				width=900;
			}
		}
		else{
			width=opts.width;
		}

		if(opts.height=="auto"){
			if(height<opts.minHeight){
				height=opts.minHeight;
			}
			if(height>=windowHeight){
				height=windowHeight-100;
			}
		}
		else{
			height=opts.height;
		}
		
		$container.css("height",height-titleHeight-parseInt($container.css("paddingTop"))-parseInt($container.css("paddingBottom")));

		$ele.css({
			"position":"fixed",
			"width":width,
			"height":height,
			"left":"50%",
			"top":"50%",
			"marginLeft":-parseInt(width/2),
			"marginTop":-parseInt(height/2)
		});
	}

	// *****************
	// 公共方法
	// 使用格式: $("#box3").jBox();
	// *****************
	publicmethod=$.fn["jBox"]=$["jBox"]=function(options){
		return this.each(function(){
			var $self=$(this),
				rule=$self.data("rule") || "normal",
				opts=$.extend({},defaults,options);

			if(rule=="box"){
				$self.click(function(){
					var newBox=new JBox({
						title:$self.attr("title") || opts.title,
						selector:$self.attr("href")
					});
					newBox.create(opts,opts.onOpen);
				});	
			}
			else{
				var newBox=new JBox({
					title:opts.title,
					$content:$self
				});
				newBox.create(opts,opts.onOpen);
			}

		});
	};

	publicmethod.reposition=function(){
		$(".jbox").each(function(){
			_reposition($(this));
		});
	};

	// *****************
	// 公共静态方法
	// 使用格式: $.jBoxClose(element);
	// *****************
	$["jBoxClose"]=function(element){
		$(element).find(".jbox-close").triggerHandler("click");
	}

}(jQuery,document,window));

//show log
function log(msg){
	if(typeof console != "undefined"){
		console.log(msg);
	}
	else{
		alert(msg);
	}
}