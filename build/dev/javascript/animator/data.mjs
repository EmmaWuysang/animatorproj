//# sourceMappingURL=data.mjs.map
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import {
  storageGet as storage_get,
  storageSet as storage_set,
  promptDrawingName as prompt_drawing_name,
} from "./data_ffi.mjs";
import { Ok, Error, Empty as $Empty } from "./gleam.mjs";

export { prompt_drawing_name, storage_get, storage_set };

export const storage_key = "animator_saved_drawings";

const split_item = "|||DRAWING_SPLIT|||";

const split_name_code = "|||NAME_CODE|||";

export function save_drawings(drawings) {
  let _block;
  let _pipe = $list.map(
    drawings,
    (d) => { return (d[0] + split_name_code) + d[1]; },
  );
  _block = $string.join(_pipe, split_item);
  let stringified = _block;
  return storage_set(storage_key, stringified);
}

export function load_drawings() {
  let $ = storage_get(storage_key);
  if ($ instanceof Ok) {
    let saved_text = $[0];
    if (saved_text !== "") {
      let _block;
      let _pipe = $string.split(saved_text, split_item);
      _block = $list.filter_map(
        _pipe,
        (item) => {
          let $1 = $string.split(item, split_name_code);
          if ($1 instanceof $Empty) {
            return new Error(undefined);
          } else {
            let $2 = $1.tail;
            if ($2 instanceof $Empty) {
              return new Error(undefined);
            } else if ($2.tail instanceof $Empty) {
              let name = $1.head;
              let code = $2.head;
              return new Ok([name, code]);
            } else {
              return new Error(undefined);
            }
          }
        },
      );
      let drawings = _block;
      if (drawings instanceof $Empty) {
        return new Error(undefined);
      } else {
        return new Ok(drawings);
      }
    } else {
      return new Error(undefined);
    }
  } else {
    return new Error(undefined);
  }
}
