# 影像標註套件規格

此文件描述 *image-labeling* TypeScript 套件的整體功能。該套件提供在 SVG 元素上繪製及編輯幾何圖形的工具，協助建立影像註釋工作流程。

## 專案範疇

* 著重於瀏覽器端的互動式 SVG 標註功能。
* 內建矩形、折線、圓形、橢圓與點等圖形類別。
* 每個圖形可設定分類、顏色與名稱，並支援旋轉及縮放。
* 僅處理圖形繪製與編輯邏輯，持久化與 UI 整合需由使用者實作。

## 概覽

套件自 `src/index.ts` 匯出各類別與工具，並透過 `tsup` 打包。主要匯出內容包含：

- `Director`：統籌繪製、編輯與刪除圖形的核心管理者。
- 圖形類別：`Polygon`、`Rectangle`、`Circle`、`Ellipse`、`Dot`。
- 建構器工具：`ShapeBuilder` 及各圖形的專用建構器。
- 輔助型別與 SVG 元素包裝器。
- 來自 `index.css` 的 CSS 樣式。

編譯輸出會透過 `package.json` 中定義的 `build` 指令產生於 `dist` 目錄。

## 核心元件

### Director

`Director` 是類似單例的類別，負責高階操作：

- 維護已繪製元素列表並指派遞增 ID。
- 管理編輯狀態並委派至正確的圖形建構器。
- 處理放大縮小、滑鼠滾輪、拖曳平移及鍵盤快捷鍵等全域互動。
- 提供 `startDraw`、`stopDraw`、`edit`、`remove`、`plot` 既有圖形及查詢圖形等方法。

### ShapeBuilder 階層

`ShapeBuilder` 為抽象基底類別，封裝通用行為：

- 將圖形與輔助圓點渲染至 `SVGSVGEl` 包裝器。
- 讓圖形可拖曳、旋轉與縮放。
- 透過 `setOptions` 套用分類與顏色設定。
- 控制編輯圖示（移動／旋轉）並在設定時隱藏邊框。

具體建構器繼承自 `AngledBuilder`（用於折線）或 `RoundBuilder`（用於圓形／橢圓），並加入各自圖形的專屬邏輯：

- `RectangleBuilder` 與 `PolygonBuilder` 處理帶有頂點圓點的折線圖形。
- `CircleBuilder` 與 `EllipseBuilder` 支援圓形相關圖形。
- `DotBuilder` 在中央點周圍繪製菱形折線。

### 圖形類別

`types.ts` 中的圖形類別描述幾何實體。每個圖形追蹤其中心、旋轉角 (`phi`)、選用顏色及標註類別，並可儲存額外名稱。另提供方法計算標籤位置、旋轉點位、依比例縮放並生成序列化輸出。

### SVG 元素包裝器

`svg-elems.ts` 定義了輕量的包裝類別（`SVGEl`、`CircleEl`、`RectEl` 等）以封裝原生 SVG 元素。它們提供移動、樣式與事件綁定等輔助方法，讓各建構器能以一致 API 運作。

### 工具與樣式

`util.ts` 的工具函式包含幾何輔助（向量旋轉、顏色解析）及一般輔助函式（`fileName`、`removeOpacity`）。`index.css` 則定義了抓取游標、隱藏邊框及標籤文字等樣式。

## 建置與設定

- `tsconfig.json` 目標為 ES2021，輸出宣告檔至 `dist`，並強制嚴格型別檢查。
- `tsup.config.json` 進行壓縮與樣式注入等打包流程。
- 執行 `npm run build` 會使用 `tsup` 編譯所有 TypeScript 原始碼。

## 使用流程範例

1. 在應用程式中建立 `SVGSVGElement` 與容器 `HTMLDivElement`。
2. 初始化套件：
   ```ts
   const svg = new SVGSVGEl(yourSvgElement);
   Director.init(svg, { width, height, ratio: 1, discRadius: 6, hb: true, shortcut: { del: true } }, container);
   Director.setActions([{ type: ActType.Added, func: shape => console.log('added', shape) }]);
   ```
3. 使用 `Director.startDraw(new Rectangle())` 繪製圖形並處理事件。
4. 透過 `Director.get().getShapes()` 取得序列化圖形資料。

## 備註

此套件專注於互動式 SVG 標註，不含持久化或 UI 框架整合。使用者需自行管理超出核心工具以外的應用層狀態與事件。
