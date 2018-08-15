

## 一次Css动画引发思考


### Css Animation

#### Demo

- [demo链接](https://blog.zysndy.com/road/css/animation/)
- demo 代码片段参考[Css Animation off the ui thread](http://www.phpied.com/css-animations-off-the-ui-thread/)

1. 当每次点击`Button`时候，green会停止出发动画
2. 而其他的两块依然不会改变动画的执行

3. 他们的区别在于

   - red 和 green块的`keyframe`通过Css3的`transform`实现的
   - green块的keyframe通过margin-left实现的

4. 由此，如果在页面script执行导致页面动画卡顿，可尝试使用`transform`实现动画



#### 原理探索

#### 浏览器渲染












## Link
[1] http://www.phpied.com/css-animations-off-the-ui-thread/