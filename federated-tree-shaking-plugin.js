const NAME = 'federated-tree-shaking-plugin';

class FederatedTreeShakingPlugin {
    apply(compiler) {
        compiler.hooks.normalModuleFactory.tap(NAME, factory => {
            factory.hooks.resolver.tap(NAME, resolve => {
                return (dep, callback) => {
                    debugger;
                    this.resolveId(dep, resolve, callback);
                }
            });
        });
    }

    resolveId(dep, resolve, callback) {
    }
}

module.export = FederatedTreeShakingPlugin;