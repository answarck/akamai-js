const babel = require("@babel/core");
const fs = require("fs");
const t = require("@babel/types");
const { identifier } = require("@babel/types");

const code = fs.readFileSync("./deobfucicating1.js", "utf-8");

const firstPass = babel.parseSync(code, { sourceType: "module"});


babel.traverse(firstPass, {
    CallExpression(path) {
        const callee = path.node.callee;
        if (
            t.isMemberExpression(callee) &&
            t.isCallExpression(callee.object) &&
            t.isIdentifier(callee.object.callee, { name: "J6"}) &&
            t.isStringLiteral(callee.property)
        ) {
            if (callee.property.value != "sU") {
                path.replaceWith(
                    t.callExpression(
                        t.identifier("Dl"),
                        path.node.arguments
                    )
                );
            }
                
        }
    }
});
babel.traverse(firstPass, {
    CallExpression(path) {
        const callee = path.node.callee;
        if (
            t.isMemberExpression(callee) &&
            t.isCallExpression(callee.object) &&
            t.isIdentifier(callee.object.callee, { name: "C7"}) &&
            t.isStringLiteral(callee.property)
        ) {
            if (callee.property.value != "RN") {
                path.replaceWith(
                    t.callExpression(
                        t.identifier("tP"),
                        [path.node.arguments[0], path.node.arguments[1], t.booleanLiteral(true)]
                    )
                );
            }
                
        }
    }
});
babel.traverse(firstPass, {
    CallExpression(path) {
        const callee = path.node.callee;
        if (
            t.isMemberExpression(callee) &&
            t.isCallExpression(callee.object) &&
            t.isIdentifier(callee.object.callee, { name: "Vb"}) &&
            t.isStringLiteral(callee.property)
        ) {
            if (callee.property.value != "vV") {
                path.replaceWith(
                    t.callExpression(
                        t.identifier("L8"),
                        [path.node.arguments[0], path.node.arguments[1], t.numericLiteral(57)]
                    )
                );
            }
                
        }
    }
});
babel.traverse(firstPass, {
    CallExpression(path) {
        const callee = path.node.callee;
        if (
            t.isMemberExpression(callee) &&
            t.isCallExpression(callee.object) &&
            t.isIdentifier(callee.object.callee, { name: "z7"}) &&
            t.isStringLiteral(callee.property)
        ) {
            if (callee.property.value != "Ft") {
                path.replaceWith(
                    t.callExpression(
                        t.identifier("rp"),
                        path.node.arguments
                    )
                );
            }
                
        }
    }
});
// babel.traverse(firstPass, {
//     CallExpression(path) {
//         const callee = path.node.callee;
//         if (
//             t.isMemberExpression(callee) &&
//             t.isCallExpression(callee.object) &&
//             t.isIdentifier(callee.object.callee, { name: "pk"}) &&
//             t.isMemberExpression(callee.property) // because pk()[dCj[0]]
//         ) {
//             // Only replace if arguments exist
//             if (path.node.arguments.length !== 0) {
//                 if(!(t.isNumericLiteral(callee.property) && callee.property.value !== 1)) {
//                     path.replaceWith(
//                     t.callExpression(
//                         t.identifier("Z7"),
//                         [
//                             path.node.arguments[0],
//                             t.arrayExpression([
//                                 path.node.arguments[1],
//                                 path.node.arguments[2],
//                                 path.node.arguments[3]
//                             ])
//                         ]
//                     )
//                 );
//                 }
//             }
//         }
//     }
// });

const output = babel.transformFromAstSync(firstPass, null, {});
fs.writeFileSync("./deobfucicating1_deobf.js", output.code, 'utf-8');