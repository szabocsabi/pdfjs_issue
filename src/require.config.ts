declare var require: any;

require.config({
  paths: {
    'jquery': 'libs/jquery/dist/jquery',
    'jqueryui-amd': 'libs/jquery-ui/ui',

    'css': 'libs/require-css/css',
    'text': 'libs/requirejs-text/text',
    'promise': 'libs/es6-promise/dist/es6-promise.min',
    'css-builder': 'libs/require-css/css-builder',
    'normalize': 'libs/require-css/normalize',
    
	  'ojs': 'libs/@oracle/oraclejet/dist/js/libs/oj/debug',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
    'ojL10n': 'libs/@oracle/oraclejet/dist/js/libs/oj/debug/ojL10n',
    'ojtranslations': 'libs/@oracle/oraclejet/dist/js/libs/oj/resources',
    'customElements': 'libs/@oracle/oraclejet/dist/js/libs/webcomponents/custom-elements.min',
    'signals': 'libs/signals/dist/signals',
    'knockout': 'libs/knockout/build/output/knockout-latest.debug',
    'knockout-decorators': 'libs/knockout-decorators/dist/knockout-decorators',
    'reflect-metadata': 'libs/reflect-metadata/Reflect',
    'jquery-ajax-transport-xdomainrequest': 'libs/jquery-ajax-transport-xdomainrequest/jquery.xdomainrequest.min',
    'hammerjs': 'libs/hammerjs/hammer.min',
    'pdfjs-dist': 'libs/pdfjs-dist'
  },

  shim: {
    'jqueryui-amd': {
      deps: ['jquery']
    },
    'jquery': {
      exports: '$'
    },
    'pdfjs-dist/web/pdf_viewer': {
      deps: ['pdfjs-dist/build/pdf']
    }
  },

  // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
  // resources with a custom translation file.
  // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
  // a path that is relative to the location of this main.js file.
  config: {
    ojL10n: {
      merge: {
        // 'ojtranslations/nls/ojtranslations': 'resources/nls/labels'
      }
    },
    text: {
      // Override for the requirejs text plugin XHR call for loading text resources on CORS configured servers
      useXhr: function (url, protocol, hostname, port) {
        // Override function for determining if XHR should be used.
        // url: the URL being requested
        // protocol: protocol of page text.js is running on
        // hostname: hostname of page text.js is running on
        // port: port of page text.js is running on
        // Use protocol, hostname, and port to compare against the url being requested.
        // Return true or false. true means "use xhr", false means "fetch the .js version of this resource".
        return true;
      }
    }
  }
});
