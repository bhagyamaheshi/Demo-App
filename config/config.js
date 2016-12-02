/*global define*/
define(function () {

    'use strict';

    return {

        //SERVICE_BASE_ADDRESS: "http://escap-fenix-01.escap.un.org:7777",
        SERVICE_BASE_ADDRESS: "http://escap-fenix-01.escap.un.org/fenix",
        ENVIRONMENT: 'production',

        //Chaplin JS configuration
        CHAPLINJS_CONTROLLER_SUFFIX: '-controller',
        CHAPLINJS_PROJECT_ROOT: '/fenix/',
        CHAPLINJS_PUSH_STATE: false,
        CHAPLINJS_SCROLL_TO: false,
        CHAPLINJS_APPLICATION_TITLE: "FENIX Web App",

        //WDS configuration
        DB_NAME: 'GIFT',
        WDS_URL: 'http://hqlprfenixapp2.hq.un.fao.org:10100/wds-5.2.1/rest/crud',
        WDS_OUTPUT_TYPE: 'object',
        WDS_DOWNLOAD_MICRODATA_SEARCH_QUERY: "select distinct ('gift_'||survey_code) from master_avg where 1=1",

        MD_EXPORT_URL: 'http://fenixapps2.fao.org/fenixExport',

        //Top Menu configuration
        TOP_MENU_CONFIG: 'config/submodules/fx-menu/top_menu.json',
        TOP_MENU_TEMPLATE: 'fx-menu/html/blank-fluid.html',
        TOP_MENU_SHOW_BREADCRUMB: false,
        TOP_MENU_SHOW_BREADCRUMB_HOME: false,
        TOP_MENU_SHOW_FOOTER: false,
        TOP_MENU_AUTH_MODE_HIDDEN_ITEMS: ['login'],
        TOP_MENU_PUBLIC_MODE_HIDDEN_ITEMS: ['inputData', 'statistics', 'microdata', 'analysis', 'datamng', 'logout'],

        SECURITY_NOT_AUTHORIZED_REDIRECTION_LINK: "home",

        SOCIAL_LINK_FACEBOOK: "https://facebook.com",
        SOCIAL_LINK_TWITTER: "https://twitter.com",
        SOCIAL_LINK_YOUTUBE: "https://youtube.com",

        READY_TO_USE: ["consumption", "safety", "nutrition", "environment"],

        DOWNLOAD_SOURCES: {
            "gift_000042BUR201001": "files/burkina_faso.zip"
        },

        CONSUMPTION: {
            body: {
                "dsd.contextSystem": {
                    "enumeration": ["gift"]
                },
                "meContent.resourceRepresentationType": {
                    "enumeration": ["dataset"]
                }
            }
        },

        CATALOG_TEMPLATE: {

            //Configuration of the filter

            PLUGIN_FILTER_COMPONENT_DIRECTORY: "../../../submodules/fenix-ui-filter/",
            FILTER_CONFIG: {

                SURVEY: {
                    YEARS: "#survey-timerange-container",
                    ADD_CHARS_RADIO_NATIONAL: "addCharsNational",
                    ADD_CHARS_RADIO_URBAN: "addCharsUrban"
                },

                POPULATION: {
                    GENDERS_RADIO_NAME: "popGendersRadio",
                    AGERANGE_TYPE_RADIO_NAME: "popAgeRangeRadio",
                    AGERANGE: "#population-ageRange",
                    CHARACTERISTICS_RADIO_NAME: "popCharsRadio",
                    NODISPLAY_CLASS : 'nodisplay',
                    ADD_CHARS_CONTAINER : '.population-additional-characteristics'
                },

                GEO: {
                    MAP_ID: "map-container-donwload-microdata",
                    SEARCH_INPUT_CLASS: "search-geojson-list",
                    LIST_COUNTRIES_CLASS: "list-countries",
                    ITEM_LIST_CLASS: "list-item",
                    GEOJSON_LIST_GROUP_CLASS: "geojson-list-group",
                    GEOJSON_LIST_ITEM_CLASS: "geojson-list-item",
                    SELECTOR_LIST_FILTER_CLASS: "list-countries-container"
                },

                FOOD: {
                    TREE_CONTAINER: "#food-countries-container"
                }
            },
            events: {
                MODIFY: "fx.filter.gift.population.changed"
            }

        },

        CATALOG_PLUGINS: {
            SERVICES_BASE_ADDRESS : 'http://fenix.fao.org/d3s',

            PLUGIN_FILTER_COMPONENT_DIRECTORY: "../../../submodules/fenix-ui-filter/",
            FILTER_CONFIG: {

                SURVEY: {
                    YEARS: "#survey-timerange-container",
                    ADD_CHARS_RADIO_NAME: "addCharsRadio"
                },

                POPULATION: {
                    GENDERS_RADIO_NAME: "popGendersRadio",
                    AGERANGE_TYPE_RADIO_NAME: "popAgeRangeRadio",
                    AGERANGE: "#population-ageRange",
                    CHARACTERISTICS_RADIO_NAME: "popCharsRadio",
                    NODISPLAY_CLASS : 'nodisplay',
                    ADD_CHARS_CONTAINER : 'population-additional-characteristics'
                },

                GEO: {
                    MAP_ID: "map-container-donwload-microdata",
                    SEARCH_INPUT_CLASS:"search",
                    LIST_COUNTRIES_CLASS:"list-countries",
                    ITEM_LIST_CLASS:"list-item",
                    GEOJSON_LIST_GROUP_CLASS:"geojson-list-group",
                    GEOJSON_LIST_ITEM_CLASS:"geojson-list-item",
                    SELECTOR_LIST_FILTER_CLASS:"list-countries-container"
                },

                FOOD: {}
            },
            events: {
                MODIFY: "fx.filter.gift.population.changed"
            }

        }


    };
});
