/*
**  {{ name }} -- {{ description }}
**  Copyright {{ creation_date | date("YYYY") }} (c) {{ authorName }} <{{ authorUrl }}>
**  Licensed under {{ license }} <https://spdx.org/licenses/{{ license }}>
*/

import { default as gs, mvc } from "gemstone"

import mask from "./{{ id }}.html"
import i18n from "./{{ id }}.yaml"
import           "./{{ id }}.css"

class View extends mvc.View {
    render () {
        let ui = this.mask("{{ id }}", { render: mask, i18n: i18n })
        this.plug(ui)
    }
}

class Model extends mvc.Model {
    prepare () {
        this.model({
            dataExample: { value: "Example", valid: "string" }
        })
    }
}

export default class Controller extends mvc.Controller {
    create () {
        this.establish("model/view", [ Model, View ])
    }
}

