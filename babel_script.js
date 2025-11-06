const parser = require("@babel/parser");
const types = require("@babel/types");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const fs = require("fs");

const code = fs.readFileSync("./HlbL2_3nU7/rVq6S4xs/y5/i75Ob05ph71fpw/MhAfDQE/fg/NGZHkqKBU", "utf-8");

let ast = parser.parse(code);

const changeBinaryOperatorVisitor = {
	CallExpression(path) {
		if (types.isIdentifier(path.node.callee, { name: "tL"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression(">=", path.node.arguments[0], path.node.arguments[1])
			);
		}
		if (types.isIdentifier(path.node.callee, { name: "VW"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("*", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "S9"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("<=", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "ZO"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("===", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "JW"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("==", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "OI"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("|", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "GS"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("!==", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "rm"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("<", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "fv"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("-", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "lM"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("<<", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "Qd"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("!=", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "BW"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("/", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "W0"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("+", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "MR"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("%", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "Vd5"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("^", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "sR"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression(">>", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "tI"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression(">", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "n6"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("&", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "RX"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("in", path.node.arguments[0], path.node.arguments[1])
			);
		} 
		if (types.isIdentifier(path.node.callee, { name: "L6"}) &&
			path.node.arguments.length == 2
			) {
			path.replaceWith(
				types.binaryExpression("instanceof", path.node.arguments[0], path.node.arguments[1])
			);
		} 
	},
};

const changeUnaryOperatorVisitor = {
	CallExpression(path) {
		if (types.isIdentifier(path.node.callee, { name: "qP5"}) &&
			path.node.arguments.length == 1
			) {
			path.replaceWith(
				types.unaryExpression("+", path.node.arguments[0])
			);
		}
		if (types.isIdentifier(path.node.callee, { name: "Hv"}) &&
			path.node.arguments.length == 1
			) {
			path.replaceWith(
				types.unaryExpression("-", path.node.arguments[0])
			);
		}
		if (types.isIdentifier(path.node.callee, { name: "vv"}) &&
			path.node.arguments.length == 1
			) {
			path.replaceWith(
				types.unaryExpression("!", path.node.arguments[0])
			);
		}
		if (types.isIdentifier(path.node.callee, { name: "Xc5"}) &&
			path.node.arguments.length == 1
			) {
			path.replaceWith(
				types.unaryExpression("~", path.node.arguments[0])
			);
		}
	},
};


traverse(ast, changeBinaryOperatorVisitor);
traverse(ast, changeUnaryOperatorVisitor);
// traverse(ast, normalizeStringVisitor);

let finalCode = generate(ast).code;

fs.writeFileSync("./edited.js", finalCode);
console.log("Finished!!");