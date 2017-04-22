/*
{{ header | replace(r/^  /mg, "**") }}*/

import { mvc } from "gemstone"
import View    from "./example.view.js"
import Model   from "./example.model.js"

export default class Controller extends mvc.Controller {
    create () {
        this.establish("model/view", [ Model, View ])
    }
}

