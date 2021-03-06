module.exports = {
  parser: "@typescript-eslint/parser", // 指定ESLint解析器
  parserOptions: {
    sourceType: "module", // 允许使用导入
  },
  extends: [
    "plugin:@typescript-eslint/recommended", // 使用@ typescript-eslint / eslint-plugin中的推荐规则
    "prettier/@typescript-eslint", // 使用eslint-config-prettier禁用一些与Prettier冲突的ESLint规则
    "plugin:prettier/recommended", // 启用eslint-plugin-prettier和eslint-config-prettier，使编辑器显示错误提示，确保这项是扩展数组中的最后一个配置
  ],
  rules: {
    // 放置ESLint规则的位置。可用于覆盖从扩展配置中指定的规则
    // 例如 "@typescript-eslint/explicit-function-return-type": "off",
    /* eslint规则 start */
    // 强制使用4个空格缩进
    indent: [
      "error",
      4,
      {
        SwitchCase: 1,
        VariableDeclarator: "first",
      },
    ],
    // 强制使用单引号
    quotes: ["error", "single"],
    // 强制结尾使用分号
    semi: "error",
    // 强制分号之后有空格，禁止分号之前有空格
    "semi-spacing": "error",
    // 禁止使用多个空格
    "no-multi-spaces": [
      "error",
      {
        ignoreEOLComments: true,
      },
    ],
    // 禁止在数组括号内出现空格
    "array-bracket-spacing": "error",
    // 强制在单行代码块中使用空格
    "block-spacing": "error",
    // 强制文件末尾保留一行空行
    "eol-last": "error",
    // 禁用行尾空格
    "no-trailing-spaces": "error",
    // 禁止花括号左右使用空格
    "object-curly-spacing": "error",
    // 块语句必须有一个前置空格
    "space-before-blocks": "error",
    // 强制在 function 的左括号之前使用空格
    "space-before-function-paren": "error",
    // 强制圆括号内没有空格
    "space-in-parens": "error",
    // 要求操作符周围有空格
    "space-infix-ops": "error",
    // 要求一元操作符周围有空格
    "space-unary-ops": "error",
    // 强制注释前有空格
    "spaced-comment": "error",
    // 要求在 switch 的冒号之后有一个空格
    "switch-colon-spacing": "error",
    // 扩展运算符 ... 及其表达式之间不允许有空格
    "rest-spread-spacing": "error",
    // 强制在对象字面量的冒号和值之间有空格
    "key-spacing": "error",
    // 要求在关键字之前之后有空格
    "keyword-spacing": "error",
    // 禁止在逗号前使用空格，要求在逗号后使用空格
    "comma-spacing": "error",
    // 禁止重复模块导入
    "no-duplicate-imports": "error",
    // 是否允许对象中出现结尾逗号
    "comma-dangle": ["error", "always-multiline"],
    // 空行最多不能超过两行
    "no-multiple-empty-lines": "error",
    // 函数调用时函数名与()之间不能有空格
    "func-call-spacing": "error",
    // 使用 let 和 const 代替 var
    "no-var": "error",
    // 嵌套块深度
    "max-depth": ["error", 4],
    // 不在循环体中使用await
    "no-await-in-loop": "error",
    // 禁用 console
    "no-console": "error",
    // 禁用 alert、confirm 和 prompt
    "no-alert": "error",
    // 禁用 eval()
    "no-eval": "error",
    // 禁止对 function 的参数进行重新赋值
    "no-param-reassign": "error",
    // 禁用一成不变的循环条件
    "no-unmodified-loop-condition": "error",
    // 代码块只有一条语句时，不能省略花括号
    curly: "error",
    // 强制尽可能地使用点号来访问对象中的属性
    "dot-notation": "error",
    // 禁止出现空函数
    "no-empty-function": "error",
    // 禁止扩展原生对象
    "no-extend-native": "error",
    // 禁止数字字面量中使用前导和末尾小数点
    "no-floating-decimal": "error",
    // 禁止多行字符串
    "no-multi-str": "error",
    // 禁止自身比较
    "no-self-compare": "error",
    // 禁止使用不带 await 表达式的 async 函数
    "require-await": "error",
    // 大括号风格要求，强制 one true brace style
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    // 逗号风格，要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
    "comma-style": "error",
    // 禁止混合使用不同的操作符
    "no-mixed-operators": "error",
    // 禁止连续赋值
    "no-multi-assign": "error",
    // 禁止属性前有空白
    "no-whitespace-before-property": "error",
    // 要求箭头函数体使用大括号
    "arrow-body-style": ["error", "always"],
    // 要求箭头函数的参数使用圆括号
    "arrow-parens": "error",
    // 要求箭头函数的箭头之前或之后有空格
    "arrow-spacing": "error",
    // 要求使用 const 声明那些声明后不再被修改的变量
    "prefer-const": "error",
    // import 排序
    "sort-imports": [
      "error",
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
    // 强制模板字符串中使用空格
    "template-curly-spacing": "error",
    /* eslint规则 end */

    /* vue规则 start */
    "vue/no-use-v-if-with-v-for": [
      "error",
      {
        allowUsingIterationVar: true,
      },
    ],
    // 4个缩进
    "vue/html-indent": [
      "error",
      4,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    // 闭括号不换行
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "never",
      },
    ],
    // 无内容自动关闭
    "vue/html-self-closing": [
      "error",
      {
        html: {
          normal: "never",
          void: "always",
        },
      },
    ],
    // 一行多少个属性
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 2,
        multiline: {
          max: 2,
          allowFirstLine: false,
        },
      },
    ],
    // 引号
    "vue/html-quotes": [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    // 关闭v-html警告
    "vue/no-v-html": "off",
    // 不强制转换属性名风格
    "vue/attribute-hyphenation": "off",
    // 允许空行
    "vue/multiline-html-element-content-newline": [
      "error",
      {
        allowEmptyLines: true,
      },
    ],
    // 不自动转换组件名命名方式
    "vue/component-definition-name-casing": "off",
    "vue/name-property-casing": "off",
    /* vue规则 end */
  },
};
