/*
{{ header | replace(r/^  /mg, "**") }}*/

import { mvc } from "gemstone"
import View    from "./example.view.js"

export default class Model extends mvc.Model {
    create () {
        this.establish("view", [ View ])
    }
    prepare () {
        this.model({
            dataExample: { value: "Example", valid: "string" }
        })
    }
}

