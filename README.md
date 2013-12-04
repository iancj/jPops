##用法

在页面中引入三个文件：```jQuery库```,```jquery.jpops.js```,```jpops.css```

**例子alert：**
```js
$.jPop({
    title: "这是标题",
    content: "这是一条测试信息",
    type: "alert",
    callback: function(r) {
       //do something
    }
});
```
<img src="images/exm_alert.png" alt="">

**例子confirm：**
```js
$.jPop({
    title: "这是标题",
    content: "这是一条测试信息",
    type: "confirm",
    callback: function(r) {
       //do something
    }
});
```
<img src="images/exm_confirm.png" alt="">

**例子prompt：**
```js
$.jPop({
    title: "这是标题",
    content: "这是一条测试信息",
    value: "默认值",
    type: "prompt",
    callback: function(r) {
       //do something
    }
});
```
<img src="images/exm_prompt.png" alt="">

**例子message：**

```js
$.jPop({
    type:"message",
    content:"测试信息测试信息",
    messageOpts:{
        type:"info",
        timing:4000
    },
    callback:function(){
        console.log("我是回调")
    }
});
```

<img src="images/exm_message.png" alt="">

**<a href="http://iancj.com/jPops/" target="_blank">点击查看更多例子</a>**

jPops使用了bootstrap2的按钮样式，可以在jpops.css中修改将样式为任何样子

##参数

- **verticalOffset** 垂直偏移量（px）
- **horizontalOffset** 水平偏移量（px）
- **repositionOnResize** 当页面改变大小时自动调整位置
- **overlayOpacity** 遮罩层透明度
- **overlayColor** 遮罩层背景色
- **okButton** 确定按钮的显示文字
- **okButtonClass** 确定按钮的样式
- **cancelButton** 取消按钮的显示文字
- **cancelButtonClass** 取消按钮的样式
- **type** 弹出类型
- **title** jPop的标题
- **content** jPop的内容
- **value** jpop prompt类型的默认值
- **messageOpts** 弹出类型为message时的配置
- **------type** 弹出类型为message时的状态
- **------timing** 显示时间
- **callback:function(){}** 回调函数