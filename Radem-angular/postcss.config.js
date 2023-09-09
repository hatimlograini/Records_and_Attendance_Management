module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['last 2 versions', '> 1%'],
      remove: false,
      grid: true,
    }),
  ],
};
