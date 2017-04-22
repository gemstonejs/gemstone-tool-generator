/*
{{ header | replace(r/^  /mg, "**") }}*/

import { mvc } from "gemstone"
import mask    from "./example.mask.html"
import i18n    from "./example.i18n.yaml"
import              "./example.style.css"

export default class View extends mvc.View {
    render () {
        let ui = this.mask("{{ id }}", { render: mask, i18n: i18n })
        this.plug(ui)
    }
}

