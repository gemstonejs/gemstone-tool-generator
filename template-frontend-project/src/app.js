/*
**  {{ name }} ~ {{ description }}
**  Copyright {{ creation_date | date("YYYY") }} (c) {{ authorName }} <{{ authorUrl }}>
**  Licensed under {{ license }} <https://spdx.org/licenses/{{ license }}>
*/

import gs       from "gemstone"
import Canvas   from "./ui/canvas"
import Service  from "./sv/service"

import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/css/bootstrap-theme.css"
import "typopro-web/web/TypoPRO-SourceSansPro/TypoPRO-SourceSansPro.css"
import "font-awesome/css/font-awesome.css"

gs.boot({
    app:    "{{ name }}",
    config: process.config,
    ui:     () => [ "canvas", Canvas, "visible" ],
    sv:     (url, cid) => new Service(url, cid)
})

