module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 75, // 已ip 6为例 全部除以10(我们的事设计图就是750px)
      propList: ["*"] // 配置全部属性
    }
  }
};
