module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // 对象字面量项尾不能有逗号
    "comma-dangle": [2, "never"],
    // 可以给参数重新赋值
    "no-param-reassign": 0,
    // 允许全局用require
    "global-require": 0,
    // 关闭换行风格检测
    "linkbreak-style": 0,
    "indent": 'off',
    // 'vue/scipt-indent': [
    //   'error',
    //   2,
    //   {
    //     'baseIndent': 1
    //   }
    // ],
    "max-len" : ["error", {code : 300}]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
