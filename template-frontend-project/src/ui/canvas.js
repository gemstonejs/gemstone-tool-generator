/*
**  {{ name }} -- {{ description }}
**  Copyright {{ creation_date | date("YYYY") }} (c) {{ authorName }} <{{ authorUrl }}>
**  Licensed under {{ license }} <https://spdx.org/licenses/{{ license }}>
*/

import { default as gs, mvc } from "gemstone"

import mask from "./canvas.html"
import i18n from "./canvas.yaml"
import           "./canvas.css"

class View extends mvc.View {
    render () {
        let ui = this.mask("canvas", { render: mask, i18n: i18n })
        this.plug(ui)
        this.observe("dataInput", (val) => {
            this.value("dataOutput", val)
        })
    }
}

class Model extends mvc.Model {
    prepare () {
        this.model({
            dataInput:     { value: "",    valid: "string" },
            dataOutput:    { value: "",    valid: "string" },
            eventShutdown: { value: false, valid: "boolean", autoreset: true }
        })
    }
}

export default class Controller extends mvc.Controller {
    create () {
        this.establish("model/view", [ Model, View ])
    }
    render () {
        this.observe("eventShutdown", () => {
            gs.shutdown()
        })
    }
}

