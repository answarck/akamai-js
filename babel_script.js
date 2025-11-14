const babel = require("@babel/core");
const parser = require("@babel/parser");
const types = require("@babel/types");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const fs = require("fs");
const vm = require("vm");

// const code = fs.readFileSync("./HlbL2_3nU7/rVq6S4xs/y5/i75Ob05ph71fpw/MhAfDQE/fg/NGZHkqKBU", "utf-8");
const code = fs.readFileSync("./aa/AJBKVIE2dBJ5Uhnlo_Yn/J11uQrpESOaE7c1a/MBUmAQ/Jgd-Hj5L/K3g", "utf-8");
// const code = fs.readFileSync("./edited.js", "utf-8");
let ast = parser.parse(code);

function pR(m) {
	var tJ = m;
    if (tJ <= 65535) {
        return String.fromCharCode(tJ);
    } else {
        tJ -= 65536;
        return String.fromCharCode((tJ >> 10) + 55296, tJ % 1024 + 56320);
    }
}

const cache = Object.create(null);

function evalSafe(expr) {
    if (cache[expr] !== undefined) return cache[expr];
    try {
        const v = vm.runInNewContext(expr, Object.create(null));
        cache[expr] = v;
        return v;
    } catch {
        cache[expr] = null;
        return null;
    }
}

const replaceJsFuckVisitor = {
    BinaryExpression(path) {
        const expr = generate(path.node).code;
        if (!expr.includes('+[]') && !expr.includes('+!+[]')) return;
        const v = evalSafe(expr);
        if (v == null) return;
        if (!Number.isInteger(v)) return;
        path.replaceWith(types.numericLiteral(v));
    },

    'VariableDeclarator'(path) {
        if (!types.isIdentifier(path.node.id)) return;
        const init = path.get('init');
        if (!init.node) return;
        const expr = generate(init.node).code;
        // if (!expr.includes('+[]') && !expr.includes('+!+[]')) return;
        const v = evalSafe(expr);
        if (v == null) return;
        if (!Number.isInteger(v)) return;
        init.replaceWith(types.numericLiteral(v));
        const name = path.node.id.name;
        const binding = path.scope.getBinding(name);
        if (!binding) return;
        
        for (const ref of binding.referencePaths) ref.replaceWith(types.numericLiteral(v));
    },
    
    'AssignmentExpression'(path) {
        if (!types.isIdentifier(path.node.left)) return;
        if (path.node.operator != '=') return;
        const right = path.get('right');
        if (!right.node) return;
        const expr = generate(right.node).code;
        // if (!expr.includes('+[]') && !expr.includes('+!+[]')) return;
        const v = evalSafe(expr);
        if (v == null) return;
        if (!Number.isInteger(v)) return;
        right.replaceWith(types.numericLiteral(v));
        const name = path.node.left.name;
        const binding = path.scope.getBinding(name);
        if (!binding) return;
        
        for (const ref of binding.referencePaths) ref.replaceWith(types.numericLiteral(v));
    },
};



// Find functions which handles binary operations
let toReplace = [];
const findBinaryOpFuncsVisitor = {
    ReturnStatement(path) {
        const arg = path.node.argument;
        if (!arg || arg.type !== 'BinaryExpression') return;

        const fn = path.getFunctionParent();
        const params = fn.node.params;
        if (params.length !== 2) return;
        if (params[0].name !== arg.left.name) return;
        if (params[1].name !== arg.right.name) return;

        const decl = fn.parentPath.node;
        if (decl.type !== 'VariableDeclarator') return;

        toReplace.push([decl.id.name, arg.operator]);
        fn.parentPath.remove();
    },
};
// replaces all the function calls to respective binary operation
const replaceBinaryOpFuncsVisitor = {
    CallExpression(path) {
        const callee = path.node.callee;
        for (const ops of toReplace) {
            if (callee.name == ops[0]) {
                path.replaceWith(types.binaryExpression(ops[1], path.node.arguments[0], path.node.arguments[1]));
            }
        }
    },
};

let toReplaceUnary = [];
const findUnaryOpFuncsVisitor = {
    ReturnStatement(path) {
        const arg = path.node.argument;
        if (!arg || arg.type !== 'UnaryExpression') return;

        const fn = path.getFunctionParent();
        const params = fn.node.params;
        if (params.length !== 1) return;
        if (params[0].name !== arg.argument.name) return;

        const declPath = fn.parentPath;
        if (declPath.node.type !== 'VariableDeclarator') return;

        toReplaceUnary.push([declPath.node.id.name, arg.operator]);
        declPath.remove();
    },
};

const replaceUnaryOpFuncsVisitor = {
    CallExpression(path) {
        const callee = path.node.callee;
        for (const ops of toReplaceUnary) {
            if (callee.name === ops[0]) {
                path.replaceWith(
                    types.unaryExpression(ops[1], path.node.arguments[0])
                );
            }
        }
    },
};

// const getverVisitor = {
// 	ArrayExpression(path) {
// 		if (path.node.elements.length > 200) {
// 			const val = path.node.elements.map(e => e.value);
// 			console.log(val);
// 		}
// 		// if (path.node.elements.length == 177) {
// 		// 	const Dj = path.node.elements.map(e => e.extra.rawValue);
// 		// 	var Rk5 = 0;
//         //     var O55 = Dj[25];
//         //     var wB5 = Dj[137];
//         //     var rz5 = Dj[136];
//         //     var pk5 = "", cJ = "";

//         //     var pB5 = wB5.length - 1;
//         //     if (pB5 >= 0) {
//         //         do {
//         //             var XQ = (pB5 + 9) % rz5.length;
//         //             var OB5 = wB5.charCodeAt(pB5);
//         //             var bk5 = rz5.charCodeAt(XQ);
//         //             cJ += pR(~(OB5 & bk5) & (OB5 | bk5));
//         //             pB5--;
//         //         } while (pB5 >= 0);
//         //     }
//         //     cJ = cJ.split("").reverse().join("");
//         //     while (cJ.length < 71) cJ += cJ;

//         //     for (var vC5 = 0; vC5 < O55.length; vC5++) {
//         //         var S55 = O55.charCodeAt(vC5);
//         //         var zT5 = cJ.charCodeAt(Rk5++);
//         //         pk5 += pR(~(S55 & zT5) & (S55 | zT5));
//         //     }
//         //     console.log(pk5);
// 		// }
// 	},
// };

//replace binary
traverse(ast, findBinaryOpFuncsVisitor);
traverse(ast, replaceBinaryOpFuncsVisitor);
//replace unary
traverse(ast, findUnaryOpFuncsVisitor);
traverse(ast, replaceUnaryOpFuncsVisitor);
// traverse(ast, getverVisitor);
// traverse(ast, replaceJsFuckVisitor);
// traverse(ast, replaceJsFuckVisitor);
// traverse(ast, replaceJsFuckVisitor);
// traverse(ast, replaceJsFuckVisitor);
// traverse(ast, replaceJsFuckVisitor);
// traverse(ast, replaceJsFuckVisitor);

console.log("Below functions replaced!")
console.log(toReplaceUnary);
console.log(toReplace);
const f = generate(ast).code;
fs.writeFileSync('./edited.js', f);
console.log("Finished");