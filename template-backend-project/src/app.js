/*
**  {{ name }} ~ {{ description }}
**  Copyright {{ creation_date | date("YYYY") }} (c) {{ authorName }} <{{ authorUrl }}>
**  Licensed under {{ license }} <https://spdx.org/licenses/{{ license }}>
*/

import gs   from "gemstone-framework-backend"
import path from "path"

gs.boot({
    app:    "{{ name }}",
    config: process.config,
    ini:    path.join(__dirname, "app.ini"),
    load: [
        path.join(__dirname, "**/*.mod.js")
    ]
})

