
module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.ts', 'support/**/*.ts'],
    publish: false
  }
};
