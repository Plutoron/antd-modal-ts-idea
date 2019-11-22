
此组件是一个用typeScript写的todomvc功能


## API

### todos

数据列表

- 类型：Array
- 默认：[]
- 配置形式如下：

```js
[
  {
    id: number,   // 唯一标识
    text: string, // 列表的值
    done: boolean // 是否被删除，有样式横线
  }
]

```


### Install

```
npm --registry=http://r.dtwave-inc.com install @dtwave/nemo-modal --save
```

### Usage

```js
import Modal from '@dtwave/nemo-modal'

ReactDOM.render(<Modal />, mountNode)
```
