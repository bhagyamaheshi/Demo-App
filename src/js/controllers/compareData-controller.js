/*global define*/
define([
    'controllers/base/controller',
    'views/compareData-view'
], function (Controller, View) {
    'use strict';

    var compareDataController = Controller.extend({

        show: function (params) {
          this.view = new View({
              region: 'main'
          });
        }
    });

    return compareDataController;
});
