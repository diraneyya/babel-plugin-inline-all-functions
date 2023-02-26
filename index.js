const OPTIONS = {
}

module.exports = function ({ types : t }, options) {
  const { } = Object.assign({}, OPTIONS, options);
      
  // A dictionary of keys/values where keys are the
  // function names (identifier) and the values are
  // objects containing the following properties:
  // - params: an array of the function params (ast)
  // - expression: the return expression (ast)
  // - node: the variable declaration node (ast)
  let functionCache = {};

  return {
    visitor: {
      "Program|BlockStatement": {
        exit(path) {
          for (const id in path.scope.bindings) {
            const binding = path.scope.bindings[id];
            if (binding.referenced) {
              const paths = binding.referencePaths;
              for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                if (path.parent.type === "CallExpression") {
                  const name = {...path.parent.callee}.name;
                  if (functionCache[name]) {
                    const cachedExpression = functionCache[name].expression;
                    const cachedParams = functionCache[name].params;
                    const passedArguments = path.parent.arguments;
                    
                    path.parentPath.replaceWith(cachedExpression);
                    path.parentPath.traverse(
                      {
                        Identifier (path) {
                          for (let i = 0; i < this.params.length; i++) {
                            if (path.node.name === this.params[i].name) {
                              if (this.args[i]) {
                                path.replaceWith(this.args[i])
                                path.skip() // don't recurse
                              } else {
                                path.replaceWithSourceString('undefined')
                              }
                            }
                          }
                        }
                      },
                      {
                        args: passedArguments,
                        params: cachedParams,
                      }
                    );
                  }
                }
              }
            }
          }
              
          // remove all cached functions from code
          if (path.type === "Program") {
            for (const id in functionCache) {
              functionCache[id].node.remove();
            }
          }
        }
      },
          
      // add functions to cache after exiting
      ArrowFunctionExpression: {
        exit (path) {
          // log the path in the console
          // console.dir(path);
          if (path.parent.type === "VariableDeclarator" &&
              path.node.body.type !== "BlockStatement") {
              
            const functionName = path.parent.id.name;
            const functionParams = path.node.params;
            const returnExpression = path.node.body;
    
            functionCache[functionName] = {
              params: functionParams,
              expression: returnExpression,
              node: path.parentPath,
            }                
          }
        }
      }
    }
  };   
}
