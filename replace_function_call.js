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

const output = babel.transformFromAstSync(firstPass, null, {});
fs.writeFileSync("./deobfucicating1_deobf.js", output.code, 'utf-8');
