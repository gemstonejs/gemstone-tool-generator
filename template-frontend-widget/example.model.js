/*
**  {{ name }} -- {{ description }}
**  Copyright {{ creation_date | date("YYYY") }} (c) {{ authorName }} <{{ authorUrl }}>
**  Licensed under {{ license }} <https://spdx.org/licenses/{{ license }}>
*/

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

