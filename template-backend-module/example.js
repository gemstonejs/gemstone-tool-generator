/*
{{ header | replace(r/^  /mg, "**") }}*/

export default class Module {
    get module () {
        return {
            name:  "example-module",
            group: "USECASE"
        }
    }
    prepare (mk) {
        /*  FIXME  */
    }
}

