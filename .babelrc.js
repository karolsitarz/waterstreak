module.exports = api => {
  return {
    presets: [
      "@babel/react",
      "@babel/typescript",
      ["@babel/env", { modules: false }]
    ],
    plugins: [
      "@babel/proposal-class-properties",
      "@babel/proposal-object-rest-spread",
      "@babel/plugin-transform-runtime",
      [
        "babel-plugin-styled-components",
        {
          displayName: !api.env("production")
        }
      ]
    ]
  };
};
