//# sourceMappingURL=shape.mjs.map
import { CustomType as $CustomType } from "./gleam.mjs";

export class Point extends $CustomType {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
}
export const Point$Point = (x, y) => new Point(x, y);
export const Point$isPoint = (value) => value instanceof Point;
export const Point$Point$x = (value) => value.x;
export const Point$Point$0 = (value) => value.x;
export const Point$Point$y = (value) => value.y;
export const Point$Point$1 = (value) => value.y;

export class Line extends $CustomType {
  constructor(start, end) {
    super();
    this.start = start;
    this.end = end;
  }
}
export const Shape$Line = (start, end) => new Line(start, end);
export const Shape$isLine = (value) => value instanceof Line;
export const Shape$Line$start = (value) => value.start;
export const Shape$Line$0 = (value) => value.start;
export const Shape$Line$end = (value) => value.end;
export const Shape$Line$1 = (value) => value.end;

export class ColorLine extends $CustomType {
  constructor(start, end, color_idk) {
    super();
    this.start = start;
    this.end = end;
    this.color_idk = color_idk;
  }
}
export const Shape$ColorLine = (start, end, color_idk) =>
  new ColorLine(start, end, color_idk);
export const Shape$isColorLine = (value) => value instanceof ColorLine;
export const Shape$ColorLine$start = (value) => value.start;
export const Shape$ColorLine$0 = (value) => value.start;
export const Shape$ColorLine$end = (value) => value.end;
export const Shape$ColorLine$1 = (value) => value.end;
export const Shape$ColorLine$color_idk = (value) => value.color_idk;
export const Shape$ColorLine$2 = (value) => value.color_idk;

export class Circle extends $CustomType {
  constructor(center, radius) {
    super();
    this.center = center;
    this.radius = radius;
  }
}
export const Shape$Circle = (center, radius) => new Circle(center, radius);
export const Shape$isCircle = (value) => value instanceof Circle;
export const Shape$Circle$center = (value) => value.center;
export const Shape$Circle$0 = (value) => value.center;
export const Shape$Circle$radius = (value) => value.radius;
export const Shape$Circle$1 = (value) => value.radius;

export class Arc extends $CustomType {
  constructor(center, radius, start_deg, end_deg) {
    super();
    this.center = center;
    this.radius = radius;
    this.start_deg = start_deg;
    this.end_deg = end_deg;
  }
}
export const Shape$Arc = (center, radius, start_deg, end_deg) =>
  new Arc(center, radius, start_deg, end_deg);
export const Shape$isArc = (value) => value instanceof Arc;
export const Shape$Arc$center = (value) => value.center;
export const Shape$Arc$0 = (value) => value.center;
export const Shape$Arc$radius = (value) => value.radius;
export const Shape$Arc$1 = (value) => value.radius;
export const Shape$Arc$start_deg = (value) => value.start_deg;
export const Shape$Arc$2 = (value) => value.start_deg;
export const Shape$Arc$end_deg = (value) => value.end_deg;
export const Shape$Arc$3 = (value) => value.end_deg;

export class Path extends $CustomType {
  constructor(shape, start, end, thickness) {
    super();
    this.shape = shape;
    this.start = start;
    this.end = end;
    this.thickness = thickness;
  }
}
export const Path$Path = (shape, start, end, thickness) =>
  new Path(shape, start, end, thickness);
export const Path$isPath = (value) => value instanceof Path;
export const Path$Path$shape = (value) => value.shape;
export const Path$Path$0 = (value) => value.shape;
export const Path$Path$start = (value) => value.start;
export const Path$Path$1 = (value) => value.start;
export const Path$Path$end = (value) => value.end;
export const Path$Path$2 = (value) => value.end;
export const Path$Path$thickness = (value) => value.thickness;
export const Path$Path$3 = (value) => value.thickness;
