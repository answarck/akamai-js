const babel = require("@babel/core");
const fs = require("fs");
const t = require("@babel/types");


const inputFile = './deobfucicating1.js';
const outputFile = './deobfucicating1_deobf.js';

const code = fs.readFileSync(inputFile, 'utf-8');
const varValues = {};

const firstPass = babel.parseSync(code, { sourceType: 'module'});
babel.traverse(firstPass, {
    AssignmentExpression(path) {
        if (t.isIdentifier(path.node.left)) {
            const varName = path.node.left.name;
            try {
                const evaluated = path.get("right").evaluate();
                if (evaluated.confident) {
                    varValues[varName] = evaluated.value;
                }
            } catch (e) {
            }
        }
    }
});
babel.traverse(firstPass, {
    MemberExpression(path) {
        if (path.node.computed && t.isIdentifier(path.node.property)) {
            if (path.node.object.name == 'cnj') {
                const key = path.node.property.name;
                path.node.property = t.numericLiteral(varValues[key]);
            }
        }
    }
})
const output = babel.transformFromAstSync(firstPass, null, {});
fs.writeFileSync(outputFile, output.code, 'utf-8');

