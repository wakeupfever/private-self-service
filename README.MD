# self-service 文档

## 什么是 self-service ?

这是一款提供持续集成和推送服务的相关插件，可以用于文件上传以及部署。

## 安装

使用 npm
```
npm install privice-self-service --save-dev
```

使用 yarn
```
yarn add privice-self-service --dev
```

## 调用参数以及支持命令

这是目前所支持的参数

```
self-service init | i --mode dev

self-service deploy | d --mode dev

self-service remove | r --mode dev
```

## 初始化

```
self-service init | i --mode dev
```

这是在当前环境下自动生成一份名为 <kbd>self.config.js</kbd> 的文件，格式如下，需要手动补全对应内容

```
{
  // --mode dev 这里是为指定dev环境使用
  dev: {
    projectConfig: { // 项目配置信息
      name: "", // 项目名称
      version: "", // 项目版本
      dist: "", // 获取部署文件地址
      remote: "", // 远端路径
      remoteWidthList: [], // 远端白名单列表
      copyFilePath: [], // 聚合文件列表
      isGetFiles: false, // 是否聚合
      isCoverUpData: true, // 是否覆盖
      isInquirer: false, // 是否启用询问
      isDingTalk: false, // 是否启用更新成功推送 注：需要robot地址
    },
    serverConfig: { // 服务器信息
      host: "", // 地址
      port: 22, // 端口
      username: "", // 用户名
      password: "", // 密码
    },
    testConfig: { // 推送相关人信息
      testers: [], // 手机号码列表
      developer: [""],
    },
    dingTalkConfig: { // 钉钉 | 企业微信机器人推送
      robot: "", // webhook 地址
      subscribeString: "1", // 文字内容
      subscribeArray: [], // 分段落文字格式
    },
  },
};
```

## 部署配置
```
self-service deploy | d --mode dev
```
指定<kbd>--mode dev</kbd>环境，然后再通过<kbd>...projectConfig</kbd>文件的内容进行上传，具体参数说明请看初始化文档注释

这里解释一下这个三个字段，因为可能会遇到如下场景
1. 第一种，可能你想要上传的是多个文件夹，并不在一个目录内，这个时候请填写<kbd>copyFilePath: ['folder/**/*'], isGetFiles: true</kbd>，会主动多个文件夹聚合到一起然后一起上传
2. 第二种，可能你需要上传的远端服务器文件内并不只是有你的文件，还有其他的文件，这里可以 <kbd>isCoverUpData：false</kbd>，就不会把远端服务器地址的其他内容清空，只会把你要上传的内容添加进去
```
{
  ...
  copyFilePath: [], // 聚合文件列表
  isGetFiles: false, // 是否聚合
  
  isCoverUpData: true, // 是否覆盖
}
```

## 当前项目使用

如果是在本地项目调用的话，可以在项目根目录的package.json 文件中 scripts 脚本中添加如下代码

```
  "scripts": {
    "build:test": "vue-cli-service build --mode test && self-service deploy --mode test"
    "build": "vue-cli-service build --mode prod && self-service deploy --mode prod",
  },
```

只有当等打包的命令走完之后才会执行上传任务

npm

[https://www.npmjs.com/package/private-self-service](http://https://www.npmjs.com/package/private-self-service)

最后如果有帮助到你的话，麻烦给个⭐

GitHub

[https://github.com/wakeupfive/private-self-service](http://https://github.com/wakeupfive/private-self-service)