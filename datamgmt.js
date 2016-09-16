/*global require*/
// relative or absolute path of Components' main.js
require([
    './submodules/fenix-ui-common/js/Compiler',
    './submodules/fenix-ui-common/js/paths',
    './submodules/fenix-ui-DataEditor/js/paths',
    './submodules/fenix-ui-DSDEditor/js/paths',
    './submodules/fenix-ui-metadata-editor/js/paths',
    './submodules/fenix-ui-catalog/js/paths',
    './submodules/fenix-ui-menu/js/paths',
    './submodules/fenix-ui-data-management/src/js/paths',
    './submodules/fenix-ui-datamanagement-commons/js/paths'
], function (Compiler, Commons, DataEditor, DSDEditor, MetadataEditor, Catalog, Menu, DataMng,
DataMngCommons) {

    'use strict';

    var dataEditorConfig = DataEditor;
    dataEditorConfig.baseUrl = './submodules/fenix-ui-DataEditor/js';

    var dataMngCommons = DataMngCommons;
    dataMngCommons.baseUrl = './submodules/fenix-ui-datamanagement-commons/js';

    var dsdEditorConfig = DSDEditor;
    dsdEditorConfig.baseUrl = './submodules/fenix-ui-DSDEditor/js';

    var metadataEditorConfig = MetadataEditor;
    metadataEditorConfig.baseUrl = './submodules/fenix-ui-metadata-editor/js/';

    var catalogConfig = Catalog;
    catalogConfig.baseUrl = './submodules/fenix-ui-catalog/js/';

    var commonsConfig = Commons;
    commonsConfig.baseUrl = './submodules/fenix-ui-common/js';

    var menuConfig = Menu;
    menuConfig.baseUrl = './submodules/fenix-ui-menu/js';

    var dataMngConfig = DataMng;
    dataMngConfig.baseUrl = './submodules/fenix-ui-data-management/src/js';

    Compiler.resolve([dataEditorConfig,dataMngCommons,  dsdEditorConfig, metadataEditorConfig, catalogConfig, menuConfig, dataMngConfig,
            commonsConfig],
        {
            placeholders: {"FENIX_CDN": "//fenixrepo.fao.org/cdn"},
            config: {

                locale: 'en',

                // Specify the paths of vendor libraries
                paths: {


                    handlebars: "{FENIX_CDN}/js/handlebars/4.0.5/handlebars.min",
                    underscore: "{FENIX_CDN}/js/underscore/1.7.0/underscore.min",
                    backbone: "{FENIX_CDN}/js/backbone/1.1.2/backbone.min",
                    chaplin: "{FENIX_CDN}/js/chaplin/1.0.1/chaplin.min",
                    amplify: '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',
                    rsvp: '{FENIX_CDN}/js/rsvp/3.0.17/rsvp',
                    pnotify: '{FENIX_CDN}/js/pnotify/2.0.1/pnotify.custom.min',
                    datetimepicker: '{FENIX_CDN}/js/bootstrap-datetimepicker/4.14.30/src/js/bootstrap-datetimepicker',
                    packery: '{FENIX_CDN}/js/packery/1.4.3/dist/packery.pkgd.min',
                    i18n: "{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n",

                    // override of default configuration of metadata editor
                    'fx-MetaEditor2/codelists/ClCodelist': "./config/submodules/fx-md-editor/CL_CONF_STATUS",
                    'fx-MetaEditor2/md-codelists' : './config/submodules/fx-md-editor/codelists',


                    'fx-d-m/templates/site'     : "./src/js/templates/site.hbs",
                    'fx-d-m/config/config'      : "./config/submodules/fx-data-mng/Config",
                    'fx-d-m/templates/resume'   : "./submodules/fenix-ui-data-management/src/js/templates/resume_metadata_only",

                    'fx-d-m/i18n/nls/site'      : "./i18n/site",

                 /*   'fx-d-m/templates/landing'  : "./submodules/fenix-ui-data-management/src/js/templates/landing/metadata.hbs",
                    'fx-d-m/templates/resume'   : "./submodules/fenix-ui-data-management/src/js/templates/resume_metadata_only",

*/
                    'fx-cat-br/config/config': './config/submodules/fx-catalog/config_data_mgmt',



                   // 'fx-menu/config/config': './config/submodules/fx-catalog/config',

                    'fx-submodules/config/baseConfig': './config/submodules/config_base'

                },

                // Underscore and Backbone are not AMD-capable per default,
                // so we need to use the AMD wrapping of RequireJS
                shim: {
                    underscore: {
                        exports: '_'
                    },
                    backbone: {
                        deps: ['underscore', 'jquery'],
                        exports: 'Backbone'
                    },
                    handlebars: {
                        exports: 'Handlebars'
                    },
                    amplify: {
                        deps: ['jquery'],
                        exports: 'amplifyjs'
                    }
                }
                // For easier development, disable browser caching
                // Of course, this should be removed in a production environment
                //, urlArgs: 'bust=' +  (new Date()).getTime()
            }
        });

    // Bootstrap the application
    require([
        'fx-d-m/start',
        'fx-d-m/routes',
        'fx-common/AuthManager'
    ], function (Application, routes, AuthManager) {


        var authMAnager = new AuthManager();
        if(authMAnager.isLogged()) {


            var app = new Application({
                routes: routes,
                controllerSuffix: '-controller',
                controllerPath: './submodules/fenix-ui-data-management/src/js/controllers/',
                root: '/gift/',
                pushState: false
            });
        }else{
            window.location.replace("./index.html");
        }
    });
});