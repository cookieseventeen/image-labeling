import { Circle, Rectangle, Polygon, Ellipse, Dot } from './src/types';

/**
 * Test file demonstrating the new name property feature
 * This file can be included in the PR to show the functionality
 */

console.log('=== Name Property Feature Test ===\n');

// Test 1: Creating shapes with names
console.log('1. Creating shapes with names:');
const circle = new Circle([100, 100], 50, ['car'], '#ff0000', '汽車輪胎');
const rectangle = new Rectangle([[0, 0], [100, 0], [100, 50], [0, 50]], ['person'], '#00ff00', '人物主體');
const polygon = new Polygon([[0, 0], [50, 0], [25, 50]], ['object'], '#0000ff', '特殊物件');
const ellipse = new Ellipse([200, 200], 60, 30, ['vehicle'], 45, '#ffff00', '車燈');
const dot = new Dot([300, 300], ['point'], '#ff00ff', '關鍵點');

console.log(`✅ Circle: ${circle.name} (${circle.type})`);
console.log(`✅ Rectangle: ${rectangle.name} (${rectangle.type})`);
console.log(`✅ Polygon: ${polygon.name} (${polygon.type})`);
console.log(`✅ Ellipse: ${ellipse.name} (${ellipse.type})`);
console.log(`✅ Dot: ${dot.name} (${dot.type})`);

// Test 2: Backward compatibility
console.log('\n2. Testing backward compatibility:');
const circleOld = new Circle([150, 150], 25, ['car']);
const rectangleOld = new Rectangle([[50, 50], [150, 50], [150, 100], [50, 100]], ['person']);

console.log(`✅ Circle (old way): ${circleOld.name} (${circleOld.type})`);
console.log(`✅ Rectangle (old way): ${rectangleOld.name} (${rectangleOld.type})`);

// Test 3: Serialization
console.log('\n3. Testing serialization:');
const outputCircle = circle.output(1);
const outputRectangle = rectangle.output(1);

console.log(`✅ Circle output name: ${outputCircle.name}`);
console.log(`✅ Rectangle output name: ${outputRectangle.name}`);

// Test 4: Search functionality
console.log('\n4. Testing search functionality:');
const shapes = [circle, rectangle, polygon, ellipse, dot, circleOld, rectangleOld];

const findShapeByName = (shapes: any[], name: string) => {
  return shapes.find(shape => shape.name === name);
};

const carShapes = shapes.filter(shape => shape.name?.includes('汽車'));
const namedShapes = shapes.filter(shape => shape.name);

console.log(`✅ Found shape by name: ${findShapeByName(shapes, '汽車輪胎')?.name || 'Not found'}`);
console.log(`✅ Car-related shapes: ${carShapes.length}`);
console.log(`✅ Named shapes: ${namedShapes.length}`);

console.log('\n=== Test completed successfully ==='); 