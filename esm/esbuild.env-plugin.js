const dotenv = require("dotenv");

const envPlugin = {
  name: "env",
  setup(build) {
    const result = dotenv.config();

    if (result.error) {
      throw result.error;
    }

    const env = Object.entries(result.parsed).reduce((acc, [key, value]) => {
      acc[`import.meta.env.${key}`] = JSON.stringify(value);
      return acc;
    }, {});

    build.initialOptions.define = {
      ...build.initialOptions.define,
      ...env,
    };
  },
};

module.exports = envPlugin;
