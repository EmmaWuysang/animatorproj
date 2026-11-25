//// Animator -- an application for program-generated drawings.


import builtins
import drawing
import editor
import errors
import gleam/result
import gleam/string
import lustre
import lustre/attribute as attr
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html
import lustre/event
import parser
import shape.{type Path}
import gleam/list
import render
import gleam/int
import gleam/float
import examples
import data

/// Your app's public address, once you've deployed it in Problem 13, such as
/// "https://your-username.github.io/animator/".
pub const public_url = ""

/// Set to True if you would like your app's URL included in the course gallery.
pub const include_app_in_gallery = False

/// A link to your video from Problem 14, which anyone with the link can watch.
pub const video_url = ""

/// Set to True if you would like your video included in the course gallery.
pub const include_video_in_gallery = False

const default_code = "fn draw(shape_slider: Int) -> List(Path) {\n  [Path(Line(Point(0, 0), Point(100, 100)), 0, 10, 2)]\n}\n"

// ── Model ──────────────────────────────────────────────────────────────────────

pub type Model {
  Model(
    // The code in the editor.
    source: String,
    // Whether the code editor is shown.
    code_open: Bool,
    output: String,
    shape_slider: Int,
    speed: Float,
    drawings: List(#(String, String)),
    current_drawing: String,
    palette_name: String,
    glow_enabled: Bool,
  )
}

pub type Msg {
  SetCode(String)
  SetShape(Int)
  SetSpeed(Float)
  SelectDrawing(String)
  SelectPalette(String)
  ToggleGlow
  // Layout controls
  ToggleCode
}

// ── Init ───────────────────────────────────────────────────────────────────────

pub fn init(_flags: Nil) -> #(Model, Effect(Msg)) {
  let starting_drawings = case data.load_drawings(){
    Ok(saved) -> saved
    Error(_) -> examples.all
  }
  // Get the first drawing to show when the app opens
  let #(first_name, first_code) = case starting_drawings{
    [first, ..] -> first
    [] -> #("Default", default_code)
  }
  #(
    Model(
      source: first_code,
      code_open: True, 
      output: "",
      shape_slider: 10,
      speed: 1.0,
      drawings: starting_drawings,
      current_drawing: first_name,
      palette_name: "rainbow",
      glow_enabled: True,
    ),
    // Effects that happen automatically at the start go here.
    effect.batch([
      editor.mount(first_code, SetCode),
      effect.from(fn(dispatch) { dispatch(SetCode(first_code)) }),
    ]),
  )
}

// Parse and evaluate a draw function at the given shape-slider value, returning
// the rendered paths on success, or a human-readable message on failure.
fn run_source(shape_slider: Int, source: String) -> Result(List(Path), String) {
  case parser.parse_program(source, builtins.global_frame()) {
    Error(msg) -> Error(msg)
    Ok(program) ->
      drawing.try_draw(shape_slider, program)
      // Convert Error(EvalError) to Error(String) with a useful error message.
      |> result.map_error(errors.error_message)
  }
}

fn palette_colors(name: String)-> List(String){
  case name{
    "sunset" -> ["#ff595e", "#ff924c", "#ffca3a", "#f15bb5", "#9b5de5"]
    "neon" -> ["#00f5d4", "#00bbf9", "#f15bb5", "#fee440", "#9b5de5"]
    "oceanic" -> ["#0077b6", "#00b4d8", "#90e0ef", "#48cae4", "#023e8a"]
    "mono" -> ["#ffffff", "#d4d4d8", "#a1a1aa", "#71717a", "#e4e4e7"]
    _ -> ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]
  }
}

fn build_render_paths(
  paths: List(Path),
  palette_name: String,
) -> List(render.RenderPath){
  let palette = palette_colors(palette_name)
  let len = list.length(palette)
  list.index_map(paths, fn(p, idx){
    let color = case len > 0 {
      True ->
      case list.drop(palette, idx%len){
        [c, ..] -> c
        [] -> "#ffffff"
      }
      False -> "#ffffff"
    }
    render.render_path(p,color)
  })
}

// ── Update ─────────────────────────────────────────────────────────────────────

pub fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    ToggleCode -> #(Model(..model, code_open: !model.code_open), effect.none())

    // After each keystroke in the editor, evaluate user code and report errors.
    SetCode(text) -> {
      // update our list of drawings with the newest edits
      let updated_drawings = list.key_set(model.drawings, model.current_drawing, text)
      data.save_drawings(updated_drawings)

      case run_source(model.shape_slider, text) {
        // Parsed and evaluated: show the result.
        Ok(paths) -> {
          let render_paths = build_render_paths(paths, model.palette_name)
        #(
          Model(..model,output: string.inspect(paths), source: text, drawings: updated_drawings),
          // canvas draws a new path
          effect.from(fn(_dispatch){render.set_drawing(render_paths)})
          )
        }
        //If breaks the error is shwon
        Error(msg) -> #(
          Model(..model, output: msg, source: text, drawings: updated_drawings),
          // clears the canvas on error but triggers set_drawing for the tests
          effect.from(fn(_dispatch){render.set_drawing([])})
        )
      }
    }

      SetShape(val)->{
        case run_source(val, model.source){
          Ok(paths)->{
            let render_paths = build_render_paths(paths, model.palette_name)
            #(
              Model(..model, shape_slider: val, output: string.inspect(paths)),
              effect.from(fn(_dispatch){ render.set_drawing(render_paths)}),
            )
          }
          Error(msg) -> #(
            Model(..model,shape_slider: val, output: msg),
            effect.from(fn(_dispatch) {render.set_drawing([])})
          )
        }
      }
      SetSpeed(val) -> #(
        Model(..model, speed: val),
        effect.from(fn(_dispatch) {render.set_speed(val)})
      )
      SelectDrawing(name)->{
        case name{
          "" -> {
            let new_name = data.prompt_drawing_name()
            case new_name{
              "" -> #(model, effect.none())
              _-> {
                let updated_drawings = list.key_set(model.drawings, new_name, default_code)
                data.save_drawings(updated_drawings)

                #(
                  Model(..model, current_drawing: new_name, source: default_code, drawings: updated_drawings),
                  // the editor to display the new code and trigger setcode
                  effect.batch([
                    editor.mount(default_code,SetCode),
                    effect.from(fn(dispatch){dispatch(SetCode(default_code))})
                  ])
                )
              }
            }
          }
          _->{
            // finds the code for drawin the selected from the drop down
            let new_code= case list.key_find(model.drawings,name){
              Ok(code)-> code
              Error(_) -> ""
            }
            #(
              Model(..model, current_drawing:name, source: new_code),
              // tells the editor to display the new code and trigger SetCode to draw it
              effect.batch([
                editor.mount(new_code, SetCode),
                effect.from(fn(dispatch){dispatch(SetCode(new_code))})
              ])
            )
          }
        }
      }
      SelectPalette(name) -> {
        case run_source(model.shape_slider, model.source){
          Ok(paths) -> {
            let render_paths = build_render_paths(paths, name)
            #(
              Model(..model, palette_name: name),
              effect.from(fn(_dispatch){render.set_drawing(render_paths)}),
            )
          }
          Error(_) -> #(Model(..model, palette_name:name), effect.none())
        }
      }
      ToggleGlow -> #(
        Model(..model, glow_enabled: !model.glow_enabled),
        effect.none(),
      )
  }
}

// ── View ──────────────────────────────────────────────────────────────────
//
// Two side-by-side panes: the code editor on the left and its rendered output on
// the right. The code column can be hidden to expand the right pane.

pub fn view(model: Model) -> Element(Msg) {
  let app_class = case model.code_open {
    True -> "app"
    False -> "app code-hidden"
  }
  // The code column still exists even when hidden (CSS collapses it) so the
  // mounted CodeMirror editor keeps its state across show/hide.
  html.div([attr.class(app_class)], [
    html.div([attr.class("code-col")], [
      view_drawing_menu(model),
      editor.view_panel(ToggleCode),
    ]),
    view_anim(model),
  ])
}

fn view_anim(model: Model) -> Element(Msg) {
  let glow_style = case model.glow_enabled{
    True -> "filter: drop-shadow(0 0 8px rgba(0, 187, 249, 0.55));"
    False -> "filter: none;"
  }
  html.div([attr.class("canvas-area")], [
    view_reveal_code(model),
    html.canvas([attr.id("animation-canvas"), attr.class("canvas"), attr.attribute("style", glow_style)]),
    html.pre([attr.class("output")], [html.text(model.output)]),
    view_sliders(model),
  ])
}

// The button that brings the code column back, overlaid on the top-left of the
// right pane. Nothing is rendered while the column is already showing (its own
// header holds the button that hides it).
fn view_reveal_code(model: Model) -> Element(Msg) {
  case model.code_open {
    True -> element.none()
    False ->
      html.button(
        [
          attr.class("icon-btn reveal-code"),
          attr.attribute("title", "Show code"),
          event.on_click(ToggleCode),
        ],
        [html.text("⟩")],
      )
  }
}

fn view_drawing_menu(model:Model) -> Element(Msg){
  // maps existing drawings
  let drawing_options = list.map(model.drawings, fn(drawing){
    let #(name, _code)=drawing
    html.option(
      [attr.value(name), attr.selected(name == model.current_drawing)],
      name,
    )
  })
  // append the new drawing option
  let all_options = list.append(drawing_options, [
    html.option([attr.value("")], "New Drawing...")
  ])
  // render the menu
  html.div([attr.attribute("style", "padding: 8px; background: #1e1e24;")], [
    html.select(
      [
        attr.attribute("data-test-id", "drawing-select"),
        attr.attribute("style", "width: 100%; padding: 4px;"),
        event.on_input(SelectDrawing)
      ],
      all_options
    )
  ])
}

// just for the sliders
fn view_sliders(model: Model) -> Element(Msg){
  html.div(
    [
      attr.class("controls"),
      attr.attribute("style", "position: absolute; bottom: 20px; right: 20px; background: #2a2a35; padding: 15px; border-radius: 8px; color: white; display: flex; flex-direction: column; gap: 10px;")
    ],
    [
      html.div([], [
        html.label([attr.attribute("style", "margin-right: 10px;")], [html.text("Shape: ")]),
        html.input([
          attr.type_("range"),
          attr.min("0"),
          attr.max("100"),
          attr.value(int.to_string(model.shape_slider)),
          attr.attribute("data-test-id", "shape-slider"),
          event.on_input(fn(val){
            let assert Ok(parsed) = int.parse(val)
            SetShape(parsed)
          }),
        ]),
      ]),
      html.div([],[
        html.label([attr.attribute("style", "margin-right: 10px;")], [html.text("Speed: ")]),
        html.input([
          attr.type_("range"),
          attr.min("-5.0"),
          attr.max("5.0"),
          attr.step("0.1"),
          attr.value(float.to_string(model.speed)),
          attr.attribute("data-test-id","speed-slider"),
          event.on_input(fn(val){
            let assert Ok(parsed) = float.parse(val)
            SetSpeed(parsed)
          }),
        ]),
      ]),
      html.div(
        [attr.attribute("style", "display: flex; align-items: center; gap: 8px;")],
        [
          html.label([], [html.text("Palette: ")]),
          html.select(
            [event.on_change(SelectPalette)],
            [
              html.option([attr.value("rainbow"), attr.selected(model.palette_name == "rainbow")], "Rainbow"),
              html.option([attr.value("sunset"), attr.selected(model.palette_name == "sunset")], "Sunset"),
              html.option([attr.value("neon"), attr.selected(model.palette_name == "neon")], "Neon"),
              html.option([attr.value("ocean"), attr.selected(model.palette_name == "ocean")], "Ocean"),
              html.option([attr.value("mono"), attr.selected(model.palette_name == "mono")], "Mono"),
            ],
          ),
          html.button(
            [event.on_click(ToggleGlow)],
            [html.text(case model.glow_enabled{
              True -> "Glow: On"
              False -> "Glow: Off"
            })],
          ),
        ],
      ),
    ]
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────

pub fn main() -> Nil {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}
