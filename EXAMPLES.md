# 功能範例

下列範例說明如何在應用程式中使用 `image-labeling` 提供的主要功能。

## 初始化

```ts
import { Director, ActType, SVGSVGEl, Rectangle } from 'image-labeling'

const svg = new SVGSVGEl(document.getElementById('svg') as SVGSVGElement)
const container = document.getElementById('wrapper') as HTMLDivElement

Director.init(
  svg,
  { width: 800, height: 600, ratio: 1, discRadius: 6, hb: true, shortcut: { del: true } },
  container
)
Director.setActions([
  { type: ActType.Added, func: s => console.log('added', s) },
  { type: ActType.Edited, func: s => console.log('edited', s) },
  { type: ActType.Selected, func: s => console.log('selected', s) }
])
```

## 繪製圖形

透過 `Director.startDraw` 可開始繪製指定圖形，完成後會自動加入編輯模式。

```ts
Director.startDraw(new Rectangle())
```

呼叫 `Director.stopDraw()` 可中止繪製流程。

## 載入既有圖形

若已擁有序列化資料，可使用 `Director.plot` 將圖形顯示於畫布。

```ts
import { Polygon } from 'image-labeling'

const shapes = [new Polygon([[10,10],[40,10],[40,40],[10,40]], ['target'], '#00ff00', 'area')]
Director.get()?.plot(shapes)
```

## 更新分類、顏色與名稱

繪製完成後，可透過 `updateCategories` 與直接設定 `name` 來修改屬性。

```ts
const id = Director.get()?.getShapes()[0].id!
Director.get()?.updateCategories(id, ['person'], '#ff0000')
Director.get()?.findShape(id).name = 'rectangle-1'
```

## 編輯與刪除

```ts
Director.get()?.edit(id)          // 進入指定圖形的編輯狀態
Director.get()?.removeById(id)    // 移除圖形
```

## 取得序列化結果

```ts
const result = Director.get()?.getShapes()
console.log(result)
```

## 縮放與清除

```ts
Director.get()?.zoom(1.25)    // 對所有圖形進行縮放
Director.clear(svg.node)      // 清除畫布與事件
```
