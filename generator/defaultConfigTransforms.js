class Generator {
    constructor(pkg, context, files = {}) {
        this.pkg = pkg
        this.rootOptions = {}
        this.imports = {}
        this.files = files
        this.entryFile = `src/main.js`
        this.fileMiddlewares = []
        this.context = context
        this.configTransforms = {}
    }

    injectImports(file, imports) {
        const _imports = (
            this.imports[file]
            || (this.imports[file] = new Set())
        );
        console.log('_imports',_imports);
        (Array.isArray(imports) ? imports : [imports]).forEach(imp => {
            _imports.add(imp)
        })
    }
}

module.exports = Generator