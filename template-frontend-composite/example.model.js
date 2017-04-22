/*
{{ header | replace(r/^  /mg, "**") }}*/

import { mvc } from "gemstone"

export default class Model extends mvc.Model {
    prepare () {
        this.model({
            dataExample: { value: "Example", valid: "string" }
        })
    }
}

