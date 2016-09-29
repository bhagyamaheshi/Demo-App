/*global define, _:false, $, console, amplify, FM*/
define([
    'views/base/view',
    'config/config',
    'config/Queries',
    'config/events',
    'i18n!nls/countryProfiles',
    'text!templates/countryProfiles/index.hbs',
    'text!templates/home/database_update_item.hbs',
    'text!templates/home/document_item.hbs',
    'text!json/home/database_updates.json',
    'text!json/home/documents.json',
    'handlebars',
    'fx-common/WDSClient',
    'swiper',
    'amplify'
], function (View, C, Q, E, i18nLabels, template,
             dbUpdatesTemplate, documentTemplate,
             dbUpdatesModels, documentsModels,
             Handlebars, WDSClient, Swiper) {

    'use strict';

    var s = {
        DB_UPDATES_LIST: '#db-updates-list',
        DOCUMENTS_LIST: '#documents-list',
        CONTRIBUTORS_ID : '#gift-contributors'
    };

    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return {
              countries: this.countryList,
              regions: this.regions
            };
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'countryProfiles'});

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();

            var bannerSwiper = new Swiper(s.CONTRIBUTORS_ID,{
                keyboardControl: false,
                autoplay: 5000,
                loop: true,
                autoplayDisableOnInteraction: false,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 30
            })
        },

        initVariables: function () {
            this.$dbUpdatesList = this.$el.find(s.DB_UPDATES_LIST);

            //document list
            this.$documentsList = this.$el.find(s.DOCUMENTS_LIST);

        },

        initComponents: function () {

            this._initDatabaseUpdatesList();
            this._initDocumentsLinkList();
        },

        //Page section initialization
        _initDatabaseUpdatesList: function() {
            _.each(JSON.parse(dbUpdatesModels), _.bind(this.printDatabaseUpdate, this));

        },

        printDatabaseUpdate: function (u) {

            var template = Handlebars.compile(dbUpdatesTemplate);
            this.$dbUpdatesList.append(template(u));
        },

        _initDocumentsLinkList: function () {
            _.each(JSON.parse(documentsModels), _.bind(this.printDocuments, this));
        },

        printDocuments: function (d) {
            var template = Handlebars.compile(documentTemplate);
            this.$documentsList.append(template(d));
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
          var countries_url=C.SERVICE_BASE_ADDRESS+"/v2/msd/resources/data/uid/ESCAP_COUNTRIES?language=EN";
          var countryList_1 ={};
          var countryList_2 ={};
          var countryList_3 = [];
          var regions = [];
          var object = {};
          self.countryList=[];
          self.regions = [];

          $.ajax({
            async: false,
            dataType: 'json',
            url: countries_url,
            contentType: "application/json; charset=utf-8",
            type: 'get',
            success:function(res){
              countryList_1 = res.splice(1,1);
              countryList_2 = res.splice(5,1);
              //res.splice(5,0,countryList_1);

              _.each(res,function(obj){
                regions.push({
                  "id": obj.code,
                  "name":obj.title["EN"]
                });
                _.each(obj["children"],function(obj1){
                  countryList_3.push({
                    "id": obj1.code,
                    "name":obj1.title["EN"]
                  });
                });
              });
               self.countryList = _.sortBy(countryList_3,function(obj3){
                 return obj3.name;
               });
               //console.log(countryList_3);


               countryList_1[0]["children"]= _.sortBy(countryList_1[0]["children"],function(obj){
                 return obj.code
               });

               _.each(countryList_1[0]["children"],function(obj4){
                 regions.push({
                   "id": obj4.code,
                   "name":obj4.title["EN"]
                 });
               });

               regions.push({
                 "id": countryList_1[0].code,
                 "name":"ESCAP"
               });

               countryList_2[0]["children"]= _.sortBy(countryList_2[0]["children"],function(obj){
                 return obj.code
               });

               _.each(countryList_2[0]["children"],function(obj5){
                 regions.push({
                   "id": obj5.code,
                   "name":obj5.title["EN"]
                 });
               });

               regions.push({
                 "id": countryList_2[0].code,
                 "name":"World"
               });
               self.regions = regions;
            }
          });
        }
    });

    return HomeView;
});
