module.exports = {
  // The first way to use configuration files is via .eslintrc.* and package.json files.
  // ESLint will automatically look for them in the directory of the file to be linted,
  // and in successive parent directories all the way up to the root directory of the filesystem
  // (unless root: true is specified).
  // 减少不必要的文件查询
  root: true,
  // ESLint allows you to specify the JavaScript language options you want to support.
  // By default, ESLint expects ECMAScript 5 syntax.
  // You can override that setting to enable support for other ECMAScript versions as well as JSX by using parser options.
  parserOptions: {
    // By default, ESLint uses Espree as its parser.
    // You can optionally specify that a different parser should be used in your configuration file so long as the parser meets the following requirements:
    // It must be a Node module loadable from the config file where it appears. Usually, this means you should install the parser package separately using npm.
    // It must conform to the parser interface.
    parser: 'babel-eslint',
    // sourceType - set to "script" (default) or "module" if your code is in ECMAScript modules.
    sourceType: 'module',
  },
  env: {
    // browser - browser global variables.
    // node - Node.js global variables and Node.js scoping.
    // commonjs - CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).
    // shared-node-browser - Globals common to both Node.js and Browser.
    // es6 - enable all ECMAScript 6 features except for modules (this automatically sets the ecmaVersion parser option to 6).
    // es2017 - adds all ECMAScript 2017 globals and automatically sets the ecmaVersion parser option to 8.
    // es2020 - adds all ECMAScript 2020 globals and automatically sets the ecmaVersion parser option to 11.
    browser: true,
    node: true,
    es6: true,
  },
  // https://vuejs.org/v2/style-guide/
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  // for vue-script indent problem
  // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/script-indent.md
  overrides: [{'files': ['*.vue'], 'rules': {'indent': 0}}],
  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-config-vue
  // 等级分为三级： 0-不显示off；1-显示警告warning; 2-显示错误error
  rules: {
    'indent': ['error', 2, {SwitchCase: 1}],
    'vue/script-indent': ['error', 2, {'baseIndent': 1}],
    // 多个特性(超过3个)的元素应该分多行撰写，每个特性一行
    'vue/max-attributes-per-line': ['error',
      {
        singleline: 4,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    // 在单行元素的内容前后需要换行符
    // https://github.com/vuejs/eslint-plugin-vue/blob/v6.2.2/docs/rules/multiline-html-element-content-newline.md
    'vue/singleline-html-element-content-newline': 0,
    // 在多行元素的内容之前和之后需要换行符
    'vue/multiline-html-element-content-newline': 0,
    // disallow use of v-html to prevent XSS attack
    'vue/no-v-html': 0,
    // JS/JSX中的组件名应该始终是帕斯卡命名法
    'vue/name-property-casing': ['error', 'PascalCase'],
    // 在声明prop的时候，其命名应该始终使用驼峰命名
    'vue/prop-name-casing': ['error', 'camelCase'],
    // 不要把 v-if 和 v-for 用在同一个元素上——因为v-for 比 v-if 具有更高的优先级
    'vue/no-use-v-if-with-v-for': ['error', {
      'allowUsingIterationVar': false,
    }],
    /*//////////////////////////////////////////////////////////////////////////////////////////////////
                                              JS规范(a-z)
    //////////////////////////////////////////////////////////////////////////////////////////////////*/
    // 在对象中强制使用getter/setter
    'accessor-pairs': 2,
    // 该规则在数组括号内强制实现一致的间距
    // never（默认）不允许数组括号内的空格
    'array-bracket-spacing': [2, 'never'],
    // 在箭头函数之前/之后需要空格
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    // 在打开块之后和关闭块之前，禁止或强制执行 块内部的空格
    'block-spacing': ['error', 'always'],
    // 1tbs 一个真正的大括号样式（不同于CPP风格的大括号Allman）
    'brace-style': [2, '1tbs', {allowSingleLine: true},
    ],
    // 需要驼峰命名
    camelcase: [0, {properties: 'always'},
    ],
    // 要求或禁止使用尾随逗号
    'comma-dangle': [2, 'always-multiline'],
    // 强制逗号旁边的间距： 左右一个空格
    'comma-spacing': [2,
      {
        before: false,
        after: true,
      },
    ],
    // 逗号出现在最后
    'comma-style': [2, 'last'],
    // 此规则旨在标记无效/缺少的super()调用。
    'constructor-super': 2,
    // 很多人认为最好的做法是不要忽略块周围的花括号，即使它们是可选的；或者，你可以放松的规则
    curly: [2, 'multi-line'],
    // JavaScript 允许您在成员表达式中的点之前或之后放置换行符。此规则旨在强制执行成员表达式中的换行符一致性。此规则防止在成员表达式中围绕点使用混合换行符。
    // 该"property"选项要求点与属性位于同一行。
    'dot-location': [2, 'property'],
    // 该规则在非空文件的末尾至少执行一个换行符（或不存在）
    'eol-last': 'error',
    // 该规则旨在消除类型不安全的等式操作符
    // use the type-safe equality operators === and !== instead of their regular counterparts == and !=.
    eqeqeq: ['error', 'always', {null: 'ignore'}],
    // todo
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    // 这个规则期望当你在 Node.js 中使用回调模式时，你会处理这个错误
    'handle-callback-err': [2, '^(err|error)$'],
    // todo
    'jsx-quotes': [2, 'prefer-single'],
    // 在对象属性中强制键和值之间的一致间距
    'key-spacing': [0,
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    // 关键字前后强制执行一致的间距
    'keyword-spacing': [0,
      {
        before: true,
        after: true,
      },
    ],
    // 要求构造函数名称以大写字母开头
    'new-cap': [0,
      {
        newIsCap: true,
        capIsNew: false,
      },
    ],
    // 调用不带参数的函数时需要括号
    'new-parens': 'error',
    // new Array() is bad
    'no-array-constructor': 'error',
    // 不允许使用arguments.caller和arguments.callee
    'no-caller': 'error',
    // console.log is bad
    'no-console': 0,
    // class A { } A = 0; is bad
    'no-class-assign': 2,
    // 在条件语句中，将比较运算符（如==）作为赋值运算符（例如=）输错是非常容易的，但是，可能很难判断具体的任务是否是故意的。
    // 这条规则不允许在试验条件不明确赋值运算符if，for，while，和do...while语句
    'no-cond-assign': 2,
    // 我们不能修改使用const关键字声明的变量。它会引发运行时错误。在非 ES2015环境下，它可能仅仅被忽略。
    'no-const-assign': 2,
    // delete操作符的目的是从对象中删除属性。在变量上使用delete运算符可能会导致意外的行为。
    'no-delete-var': 2,
    // 如果在一个函数定义中有多个参数具有相同的名称，则最后一个匹配项会“遮蔽”前面的匹配项。重复的名称可能是打字错误
    'no-dupe-args': 2,
    // 如果在类成员中有相同名称的声明，则最后的声明会无声地覆盖其他声明。它可能会导致意外的行为
    'no-dupe-class-members': 2,
    // 对象文字中具有相同键的多个属性可能会导致应用程序出现意外行为
    'no-dupe-keys': 2,
    // 如果一个switch语句在case子句中有重复的测试表达式，程序员可能会复制一个case子句，但忘记更改测试表达式
    'no-duplicate-case': 2,
    // 此规则不允许debugger声明 (从没用过debugger...)
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 此规则不允许在正则表达式中使用空字符类
    // /^abc[]/.test("abcdefg"); is bad
    'no-empty-character-class': 2,
    // var {a: {}} = foo; is bad
    'no-empty-pattern': 2,
    // eval()功能是潜在的危险，经常被滥用
    'no-eval': 2,
    // 此规则不允许在catch子句中重新分配例外 catch(e){e=10} is bad
    'no-ex-assign': 2,
    // 不允许直接修改内建对象的原型，该规则接受一个exceptions选项，该选项可用于指定允许扩展名的内建列表。
    'no-extend-native': [2, {'exceptions': ['Object']}],
    // todo
    'no-extra-bind': 2,
    // 在if语句测试中，表达式的结果将被强制为布尔值，通过双重否定（!!）或强制转换为布尔值Boolean是不必要的。
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': 2,
    // 仅在函数表达式附近禁止不必要的括号
    'no-extra-parens': [2, 'functions'],
    // switch 强制使用break
    'no-fallthrough': 2,
    // var num = .5; is bad
    // 尽管不是语法错误，但这种数字格式可能难以区分真正的十进制数和点运算符
    // use var num = 0.5 is good
    'no-floating-decimal': 2,
    //此规则不允许重新分配function声明。
    'no-func-assign': 2,
    // 最佳做法是始终使用函数作为setTimeout()和setInterval()（和避免execScript()）的第一个参数。
    'no-implied-eval': 2,
    // "functions"（默认）不允许function嵌套块中的声明
    // Bad
    // if (test) {
    //     function doSomethingElse () { }
    // }
    'no-inner-declarations': [2, 'functions'],
    // 此规则不允许RegExp构造函数中的无效正则表达式字符串。
    'no-invalid-regexp': 2,
    // Invalid or irregular whitespace causes issues with ECMAScript 5 parsers
    // and also makes code harder to debug in a similar nature to mixed tabs and spaces.
    // "skipStrings": true (default) allows any whitespace characters in string literals
    'no-irregular-whitespace': 2,
    // 该__iterator__属性是 JavaScript 的 SpiderMonkey 扩展，可用于创建与 JavaScript  for in和for each构造兼容的自定义迭代器。
    // 但是，这个属性现在已经过时了，所以不应该使用它。
    // 您应该使用 ECMAScript 6 迭代器和生成器
    // foo.__iterator__ = function () {}; is bad
    'no-iterator': 2,
    // 标签名和变量名不能一样
    // bad
    // var x = foo;
    // function bar() {
    // x:
    //   for (;;) {
    //     break x;
    //   }
    // }
    // 事实上，下一条规则已经将 label禁用了
    'no-label-var': 2,
    // 该规则旨在消除 JavaScript 中使用带标签的语句。只要遇到带标签的语句以及每次break或continue使用标签时，它都会发出警告。
    'no-labels': [2,
      {
        allowLoop: false,
        allowSwitch: false,
      },
    ],
    // 消除es5中不必要的块
    // es6有块级作用域
    'no-lone-blocks': 2,
    // 此规则不允许使用混合空格和制表符进行缩进。
    'no-mixed-spaces-and-tabs': 2,
    // 规则旨在禁止在逻辑表达式，条件表达式，声明，数组元素，对象属性，序列和函数参数周围使用多个空格
    'no-multi-spaces': 2,
    // 通过在换行符之前使用斜线，可以在 JavaScript 中创建多行字符串
    // 有些人认为这是一个不好的做法，因为它是一个未被正式记录的JavaScript 特征。
    // bad
    // var x = "Line 1 \
    //     Line 2";
    'no-multi-str': 2,
    // 一些开发人员更喜欢删除多个空行，而另一些开发人员则认为这有助于提高可读性。空格对于分隔代码的逻辑部分非常有用
    // 但是多余的空白占用了更多的屏幕。
    // 规则旨在减少阅读代码时所需的滚动。它会在超过最大空行数量时发出警告
    'no-multiple-empty-lines': [
      2,
      {
        max: 3,
      },
    ],
    // 规则不允许修改只读全局变量。
    // Object = null
    // undefined = 1
    // 规则接受一个exceptions选项，该选项可用于指定允许重新分配的内建列表：
    'no-native-reassign': ['error', {'exceptions': ['Object']}],
    // var myObject = new Object(); is bad
    // var myObject = {}; is good
    'no-new-object': 2,
    // bad
    // var appHeader = new require('app-header');
    'no-new-require': 2,
    // var foo = new Symbol('foo'); is bad
    'no-new-symbol': 2,
    // 这个规则的目的是杜绝使用String，Number以及Boolean与new操作。因此发出，它当检索到new String，new Number或new Boolean警告。
    // 第一个问题是基本包装对象实际上是对象。这意味着typeof将返回"object"，而不是"string"，"number"或"boolean"。
    // 第二个问题来自布尔对象。每个对象都是 truthy,它的实际值是一个Boolean总是可以解决即使实际值为 false, 总是解析为 true的实例。
    // 由于这些原因，避免使用基本包装类型new是最佳做法。

    // bad
    // var stringObject = new String("Hello world");
    // console.log(typeof stringObject);       // "object"
    //
    // var text = "Hello world";
    // console.log(typeof text);               // "string"
    //
    // var booleanObject = new Boolean(false);
    // if (booleanObject) {    // all objects are truthy!
    //   console.log("This executes");
    // }

    // good
    // var text = String(someValue);
    // var num = Number(someValue);
    'no-new-wrappers': 2,
    // bad
    // var math = Math();
    // var json = JSON();
    // var reflect = Reflect();
    'no-obj-calls': 2,
    // 这个规则不允许使用八进制文字。
    'no-octal': 2,
    // 在 Node.js 的，__dirname和__filename全局变量分别包含的目录路径和当前正在执行的脚本文件的文件路径。
    // 有时，开发人员会尝试使用这些变量来创建其他文件的路径，例如：
    // var fullPath = __dirname + "/foo.js";
    // 但是，这有几个问题。首先，你不能确定脚本运行在什么类型的系统上。Node.js 可以在任何计算机上运行​包括使用不同路径分隔符的 Windows。
    // 因此，使用字符串连接并假定 Unix 风格的分隔符创建一个无效路径非常容易。也有可能使用双分隔符，否则就会导致无效路径。
    // 为了避免混淆如何创建正确的路径，Node.js 提供了path模块。该模块使用系统特定的信息始终返回正确的值。所以你可以重写前面的例子：
    // var fullPath = path.join(__dirname, "foo.js");
    // 这个例子不需要包含分隔符，因为path.join()它会以最合适的方式进行分隔。或者，您可以使用path.resolve()来检索完全限定的路径：
    'no-path-concat': 2,
    // __proto__属性已从 ECMAScript 3.1 中弃用，不应在代码中使用。改为使用方法getPrototypeOf。
    // good
    // var a = Object.getPrototypeOf(obj);
    // 如果您需要支持旧版浏览器，则可能需要关闭此规则，因为支持getPrototypeOf尚未普及。
    'no-proto': 2,
    // bad
    // var a = 3;
    // var a = 10;
    'no-redeclare': 2,
    // 正则表达式可能非常复杂且难以理解，这就是为什么尽量保持简单以避免错误非常重要的原因。
    // 使用正则表达式可以做的更容易出错的事情之一是使用多个空格，例如：
    // var re = /foo   bar/;
    // 在这个正则表达式中，很难判断有多少空间需要匹配。最好只使用一个空格，然后指定需要多少空格，例如：
    // var re = /foo {3}bar/;
    'no-regex-spaces': 2,
    // This rule aims to eliminate assignments from return statements.
    // As such, it will warn whenever an assignment is found as part of return.
    // except-parens是默认选项。它不允许分配，除非它们被括在圆括号中。
    // function doSomething() {
    //     return foo = bar + 2;
    // }
    // 这里很难说出return陈述的意图。函数有可能返回结果bar + 2，但为什么要赋值foo？也有可能意图是使用比较运算符，比如==
    // 由于含糊不清，在return报表中不使用赋值被认为是最佳做法
    'no-return-assign': [2, 'except-parens'],
    // bad
    // foo = foo;
    // [bar, baz] = [bar, qiz];
    'no-self-assign': 2,
    // bad
    // var x = 10;
    // if (x === x) {
    //     x = 20;
    // }
    'no-self-compare': 2,
    // 此规则禁止使用逗号运算符，但以下情况除外：
    // 在for语句的初始化或更新部分。
    // 如果表达式序列显式包含在圆括号中。
    'no-sequences': 2,
    // bad
    // var undefined = "foo";
    // NAN, Infinity e.g.
    'no-shadow-restricted-names': 2,
    // 虽然可能在函数名称和执行它的括号之间留有空格，但这种模式看起来更像错误。
    'no-spaced-func': 2,
    // bad
    // var items = [,,];
    'no-sparse-arrays': 2,
    // 先super，再this.
    // 好比在java中，super/this() 一定是在第一行
    'no-this-before-super': 2,
    // 该规则旨在通过不允许抛出不可能是Error对象的文字和其他表达式来抛出异常时保持一致性。
    // bad
    // throw "err";
    // 只能 throw new Error();
    'no-throw-literal': 2,
    // 此规则不允许在行尾添加尾随空白（空格，制表符和其他Unicode空白字符）。
    'no-trailing-spaces': 2,
    // 任何对未声明的变量的引用都会导致警告，除非该变量在/*global ...*/注释中明确提到。

    // bad
    // var a = someFunction();
    // b = 10;

    // good
    // /*global someFunction b:true*/
    // /*eslint no-undef: "error"*/
    //
    // var a = someFunction();
    // b = 10;
    'no-undef': 2,
    // 在 JavaScript 中，声明并未初始化为任何值的变量会自动获取值undefined。例如：
    // var foo;
    // console.log(foo === undefined);     // true
    // 因此不需要初始化变量undefined
    'no-undef-init': 2,
    // 由于自动分号插入（ASI），分号通常在 JavaScript 中是可选的。您可以根据半规则要求或禁用分号。
    // ASI 的规则相对简单：正如 Isaac Schlueter 所描述的那样，换行符总是结束一个语句，就像分号一样，除非出现以下情况之一：
    // bad
    // var foo = bar
    // (1 || 2).baz()
    //
    // var hello = 'world'
    // [1, 2, 3].forEach(addNumber)
    //
    // let x = function() {}
    // `hello`
    //
    // let x = function() {}
    // x
    // `hello`
    //
    // let x = foo
    // /regex/g.test(bar)
    'no-unexpected-multiline': 2,
    // 禁止未修改的循环条件，循环中的变量经常在循环中修改。如果不是，那可能是一个错误。
    // while (node) {
    //     doSomething(node);
    // }
    'no-unmodified-loop-condition': 2,
    // 当存在更简单的替代方案时，不允许三元运算符
    // Bad
    // var isYes = answer === 1 ? true : false;
    //
    // Good
    // var isYes = answer === 1;
    //
    //
    // Bad
    // var isNo = answer === 1 ? false : true;
    //
    // Good
    // var isNo = answer !== 1;
    //
    // Bad
    // var foo = bar ? bar : 1;
    //
    // // Good
    // var foo = bar || 1;
    // "defaultAssignment": true （默认）允许条件表达式作为默认分配模式
    'no-unneeded-ternary': [2, {defaultAssignment: false},
    ],
    // 因为return，throw，break，和continue语句无条件退出的代码块，之后他们的任何语句可以不被执行。无法访问的声明通常是一个错误
    // function fn() {
    //     x = 1;
    //     return x;
    //     x = 3; // this will never execute
    // }
    'no-unreachable': 2,
    // JavaScript 挂起try和catch阻塞的控制流程语句，直到块的执行finally完成。
    // 所以，当return，throw，break，或continue在使用finally，内部控制流语句try和catch被覆盖，这被认为是意外的行为。如：
    // We expect this function to return 1;
    // (() => {
    //     try {
    //         return 1; // 1 is returned but suspended until finally block ends
    //     } catch(err) {
    //         return 2;
    //     } finally {
    //         return 3; // 3 is returned before 1, which we did not expect
    //     }
    // })();
    'no-unsafe-finally': 2,
    // 在代码中任何地方声明和不使用的变量很可能是由于重构不完全导致的错误。这些变量在代码中占用空间，可能会导致读者混淆。
    // all检查所有变量的使用情况，包括全局范围内的变量。这是默认设置。
    // // also good
    // (function(foo, bar, baz) {
    //     return bar;
    // })();
    'no-unused-vars': [1, {vars: 'all', args: 'none'}],
    // 禁止不必要的call()和apply()方法
    'no-useless-call': 2,
    // 禁止在对象上使用不必要的计算属性键
    'no-useless-computed-key': 2,
    // 禁止不必要的构造方法
    'no-useless-constructor': 2,
    // 禁止不必要的转义用法
    'no-useless-escape': 0,
    // 在属性之前禁止空格
    'no-whitespace-before-property': 2,
    // with语句可能存在问题，因为它将对象的成员添加到当前作用域，从而无法确定块内实际引用的变量。
    // 如果 ESLint在严格模式下解析代码，解析器（而不是此规则）会报告错误。
    // bad
    // with (point) {
    //     r = Math.sqrt(x * x + y * y); // is r a member of point?
    // }
    // good
    // const r = ({x, y}) => Math.sqrt(x * x + y * y);
    'no-with': 2,
    // initialized: 'never'
    // 初始化变量时，都用var
    // 不初始化的变量公用一个var
    // bad
    // function foo() {
    //     var foo = true,
    //         bar = false;
    // }
    // good
    // function foo() {
    //     var foo = true;
    //     var bar = false;
    //     var a, b, c; // Uninitialized variables are ignored
    // }
    'one-var': [2, {initialized: 'never'}],
    // 一条语句太长而不适合单行时，通常会在分隔表达式的运算符旁边插入换行符。想到的第一种方式是按照英文标点符号将操作员放在行的末尾。
    // 一些开发人员发现，将行号放置在行首会使代码更具可读性。
    // answer = everything
    //   ? 42
    //   : foo;
    'operator-linebreak': [2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ],
    // "never" disallows empty lines at the beginning and ending of block statements and classes
    // bad
    // if (a) {
    //
    //     b();
    //
    // }
    // good
    // if (a) {
    //     b();
    // }
    'padded-blocks': [2, 'never'],
    // 此规则强制一致使用反引号，双引号或单引号。
    // 对象选项：
    // "avoidEscape": true 允许字符串使用单引号或双引号，只要字符串包含必须以其他方式转义的引号
    // "allowTemplateLiterals": true 允许字符串使用反引号
    // var single = 'single';
    // var backtick = `back${x}tick`; // backticks are allowed due to substitution
    quotes: [2, 'single', {avoidEscape: true, allowTemplateLiterals: true}],
    // "never"不允许分号语句的末尾（除非消除歧义开头语句[，(，/，+，或-）
    semi: [2, 'never'],
    // JavaScript允许你在分号之前或之后放置不必要的空格。
    // 禁止或强制使用分号周围的空格可以提高程序的可读性。
    // 当然这需要启用 semi
    'semi-spacing': [2, {before: false, after: true}],
    // 此规则将强化块之前的间距一致性。它只适用于不以新行开始的块。
    // 此规则忽略介于=>和块之间的间距。间距由arrow-spacing规则处理。
    // 此规则忽略关键字和块之间的间距。间距由keyword-spacing规则处理。
    // https://eslint.org/docs/rules/space-before-blocks.html
    'space-before-blocks': [2, 'always'],
    // bad
    // function foo () {
    //     // ...
    // }
    // good
    // function foo() {
    //     // ...
    // }
    'space-before-function-paren': [2, 'never'],
    // 此规则将强制直接在括号内进行间隔的一致性，即禁止或要求右侧(和左侧有一个或多个空格)。无论如何，()仍然会被允许。
    // "never" （默认）在圆括号内强制使用零空格
    'space-in-parens': [2, 'never'],
    // 这条规则旨在确保中缀操作员周围有空间
    // a+b is bad
    // a + b is good
    'space-infix-ops': 2,
    // 该规则强化了words一元运算符之后和一元运算符之后的空间的一致性nonwords。
    // words-如：new，delete，typeof，void，yield
    // nonwords-如：-，+，--，++，!，!!
    // ++a new Foo is good
    // ++ a new(Foo) is bad
    'space-unary-ops': [2, {words: true, nonwords: false}],
    // 注释开始后，此规则将强制间距的一致性//或/*。它还为各种文档样式提供了一些例外。
    // The "markers" value is an array of string patterns which are considered markers for docblock-style comments,
    // such as an additional /, used to denote documentation read by doxygen, vsdoc, etc. which must have additional characters.
    // The "markers" array will apply regardless of the value of the first argument, e.g. "always" or "never".
    // markers
    // good
    /// This is a comment with a marker
    // bad
    ///This is a comment with a marker but without whitespace
    'spaced-comment': [2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ',',
        ],
        exceptions: ['*', '-', '/', '+-'],
      },
    ],
    // 此规则旨在保持模板文字内部空间的一致性。
    // "never" （默认情况下） - 不允许大括号内的空格。
    // bad
    // `hello, ${ people.name}!`;
    // good
    // `hello, ${people.name}!`;
    'template-curly-spacing': [2, 'never'],
    // 这条规则不允许比较'NaN'。
    // 在JavaScript中，NaN是一种特殊的Number类型值。它用于表示由IEEE标准的二进制浮点运算指定的双精度64位格式所表示的任何“非数字”值。
    // 由于NaNJavaScript不同于任何东西（包括本身）在JavaScript中是独一无二的，因此比较的结果NaN令人困惑：
    // 因此，使用Number.isNaN()或全局isNaN()函数来测试值是否是NaN。
    'use-isnan': 2,
    // 此规则强制将typeof表达式与有效的字符串文字进行比较。
    // 对于绝大多数的使用情况下，
    // 结果typeof操作是下列字符串常量之一："undefined"，"object"，"boolean"，"number"，"string"，"function"和"symbol"。
    // 将typeof运算符的结果与其他字符串文字进行比较通常是打字错误。
    // bad
    // typeof foo === "strnig"
    'valid-typeof': 2,
    // 该规则要求所有立即调用的函数表达式都包含在圆括号中。
    // "outside"强制总是包装调用表达式。默认是"outside"。
    // "inside"强制总是包装函数表达式。
    // "any" 强制总是包装，但允许任何一种风格。
    // good
    // var x = (function () { return { y: 1 };}()); // wrapped call expression
    // var x = (function () { return { y: 1 };})(); // wrapped function expression
    'wrap-iife': [2, 'any'],
    // 此规则强制执行*周围 yield*表达式的间距。
    // 要使用这个规则，你要么需要使用es6环境或在parserOptions设置ecmaVersion为6。
    // before强制yield和*之间的空格。如果true需要空间，否则空间不允许。
    // after强制*和参数之间的间距。如果是true，则需要空间，否则空间不允许。
    // good
    // function * generator() {
    //   yield * other();
    // }
    'yield-star-spacing': [2, 'both'],
    // Yoda 条件是如此命名的，因为条件的字面值首先出现，而变量出现在第二位。例如，以下是 Yoda 条件：
    // if ("red" === color) {
    //     // ...
    // }
    // 默认"never"选项可以在对象文字中具有异常选项：
    // Examples of correct code for the default "never" option:
    // if (5 & value) {
    // }
    // if (value === "red") {
    // }
    // if (value === `red`) {
    // }
    // if (`${value}` === `red`) {
    // }
    yoda: [2, 'never'],
    // If a variable is never reassigned, using the const declaration is better.
    // const declaration tells readers, "this variable is never reassigned,"
    // reducing cognitive load and improving maintainability.
    // https://eslint.org/docs/rules/prefer-const
    'prefer-const': 2,
  },
}
