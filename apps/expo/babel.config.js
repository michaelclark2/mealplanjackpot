module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      'module:react-native-dotenv',
      'react-native-reanimated/plugin',
      'nativewind/babel',
      'expo-router/babel',
    ],
  }
}
