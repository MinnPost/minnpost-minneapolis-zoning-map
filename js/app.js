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
  'mapbox', 'mpConfig', 'mpFormatters', 'mpMaps',
  'base',
  'text!templates/application.mustache',
  'text!templates/tooltip-map-zoning.underscore'
], function(
  $, _, Backbone, Lazyload, Ractive, RactiveBackbone, RactiveEventsTap,
  L, mpConfig, mpFormatters, mpMaps,
  Base,
  tApplication, tTooltipMapZoning
  ) {
  'use strict';

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
        maxZoom: 16
      });
      this.mapZoning.setView(mpMaps.minneapolisPoint);
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
