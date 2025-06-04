# image-labeling

`image-labeling` 是一個在瀏覽器端使用的 TypeScript 套件，可在 SVG 元素上繪製並編輯各式幾何圖形，協助建立影像註釋流程。

## 特色

- 提供 `Director` 作為繪製與編輯的核心管理者。
- 內建圖形：`Rectangle`、`Polygon`、`Circle`、`Ellipse`、`Dot`。
- 圖形可設定標註分類、顏色及名稱，並支援旋轉與縮放操作。
- 純前端實作，不含資料儲存或 UI 框架整合。

## 安裝

```bash
npm install image-labeling
```

## 基本使用

```ts
import { Director, Rectangle, ActType, SVGSVGEl } from 'image-labeling'

const svg = new SVGSVGEl(document.getElementById('svg') as SVGSVGElement)
Director.init(svg, { width: 800, height: 600, ratio: 1, discRadius: 6, hb: true, shortcut: { del: true } }, document.getElementById('wrapper') as HTMLDivElement)
Director.setActions([{ type: ActType.Added, func: s => console.log('added', s) }])
Director.startDraw(new Rectangle())
```

## 建置

執行下列指令可編譯原始碼並產出至 `dist` 目錄：

```bash
npm run build
```

## 授權

[MIT](LICENSE)
