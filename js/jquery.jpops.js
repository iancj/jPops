jQuery.jPop=function(m){var e={verticalOffset:-75,horizontalOffset:0,repositionOnResize:true,overlayOpacity:0.5,overlayColor:"#000",okButton:"\u786e\u5b9a",okButtonClass:"btn btn-primary",cancelButton:"\u53d6\u6d88",cancelButtonClass:"btn",type:"",title:"alert",content:"",value:"",callback:function(){},closeProgress:false},l={type:"info",timing:1500},h={width:400,percent:10,type:"info",isactive:true},d={percent:10};opts=$.extend(e,m);opts.messageOpts=$.extend(l,m.messageOpts);opts.progressOpts=$.extend(h,m.progressOpts);opts.updateProgress=$.extend(d,m.updateProgress);if(opts.closeProgress){opts.type="progress";k()}if($("#popup_progress").length==1){$("#popup_progress").find(".bar").css({width:opts.updateProgress.percent+"%"})}switch(opts.type){case"alert":case"confirm":case"prompt":i(opts.content,opts.title,opts.value,opts.type,opts.callback);break;case"message":b(opts.content,opts.title,opts.messageOpts.timing,opts.messageOpts.type,opts.callback);break;case"progress":j(opts.content,opts.progressOpts.width,opts.progressOpts.percent,opts.progressOpts.type,opts.progressOpts.isactive,opts.callback);break}function i(q,p,o,n,s){if(window.jPopTimer){clearTimeout(window.jPopTimer)}k();g("show");$("body").append('<div id="popup_container"><h1 id="popup_title"></h1><a href="javascript:;" class="popupIcon"><i class="gicon-remove white"></i></a><div id="popup_content"><div id="popup_message"></div></div></div>');$("#popup_container .popupIcon").click(k);var r=($.browser.msie&&parseInt($.browser.version)<=6)?"absolute":"fixed";$("#popup_container").css({position:r,zIndex:99999});$("#popup_title").text(p);$("#popup_content").addClass(n);$("#popup_message").html(q);c();f(true);switch(n){case"alert":$("#popup_message").after('<div id="popup_panel"><input type="button" class="'+opts.okButtonClass+'" value="'+opts.okButton+'" id="popup_ok" /></div>');$("#popup_ok").click(function(){k();s(true)});break;case"confirm":$("#popup_message").after('<div id="popup_panel"><input type="button" class="'+opts.okButtonClass+'" value="'+opts.okButton+'" id="popup_ok" /> <input type="button" class="'+opts.cancelButtonClass+'" value="'+opts.cancelButton+'" id="popup_cancel" /></div>');$("#popup_ok").click(function(){k();if(s){s(true)}});$("#popup_cancel").click(function(){k();if(s){s(false)}});break;case"prompt":$("#popup_message").append('<div><input type="text" id="popup_prompt" /></div>').after('<div id="popup_panel"><input type="button" class="'+opts.okButtonClass+'" value="'+opts.okButton+'" id="popup_ok" /> <input type="button" class="'+opts.cancelButtonClass+'" value="'+opts.cancelButton+'" id="popup_cancel" /></div>');$("#popup_prompt").width($("#popup_message").width());$("#popup_ok").click(function(){var t=$("#popup_prompt").val();k();if(s){s(t)}});$("#popup_cancel").click(function(){k();if(s){s(null)}});if(o){$("#popup_prompt").val(o)}$("#popup_prompt").focus().select();break}opts.okButton="\u786e\u5b9a";opts.cancelButton="\u53d6\u6d88"}function b(s,r,q,p,u){if($("#popup_container").length!=1){var o='<div id="popup_container" class="'+p+'"><h1 id="popup_title">'+r+'</h1><a href="javascript:;" class="popupIcon"><i class="gicon-remove white"></i></a><div id="popup_content"><div id="popup_message">'+s+"</div></div></div>";$("body").append(o);var t=($.browser.msie&&parseInt($.browser.version)<=6)?"absolute":"fixed";$("#popup_container").hide().css({position:t,zIndex:99999})}$(".popupIcon").click(k);if(window.jPopTimer){clearTimeout(window.jPopTimer)}var n=$("#popup_container");g("show");n.show();c(n);window.jPopTimer=setTimeout(function(){k();if(u){u(true)}},q)}function j(p,o,r,s,v,u){if(opts.closeProgress){return}if($("#popup_progress").length!=1){var q='<div id="popup_progress" style="width:'+o+'px;"><h4 class="title">'+p+"</h4>";if(v){q+='<div class="progress progress-striped active">'}else{q+='<div class="progress">'}q+='<div class="bar bar-'+s+'" style="width:'+r+'%;"></div></div></div>';$("body").append(q);var t=($.browser.msie&&parseInt($.browser.version)<=6)?"absolute":"fixed";$("#popup_progress").hide().css({top:130,left:"50%",marginLeft:-o/2,textAlign:"center",position:t,zIndex:99999})}var n=$("#popup_progress");n.show();g("show")}function k(){$("#popup_container").remove();$("#popup_progress").hide();g("hide");f(false)}function g(n){switch(n){case"show":g("hide");$("body").append('<div id="popup_overlay"></div>');$("#popup_overlay").css({position:"absolute",zIndex:99998,top:"0px",left:"0px",width:"100%",height:$(document).height(),background:opts.overlayColor,opacity:opts.overlayOpacity});break;case"hide":$("#popup_overlay").remove();break}}function c(p){if(!p){p=$("#popup_container")}var o=(($(window).height()/2)-(p.outerHeight()/2))+opts.verticalOffset;var n=(($(window).width()/2)-(p.outerWidth()/2))+opts.horizontalOffset;if(o<0){o=0}if(n<0){n=0}if($.browser.msie&&parseInt($.browser.version)<=6){o=o+$(window).scrollTop()}p.css({top:o+"px",left:n+"px"});$("#popup_overlay").height($(document).height())}function f(n){if(opts.repositionOnResize){switch(n){case true:$(window).bind("resize",c);break;case false:$(window).unbind("resize",c);break}}}function a(){console.log("asd")}};
