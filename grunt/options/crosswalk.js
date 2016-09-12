// crosswalk
"use strict";
module.exports = {
  options: {

  },

  android: {
    options: {
      // informative output, otherwise quiet
      verbose: true,

      // includes output of rm and cp commands (-v option)
      debug: false,

      version: "<%= pkg.version %>",

      // display name for the app on the device;
      // the sanitisedName used to construct the Locations object later
      // is derived from this
      name: "<%= pkg.name %>",

      // package for the app"s generated Java files; this works best if
      // you have at least one period character between two character
      // strings, and no digits
      pkg: "br.sead.ufscar.loa.<%= pkg.name.toLowerCase() %>",

      // the icon used in the android launcher/etc
      icon: "<%= pkg.source %>/images/misc/icon_128.png",

      // path to the directory containing your HTML5 app;
      // note that this must use the correct path separators for your
      // platform: Windows uses "\\" while Linux uses "/"
      appRoot: "<%= pkg.production %>"
    }
  }
};
