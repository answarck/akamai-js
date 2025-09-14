const babel = require("@babel/core");
const fs = require("fs");
const t = require("@babel/types");
const code = fs.readFileSync("./deobfucicating1.js", "utf-8");
const firstPass = babel.parseSync(code, { sourceType: "module" });

babel.traverse(firstPass, {
  CallExpression(path) {
    const callee = path.node.callee;
    if (
      t.isMemberExpression(callee) &&
      t.isCallExpression(callee.object) &&
      t.isIdentifier(callee.object.callee, { name: "J6" }) &&
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
      t.isIdentifier(callee.object.callee, { name: "C7" }) &&
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
      t.isIdentifier(callee.object.callee, { name: "Vb" }) &&
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
      t.isIdentifier(callee.object.callee, { name: "z7" }) &&
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
babel.traverse(firstPass, {
  CallExpression(path) {
    const callee = path.node.callee;
    if (
      t.isMemberExpression(callee) &&
      t.isCallExpression(callee.object) &&
      t.isIdentifier(callee.object.callee, { name: "Yf" }) &&
      t.isStringLiteral(callee.property)
    ) {
      if (callee.property.value != "NB") {
        path.replaceWith(
          t.callExpression(
            t.identifier("JW"),
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

    // Remove .call(null, ...)
    if (
      t.isMemberExpression(callee) &&
      t.isIdentifier(callee.property, { name: "call" }) &&
      t.isNullLiteral(path.node.arguments[0])
    ) {
      path.replaceWith(
        t.callExpression(
          callee.object,
          path.node.arguments.slice(1)
        )
      );
    }

    // Remove .apply(null, [...])
    if (
      t.isMemberExpression(callee) &&
      t.isIdentifier(callee.property, { name: "apply" }) &&
      t.isNullLiteral(path.node.arguments[0]) &&
      t.isArrayExpression(path.node.arguments[1])
    ) {
      path.replaceWith(
        t.callExpression(
          callee.object,
          path.node.arguments[1].elements
        )
      );
    }
  }
});

// Yf()["NB"].apply(null, [AR, LW])
const output = babel.transformFromAstSync(firstPass, null, {});
fs.writeFileSync("./deobfucicating1_deobf.js", output.code, 'utf-8');