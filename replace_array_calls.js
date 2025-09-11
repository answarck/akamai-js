const babel = require("@babel/core");
const fs = require("fs");
const t = require("@babel/types");


const inputFile = './deobfucicating1.js';
const outputFile = './deobfucicating1_deobf.js';

const code = fs.readFileSync(inputFile, 'utf-8');
const varValues = {};
var cnj = ['lD', 'Ft', 'l9', 'sU', 'O', 'LU', 'z9', 'Ej', 'RN', 'BG', 'D', 'vV', 'Rj', 'H9', 'NB', 'r9', 'nt', 'MH', 's9', 't9', 'WO', 'BD', 'rO', 'Jt', 'bj', 'kN', 'sG', 'qB', 'UB', 'pt', 'pB', 'CV', 'dq', 'ID', 'GU', 'cj', 'C9', 'h9', 'PH', 'AI', 'jU', 'Mq', 'nq', 'lq', 'Nq', 'HN', 'sj', 'Pj', 'xN', 'gH', 'SG', 'NI', 'KO', 'qj', 'ZI', 'rE', 'vO', 'Wq', 'wE', 'EE', 'Lh', 'Vq', 'gO', 'rB', 'bG', 'SB', 'JU', 'BX', 'XB', 'RO', 'rV', 'cH', 'kG', 'pU', 'AX', 'HX', 'gt', 'jD', 'Y', 'T9', 'PU', 'PX', 'DH', 'xB', 'FX', 'Gj', 'TD', 'WU', 'jN', 'LD', 'ZG', 'Gh', 'Aj', 'lI', 'wG', 'cD', 'PV', 'kO', 'Uh', 'tz', 'A', 'DV', 'pH', 'NG', 'IB', 'HO', 'MX', 'SO', 'hV', 'bq', 'CO', 'Yh', 'LI', 'Uq', 'IN', 'qU', 'It', 'gG', 'cU', 'th', 'At', 'UH', 'HG', 'JD', 'wN', 'xU', 'c9', 'dO', 'YE', 'jE', 'LO', 'WX', 'R', 'EH', 'TE', 'Lt', 'Eq', 'Bh', 'dE', 'dG', 'Aq', 'zU', 'sE', 'Gz', 'bB', 'rI', 'mh', 'wU', 'H', 'vU', 'DO', 'NV', 'fj', 'gD', 'Bq', 'fG', 'Mh', 'nO', 'mq', 'XE', 'lB', 'fH', 'J', 'wV', 'cE', 'QH', 'AE', 'CH', 'Yj', 'CI', 'hH', 'wO', 'KU', 'Eh', 'sV', 'Iz'];

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
        if (path.node.computed) {
            if (path.node.object.name == 'cnj') {
                if (t.isIdentifier(path.node.property)) {
                    const key = path.node.property.name;
                    path.replaceWith(
                        t.stringLiteral(cnj[varValues[key]])
                    );
                }
                else if (t.isNumericLiteral(path.node.property)){
                    path.replaceWith(
                        t.stringLiteral(cnj[path.node.property.value])
                    );
                }
            }
        }
    }
})
const output = babel.transformFromAstSync(firstPass, null, {});
fs.writeFileSync(outputFile, output.code, 'utf-8');

