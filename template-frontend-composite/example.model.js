/*
**  {{ name }} -- {{ description }}
**  Copyright {{ creation_date | date("YYYY") }} (c) {{ authorName }} <{{ authorUrl }}>
**  Licensed under {{ license }} <https://spdx.org/licenses/{{ license }}>
*/

import { mvc } from "gemstone"

export default class Model extends mvc.Model {
    prepare () {
        this.model({
            dataExample: { value: "Example", valid: "string" }
        })
    }
}

