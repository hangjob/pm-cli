# pm-cli

> 品茗前端脚手架

## Meta标签介绍

### viewport

```html

<meta name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

> 介绍

```
width   正整数或device-width    定义视口的宽度，单位为像素
height  正整数或device-height   定义视口的高度，单位为像素
initial-scale   [0.0-10.0]  定义初始缩放值
minimum-scale   [0.0-10.0]  定义缩小最小比例，它必须小于或等于maximum-scale设置
maximum-scale   [0.0-10.0]  定义放大最大比例，它必须大于或等于minimum-scale设置
user-scalable   yes/no  定义是否允许用户手动缩放页面，默认值yes
```

### 禁止浏览器从本地计算机的缓存中访问页面内容。

```html

<meta http-equiv="pragma" content="no-cache"/>
<meta http-equiv="cache-control" content="no-cache"/>
```