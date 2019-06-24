# 极客时间视频下载

**注意：对于付费资源需要有相应权限才能下载。另外，代码只做学习交流用途，请勿用于非法情景。**

## 下载代码

```bash
git clone git@github.com:Xixi20160512/geekbang-video-downloder-nodejs.git
```

## 配置文件

```javascript
module.exports = {
  cid: "", // 视频课程的id
  _ga: "", //cookie
  _gid: "", //cookie
  GCID: "", //cookie
  GCESS: "" //cookie
};
```

比如我们打开一个课程的链接

**https://time.geekbang.org/course/intro/95**

这里的 95 就是`cid`，另外的`cookie`内容是登录之后的 cookie，可以通过 chrome 插件 editthiscookie 进行查看。

## 依赖

### npm

进入根目录：

```bash
npm install
```

### ffmpeg

除了 npm 之外，代码执行还依赖`ffmpeg`包，这个工具的安装方式请自行搜索。

安装完之后验证：

```bash
ffmpeg --version
```

没有报错就是安装好了。

## 执行

在项目根路径执行：

```bash
node index.js
```

## 注意

项目需要依赖 node 10.0 以上版本
