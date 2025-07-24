# Add Name Property Support to Shapes

## 🎯 Overview

This PR adds a `name` property to all Shape classes, allowing users to assign meaningful names to shapes for better identification and management in image labeling workflows.

## ✨ Features Added

- **Name Property**: All Shape classes now support an optional `name` property
- **Backward Compatibility**: Existing code continues to work without modification
- **Enhanced Serialization**: Name property is properly handled in serialization
- **Type Safety**: Full TypeScript support with optional name parameter

## 🔧 Changes Made

### 1. Base Shape Class
- Added `name?: string` property to abstract Shape class
- Updated constructor to accept optional `name` parameter
- Modified `getOutput()` method to include name property in serialization

### 2. All Shape Subclasses
Updated constructors for all shape classes:
- `Dot`
- `Rectangle` 
- `Polygon`
- `Circle`
- `Ellipse`
- `AngledShape` (abstract)
- `RoundShape` (abstract)

### 3. Serialization Methods
- All `output()` methods maintain original parameter structure
- Name property is handled in `getOutput()` method for proper serialization

## 📝 Usage Examples

### Creating Shapes with Names
```typescript
// Create a circle with a name
const circle = new Circle([100, 100], 50, ['car'], '#ff0000', 'car-wheel');

// Create a rectangle with a name
const rectangle = new Rectangle([[0, 0], [100, 0], [100, 50], [0, 50]], ['person'], '#00ff00', 'person-body');

// Create a polygon with a name
const polygon = new Polygon([[0, 0], [50, 0], [25, 50]], ['object'], '#0000ff', 'special-object');
```

### Backward Compatibility
```typescript
// Existing code continues to work
const circle = new Circle([100, 100], 50, ['car']);
const rectangle = new Rectangle([[0, 0], [100, 0], [100, 50], [0, 50]], ['person']);
```

### Searching by Name
```typescript
// Find shapes by name
const findShapeByName = (shapes: Shape[], name: string) => {
  return shapes.find(shape => shape.name === name);
};

// Find shapes containing specific keywords
const wheelShapes = shapes.filter(shape => shape.name?.includes('wheel'));
```

## 🧪 Testing

- ✅ All shape classes can be created with and without names
- ✅ Serialization works correctly for both scenarios
- ✅ Backward compatibility maintained
- ✅ TypeScript compilation successful
- ✅ Project builds without errors

## 🔄 Serialization Behavior

- **output() method**: Returns basic shape object (name is undefined)
- **getOutput() method**: Returns full shape object with name property set

This maintains the existing serialization pattern while adding name support.

## 📋 Checklist

- [x] Added name property to all Shape classes
- [x] Updated all constructors to accept optional name parameter
- [x] Maintained backward compatibility
- [x] Updated serialization methods
- [x] Added comprehensive tests
- [x] Verified TypeScript compilation
- [x] Confirmed project builds successfully

## 🎉 Benefits

1. **Better Identification**: Shapes can have meaningful names
2. **Improved UX**: Users can name important shapes
3. **Search Functionality**: Shapes can be found by name
4. **Debugging**: Easier to identify shapes during development
5. **Backward Compatible**: No breaking changes to existing code

## 🔗 Related Issues

This enhancement addresses the need for better shape identification and management in image labeling workflows.

---

## 🇨🇳 中文說明

### 功能概述
此 PR 為所有 Shape 類別添加了 `name` 屬性支援，讓使用者可以為形狀指定有意義的名稱，提升圖像標註工作流程中的識別和管理能力。

### 主要改進
- **名稱屬性**：所有 Shape 類別現在支援可選的 `name` 屬性
- **向後相容**：現有程式碼無需修改即可正常運作
- **序列化增強**：正確處理名稱屬性的序列化
- **型別安全**：完整的 TypeScript 支援

### 使用範例
```typescript
// 創建帶有名稱的圓形
const circle = new Circle([100, 100], 50, ['car'], '#ff0000', '汽車輪胎');

// 創建帶有名稱的矩形
const rectangle = new Rectangle([[0, 0], [100, 0], [100, 50], [0, 50]], ['person'], '#00ff00', '人物主體');
```

### 搜尋功能
```typescript
// 根據名稱搜尋形狀
const findShapeByName = (shapes: Shape[], name: string) => {
  return shapes.find(shape => shape.name === name);
};

// 搜尋包含特定關鍵字的形狀
const carShapes = shapes.filter(shape => shape.name?.includes('汽車'));
```

### 測試結果
所有測試都通過，包括：
- ✅ 向後相容性測試
- ✅ 序列化功能測試
- ✅ TypeScript 編譯測試
- ✅ 專案建置測試

這個功能增強了圖像標註工具的使用體驗，讓使用者能夠更好地管理和識別不同的形狀物件。 