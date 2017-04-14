/*
**  {{ name }} -- {{ description }}
**  Copyright {{ creation_date | date("YYYY") }} (c) {{ authorName }} <{{ authorUrl }}>
**  Licensed under {{ license }} <https://spdx.org/licenses/{{ license }}>
*/

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

