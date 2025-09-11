// save as replace_nf.js
const fs = require('fs');
const babel = require('@babel/core');
const t = require('@babel/types');


variableMap = {
  TW: 5,
  nJ: 10,
  Ob: 2,
};

const inputFile = 'deobfucicating1.js';
const outputFile = 'deobfucicating1_deobf.js';

// read the code
const code = fs.readFileSync(inputFile, 'utf-8');

// transform
const output = babel.transformSync(code, {
  plugins: [
    function replaceNF() {
      return {
        visitor: {
          Identifier(path) {
            const name = path.node.name;
            if (Object.prototype.hasOwnProperty.call(variableMap, name)) {
              path.replaceWith(t.numericLiteral(variableMap[name]));
            }
          },
          MemberExpression(path) {
            if(path.node.computed && t.isStringLiteral(path.node.property)) {
              path.node.property = t.identifier(path.node.property.value);
              path.node.computed = false;
            }
          },
          CallExpression(path) {
            if (t.isIdentifier(path.node.callee, { name: "ss" })) {
                if(path.node.arguments.length === 2) {
                    path.replaceWith(
                        t.BinaryExpression("!=", path.node.arguments[0], path.node.arguments[1])
                    );
                }
            }
            if (t.isIdentifier(path.node.callee, { name: "I1" })) {
                if(path.node.arguments.length === 2) {
                    path.replaceWith(
                        t.BinaryExpression("+", path.node.arguments[0], path.node.arguments[1])
                    );
                }
            }
            if (t.isIdentifier(path.node.callee, { name: "pg" })) {
                if(path.node.arguments.length === 2) {
                    path.replaceWith(
                        t.BinaryExpression("<", path.node.arguments[0], path.node.arguments[1])
                    );
                }
            }
            if (t.isIdentifier(path.node.callee, { name: "Gf" })) {
                if(path.node.arguments.length === 2) {
                    path.replaceWith(
                        t.BinaryExpression("<<", path.node.arguments[0], path.node.arguments[1])
                    );
                }
            }
            if (t.isIdentifier(path.node.callee, { name: "UF" })) {
                if(path.node.arguments.length === 2) {
                    path.replaceWith(
                        t.BinaryExpression(">=", path.node.arguments[0], path.node.arguments[1])
                    );
                }
            }
            if (t.isIdentifier(path.node.callee, { name: "U1" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression("<=", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "Vzj" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression("^", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "b8" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression("&", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "WEj" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression("/", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "vm" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression("|", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "vf" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression(">", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "AGj" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression(">>", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "Cx" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression("!==", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
             if (t.isIdentifier(path.node.callee, { name: "W3" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression("*", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "Up" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression("==", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "nm" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression("%", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "xk" })) {
              if (path.node.arguments.length === 2) {
                path.replaceWith(
                  t.binaryExpression("in", path.node.arguments[0], path.node.arguments[1])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "tx" })) {
              if (path.node.arguments.length === 1) {
                path.replaceWith(
                    t.unaryExpression("+", path.node.arguments[0])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "UR" })) {
              if (path.node.arguments.length === 1) {
                path.replaceWith(
                    t.unaryExpression("!", path.node.arguments[0])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "J3" })) {
              if (path.node.arguments.length === 1) {
                path.replaceWith(
                    t.unaryExpression("~", path.node.arguments[0])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "zx" })) {
              if (path.node.arguments.length === 1) {
                path.replaceWith(
                    t.unaryExpression("-", path.node.arguments[0])
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "Kv" }) || 
                t.isIdentifier(path.node.callee, { name: "dr"  }) ||
                t.isIdentifier(path.node.callee, { name: "R7"  }) ||
                t.isIdentifier(path.node.callee, { name: "Y6"  }) ||
                t.isIdentifier(path.node.callee, { name: "P1"  })) {
                if (path.node.arguments.length === 1) {
                    const arg = path.node.arguments[0];

                    path.replaceWith(
                        t.memberExpression(
                            t.identifier("cnj"),
                            path.node.arguments[0],
                            true
                        )
                    );
                }
            }
            if (t.isIdentifier(path.node.callee, {name: "Yx"}) ||
                t.isIdentifier(path.node.callee, {name: "Q2"}) ||
                t.isIdentifier(path.node.callee, {name: "nA"}) ||
                t.isIdentifier(path.node.callee, {name: "Bk"}) ||
                t.isIdentifier(path.node.callee, {name: "n4"}) ||
                t.isIdentifier(path.node.callee, {name: "sT"})) {
              if (path.node.arguments.length === 1) {
                path.replaceWith(
                  t.memberExpression(
                    t.identifier("dCj"),
                    path.node.arguments[0],
                    true
                  )
                );
              }
            }
            if (t.isIdentifier(path.node.callee, { name: "P1" })) {
                if (path.node.arguments.length === 1) {
                    path.replaceWith(
                        t.memberExpression(
                            t.identifier("cnj"),
                            path.node.arguments[0],
                            true
                        )
                    );
                }
            }
          }
        }
      };
    }
  ]
});

// write transformed code
fs.writeFileSync(outputFile, output.code, 'utf-8');
console.log(`Transformed file saved as ${outputFile}`);