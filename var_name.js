/**
 * deobfucicating1.js
 * Babel script to deobfuscate the target file by replacing variables with their values safely
 */
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generate = require("@babel/generator").default;
const beautify = require("js-beautify");
const { readFileSync, writeFile } = require("fs");

// Example variable map (you should fill this with your runtime-known values)
const variableMap = {
  TW: 5,
  Ob: 2,
  g7: 4,
  rx: 6,
  SW: 5 * 3 - 4 + 2 - 6,
  ng: 1 * 7 - 5 + 6,
  CW: 1 * 5 * 3 - 6,
  nJ: 10,
  Ox: 6 + 8 * 1 + 10 + 9,
  t4: 7 * 9 + 33 - 4 + 8,
  YU: 752,
  E9: 284,
};

function deobfuscate(source) {
  const ast = parser.parse(source);

  const replaceVars = {
    Identifier(path) {
      const name = path.node.name;
      if (!Object.prototype.hasOwnProperty.call(variableMap, name)) return;

      // Skip replacements in unsafe contexts
      if (t.isVariableDeclarator(path.parent) && path.parent.id === path.node) return;
      if (t.isAssignmentExpression(path.parent) && path.parent.left === path.node) return;
      if (t.isFunction(path.parent) && path.parent.params.includes(path.node)) return;
      if (
        (t.isMemberExpression(path.parent) &&
          path.parent.property === path.node &&
          !path.parent.computed) ||
        (t.isObjectProperty(path.parent) && path.parent.key === path.node)
      )
        return;

      // Safe replacement with literal value
      path.replaceWith(t.valueToNode(variableMap[name]));
    },
  };

  traverse(ast, replaceVars);

  let deobfCode = generate(ast, { comments: false }).code;
  deobfCode = beautify(deobfCode, { indent_size: 2, space_in_empty_paren: true });

  writeCodeToFile(deobfCode);
}

function writeCodeToFile(code) {
  let outputPath = "output.js";
  writeFile(outputPath, code, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log(`Wrote file to ${outputPath}`);
    }
  });
}

deobfuscate(readFileSync("./deobfucicating1.js", "utf8"));
