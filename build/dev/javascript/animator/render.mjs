//# sourceMappingURL=render.mjs.map
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import {
  setDrawing as set_drawing,
  setSpeed as set_speed,
  resetClock as reset_clock,
} from "./canvas.mjs";
import {
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  remainderInt,
  divideFloat,
} from "./gleam.mjs";
import * as $shape from "./shape.mjs";
import { Arc, Circle, ColorLine, Line, Point } from "./shape.mjs";

export { reset_clock, set_drawing, set_speed };

export class RenderPath extends $CustomType {
  constructor(points, thickness, color, start, end) {
    super();
    this.points = points;
    this.thickness = thickness;
    this.color = color;
    this.start = start;
    this.end = end;
  }
}
export const RenderPath$RenderPath = (points, thickness, color, start, end) =>
  new RenderPath(points, thickness, color, start, end);
export const RenderPath$isRenderPath = (value) => value instanceof RenderPath;
export const RenderPath$RenderPath$points = (value) => value.points;
export const RenderPath$RenderPath$0 = (value) => value.points;
export const RenderPath$RenderPath$thickness = (value) => value.thickness;
export const RenderPath$RenderPath$1 = (value) => value.thickness;
export const RenderPath$RenderPath$color = (value) => value.color;
export const RenderPath$RenderPath$2 = (value) => value.color;
export const RenderPath$RenderPath$start = (value) => value.start;
export const RenderPath$RenderPath$3 = (value) => value.start;
export const RenderPath$RenderPath$end = (value) => value.end;
export const RenderPath$RenderPath$4 = (value) => value.end;

const custom_colors = /* @__PURE__ */ listPrepend(
  "#ff595e",
  listPrepend(
    "#ffca3a",
    listPrepend(
      "#8ac926",
      listPrepend(
        "#1982c4",
        listPrepend(
          "#6a4c93",
          listPrepend("#ff924c", listPrepend("#00bbf9", $List$Empty$const)),
        ),
      ),
    ),
  ),
);

const pi = 3.141592653589793;

function pick_color(idx, fallback) {
  let len = $list.length(custom_colors);
  let safe_idx = remainderInt($int.absolute_value(idx), len);
  let $ = $list.drop(custom_colors, safe_idx);
  if ($ instanceof $Empty) {
    return fallback;
  } else {
    let c = $.head;
    return c;
  }
}

function norm_deg(loop$deg) {
  while (true) {
    let deg = loop$deg;
    let $ = deg > 180.0;
    if ($) {
      loop$deg = deg - 360.0;
    } else {
      let $1 = deg < -180.0;
      if ($1) {
        loop$deg = deg + 360.0;
      } else {
        return deg;
      }
    }
  }
}

function sin_deg(deg) {
  let x = ((norm_deg(deg) * pi)) / 180.0;
  let x2 = x * x;
  let x3 = x2 * x;
  let x5 = x3 * x2;
  let x7 = x5 * x2;
  return ((x - (x3 / 6.0)) + (x5 / 120.0)) - (x7 / 5040.0);
}

function cos_deg(deg) {
  let x = ((norm_deg(deg) * pi)) / 180.0;
  let x2 = x * x;
  let x4 = x2 * x2;
  let x6 = x4 * x2;
  return ((1.0 - (x2 / 2.0)) + (x4 / 24.0)) - (x6 / 720.0);
}

function arc_points_loop(
  loop$i,
  loop$steps,
  loop$center,
  loop$radius,
  loop$start_deg,
  loop$end_deg,
  loop$acc
) {
  while (true) {
    let i = loop$i;
    let steps = loop$steps;
    let center = loop$center;
    let radius = loop$radius;
    let start_deg = loop$start_deg;
    let end_deg = loop$end_deg;
    let acc = loop$acc;
    let $ = i > steps;
    if ($) {
      return $list.reverse(acc);
    } else {
      let frac = divideFloat($int.to_float(i), $int.to_float(steps));
      let deg = start_deg + ((end_deg - start_deg) * frac);
      let pt = new Point(
        center.x + (radius * cos_deg(deg)),
        center.y + (radius * sin_deg(deg)),
      );
      loop$i = i + 1;
      loop$steps = steps;
      loop$center = center;
      loop$radius = radius;
      loop$start_deg = start_deg;
      loop$end_deg = end_deg;
      loop$acc = listPrepend(pt, acc);
    }
  }
}

function sample_arc(center, radius, start_deg, end_deg, steps) {
  return arc_points_loop(
    0,
    steps,
    center,
    radius,
    start_deg,
    end_deg,
    $List$Empty$const,
  );
}

export function render_path(path, color) {
  let $ = path.shape;
  if ($ instanceof Line) {
    let a = $.start;
    let b = $.end;
    return new RenderPath(
      listPrepend(a, listPrepend(b, $List$Empty$const)),
      path.thickness,
      color,
      path.start,
      path.end,
    );
  } else if ($ instanceof ColorLine) {
    let a = $.start;
    let b = $.end;
    let color_idx = $.color_idk;
    return new RenderPath(
      listPrepend(a, listPrepend(b, $List$Empty$const)),
      path.thickness,
      pick_color(color_idx, color),
      path.start,
      path.end,
    );
  } else if ($ instanceof Circle) {
    let center = $.center;
    let radius = $.radius;
    let pts = sample_arc(center, $int.to_float(radius), 0.0, 360.0, 36);
    return new RenderPath(pts, path.thickness, color, path.start, path.end);
  } else {
    let center = $.center;
    let radius = $.radius;
    let start_deg = $.start_deg;
    let end_deg = $.end_deg;
    let pts = sample_arc(
      center,
      $int.to_float(radius),
      $int.to_float(start_deg),
      $int.to_float(end_deg),
      24,
    );
    return new RenderPath(pts, path.thickness, color, path.start, path.end);
  }
}
