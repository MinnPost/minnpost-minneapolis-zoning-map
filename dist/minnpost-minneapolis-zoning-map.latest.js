
define('text!../bower.json',[],function () { return '{\n  "name": "minnpost-minneapolis-zoning-map",\n  "version": "0.0.0",\n  "main": "index.html",\n  "homepage": "https://github.com/minnpost/minnpost-minneapolis-zoning-map",\n  "repository": {\n    "type": "git",\n    "url": "https://github.com/minnpost/minnpost-minneapolis-zoning-map"\n  },\n  "bugs": "https://github.com/minnpost/minnpost-minneapolis-zoning-map/issues",\n  "license": "MIT",\n  "author": {\n    "name": "MinnPost",\n    "email": "data@minnpost.com"\n  },\n  "dependencies": {\n    "mapbox.js": "~1.6.4",\n    "ractive": "~0.5.6",\n    "ractive-events-tap": "~0.1.1",\n    "ractive-backbone": "~0.1.1",\n    "requirejs": "~2.1.15",\n    "almond": "~0.3.0",\n    "text": "~2.0.12",\n    "underscore": "~1.7.0",\n    "jquery": "~1.11.1",\n    "backbone": "~1.1.2",\n    "rgrove-lazyload": "*",\n    "minnpost-styles": "master",\n    "Leaflet.fullscreen": "https://github.com/Leaflet/Leaflet.fullscreen.git#0.0.4"\n  },\n  "devDependencies": {\n    "qunit": "~1.15.0"\n  },\n  "dependencyMap": {\n    "requirejs": {\n      "rname": "requirejs",\n      "js": [\n        "requirejs/require"\n      ]\n    },\n    "almond": {\n      "rname": "almond",\n      "js": [\n        "almond/almond"\n      ]\n    },\n    "text": {\n      "rname": "text",\n      "js": [\n        "text/text"\n      ]\n    },\n    "jquery": {\n      "rname": "jquery",\n      "js": [\n        "jquery/dist/jquery"\n      ],\n      "returns": "$"\n    },\n    "underscore": {\n      "rname": "underscore",\n      "js": [\n        "underscore/underscore"\n      ],\n      "returns": "_"\n    },\n    "backbone": {\n      "rname": "backbone",\n      "js": [\n        "backbone/backbone"\n      ],\n      "returns": "Backbone"\n    },\n    "rgrove-lazyload": {\n      "rname": "lazyload",\n      "js": [\n        "rgrove-lazyload/lazyload"\n      ],\n      "returns": "Lazyload"\n    },\n    "ractive": {\n      "rname": "ractive",\n      "js": [\n        "ractive/ractive-legacy"\n      ],\n      "returns": "Ractive"\n    },\n    "ractive-backbone": {\n      "rname": "ractive-backbone",\n      "js": [\n        "ractive-backbone/ractive-adaptors-backbone"\n      ],\n      "returns": "RactiveBackbone"\n    },\n    "ractive-events-tap": {\n      "rname": "ractive-events-tap",\n      "js": [\n        "ractive-events-tap/ractive-events-tap"\n      ],\n      "returns": "RactiveEventsTap"\n    },\n    "mapbox.js": {\n      "rname": "mapbox",\n      "js": [\n        "mapbox.js/mapbox.uncompressed"\n      ],\n      "css": [\n        "mapbox.js/mapbox.uncompressed"\n      ],\n      "images": [\n        "mapbox.js/images"\n      ],\n      "returns": "L"\n    },\n    "Leaflet.fullscreen": {\n      "rname": "leaflet-fullscreen",\n      "js": [\n        "Leaflet.fullscreen/dist/Leaflet.fullscreen"\n      ],\n      "css": [\n        "//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v0.0.4/leaflet.fullscreen.css"\n      ],\n      "returns": "LeafletFullscreen"\n    },\n    "minnpost-styles": {\n      "rname": "mpStyles",\n      "css": [\n        "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css",\n        "minnpost-styles/dist/minnpost-styles"\n      ],\n      "sass": [\n        "minnpost-styles/styles/main"\n      ]\n    },\n    "mpConfig": {\n      "rname": "mpConfig",\n      "js": [\n        "minnpost-styles/dist/minnpost-styles.config"\n      ],\n      "returns": "mpConfig"\n    },\n    "mpFormatters": {\n      "rname": "mpFormatters",\n      "js": [\n        "minnpost-styles/dist/minnpost-styles.formatters"\n      ],\n      "returns": "mpFormatters"\n    },\n    "mpMaps": {\n      "rname": "mpMaps",\n      "js": [\n        "minnpost-styles/dist/minnpost-styles.maps"\n      ],\n      "returns": "mpMaps"\n    }\n  },\n  "resolutions": {\n    "underscore": ">=1.5.0"\n  }\n}\n';});

/**
 * Base class(es) for applications.
 */

// Create main application
define('base',['jquery', 'underscore', 'backbone', 'lazyload', 'mpFormatters', 'text!../bower.json'],
  function($, _, Backbone, Lazyload, formatters, bower) {
  

  var Base = {};
  bower = JSON.parse(bower);

  // Base App constructor
  Base.BaseApp = function(options) {
    // Attach options
    this.options = _.extend(this.baseDefaults || {}, this.defaults || {}, options || {});
    this.name = this.options.name;

    // Handle element if in options
    if (this.options.el) {
      this.el = this.options.el;
      this.$el = $(this.el);
      this.$ = function(selector) { return this.$el.find(selector); };
    }

    // Determine paths and get assesets
    this.determinePaths();
    this.renderAssests();

    // Run an initializer once CSS has been loaded
    this.on('cssLoaded', function() {
      this.initialize.apply(this, arguments);
    });
  };

  // Extend with Backbone Events and other properties
  _.extend(Base.BaseApp.prototype, Backbone.Events, {
    // Attach bower info
    bower: bower,

    // Default options
    baseDefaults: {
      jsonpProxy: '//mp-jsonproxy.herokuapp.com/proxy?url=',
      availablePaths: {
        local: {
          css: ['.tmp/css/main.css'],
          images: 'images/',
          data: 'data/'
        },
        build: {
          css: [
            'dist/[[[PROJECT_NAME]]].libs.min.css',
            'dist/[[[PROJECT_NAME]]].latest.min.css'
          ],
          images: 'dist/images/',
          data: 'dist/data/'
        },
        deploy: {
          css: [
            '//s3.amazonaws.com/data.minnpost/projects/' +
              '[[[PROJECT_NAME]]]/[[[PROJECT_NAME]]].libs.min.css',
            '//s3.amazonaws.com/data.minnpost/projects/' +
              '[[[PROJECT_NAME]]]/[[[PROJECT_NAME]]].latest.min.css'
          ],
          images: '//s3.amazonaws.com/data.minnpost/projects/[[[PROJECT_NAME]]]/images/',
          data: '//s3.amazonaws.com/data.minnpost/projects/[[[PROJECT_NAME]]]/data/'
        }
      }
    },

    // Determine paths.  A bit hacky.
    determinePaths: function() {
      var query;

      // Only handle once
      if (_.isObject(this.options.paths) && !_.isUndefined(this.options.deployment)) {
        return this.options.paths;
      }

      // Deploy by default
      this.options.deployment = 'deploy';

      if (window.location.host.indexOf('localhost') !== -1) {
        this.options.deployment = 'local';

        // Check if a query string forces something
        query = this.parseQueryString();
        if (_.isObject(query) && _.isString(query.mpDeployment)) {
          this.options.deployment = query.mpDeployment;
        }
      }

      this.options.paths = this.options.availablePaths[this.options.deployment];
      return this.options.paths;
    },

    // Get assests.  We use the rgrove lazyload library since it is simple
    // and small, but it is unmaintained.
    renderAssests: function() {
      var thisApp = this;
      var scripts = [];

      // Add CSS from bower dependencies
      _.each(this.bower.dependencyMap, function(c, ci) {
        if (c.css) {
          _.each(c.css, function(s, si) {
            // If local, add script, else only add external scripts
            if (thisApp.options.deployment === 'local') {
              s = (s.match(/^(http|\/\/)/)) ? s : 'bower_components/' + s + '.css';
              scripts.push(thisApp.makePath(s));
            }
            else if (s.match(/^(http|\/\/)/)) {
              scripts.push(thisApp.makePath(s));
            }
          });
        }
      });

      // Add app CSS
      _.each(this.options.paths.css, function(c, ci) {
        scripts.push(thisApp.makePath(c));
      });

      // Load and fire event when done
      Lazyload.css(scripts, function() {
        this.trigger('cssLoaded');
      }, null, this);
    },

    // Make path
    makePath: function(path) {
      path = path.split('[[[PROJECT_NAME]]]').join(this.name);
      if (this.options.basePath && !path.match(/^(http|\/\/)/)) {
        path = this.options.basePath + path;
      }
      return path;
    },

    // Override Backbone's ajax call to use JSONP by default as well
    // as force a specific callback to ensure that server side
    // caching is effective.
    overrideBackboneAJAX: function() {
      Backbone.ajax = function() {
        var options = arguments[0];
        if (options.dataTypeForce !== true) {
          return this.jsonpRequest(options);
        }
        return Backbone.$.ajax.apply(Backbone.$, [options]);
      };
    },

    // Unfortunately we need this more often than we should
    isMSIE: function() {
      var match = /(msie) ([\w.]+)/i.exec(navigator.userAgent);
      return match ? parseInt(match[2], 10) : false;
    },

    // Read query string
    parseQueryString: function() {
      var assoc  = {};
      var decode = function(s) {
        return decodeURIComponent(s.replace(/\+/g, " "));
      };
      var queryString = location.search.substring(1);
      var keyValues = queryString.split('&');

      _.each(keyValues, function(v, vi) {
        var key = v.split('=');
        if (key.length > 1) {
          assoc[decode(key[0])] = decode(key[1]);
        }
      });

      return assoc;
    },

    // Wrapper for a JSONP request, the first set of options are for
    // the AJAX request, while the other are from the application.
    //
    // JSONP is hackish, but there are still data sources and
    // services that we don't have control over that don't fully
    // support CORS
    jsonpRequest: function(options) {
      options.dataType = 'jsonp';

      // If no callback, use proxy
      if (this.options.jsonpProxy && options.url.indexOf('callback=') === -1) {
        options.jsonpCallback = 'mpServerSideCachingHelper' +
          formatters.hash(options.url);
        options.url = this.options.jsonpProxy + encodeURIComponent(options.url) +
          '&callback=' + options.jsonpCallback;
        options.cache = true;
      }

      return $.ajax.apply($, [options]);
    },


    // Project data source handling for data files that are not
    // embedded in the application itself.  For development, we can call
    // the data directly from the JSON file, but for production
    // we want to proxy for JSONP.
    //
    // Takes single or array of paths to data, relative to where
    // the data source should be.
    //
    // Returns jQuery's defferred object.
    dataRequest: function(datas) {
      var thisApp = this;
      var useJSONP = false;
      var defers = [];
      datas = (_.isArray(name)) ? datas : [ datas ];

      // If the data path is not relative, then use JSONP
      if (this.options.paths.data.indexOf('http') === 0) {
        useJSONP = true;
      }

      // Go through each file and add to defers
      _.each(datas, function(d) {
        var defer = (useJSONP) ?
          thisApp.jsonpRequest(thisApp.options.paths.data + d) :
          $.getJSON(thisApp.options.paths.data + d);
        defers.push(defer);
      });

      return $.when.apply($, defers);
    },

    // Empty initializer
    initialize: function() { }
  });

  // Add extend from Backbone
  Base.BaseApp.extend = Backbone.Model.extend;


  return Base;
});


define('text!templates/application.mustache',[],function () { return '<div class="application-container">\n  <div class="message-container"></div>\n\n  <div class="content-container">\n\n    <div class="caption">Minneapolis primary zoning districts colored by type of district.  Data up to date as of December 11, 2014.  Minneapolis overlay zoning districts &mdash; a parallel set of zoning regulations affecting parts of the city &mdash; not included.  Click or tap on the legend to see the specific Minneapolis code for each zoning district.</div>\n\n    <div class="map" id="mpls-zoning-map"></div>\n\n    <div class="legend-container row small">\n      {{#each zoneTypes:zi}}\n        <div class="column-medium-20">\n          <div class="component-label">{{ zi.replace(\'Districts\', \'\') }}</div>\n          <a class="general-provisions" href="{{ muniCodeTemplate.replace(\'[[[NODE]]]\', this[0].gen_node )}}" target="_blank">General provisions</a>\n          <ul>\n            {{#each . }}\n              <li>\n                <a\n                  class="legend-swatch"\n                  style="background-color: {{ zoneColors[id] }};"\n                  href="{{ muniCodeTemplate.replace(\'[[[NODE]]]\', node )}}"\n                  target="_blank"\n                  title="Specific provisions for distrct">\n                  {{ id }}\n                </a>\n                {{ type.replace(\'District\', \'\') }}\n              </li>\n            {{/each}}\n          </ul>\n        </div>\n      {{/each}}\n    </div>\n\n  </div>\n\n  <div class="footnote-container">\n    <div class="footnote">\n      <p>Some map data © OpenStreetMap contributors; licensed under the <a href="http://www.openstreetmap.org/copyright" target="_blank">Open Data Commons Open Database License</a>.  Some map design © MapBox; licensed according to the <a href="http://mapbox.com/tos/" target="_blank">MapBox Terms of Service</a>.</p>\n\n      <p>Some code, techniques, and data on <a href="https://github.com/minnpost/minnpost-minneapolis-zoning-map" target="_blank">Github</a>.</p>\n\n    </div>\n  </div>\n</div>\n';});


define('text!templates/tooltip-map-zoning.underscore',[],function () { return '<div>\n  <div class="component-label"><%= data.ZONE_CODE %> district</div>\n  <div><%= zMap[data.ZONE_CODE.replace(/-[0-9]+/, \'\')].type %></div>\n</div>\n';});

/**
 * Main application file for: minnpost-minneapolis-zoning-map
 *
 * This pulls in all the parts
 * and creates the main object for the application.
 */

// Create main application
require([
  'jquery', 'underscore', 'backbone', 'lazyload',
  'ractive', 'ractive-backbone', 'ractive-events-tap',
  'mapbox', 'leaflet-fullscreen', 'mpConfig', 'mpFormatters', 'mpMaps',
  'base',
  'text!templates/application.mustache',
  'text!templates/tooltip-map-zoning.underscore'
], function(
  $, _, Backbone, Lazyload, Ractive, RactiveBackbone, RactiveEventsTap,
  L, LeafletFullscreen, mpConfig, mpFormatters, mpMaps,
  Base,
  tApplication, tTooltipMapZoning
  ) {
  

  // Create new class for app
  var App = Base.BaseApp.extend({

    defaults: {
      name: 'minnpost-minneapolis-zoning-map',
      el: '.minnpost-minneapolis-zoning-map-container',
      mapboxZoning: 'minnpost.map-vhjzpwel,minnpost.q2iq9f6r,minnpost.map-dotjndlk',
      mapboxBase: '//{s}.tiles.mapbox.com/v3/',
      mapboxToken: 'pk.eyJ1IjoibWlubnBvc3QiLCJhIjoicUlOUkpvWSJ9.djE93rNktev9eWRJVav6xA',
      mpls_code_template: 'https://www.municode.com/library/mn/minneapolis/codes/code_of_ordinances?nodeId=[[[NODE]]]',
      zoningTypeMap: {
        R1: {
          gen_type: 'Residential',
          gen_node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIIR1SIMIDI',
          type: 'Single-family District (low density)'
        },
        R1A: {
          gen_type: 'Residential',
          gen_node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIIIR1SIMIDI',
          type: 'Single-family District (low density)'
        },
        R2: {
          gen_type: 'Residential',
          gen_node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIVR2TMIDI',
          type: 'Two-family District (low density)'
        },
        R2B: {
          gen_type: 'Residential',
          gen_node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTVR2TMIDI',
          type: 'Two-family District (low density)'
        },
        R3: {
          gen_type: 'Residential',
          gen_node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTVIR3MUMIDI',
          type: 'Multiple-family District (medium density)'
        },
        R4: {
          gen_type: 'Residential',
          gen_node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTVIIR4MUMIDI',
          type: 'Multiple-family District (medium density)'
        },
        R5: {
          gen_type: 'Residential',
          gen_node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTVIIIR5MUMIDI',
          type: 'Multiple-family District (high density)'
        },
        R6: {
          gen_type: 'Residential',
          gen_node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH546REDI_ARTIXR6MUMIDI',
          type: 'Multiple-family District (high density)'
        },
        C1: {
          gen_type: 'Commercial Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH548CODI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH548CODI_ARTIIC1NECODI',
          type: 'Neighborhood Commercial District'
        },
        C2: {
          gen_type: 'Commercial Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH548CODI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH548CODI_ARTIIIC2NECOCODI',
          type: 'Neighborhood Corridor Commercial District'
        },
        C3A: {
          gen_type: 'Commercial Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH548CODI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH548CODI_ARTIVC3COACCEDI',
          type: 'Community Activity Center District'
        },
        C3S: {
          gen_type: 'Commercial Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH548CODI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH548CODI_ARTVC3COSHCEDI',
          type: 'Community Shopping Center District'
        },
        C4: {
          gen_type: 'Commercial Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH548CODI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH548CODI_ARTVIC4GECODI',
          type: 'General Commercial District'
        },
        B4: {
          gen_type: 'Downtown Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH549DODI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH549DODI_ARTVB4DOBUDI',
          type: 'Downtown Business District'
        },
        B4S: {
          gen_type: 'Downtown Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH549DODI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH549DODI_ARTVIB4DOSEDI',
          type: 'Downtown Service District'
        },
        B4C: {
          gen_type: 'Downtown Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH549DODI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH549DODI_ARTVIIB4DOCODI',
          type: 'Downtown Commercial District'
        },
        B4N: {
          gen_type: 'Downtown Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH549DODI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH549DODI_ARTVIIIB4DONEDI',
          type: 'Downtown Neighborhood District'
        },
        OR1: {
          gen_type: 'Office Residence Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH547OFREDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH547OFREDI_ARTIIORNEOFREDI',
          type: 'Neighborhood Office Residence District'
        },
        OR2: {
          gen_type: 'Office Residence Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH547OFREDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH547OFREDI_ARTIIIORHIDEOFREDI',
          type: 'High Density Office Residence District'
        },
        OR3: {
          gen_type: 'Office Residence Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH547OFREDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH547OFREDI_ARTIVORINOFREDI',
          type: 'Institutional Office Residence District'
        },
        I1: {
          gen_type: 'Industrial Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH550INDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH550INDI_ARTIII1LIINDI',
          type: 'Light Industrial District'
        },
        I2: {
          gen_type: 'Industrial Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH550INDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH550INDI_ARTIIII2MEINDI',
          type: 'Medium Industrial District'
        },
        I3: {
          gen_type: 'Industrial Districts',
          gen_node: 'MICOOR_TIT20ZOCO_CH550INDI_ARTIGEPR',
          node: 'MICOOR_TIT20ZOCO_CH550INDI_ARTIVI3GEINDI',
          type: 'General Industrial District'
        }
      },
      zoneColorMap: {
        R1: 'rgb(199,233,192)',
        R1A: 'rgb(199,233,192)',
        R2: 'rgb(161,217,155)',
        R2B: 'rgb(161,217,155)',
        R3: 'rgb(116,196,118)',
        R4: 'rgb(65,171,93)',
        R5: 'rgb(35,139,69)',
        R6: 'rgb(0,90,50)',
        OR1: 'rgb(189,215,231)',
        OR2: 'rgb(107,174,214)',
        OR3: 'rgb(33,113,181);',
        C1: 'rgb(252,187,161)',
        C2: 'rgb(252,146,114)',
        C3A: 'rgb(251,106,74)',
        C3S: 'rgb(222,45,38)',
        C4: 'rgb(165,15,21)',
        I1: 'rgb(204,204,204)',
        I2: 'rgb(150,150,150)',
        I3: 'rgb(82,82,82)',
        B4: 'rgb(203,201,226)',
        B4S: 'rgb(158,154,200)',
        B4C: 'rgb(117,107,177)',
        B4N: 'rgb(84,39,143)'
      }
    },

    initialize: function() {
      var thisApp = this;

      // Help out the data maps a bit
      _.each(this.options.zoningTypeMap, function(z, zi) {
        thisApp.options.zoningTypeMap[zi].id = zi;
      });

      // Create main application view
      this.mainView = new Ractive({
        el: this.$el,
        template: tApplication,
        data: {
          zoneColors: this.options.zoneColorMap,
          zoneTypes: _.groupBy(this.options.zoningTypeMap, 'gen_type'),
          muniCodeTemplate: this.options.mpls_code_template
        },
        partials: { }
      });

      // Register when data is loaded
      this.on('dataLoaded', function() {
        this.makeMaps();
      });

      // Get tilejsons
      $.ajax({
        url: this.options.mapboxBase.replace('{s}', 'a') + this.options.mapboxZoning + '.json?callback=?',
        dataType: 'jsonp',
        cache: true,
        success: function(data) {
          thisApp.tilejsonZoning = data;
          thisApp.trigger('dataLoaded');
        }
      });
    },


    // Make map.  Note that Mapbox 2.x does not support jsonp anymore but grid
    // tiles still seem to be in jsonp, so we use a 1.x version
    makeMaps: function() {
      var thisApp = this;
      L.mapbox.accessToken = this.options.mapboxToken;

      // First map
      this.mapZoning = L.mapbox.map('mpls-zoning-map', this.tilejsonZoning, {
        scrollWheelZoom: false,
        trackResize: true,
        minZoom: 9,
        maxZoom: 16,
        fullscreenControl: true
      });
      this.mapZoning.setView(mpMaps.minneapolisPoint, 13);
      this.mapZoning.removeControl(this.mapZoning.attributionControl);

      // Override the template function in Mapbox's grid control because
      // it doesn't expose more options and Mustache is stupid
      this.mapZoning.gridControl._template = function(format, data) {
        if (!data) {
          return;
        }
        var template = this.options.template || this._layer.getTileJSON().template;
        if (template) {
          return this.options.sanitizer(
            _.template(template)({
              format: mpFormatters,
              zMap: thisApp.options.zoningTypeMap,
              data: data
            })
          );
        }
      };
      this.mapZoning.gridControl.setTemplate(tTooltipMapZoning);
      this.mapZoning.gridControl.options.pinnable = false;

    }

  });

  // Create instance and return
  return new App({});
});

define("app", function(){});

