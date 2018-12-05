module.exports = api => {
  api.addTask({
    name: 'test:src',
    command: 'vue-cli-service test:unit src/**/*.spec.ts',
    description: 'Runs tests in src directory',
  });
}
