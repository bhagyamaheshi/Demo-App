/*global define*/
define([
    'controllers/base/controller',
    'views/didYouKnow-view',
    'views/didYouKnow-Indexview'
], function (Controller, View, indexView) {

    'use strict';

    var DidYouKnowController = Controller.extend({

        show: function (params) {
          var conf = {
              region: 'main',
              domain: params
          };

          //Pass the valid id to view if valid
          if (this.isReadyToUse === true) {
              conf.id = params.id;
          } else {
              Backbone.history.navigate('#didYouKnow/' , {trigger: false});
          }

          this.view = new View(conf);
        },

        index: function (params) {
            this.view = new indexView({
                region: 'main'
            });
        }
    });

    return DidYouKnowController;
});
