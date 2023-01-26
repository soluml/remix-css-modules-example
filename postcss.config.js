const path = require("path");
const fsp = require("fs/promises");

module.exports = (ctx) => {
  const isProd = ctx.env === "production";

  return {
    plugins: {
      "postcss-modules": {
        generateScopedName: isProd
          ? "[hash:base64:5]"
          : "[name]__[local]___[hash:base64:5]",
        getJSON: async (cssFilename, json, outputFilename) => {
          // Create Directories if they don't exist
          await fsp
            .mkdir(path.dirname(outputFilename), { recursive: true })
            .catch(() => {});

          // Create .ts file for exporting both the path to CSS file as well as the JSON
          const ts = `
            import pathToCSSFile from '${outputFilename}';

            const json = ${JSON.stringify(json)};

            export const href = pathToCSSFile;
            export default json;
          `;

          await fsp.writeFile(`${outputFilename.replace(/\.css$/, ".ts")}`, ts);
        },
      },
    },
  };
};
