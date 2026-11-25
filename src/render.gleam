//// Convert each shape into a list of points called a RenderPath.

import gleam/int
import gleam/list
import shape.{type Path, type Point, Arc, Circle, ColorLine, Line, Point}

/// One path as canvas.mjs setDrawing consumes it (field by field): the
/// polyline, stroke colour/width, and the start and end times (in tenths of a second)
/// between which the reveal runs — so the renderer's clock needs no shape
/// knowledge.
pub type RenderPath {
  RenderPath(
    points: List(Point),
    thickness: Float,
    color: String,
    start: Float,
    end: Float,
  )
}

// ── The canvas (canvas.mjs) ───────────────────────────────────────────────────

/// Replace the drawing being animated in the page's
/// `<canvas id="animation-canvas">` element. If that element doesn't appear within
/// about 10 seconds, this logs an error to the browser console. This keeps the
/// current time, so a drawing that replaces a finished one appears complete. To
/// animate it from the start, also call reset_clock.
@external(javascript, "./canvas.mjs", "setDrawing")
pub fn set_drawing(paths: List(RenderPath)) -> Nil

/// Set the animation's speed, as a multiple of its normal speed: 1.0 is normal and
/// is where it starts, 0.0 pauses, and a negative rate plays it backward.
/// Time stops at the start of the drawing and when its last path finishes, so
/// playing a finished drawing again takes a call to reset_clock.
@external(javascript, "./canvas.mjs", "setSpeed")
pub fn set_speed(rate: Float) -> Nil

/// Jump the animation back to its start, where the canvas is empty.
@external(javascript, "./canvas.mjs", "resetClock")
pub fn reset_clock() -> Nil

const custom_colors = [
  "#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93", "#ff924c", "#00bbf9",
]

const pi = 3.141592653589793

fn pick_color(idx: Int, fallback: String)-> String{
  let len = list.length(custom_colors)
  let safe_idx = int.absolute_value(idx) % len
  case list.drop(custom_colors, safe_idx){
    [c, ..] -> c
    [] -> fallback
  }
}

fn norm_deg(deg: Float) -> Float{
  case deg >. 180.0{
    True -> norm_deg(deg -. 360.0)
    False ->
      case deg <. -180.0 {
        True -> norm_deg(deg +. 360.0)
        False -> deg
      }
  }
}

fn sin_deg(deg: Float) -> Float{
  let x = norm_deg(deg) *. pi/. 180.0
  let x2 = x *. x
  let x3 = x2 *. x
  let x5 = x3 *. x2
  let x7 = x5 *. x2
  x -. x3 /. 6.0 +. x5 /. 120.0 -. x7 /. 5040.0
}

fn cos_deg(deg:Float) -> Float{
  let x = norm_deg(deg) *. pi /. 180.0
  let x2 = x *. x
  let x4 = x2 *. x2
  let x6 = x4 *. x2
  1.0 -. x2 /. 2.0 +. x4 /. 24.0 -. x6 /. 720.0
}

fn arc_points_loop(
  i: Int, 
  steps: Int,
  center: Point,
  radius: Float,
  start_deg: Float,
  end_deg: Float,
  acc: List(Point),
)-> List(Point){
  case i>steps{
    True->list.reverse(acc)
    False -> {
      let frac = int.to_float(i) /. int.to_float(steps)
      let deg = start_deg +. { end_deg -. start_deg } *. frac
      let pt = 
        Point(
          center.x +. radius *. cos_deg(deg),
          center.y +. radius *. sin_deg(deg),
        )
        arc_points_loop(i+1, steps, center, radius, start_deg, end_deg,[
          pt,
          ..acc
        ])
    }
  }
}
fn sample_arc(
  center: Point,
  radius: Float,
  start_deg: Float,
  end_deg: Float,
  steps: Int,
) -> List(Point){
  arc_points_loop(0, steps, center, radius, start_deg, end_deg, [])
}

pub fn render_path(path: Path, color: String) -> RenderPath {
  case path.shape {
    Line(a, b) ->
      RenderPath([a, b], path.thickness, color, path.start, path.end)
    ColorLine(a, b, color_idx) ->
      RenderPath(
        [a,b],
        path.thickness, 
        pick_color(color_idx, color),
        path.start,
        path.end,
      )
      Circle(center, radius) -> {
        let pts = sample_arc(center, int.to_float(radius), 0.0, 360.0, 36)
        RenderPath(pts, path.thickness, color, path.start, path.end)
      }
      Arc(center, radius, start_deg, end_deg) -> {
        let pts = 
        sample_arc(
          center,
          int.to_float(radius),
          int.to_float(start_deg),
          int.to_float(end_deg),
          24,
        )
        RenderPath(pts, path.thickness, color, path.start, path.end)
      }
  }
}
