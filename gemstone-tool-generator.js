/*
**  GemstoneJS -- Gemstone JavaScript Technology Stack
**  Copyright (c) 2016-2017 Gemstone Project <http://gemstonejs.com>
**  Licensed under Apache License 2.0 <https://spdx.org/licenses/Apache-2.0>
*/

/*  external requirements  */
// const fs                  = require("fs-promise")
// const path                = require("path")
// const gemstoneConfig      = require("gemstone-config")
// const glob                = require("glob-promise")
// const chalk               = require("chalk")
// const pkg                 = require("./package.json")

/*  export the Gemstone Tool plugin API  */
module.exports = function () {
    this.register({
        name: "generate-frontend-project",
        desc: "Generate Gemstone Frontend Project Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "name", type: "string", def: "",
                desc: "The project name" }
        ],
        args: [
        ],
        func: async function (opts, ...args) {
            /* eslint no-console: off */
            console.log("generate-frontend-project", opts, args)
            return ""
        }
    })
    this.register({
        name: "generate-frontend-composite",
        desc: "Generate Gemstone Frontend Composite Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "name", type: "string", def: "",
                desc: "The composite name" }
        ],
        args: [
        ],
        func: async function (opts, ...args) {
            /* eslint no-console: off */
            console.log("generate-frontend-composite", opts, args)
            return ""
        }
    })
    this.register({
        name: "generate-frontend-widget",
        desc: "Generate Gemstone Frontend Widget Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" }
        ],
        args: [
            {   name: "name", type: "string",
                desc: "The widget name" }
        ],
        func: async function (opts, ...args) {
            /* eslint no-console: off */
            console.log("generate-frontend-widget", opts, args)
            return ""
        }
    })
    this.register({
        name: "generate-backend-project",
        desc: "Generate Gemstone Backend Project Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "name", type: "string", def: "",
                desc: "The project name" }
        ],
        args: [
        ],
        func: async function (opts, ...args) {
            /* eslint no-console: off */
            console.log("generate-backend-project", opts, args)
            return ""
        }
    })
    this.register({
        name: "generate-backend-module",
        desc: "Generate Gemstone Backend Module Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "name", type: "string", def: "",
                desc: "The module name" }
        ],
        args: [
        ],
        func: async function (opts, ...args) {
            /* eslint no-console: off */
            console.log("generate-backend-module", opts, args)
            return ""
        }
    })
}

