/*
**  {{ name }} ~ {{ description }}
**  Copyright {{ creation_date | date("YYYY") }} (c) {{ authorName }} <{{ authorUrl }}>
**  Licensed under {{ license }} <https://spdx.org/licenses/{{ license }}>
*/

export default class Service {
    constructor (url, cid) {
        this.url = url
        this.cid = cid
    }
}

