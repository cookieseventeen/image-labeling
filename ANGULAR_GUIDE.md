# image-labeling 與 Angular 整合指南

本文件提供在 Angular 專案中封裝與使用 `image-labeling` 套件的建議做法，以及相關的 API 參考與建置流程。

## 安裝

1. 於專案根目錄執行安裝：
   ```bash
   npm install image-labeling
   ```
2. 若計畫建立 Angular 函式庫封裝，可使用 Angular CLI：
   ```bash
   ng generate library image-labeling-wrapper
   ```
   將下列示範程式碼放入產生的函式庫中。

## 套件封裝範例

以下示範如何在 Angular 函式庫中建立 Service 與 Component，包裝 `Director` 的初始化與圖形事件。

### ImageLabelingService

```ts
import { Injectable } from '@angular/core';
import { Director, SVGSVGEl, ActType } from 'image-labeling';

@Injectable({ providedIn: 'root' })
export class ImageLabelingService {
  private svg?: SVGSVGEl;

  init(svgElement: SVGSVGElement, container: HTMLDivElement) {
    this.svg = new SVGSVGEl(svgElement);
    Director.init(this.svg, { width: 800, height: 600, ratio: 1, discRadius: 6, hb: true, shortcut: { del: true } }, container);
  }

  registerActions() {
    Director.setActions([
      { type: ActType.Added, func: s => console.log('added', s) },
      { type: ActType.Edited, func: s => console.log('edited', s) }
    ]);
  }

  startRectangle() {
    Director.startDraw(new Rectangle());
  }

  destroy() {
    if (this.svg) {
      Director.clear(this.svg.node);
    }
  }
}
```

### ImageLabelingComponent

```ts
import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ImageLabelingService } from './image-labeling.service';

@Component({
  selector: 'app-image-labeling',
  template: `
    <div #wrapper class="wrapper">
      <svg #svg width="800" height="600"></svg>
    </div>
  `,
  styles: [`.wrapper { position: relative; }`]
})
export class ImageLabelingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('svg', { static: true }) svgRef!: ElementRef<SVGSVGElement>;
  @ViewChild('wrapper', { static: true }) wrapperRef!: ElementRef<HTMLDivElement>;

  constructor(private service: ImageLabelingService) {}

  ngAfterViewInit(): void {
    this.service.init(this.svgRef.nativeElement, this.wrapperRef.nativeElement);
    this.service.registerActions();
  }

  ngOnDestroy(): void {
    this.service.destroy();
  }
}
```

### 模組宣告

將 Service 與 Component 在函式庫或應用程式的模組中宣告並導出：

```ts
@NgModule({
  declarations: [ImageLabelingComponent],
  exports: [ImageLabelingComponent]
})
export class ImageLabelingModule {}
```

## 在應用程式中使用

於目標模組匯入 `ImageLabelingModule`，即可在模板中加入 `<app-image-labeling>` 元素。必要時可透過 `@Input` 傳入寬度、高度或其他初始化參數，並在 Service 中轉換為 `Director.init` 的選項。

## 主要 API 參考

- `Director.init(svg, options, container)`：初始化環境，需傳入包裝後的 `SVGSVGEl`、畫布設定與容器元素。
- `Director.startDraw(shape)`：開始繪製指定圖形。
- `Director.plot(shapes)`：載入既有圖形陣列。
- `Director.updateCategories(id, categories, color)`：更新圖形分類與顏色。
- `Director.removeById(id)`：移除指定圖形。
- `Director.getShapes()`：取得序列化的圖形資訊。

詳細型別與方法請參考原始文件 `SPEC.md` 與 `EXAMPLES.md`。

## 建置與發佈

1. 於此專案中執行 `npm run build` 產生 `dist` 目錄與型別檔。
2. 在 Angular 函式庫的 `ng-package.json` 中指定入口與型別檔位置，確保打包時將 `image-labeling` 一併納入或設為 peer dependency。
3. 執行 `ng build image-labeling-wrapper` 產生封裝後的函式庫發佈檔案。

## 注意事項

- `image-labeling` 不處理圖形資料的持久化，Angular 應用需自行儲存序列化結果。
- 若需客製化樣式，請引入套件內的 `index.css` 或自行覆寫相關 CSS。
- 建議使用 RxJS 將 `Director` 的事件轉換為 Observable，以利在 Angular 架構中串接。

