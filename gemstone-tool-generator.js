/*
**  GemstoneJS -- Gemstone JavaScript Technology Stack
**  Copyright (c) 2016-2017 Gemstone Project <http://gemstonejs.com>
**  Licensed under Apache License 2.0 <https://spdx.org/licenses/Apache-2.0>
*/

/* eslint no-console: off */

/*  external requirements  */
const path                = require("path")
const fs                  = require("fs-promise")
const Bluebird            = require("bluebird")
const glob                = require("glob-promise")
const mkdirp              = require("mkdirp-promise")
const chalk               = require("chalk")
const Nunjucks            = require("nunjucks")
const NunjucksDateFilter  = require("nunjucks-date-filter")
// const gemstoneConfig      = require("gemstone-config")
// const pkg                 = require("./package.json")

/*  Nujucks configuration  */
const nunjucksEnv = Nunjucks.configure(".", {
    autoescape: false,
    tags: {
        blockStart:    "{%",
        blockEnd:      "%}",
        variableStart: "{{",
        variableEnd:   "}}",
        commentStart:  "{#",
        commentEnd:    "#}"
    }
})
nunjucksEnv.addFilter("date", NunjucksDateFilter)

const generate = async (id, opts, args) => {
    /*  determine base directory of template artifacts  */
    let basedir = path.resolve(path.join(__dirname, `template-${id}`))
    if (!(await fs.exists(basedir)))
        throw new Error(`no such template directory for id ${id}`)

    /*  determine expansion variables  */
    let data = Object.assign({}, opts)

    /*  iterate over all template paths  */
    let files = await glob(path.join(basedir, "**", "*"))
    await Bluebird.each(files, async (src) => {
        /*  skip non-files (like directories)  */
        if (!(await fs.stat(src)).isFile())
            return

        /*  expand variable in filename  */
        src = src.replace(/\[name\]/g, opts.name)

        /*  determine destination directory  */
        let dst = path.join(opts.dir, path.relative(basedir, src))

        /*  generate content  */
        if (src.match(/\.(?:gif|png|jpg)$/)) {
            process.stdout.write(`++ generating file: [BIN] ${chalk.green(dst)}\n`)
            let content = await fs.readFile(src, "binary")
            await fs.writeFile(dst, content, "binary")
        }
        else {
            /*  expand template via Mozilla Nunjucks template language  */
            let content = await fs.readFile(src, "utf8")
            let template = Nunjucks.compile(content, nunjucksEnv)
            content = template.render(data)

            /*  skip empty contents  */
            if (content.match(/^\s*$/))
                return

            /*  generate destination file  */
            process.stdout.write(`++ generating file: [TXT] ${chalk.green(dst)}\n`)
            if (!opts.force && await fs.exists(dst))
                throw new Error(`file ${dst} already exists`)
            let dir = path.dirname(dst)
            if (!(await fs.exists(dir)))
                await mkdirp(dir)
            await fs.writeFile(dst, content, "utf8")
        }
    })
    return ""
}

/*  export the Gemstone Tool plugin API  */
module.exports = function () {
    this.register({
        name: "generate-frontend-project",
        desc: "Generate Gemstone Frontend Project Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "force", type: "boolean", def: false,
                desc: "Force generation of files (overwrites existing ones)" },
            {   name: "dir", type: "string", def: ".",
                desc: "The target directory" },
            {   name: "bower", type: "boolean", def: false,
                desc: "Whether to use Bower in addition to NPM" },
            {   name: "name", type: "string", def: "example",
                desc: "The project name" },
            {   name: "version", type: "string", def: "0.9.0",
                desc: "The project version" },
            {   name: "homepage", type: "string", def: "http://example.com/",
                desc: "The project homepage URL" },
            {   name: "description", type: "string", def: "Example Frontend Project",
                desc: "The project description" },
            {   name: "keywords", type: "[string*]", def: [ "example", "frontend" ],
                desc: "The project keywords" },
            {   name: "license", type: "string", def: "Apache-2.0",
                desc: "The project license (by SPDX id)" },
            {   name: "authorName", type: "string", def: "John Doe",
                desc: "The project author name" },
            {   name: "authorUrl", type: "string", def: "mailto:john.doe@example.com",
                desc: "The project author URL" }
        ],
        args: [
        ],
        func: async function (opts, ...args) {
            return generate("frontend-project", opts, args)
        }
    })
    this.register({
        name: "generate-frontend-composite",
        desc: "Generate Gemstone Frontend Composite Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "name", type: "string", def: "example",
                desc: "The composite name" }
        ],
        args: [
        ],
        func: async function (opts, ...args) {
            return generate("frontend-composite", opts, args)
        }
    })
    this.register({
        name: "generate-frontend-widget",
        desc: "Generate Gemstone Frontend Widget Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "name", type: "string", def: "example",
                desc: "The widget name" }
        ],
        args: [
        ],
        func: async function (opts, ...args) {
            return generate("frontend-widget", opts, args)
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
            return generate("backend-project", opts, args)
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
            return generate("backend-module", opts, args)
        }
    })
}

