//# sourceMappingURL=app.mjs.map
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $lustre from "../lustre/lustre.mjs";
import * as $attr from "../lustre/lustre/attribute.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import * as $html from "../lustre/lustre/element/html.mjs";
import * as $event from "../lustre/lustre/event.mjs";
import * as $builtins from "./builtins.mjs";
import * as $data from "./data.mjs";
import * as $drawing from "./drawing.mjs";
import * as $editor from "./editor.mjs";
import * as $errors from "./errors.mjs";
import * as $examples from "./examples.mjs";
import {
  Ok,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  remainderInt,
} from "./gleam.mjs";
import * as $parser from "./parser.mjs";
import * as $render from "./render.mjs";
import * as $shape from "./shape.mjs";

const FILEPATH = "src/app.gleam";

export class Model extends $CustomType {
  constructor(source, code_open, output, shape_slider, speed, drawings, current_drawing, palette_name, glow_enabled) {
    super();
    this.source = source;
    this.code_open = code_open;
    this.output = output;
    this.shape_slider = shape_slider;
    this.speed = speed;
    this.drawings = drawings;
    this.current_drawing = current_drawing;
    this.palette_name = palette_name;
    this.glow_enabled = glow_enabled;
  }
}
export const Model$Model = (source, code_open, output, shape_slider, speed, drawings, current_drawing, palette_name, glow_enabled) =>
  new Model(source,
  code_open,
  output,
  shape_slider,
  speed,
  drawings,
  current_drawing,
  palette_name,
  glow_enabled);
export const Model$isModel = (value) => value instanceof Model;
export const Model$Model$source = (value) => value.source;
export const Model$Model$0 = (value) => value.source;
export const Model$Model$code_open = (value) => value.code_open;
export const Model$Model$1 = (value) => value.code_open;
export const Model$Model$output = (value) => value.output;
export const Model$Model$2 = (value) => value.output;
export const Model$Model$shape_slider = (value) => value.shape_slider;
export const Model$Model$3 = (value) => value.shape_slider;
export const Model$Model$speed = (value) => value.speed;
export const Model$Model$4 = (value) => value.speed;
export const Model$Model$drawings = (value) => value.drawings;
export const Model$Model$5 = (value) => value.drawings;
export const Model$Model$current_drawing = (value) => value.current_drawing;
export const Model$Model$6 = (value) => value.current_drawing;
export const Model$Model$palette_name = (value) => value.palette_name;
export const Model$Model$7 = (value) => value.palette_name;
export const Model$Model$glow_enabled = (value) => value.glow_enabled;
export const Model$Model$8 = (value) => value.glow_enabled;

export class SetCode extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetCode = ($0) => new SetCode($0);
export const Msg$isSetCode = (value) => value instanceof SetCode;
export const Msg$SetCode$0 = (value) => value[0];

export class SetShape extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetShape = ($0) => new SetShape($0);
export const Msg$isSetShape = (value) => value instanceof SetShape;
export const Msg$SetShape$0 = (value) => value[0];

export class SetSpeed extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetSpeed = ($0) => new SetSpeed($0);
export const Msg$isSetSpeed = (value) => value instanceof SetSpeed;
export const Msg$SetSpeed$0 = (value) => value[0];

export class SelectDrawing extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SelectDrawing = ($0) => new SelectDrawing($0);
export const Msg$isSelectDrawing = (value) => value instanceof SelectDrawing;
export const Msg$SelectDrawing$0 = (value) => value[0];

export class SelectPalette extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SelectPalette = ($0) => new SelectPalette($0);
export const Msg$isSelectPalette = (value) => value instanceof SelectPalette;
export const Msg$SelectPalette$0 = (value) => value[0];

export class ToggleGlow extends $CustomType {}
export const Msg$ToggleGlow$const = new ToggleGlow();
export const Msg$ToggleGlow = () => Msg$ToggleGlow$const;
export const Msg$isToggleGlow = (value) => value instanceof ToggleGlow;

export class ToggleCode extends $CustomType {}
export const Msg$ToggleCode$const = new ToggleCode();
export const Msg$ToggleCode = () => Msg$ToggleCode$const;
export const Msg$isToggleCode = (value) => value instanceof ToggleCode;

const default_code = "fn draw(shape_slider: Int) -> List(Path) {\n  [Path(Line(Point(0, 0), Point(100, 100)), 0, 10, 2)]\n}\n";

/**
 * Your app's public address, once you've deployed it in Problem 13, such as
 * "https://your-username.github.io/animator/".
 */
export const public_url = "";

/**
 * Set to True if you would like your app's URL included in the course gallery.
 */
export const include_app_in_gallery = false;

/**
 * A link to your video from Problem 14, which anyone with the link can watch.
 */
export const video_url = "";

/**
 * Set to True if you would like your video included in the course gallery.
 */
export const include_video_in_gallery = false;

export function init(_) {
  let _block;
  let $ = $data.load_drawings();
  if ($ instanceof Ok) {
    let saved = $[0];
    _block = saved;
  } else {
    _block = $examples.all;
  }
  let starting_drawings = _block;
  let _block$1;
  if (starting_drawings instanceof $Empty) {
    _block$1 = ["Default", default_code];
  } else {
    let first = starting_drawings.head;
    _block$1 = first;
  }
  let $1 = _block$1;
  let first_name = $1[0];
  let first_code = $1[1];
  return [
    new Model(
      first_code,
      true,
      "",
      10,
      1.0,
      starting_drawings,
      first_name,
      "rainbow",
      true,
    ),
    $effect.batch(
      listPrepend(
        $editor.mount(first_code, (var0) => { return new SetCode(var0); }),
        listPrepend(
          $effect.from(
            (dispatch) => { return dispatch(new SetCode(first_code)); },
          ),
          $List$Empty$const,
        ),
      ),
    ),
  ];
}

function run_source(shape_slider, source) {
  let $ = $parser.parse_program(source, $builtins.global_frame());
  if ($ instanceof Ok) {
    let program = $[0];
    let _pipe = $drawing.try_draw(shape_slider, program);
    return $result.map_error(_pipe, $errors.error_message);
  } else {
    return $;
  }
}

function palette_colors(name) {
  if (name === "sunset") {
    return listPrepend(
      "#ff595e",
      listPrepend(
        "#ff924c",
        listPrepend(
          "#ffca3a",
          listPrepend("#f15bb5", listPrepend("#9b5de5", $List$Empty$const)),
        ),
      ),
    );
  } else if (name === "neon") {
    return listPrepend(
      "#00f5d4",
      listPrepend(
        "#00bbf9",
        listPrepend(
          "#f15bb5",
          listPrepend("#fee440", listPrepend("#9b5de5", $List$Empty$const)),
        ),
      ),
    );
  } else if (name === "oceanic") {
    return listPrepend(
      "#0077b6",
      listPrepend(
        "#00b4d8",
        listPrepend(
          "#90e0ef",
          listPrepend("#48cae4", listPrepend("#023e8a", $List$Empty$const)),
        ),
      ),
    );
  } else if (name === "mono") {
    return listPrepend(
      "#ffffff",
      listPrepend(
        "#d4d4d8",
        listPrepend(
          "#a1a1aa",
          listPrepend("#71717a", listPrepend("#e4e4e7", $List$Empty$const)),
        ),
      ),
    );
  } else {
    return listPrepend(
      "#ff595e",
      listPrepend(
        "#ffca3a",
        listPrepend(
          "#8ac926",
          listPrepend("#1982c4", listPrepend("#6a4c93", $List$Empty$const)),
        ),
      ),
    );
  }
}

function build_render_paths(paths, palette_name) {
  let palette = palette_colors(palette_name);
  let len = $list.length(palette);
  return $list.index_map(
    paths,
    (p, idx) => {
      let _block;
      let $ = len > 0;
      if ($) {
        let $1 = $list.drop(palette, remainderInt(idx, len));
        if ($1 instanceof $Empty) {
          _block = "#ffffff";
        } else {
          let c = $1.head;
          _block = c;
        }
      } else {
        _block = "#ffffff";
      }
      let color = _block;
      return $render.render_path(p, color);
    },
  );
}

export function update(model, msg) {
  if (msg instanceof SetCode) {
    let text = msg[0];
    let updated_drawings = $list.key_set(
      model.drawings,
      model.current_drawing,
      text,
    );
    $data.save_drawings(updated_drawings);
    let $ = run_source(model.shape_slider, text);
    if ($ instanceof Ok) {
      let paths = $[0];
      let render_paths = build_render_paths(paths, model.palette_name);
      return [
        new Model(
          text,
          model.code_open,
          $string.inspect(paths),
          model.shape_slider,
          model.speed,
          updated_drawings,
          model.current_drawing,
          model.palette_name,
          model.glow_enabled,
        ),
        $effect.from((_) => { return $render.set_drawing(render_paths); }),
      ];
    } else {
      let msg$1 = $[0];
      return [
        new Model(
          text,
          model.code_open,
          msg$1,
          model.shape_slider,
          model.speed,
          updated_drawings,
          model.current_drawing,
          model.palette_name,
          model.glow_enabled,
        ),
        $effect.from((_) => { return $render.set_drawing($List$Empty$const); }),
      ];
    }
  } else if (msg instanceof SetShape) {
    let val = msg[0];
    let $ = run_source(val, model.source);
    if ($ instanceof Ok) {
      let paths = $[0];
      let render_paths = build_render_paths(paths, model.palette_name);
      return [
        new Model(
          model.source,
          model.code_open,
          $string.inspect(paths),
          val,
          model.speed,
          model.drawings,
          model.current_drawing,
          model.palette_name,
          model.glow_enabled,
        ),
        $effect.from((_) => { return $render.set_drawing(render_paths); }),
      ];
    } else {
      let msg$1 = $[0];
      return [
        new Model(
          model.source,
          model.code_open,
          msg$1,
          val,
          model.speed,
          model.drawings,
          model.current_drawing,
          model.palette_name,
          model.glow_enabled,
        ),
        $effect.from((_) => { return $render.set_drawing($List$Empty$const); }),
      ];
    }
  } else if (msg instanceof SetSpeed) {
    let val = msg[0];
    return [
      new Model(
        model.source,
        model.code_open,
        model.output,
        model.shape_slider,
        val,
        model.drawings,
        model.current_drawing,
        model.palette_name,
        model.glow_enabled,
      ),
      $effect.from((_) => { return $render.set_speed(val); }),
    ];
  } else if (msg instanceof SelectDrawing) {
    let name = msg[0];
    if (name === "") {
      let new_name = $data.prompt_drawing_name();
      if (new_name === "") {
        return [model, $effect.none()];
      } else {
        let updated_drawings = $list.key_set(
          model.drawings,
          new_name,
          default_code,
        );
        $data.save_drawings(updated_drawings);
        return [
          new Model(
            default_code,
            model.code_open,
            model.output,
            model.shape_slider,
            model.speed,
            updated_drawings,
            new_name,
            model.palette_name,
            model.glow_enabled,
          ),
          $effect.batch(
            listPrepend(
              $editor.mount(
                default_code,
                (var0) => { return new SetCode(var0); },
              ),
              listPrepend(
                $effect.from(
                  (dispatch) => { return dispatch(new SetCode(default_code)); },
                ),
                $List$Empty$const,
              ),
            ),
          ),
        ];
      }
    } else {
      let _block;
      let $ = $list.key_find(model.drawings, name);
      if ($ instanceof Ok) {
        let code = $[0];
        _block = code;
      } else {
        _block = "";
      }
      let new_code = _block;
      return [
        new Model(
          new_code,
          model.code_open,
          model.output,
          model.shape_slider,
          model.speed,
          model.drawings,
          name,
          model.palette_name,
          model.glow_enabled,
        ),
        $effect.batch(
          listPrepend(
            $editor.mount(new_code, (var0) => { return new SetCode(var0); }),
            listPrepend(
              $effect.from(
                (dispatch) => { return dispatch(new SetCode(new_code)); },
              ),
              $List$Empty$const,
            ),
          ),
        ),
      ];
    }
  } else if (msg instanceof SelectPalette) {
    let name = msg[0];
    let $ = run_source(model.shape_slider, model.source);
    if ($ instanceof Ok) {
      let paths = $[0];
      let render_paths = build_render_paths(paths, name);
      return [
        new Model(
          model.source,
          model.code_open,
          model.output,
          model.shape_slider,
          model.speed,
          model.drawings,
          model.current_drawing,
          name,
          model.glow_enabled,
        ),
        $effect.from((_) => { return $render.set_drawing(render_paths); }),
      ];
    } else {
      return [
        new Model(
          model.source,
          model.code_open,
          model.output,
          model.shape_slider,
          model.speed,
          model.drawings,
          model.current_drawing,
          name,
          model.glow_enabled,
        ),
        $effect.none(),
      ];
    }
  } else if (msg instanceof ToggleGlow) {
    return [
      new Model(
        model.source,
        model.code_open,
        model.output,
        model.shape_slider,
        model.speed,
        model.drawings,
        model.current_drawing,
        model.palette_name,
        !model.glow_enabled,
      ),
      $effect.none(),
    ];
  } else {
    return [
      new Model(
        model.source,
        !model.code_open,
        model.output,
        model.shape_slider,
        model.speed,
        model.drawings,
        model.current_drawing,
        model.palette_name,
        model.glow_enabled,
      ),
      $effect.none(),
    ];
  }
}

function view_sliders(model) {
  return $html.div(
    listPrepend(
      $attr.class$("controls"),
      listPrepend(
        $attr.attribute(
          "style",
          "position: absolute; bottom: 20px; right: 20px; background: #2a2a35; padding: 15px; border-radius: 8px; color: white; display: flex; flex-direction: column; gap: 10px;",
        ),
        $List$Empty$const,
      ),
    ),
    listPrepend(
      $html.div(
        $List$Empty$const,
        listPrepend(
          $html.label(
            listPrepend(
              $attr.attribute("style", "margin-right: 10px;"),
              $List$Empty$const,
            ),
            listPrepend($html.text("Shape: "), $List$Empty$const),
          ),
          listPrepend(
            $html.input(
              listPrepend(
                $attr.type_("range"),
                listPrepend(
                  $attr.min("0"),
                  listPrepend(
                    $attr.max("100"),
                    listPrepend(
                      $attr.value($int.to_string(model.shape_slider)),
                      listPrepend(
                        $attr.attribute("data-test-id", "shape-slider"),
                        listPrepend(
                          $event.on_input(
                            (val) => {
                              let $ = $int.parse(val);
                              let parsed;
                              if ($ instanceof Ok) {
                                parsed = $[0];
                              } else {
                                throw makeError(
                                  "let_assert",
                                  FILEPATH,
                                  "app",
                                  344,
                                  "view_sliders",
                                  "Pattern match failed, no pattern matched the value.",
                                  {
                                    value: $,
                                    start: 11598,
                                    end: 11636,
                                    pattern_start: 11609,
                                    pattern_end: 11619
                                  }
                                )
                              }
                              return new SetShape(parsed);
                            },
                          ),
                          $List$Empty$const,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            $List$Empty$const,
          ),
        ),
      ),
      listPrepend(
        $html.div(
          $List$Empty$const,
          listPrepend(
            $html.label(
              listPrepend(
                $attr.attribute("style", "margin-right: 10px;"),
                $List$Empty$const,
              ),
              listPrepend($html.text("Speed: "), $List$Empty$const),
            ),
            listPrepend(
              $html.input(
                listPrepend(
                  $attr.type_("range"),
                  listPrepend(
                    $attr.min("-5.0"),
                    listPrepend(
                      $attr.max("5.0"),
                      listPrepend(
                        $attr.step("0.1"),
                        listPrepend(
                          $attr.value($float.to_string(model.speed)),
                          listPrepend(
                            $attr.attribute("data-test-id", "speed-slider"),
                            listPrepend(
                              $event.on_input(
                                (val) => {
                                  let $ = $float.parse(val);
                                  let parsed;
                                  if ($ instanceof Ok) {
                                    parsed = $[0];
                                  } else {
                                    throw makeError(
                                      "let_assert",
                                      FILEPATH,
                                      "app",
                                      359,
                                      "view_sliders",
                                      "Pattern match failed, no pattern matched the value.",
                                      {
                                        value: $,
                                        start: 12106,
                                        end: 12146,
                                        pattern_start: 12117,
                                        pattern_end: 12127
                                      }
                                    )
                                  }
                                  return new SetSpeed(parsed);
                                },
                              ),
                              $List$Empty$const,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              $List$Empty$const,
            ),
          ),
        ),
        listPrepend(
          $html.div(
            listPrepend(
              $attr.attribute(
                "style",
                "display: flex; align-items: center; gap: 8px;",
              ),
              $List$Empty$const,
            ),
            listPrepend(
              $html.label(
                $List$Empty$const,
                listPrepend($html.text("Palette: "), $List$Empty$const),
              ),
              listPrepend(
                $html.select(
                  listPrepend(
                    $event.on_change(
                      (var0) => { return new SelectPalette(var0); },
                    ),
                    $List$Empty$const,
                  ),
                  listPrepend(
                    $html.option(
                      listPrepend(
                        $attr.value("rainbow"),
                        listPrepend(
                          $attr.selected(model.palette_name === "rainbow"),
                          $List$Empty$const,
                        ),
                      ),
                      "Rainbow",
                    ),
                    listPrepend(
                      $html.option(
                        listPrepend(
                          $attr.value("sunset"),
                          listPrepend(
                            $attr.selected(model.palette_name === "sunset"),
                            $List$Empty$const,
                          ),
                        ),
                        "Sunset",
                      ),
                      listPrepend(
                        $html.option(
                          listPrepend(
                            $attr.value("neon"),
                            listPrepend(
                              $attr.selected(model.palette_name === "neon"),
                              $List$Empty$const,
                            ),
                          ),
                          "Neon",
                        ),
                        listPrepend(
                          $html.option(
                            listPrepend(
                              $attr.value("ocean"),
                              listPrepend(
                                $attr.selected(model.palette_name === "ocean"),
                                $List$Empty$const,
                              ),
                            ),
                            "Ocean",
                          ),
                          listPrepend(
                            $html.option(
                              listPrepend(
                                $attr.value("mono"),
                                listPrepend(
                                  $attr.selected(model.palette_name === "mono"),
                                  $List$Empty$const,
                                ),
                              ),
                              "Mono",
                            ),
                            $List$Empty$const,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                listPrepend(
                  $html.button(
                    listPrepend(
                      $event.on_click(Msg$ToggleGlow$const),
                      $List$Empty$const,
                    ),
                    listPrepend(
                      $html.text(
                        (() => {
                          let $ = model.glow_enabled;
                          if ($) {
                            return "Glow: On";
                          } else {
                            return "Glow: Off";
                          }
                        })(),
                      ),
                      $List$Empty$const,
                    ),
                  ),
                  $List$Empty$const,
                ),
              ),
            ),
          ),
          $List$Empty$const,
        ),
      ),
    ),
  );
}

function view_reveal_code(model) {
  let $ = model.code_open;
  if ($) {
    return $element.none();
  } else {
    return $html.button(
      listPrepend(
        $attr.class$("icon-btn reveal-code"),
        listPrepend(
          $attr.attribute("title", "Show code"),
          listPrepend($event.on_click(Msg$ToggleCode$const), $List$Empty$const),
        ),
      ),
      listPrepend($html.text("⟩"), $List$Empty$const),
    );
  }
}

function view_anim(model) {
  let _block;
  let $ = model.glow_enabled;
  if ($) {
    _block = "filter: drop-shadow(0 0 8px rgba(0, 187, 249, 0.55));";
  } else {
    _block = "filter: none;";
  }
  let glow_style = _block;
  return $html.div(
    listPrepend($attr.class$("canvas-area"), $List$Empty$const),
    listPrepend(
      view_reveal_code(model),
      listPrepend(
        $html.canvas(
          listPrepend(
            $attr.id("animation-canvas"),
            listPrepend(
              $attr.class$("canvas"),
              listPrepend(
                $attr.attribute("style", glow_style),
                $List$Empty$const,
              ),
            ),
          ),
        ),
        listPrepend(
          $html.pre(
            listPrepend($attr.class$("output"), $List$Empty$const),
            listPrepend($html.text(model.output), $List$Empty$const),
          ),
          listPrepend(view_sliders(model), $List$Empty$const),
        ),
      ),
    ),
  );
}

function view_drawing_menu(model) {
  let drawing_options = $list.map(
    model.drawings,
    (drawing) => {
      let name = drawing[0];
      return $html.option(
        listPrepend(
          $attr.value(name),
          listPrepend(
            $attr.selected(name === model.current_drawing),
            $List$Empty$const,
          ),
        ),
        name,
      );
    },
  );
  let all_options = $list.append(
    drawing_options,
    listPrepend(
      $html.option(
        listPrepend($attr.value(""), $List$Empty$const),
        "New Drawing...",
      ),
      $List$Empty$const,
    ),
  );
  return $html.div(
    listPrepend(
      $attr.attribute("style", "padding: 8px; background: #1e1e24;"),
      $List$Empty$const,
    ),
    listPrepend(
      $html.select(
        listPrepend(
          $attr.attribute("data-test-id", "drawing-select"),
          listPrepend(
            $attr.attribute("style", "width: 100%; padding: 4px;"),
            listPrepend(
              $event.on_input((var0) => { return new SelectDrawing(var0); }),
              $List$Empty$const,
            ),
          ),
        ),
        all_options,
      ),
      $List$Empty$const,
    ),
  );
}

export function view(model) {
  let _block;
  let $ = model.code_open;
  if ($) {
    _block = "app";
  } else {
    _block = "app code-hidden";
  }
  let app_class = _block;
  return $html.div(
    listPrepend($attr.class$(app_class), $List$Empty$const),
    listPrepend(
      $html.div(
        listPrepend($attr.class$("code-col"), $List$Empty$const),
        listPrepend(
          view_drawing_menu(model),
          listPrepend(
            $editor.view_panel(Msg$ToggleCode$const),
            $List$Empty$const,
          ),
        ),
      ),
      listPrepend(view_anim(model), $List$Empty$const),
    ),
  );
}

export function main() {
  let app = $lustre.application(init, update, view);
  let $ = $lustre.start(app, "#app", undefined);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "app",
      395,
      "main",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 13563,
        end: 13612,
        pattern_start: 13574,
        pattern_end: 13579
      }
    )
  }
  return undefined;
}
