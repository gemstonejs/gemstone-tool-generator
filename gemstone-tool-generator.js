/*
**  GemstoneJS -- Gemstone JavaScript Technology Stack
**  Copyright (c) 2016-2017 Gemstone Project <http://gemstonejs.com>
**  Licensed under Apache License 2.0 <https://spdx.org/licenses/Apache-2.0>
*/

/* eslint no-console: off */

/*  external requirements  */
const path                = require("path")
const fs                  = require("mz/fs")
const Bluebird            = require("bluebird")
const glob                = require("glob-promise")
const mkdirp              = require("mkdirp-promise")
const chalk               = require("chalk")
const Nunjucks            = require("nunjucks")
const NunjucksDateFilter  = require("nunjucks-date-filter")
const gemstoneConfig      = require("gemstone-config")

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

const generate = async (id, opts, args, src2dst) => {
    /*  determine Gemstone configuration  */
    let cfg = gemstoneConfig()

    /*  determine base directory of template artifacts  */
    let basedir = path.resolve(path.join(__dirname, `template-${id}`))
    if (!(await fs.exists(basedir)))
        throw new Error(`no such template directory for id ${id}`)

    /*  determine expansion variables  */
    let data = Object.assign({}, cfg, opts)

    /*  iterate over all template paths  */
    let files = await glob(path.join(basedir, "**", "*"))
    await Bluebird.each(files, async (src) => {
        /*  skip non-files (like directories)  */
        if (!(await fs.stat(src)).isFile())
            return

        /*  optionally transform source path  */
        let srcrel = path.relative(basedir, src)
        if (typeof src2dst === "function") {
            srcrel = src2dst(srcrel, cfg, opts)
            if (srcrel === "")
                return
        }

        /*  determine destination directory  */
        let dst = path.join(opts.dir, srcrel)

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
        name: "generate-meta-project",
        alias: [ "gen-me-prj", "gmp" ],
        desc: "Generate Gemstone Meta Project Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "force", type: "boolean", def: false,
                desc: "Force generation of files (overwrites existing ones)" },
            {   name: "dir", type: "string", def: "",
                desc: "The target directory" },
            {   name: "dirFrontend", type: "string", def: "",
                desc: "The directory of the frontend project" },
            {   name: "dirBackend", type: "string", def: "",
                desc: "The directory of the backend project" },
            {   name: "name", type: "string", def: "example",
                desc: "The project name" },
            {   name: "version", type: "string", def: "0.9.0",
                desc: "The project version" },
            {   name: "homepage", type: "string", def: "http://example.com/",
                desc: "The project homepage URL" },
            {   name: "description", type: "string", def: "Example Meta Project",
                desc: "The project description" },
            {   name: "keywords", type: "[string*]", def: [ "example", "meta" ],
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
            if (opts.dir === "")
                opts.dir = opts.name
            if (opts.dirFrontend === "")
                opts.dirFrontend = `${opts.dir}-fe`
            if (opts.dirBackend === "")
                opts.dirBackend = `${opts.dir}-be`
            opts.dirFrontendRelative = path.relative(opts.dir, opts.dirFrontend)
            opts.dirBackendRelative  = path.relative(opts.dir, opts.dirBackend)
            return generate("meta-project", opts, args)
        }
    })
    this.register({
        name: "generate-frontend-project",
        alias: [ "gen-fe-prj", "gfp" ],
        desc: "Generate Gemstone Frontend Project Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "force", type: "boolean", def: false,
                desc: "Force generation of files (overwrites existing ones)" },
            {   name: "dir", type: "string", def: "",
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
            if (opts.dir === "")
                opts.dir = `${opts.name}-fe`
            return generate("frontend-project", opts, args)
        }
    })
    const src2dst = (src, cfg, opts) => {
        let tupled = (
               cfg.generator.view  === cfg.generator.model
            && cfg.generator.model === cfg.generator.ctrl
        )
        let [ , type ] = src.match(/^example\.(mask|style|i18n|view|model|ctrl|tuple)\.[^.]+$/)
        if (   ( tupled && type.match(/^(?:view|model|ctrl)$/))
            || (!tupled && type === "tuple"                   ))
            return ""
        if (tupled && type === "tuple")
            type = "view"
        let dst = cfg.generator[type]
        dst = dst.replace(/<ctx>/g, opts.ctx).replace(/<name>/g, opts.name)
        dst = dst.replace(/\/\//g, "/").replace(/\/\//g, "/")
        dst = path.join(cfg.path.source, dst)
        return dst
    }
    this.register({
        name: "generate-frontend-composite",
        alias: [ "gen-fe-comp", "gfc" ],
        desc: "Generate Gemstone Frontend Composite Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "force", type: "boolean", def: false,
                desc: "Force generation of files (overwrites existing ones)" },
            {   name: "dir", type: "string", def: "",
                desc: "The target directory" },
            {   name: "name", type: "string", def: "example",
                desc: "The composite name" },
            {   name: "ctx", type: "string", def: "",
                desc: "The context path" }
        ],
        args: [
        ],
        func: async function (opts, ...args) {
            if (opts.dir === "")
                opts.dir = "."
            return generate("frontend-composite", opts, args, src2dst)
        }
    })
    this.register({
        name: "generate-frontend-widget",
        alias: [ "gen-fe-wid", "gfw" ],
        desc: "Generate Gemstone Frontend Widget Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "force", type: "boolean", def: false,
                desc: "Force generation of files (overwrites existing ones)" },
            {   name: "dir", type: "string", def: "",
                desc: "The target directory" },
            {   name: "name", type: "string", def: "example",
                desc: "The widget name" },
            {   name: "ctx", type: "string", def: "",
                desc: "The context path" }
        ],
        args: [
        ],
        func: async function (opts, ...args) {
            if (opts.dir === "")
                opts.dir = "."
            return generate("frontend-widget", opts, args, src2dst)
        }
    })
    this.register({
        name: "generate-backend-project",
        alias: [ "gen-be-prj", "gbp" ],
        desc: "Generate Gemstone Backend Project Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "force", type: "boolean", def: false,
                desc: "Force generation of files (overwrites existing ones)" },
            {   name: "dir", type: "string", def: "",
                desc: "The target directory" },
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
            if (opts.dir === "")
                opts.dir = `${opts.name}-be`
            return generate("backend-project", opts, args)
        }
    })
    this.register({
        name: "generate-backend-module",
        alias: [ "gen-be-mod", "gbm" ],
        desc: "Generate Gemstone Backend Module Artifacts",
        opts: [
            {   name: "verbose", type: "boolean", def: false,
                desc: "Enable verbose output mode" },
            {   name: "force", type: "boolean", def: false,
                desc: "Force generation of files (overwrites existing ones)" },
            {   name: "dir", type: "string", def: "",
                desc: "The target directory" },
            {   name: "name", type: "string", def: "",
                desc: "The module name" }
        ],
        args: [
        ],
        func: async function (opts, ...args) {
            if (opts.dir === "")
                opts.dir = "."
            return generate("backend-module", opts, args)
        }
    })
}

