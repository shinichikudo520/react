### react-ui库：antd-mobile
1. 安装：`npm install antd-mobile --save`
2. 在index.html 引入以下内容在`<head></head>`标签中
```
<!DOCTYPE html>
<html>
<head>
  <!-- set `maximum-scale` for some compatibility issues -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }
    if(!window.Promise) {
      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
    }
  </script>
</head>
<body></body>
</html>
```
3. 在index.js中引入全局样式：
`import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'`
4. 在组件中引入需要的组件并使用，如：
```
import React,{Component} from 'react';
import { Button } from 'antd-mobile';

import './App.css';

export default class App extends Component{
  render(){
      return (
        <div className="App">
          <Button>Start</Button>
        </div>
      );
  }
}
```