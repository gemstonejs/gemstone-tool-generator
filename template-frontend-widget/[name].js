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

