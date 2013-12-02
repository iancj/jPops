##用法

在页面中引入三个文件：```jQuery库```,```jquery.jpops.js```,```jpops.css```

**例子：**
```js
$.jPop({
    title: "这是标题",
    message: "这是一条测试信息",
    type: "alert",
    okButton: "确定",
    cancelButton: "取消",
    callback: function(r) {
       //do something
    }
});
```

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
- **dialogClass** 在弹出窗最外层加上一个自定义的样式
- **type** 弹出类型
- **title** jPop的标题
- **message** jPop的内容
- **value** jpop prompt类型的默认值
- **callback:function(){}** 回调函数
