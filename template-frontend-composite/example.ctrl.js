/*
**  {{ name }} -- {{ description }}
**  Copyright {{ creation_date | date("YYYY") }} (c) {{ authorName }} <{{ authorUrl }}>
**  Licensed under {{ license }} <https://spdx.org/licenses/{{ license }}>
*/

import { mvc } from "gemstone"
import View    from "./example.view.js"
import Model   from "./example.model.js"

export default class Controller extends mvc.Controller {
    create () {
        this.establish("model/view", [ Model, View ])
    }
}

