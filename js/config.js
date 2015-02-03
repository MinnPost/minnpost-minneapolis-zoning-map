/**
 * RequireJS config which maps out where files are and shims
 * any non-compliant libraries.
 */
require.config({
  // Hack around jQuery
  map: {
    '*': {
      'jquery': 'jquery-noconflict'
    },
    'jquery-noconflict': {
      'jquery': 'jquery'
    }
  },
  shim: {
    // Mapbox does not support RequireJS but it does include libraries
    // that do which is annoying
    'mapbox': {
      exports: 'L'
    },
    'lazyload': {
      exports: 'LazyLoad'
    },
    'leaflet-fullscreen': {
      deps: ['leaflet', 'mapbox']
    }
  },
  baseUrl: 'js',
  paths: {
    'requirejs': '../bower_components/requirejs/require',
    'almond': '../bower_components/almond/almond',
    'text': '../bower_components/text/text',
    'jquery': '../bower_components/jquery/dist/jquery',
    'underscore': '../bower_components/underscore/underscore',
    'backbone': '../bower_components/backbone/backbone',
    'lazyload': '../bower_components/rgrove-lazyload/lazyload',
    'ractive': '../bower_components/ractive/ractive-legacy',
    'ractive-backbone': '../bower_components/ractive-backbone/ractive-adaptors-backbone',
    'ractive-events-tap': '../bower_components/ractive-events-tap/ractive-events-tap',
    'mapbox': '../bower_components/mapbox.js/mapbox.uncompressed',
    'leaflet-fullscreen': '../bower_components/Leaflet.fullscreen/dist/Leaflet.fullscreen',
    'mpConfig': '../bower_components/minnpost-styles/dist/minnpost-styles.config',
    'mpFormatters': '../bower_components/minnpost-styles/dist/minnpost-styles.formatters',
    'mpMaps': '../bower_components/minnpost-styles/dist/minnpost-styles.maps',
    'leaflet': 'build/mapbox-leaflet-shim',
    'jquery-noconflict': 'build/jquery-noconflict'
  }
});
