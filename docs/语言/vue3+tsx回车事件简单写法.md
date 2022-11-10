---
title: vue3+tsx 内回车事件keyup简单用法
autoGroup-javascript: javascript  
categories: 语言
date: 2022-09-03
tags: [javascript]
---

## 背景
* 目前需求有`input`回车事件需求
* 项目背景用的是`tsx`
* 想跟模板语法一样简单 `@keyup.enter.native="handleSearch"`
* 找了很久，最后终于解决了[github issues 参考](https://github.com/vuejs/babel-plugin-jsx/issues/596)


## 1、新建工具withEventmodifiers.ts
```js
import { withModifiers, withKeys, capitalize } from 'vue'

function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? (val) => !!map[val.toLowerCase()]
    : (val) => !!map[val]
}

const isEventOptionModifier = makeMap('passive,once,capture')
const isNonKeyModifier = makeMap(
  // event propagation management
  'stop,prevent,self,' +
    // system modifiers + exact
    'ctrl,shift,alt,meta,exact,' +
    // mouse
    'middle'
)
// left & right could be mouse or key modifiers based on event type
const maybeKeyModifier = makeMap('left,right')
const isKeyboardEvent = makeMap('onkeyup,onkeydown,onkeypress', true)

export const resolveEventModifiers = ({
  eventName,
  eventModifiers
}: {
  eventName: string
  eventModifiers: string[]
}) => {
  const keyModifiers: string[] = []
  const nonKeyModifiers: string[] = []
  const eventOptionModifiers: string[] = []

  for (let i = 0; i < eventModifiers.length; i++) {
    const eventModifier = eventModifiers[i]

    if (isEventOptionModifier(eventModifier)) {
      // eventOptionModifiers: modifiers for addEventListener() options,
      // e.g. .passive & .capture
      eventOptionModifiers.push(eventModifier)
    } else {
      // runtimeModifiers: modifiers that needs runtime guards
      if (maybeKeyModifier(eventModifier)) {
        if (isKeyboardEvent(eventName)) {
          keyModifiers.push(eventModifier)
        } else {
          nonKeyModifiers.push(eventModifier)
        }
      } else {
        if (isNonKeyModifier(eventModifier)) {
          nonKeyModifiers.push(eventModifier)
        } else {
          keyModifiers.push(eventModifier)
        }
      }
    }
  }

  return {
    keyModifiers,
    nonKeyModifiers,
    eventOptionModifiers
  }
}

export const withEventModifiers = (
  eventObject: object,
  modifiers: string[]
) => {
  const eventName: string = Object.keys(eventObject)[0]
  const eventFunction: Function = Object.values(eventObject)[0]

  const { eventOptionModifiers, keyModifiers, nonKeyModifiers } =
    resolveEventModifiers({
      eventName,
      eventModifiers: modifiers
    })

  let outputEventName = eventName
  let outputEventFunction = eventFunction

  // normalize click.right and click.middle since they don't actually fire
  if (nonKeyModifiers.includes('right')) {
    outputEventName = 'onContextmenu'
  }

  if (nonKeyModifiers.includes('middle')) {
    outputEventName = 'onMouseup'
  }

  if (nonKeyModifiers.length > 0) {
    outputEventFunction = withModifiers(outputEventFunction, nonKeyModifiers)
  }

  if (
    keyModifiers.length > 0 &&
    // if event name is dynamic, always wrap with keys guard
    isKeyboardEvent(eventName)
  ) {
    outputEventFunction = withKeys(outputEventFunction, keyModifiers)
  }

  if (eventOptionModifiers.length > 0) {
    const modifierPostfix = eventOptionModifiers.map(capitalize).join('')
    outputEventName = `${outputEventName}${modifierPostfix}`
  }

  const outputEventObject = {
    [outputEventName]: outputEventFunction
  }

  return outputEventObject
}
```

## 2、使用
```js
import withEventModifiers '@/utils/withEventModifiers'
<input 
  {...withEventModifiers({
    onKeyup: () => {
        console.log('enter event');
    } 
  }, ['enter']
   )} 
/>
```
