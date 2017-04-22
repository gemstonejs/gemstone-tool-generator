/*
**  {{ name }} ~ {{ description }}
**  Copyright {{ creation_date | date("YYYY") }} (c) {{ authorName }} <{{ authorUrl }}>
**  Licensed under {{ license }} <https://spdx.org/licenses/{{ license }}>
*/

import gs       from "gemstone"
import Canvas   from "./ui/canvas/canvas"
import Service  from "./sv/service"

gs.boot({
    app:    "{{ name }}",
    config: process.config,
    ui:     () => [ "canvas", Canvas, "visible" ],
    sv:     (url, cid) => new Service(url, cid)
})

