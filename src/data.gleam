//// The library of saved drawings. A drawing is a name and the source of its draw
//// function.

import gleam/string
import gleam/list

// ── localStorage (data_ffi.mjs) ───────────────────────────────────────────────

/// The string stored in localStorage under key, or an Error if there isn't one.
@external(javascript, "./data_ffi.mjs", "storageGet")
pub fn storage_get(key: String) -> Result(String, Nil)

/// Store value in localStorage under key, replacing anything already there. If that
/// isn't possible, this logs the reason to the browser console.
@external(javascript, "./data_ffi.mjs", "storageSet")
pub fn storage_set(key: String, value: String) -> Nil

// ── The new-drawing prompt (data_ffi.mjs) ─────────────────────────────────────

/// Prompt the user to name a new drawing; "" (empty string) means they
/// cancelled or left it blank.
@external(javascript, "./data_ffi.mjs", "promptDrawingName")
pub fn prompt_drawing_name() -> String

// Saving n loading
pub const storage_key = "animator_saved_drawings"
const split_item = "|||DRAWING_SPLIT|||"
const split_name_code = "|||NAME_CODE|||"

// converts our list of drawins into a single giant string n saves it
pub fn save_drawings(drawings: List(#(String, String))) -> Nil{
    let stringified = list.map(drawings, fn(d) {d.0 <> split_name_code <> d.1})
    |> string.join(split_item)

    // use the external stroage_set function
    storage_set(storage_key, stringified)
}

// retrieves the giant string from localStorage and chops it back into a list
pub fn load_drawings() -> Result(List(#(String,String)), Nil){
    // using the external stoage_get function!
    case storage_get(storage_key){
        Ok(saved_text) if saved_text != "" -> {
            let drawings = string.split(saved_text, split_item)
            |> list.filter_map(fn(item){
                case string.split(item, split_name_code){
                    [name,code] -> Ok(#(name,code))
                    _-> Error(Nil)
                }
            })
            // if loaded at least one drawing, return
            case drawings{
                []-> Error(Nil)
                _ -> Ok(drawings)
            }
        }
        _ -> Error(Nil) // if nothing is saved, return an error so app loads examples
    }
}
