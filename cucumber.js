
module.exports = {
    default: {
      paths: ['src/features/*.feature'],
      requireModule: ['ts-node/register'],
      require: ['src/step-definitions/*.ts'],
      // publish: true,
      // 'publish-quiet': false
    }
    
  };