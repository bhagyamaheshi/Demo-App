/*global define, _:false, $, console, amplify, FM*/
define([
    'views/base/view',
    'config/config',
    'config/Queries',
    'config/events',
    'i18n!nls/home',
    'text!templates/home/index.hbs',
    'handlebars',
    'amplify'
], function (View, C, Q, E, i18nLabels, template,Handlebars) {

    'use strict';

    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return{
              slides: this.slides
            };
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'home'});

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();

        },

        initVariables: function () {


        },

        initComponents: function () {


        },

        //Page section initialization
        _initDatabaseUpdatesList: function() {

        },

        printDatabaseUpdate: function (u) {

        },

        _initDocumentsLinkList: function () {

        },

        printDocuments: function (d) {

        },

        configurePage: function () {

        },

        bindEventListeners: function () {

        },

        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },
        initialize: function(params){
          var self = this;
          var id = _.range(10,170,10);
          self.slides = [];
          var domains = [];
          var facts = [];


          for (var i = 4; i > 0; i--) {
              var j = Math.floor(Math.random()*id.length);
              var temp = id[i];
              id[i] = id[j];
              id[j] = temp;
              var images = "src/images/escap/"+id[i]+"_banner.png";
              self.slides.push({"slide" : images,
                                "id": id[i]});
            }


        }
    });

    return HomeView;
});
