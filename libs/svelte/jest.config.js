module.exports = {
  displayName: 'svelte',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {tsconfig: '<rootDir>/tsconfig.spec.json'},
  },
  transform: {
    '^(.+\\.svelte$)': 'svelte-jester',
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['svelte', 'ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/svelte',
};
