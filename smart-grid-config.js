var smartgrid = require('smart-grid');
var settings = {
  outputStyle: 'scss',
  columns: 12,
  offset: '30px',
  mobileFirst: false,
  container: {
    maxWidth: '1920px',
    fields: '30px'
  },
  breakPoints: {
    xl: {
      width: '1600px',
    },
    lg: {
      width: '1200px'
    },
    md: {
      width: '768px',
      fields: '15px'
    },
    sm: {
      width: '560px'
    },
    xs: {
      width: '320px'
    }
  }
};
smartgrid('./dev/styles/vendor', settings);
