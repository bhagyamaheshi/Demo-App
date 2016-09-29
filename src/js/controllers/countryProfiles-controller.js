/*global define*/
define([
    'controllers/base/controller',
    'views/countryProfiles-view',
    'views/countryProfiles-Indexview'
], function (Controller, View, indexView) {

    'use strict';

    var CountryProfileController = Controller.extend({

        show: function (params) {
          var conf = {
              region: 'main',
              country: params
          };

          //Pass the valid id to view if valid
          if (this.isReadyToUse === true) {
              conf.id = params.id;
          } else {
              Backbone.history.navigate('#countryProfiles/' , {trigger: false});
          }

          this.view = new View(conf);
        },

        index: function (params) {
            this.view = new indexView({
                region: 'main'
            });
        }
    });

    return CountryProfileController;
});
