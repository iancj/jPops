##用法

jPops依赖于```jQuery```，jPops主体js```jquery.jpops.js```,jPops样式```jpops.source.css```

**alert:**
```js
$.jPops.alert({
    title:"这是标题-alert",
    content:"这是测试信息-alert",
    okButton:"确定",
    callback:function(r){
        if(r){
            console.log("我是alert的回调")
        }
    }
});
```

**confirm:**
```js
$.jPops.confirm({
    title:"这是标题-confirm",
    content:"这是测试信息-confirm",
    okButton:"确定",
    cancelButton:"取消",
    callback:function(r){
        if(r){
            console.log("我是confirm的回调,true");
        }
        else{
            console.log("我是confirm的回调,false");
        }
    }
});
```

**prompt:**
```js
$.jPops.prompt({
    title:"这是标题-prompt",
    content:"请填写内容：",
    defaultValue:"这是默认值-prompt",
    okButton:"确定",
    cancelButton:"取消",
    callback:function(val){
        if(val){
            console.log("我是prompt的回调,value:"+val);
        }
        else{
            console.log("我是prompt的回调,value:"+val);
        }
    }
});
```

**message:**
```js
$.jPops.message({
    title:"这是标题",
    content:"测试信息测试信息",
    messageType:mtype,
    messageTimging:3000,
    messageAutoHide:true,
    callback:function(r){
        if(r){
            console.log("我是message的回调");
        }
    }
});
```

**自定义html confirm:**
```js
var html="<div>测试自定义html</div>";

$.jPops.confirm({
    title:"这是标题-自定义html",
    content:html,
    okButton:"确定",
    cancelButton:"取消",
    callback:function(r){
        if(r){
            console.log("我是自定义html的回调,true");
        }
        else{
            console.log("我是自定义html的回调,false");
        }
    }
});
```

**progress:**
```js
//初始化进度条
$.jPops.progress({
    content:"这是进度条",
    width:1000,
    progressPer:50,
    progressType:"danger",
    progressActived:true,
    callback:function(){
        //do something
    }
});

//更新进度条数据信息
$.jPops.progressUpdate({
    content:"还差一点点",
    progressPer:80,
    progressType:"success",
    callback:function(){
        $.jPops.progressHide();//关闭进度条
    }
});
```

**loading:**
```js
//显示loading
$.jPops.showLoading();

//隐藏loading
$.jPops.hideLoading();
```

**<a href="http://iancj.com/jPops/" target="_blank">点击查看在线示例</a>**

_jPops使用了bootstrap2的按钮样式和进度条样式，可以在jpops.source.css中修改将样式为任何样子_

##参数

###通用参数
- **title** 标题
- **content** 内容
- **width** 宽度
- **height** 高度
- **minHeight** 最小高度
- **minWidth** 最小宽度
- **okButton** 确定按钮文字
- **cancelButton** 取消按钮文字
- **verticalOffset** Y轴偏移量
- **horizontalOffset** X轴偏移量
- **overlayOpacity**  遮罩层透明度
- **overlayColor**  遮罩层背景色
- **clickToClose** 执行完回调函数后是否自动关闭弹窗
- **callback** 回调函数

######prompt 弹窗可选参数
- **defaultValue** prompt默认值

######message 弹窗可选参数
- **messageType** 风格[info|warning|success|danger]
- **messageTimging** 显示时间
- **messageAutoHide** 是否自动隐藏(默认true)

######progress 弹窗可选参数
- **progressPer** 百分比
- **progressType** 风格[info|warning|success|danger]
- **progressActived** 是否显示动画

######loading 可选参数
- **showOverlay** 是否显示遮罩层