/*global define, amplify, alert*/
define([
    "jquery",
    'config/config',
    "fx-filter/config/config",
    "fx-filter/config/config-default",
    "fx-filter/config/events",
    "jQAllRangeSliders",
    "amplify"

], function ($,CT, C, DC, E) {


    'use strict';


    var o = {
        lang: 'EN',
        //For filter logic .... start
        componentType: '',
        componentid: '',
        name: '',
        title: '',
        grid: '',
        source: '',
        defaultsource: '',
        adapter: null,
        css_classes: {
            HOLDER: "fx-catalog-modular-form-holder",
            HEADER: "fx-catalog-modular-form-header",
            HANDLER: "fx-catalog-modular-form-handler",
            CONTENT: "fx-catalog-modular-form-content",
            CLOSE_BTN: "fx-catalog-modular-form-close-btn",
            MODULE: 'fx-catalog-form-module',
            RESIZE: ".fx-catalog-modular-form-resize-btn",
            LABEL: "fx-catalog-modular-form-label"
        },

        sourceType: {
            timelist: 'timeList',
            period: 'period'
        },

        events: {
            REMOVE_MODULE: "fx.filter.module.remove",
            READY: "fx.filter.component.ready",
            DESELECT: 'fx.filter.module.deselect.'
        }
        //For filter logic .... end
    };


    function Fx_ui_survey_component(optionsDefault) {

        if (this.options === undefined) {
            this.options = {};
        }
        this.$CT = CT.CATALOG_TEMPLATE;


        $.extend(true, this.options, o, optionsDefault);
    };


    Fx_ui_survey_component.prototype._initialize = function(e) {

        this.$surveyTimerange = $(this.$CT.FILTER_CONFIG.SURVEY.YEARS);

        this.$surveyaddCharsNational = this.$CT.FILTER_CONFIG.SURVEY.ADD_CHARS_RADIO_NATIONAL;

        this.$surveyaddCharsUrban = this.$CT.FILTER_CONFIG.SURVEY.ADD_CHARS_RADIO_URBAN;

        this.$surveyAddCharsSelectorNational = $('input[name="' + this.$surveyaddCharsNational + '"]:radio');

        this.$surveyAddCharsSelectorUrban = $('input[name="' + this.$surveyaddCharsUrban + '"]:radio');

        this.$sourceTimerange = e.component.years.defaultsource;

    };


    Fx_ui_survey_component.prototype.render = function (e, container) {

        var self = this;

        self.options.container = container;

        self.options.module = e;

        this.$componentStructure = e.template.overallStructure;

        this.$container = $(container);

        this.$container.append(this.$componentStructure);

        this._initialize(e);

        this.$surveyTimerange.rangeSlider({
            arrows: false,
            bounds: {min: this.$sourceTimerange.from, max: this.$sourceTimerange.to},
            step: 1, defaultValues: {min: this.$sourceTimerange.from + 5, max: this.$sourceTimerange.to - 5}
        });

        this.bindEventListeners();

        if ((e.adapter != null) && (typeof e.adapter != "undefined")) {
            self.options.adapter = e.adapter;
        }

        self.options.name = e.name;
        self.options.componentid = $(container).attr("id");
        //Raise an event to show that the component has been rendered

        $(container).trigger(self.options.events.READY, {name: e.name});

        setTimeout(function(){
            self.$surveyTimerange.rangeSlider('resize');
        }, 300);
    };


    Fx_ui_survey_component.prototype.validate = function (e) {

        //TODO

        return true;
    };


    Fx_ui_survey_component.prototype.processData = function (dataType, data) {
        // TODO

        var r = [];
        if (dataType == o.sourceType.timelist) {
            //Array of years
            data.sort(function (a, b) {
                if (a < b)
                    return -1;
                if (a > b)
                    return 1;
                return 0;
            });

            $(data).each(function (index, item) {
                r.push({"text": "" + item, "id": item, "children": false});
            });
        }
        else if (dataType == o.sourceType.period) {
            //Array of json object {from: to}
            $(data).each(function (index, item) {
                var start_year = item.from;
                var end_year = item.to;
                var iYear = 0;
                if (start_year <= end_year) {
                    for (iYear = start_year; iYear <= end_year; iYear++) {
                        r.push({"text": "" + iYear, "id": iYear, "children": false});
                    }
                }
            });
        }

        return r;
    };


    Fx_ui_survey_component.prototype.bindEventListeners = function () {

        var self = this;

        this.$surveyAddCharsSelectorUrban.on('change', function (e, data) {
            e.preventDefault();
            console.log($(e.target).val());
        });

        this.$surveyAddCharsSelectorNational.on('change', function (e, data) {
            e.preventDefault();
            console.log($(e.target).val());
            console.log(self.$surveyTimerange.rangeSlider('values'));
        });

        $( this.options.css_classes.RESIZE).on('click', function () {
            self.$surveyTimerange.rangeSlider('resize');
        })

        amplify.subscribe(E.MODULE_DESELECT + '.' + self.options.module.name, function (e) {
            self.deselectValue(e);
        });
    };


    Fx_ui_survey_component.prototype.unbindEventListeners = function () {
        this.$surveyAddCharsSelectorUrban.off();
        this.$surveyAddCharsSelectorNational.off();
        $( this.options.css_classes.RESIZE).off();

    }

    Fx_ui_survey_component.prototype.deselectValue = function (obj) {

        this.$treeContainer.jstree('deselect_node', [obj.value]);

        this.$treeContainer.jstree(true).deselect_node([obj.value]);

    };

    //For filter logic .... start
    Fx_ui_survey_component.prototype.getName = function () {
        return this.options.name;
    };


    Fx_ui_survey_component.prototype.getAdapter = function () {
        return this.options.adapter;
    };
    //For filter logic .... end

    Fx_ui_survey_component.prototype.getValue = function (e) {

        var timeData = $(this.$CT.FILTER_CONFIG.SURVEY.YEARS).rangeSlider('values');

        return {
            years: {
                "period": {
                    from: timeData.min,
                    to: timeData.max
                }
            },
            addCharsNational: $('input[name="' + this.$CT.FILTER_CONFIG.SURVEY.ADD_CHARS_RADIO_NATIONAL+ '"]:radio').val(),
            addCharsUrban: $('input[name="' + this.$CT.FILTER_CONFIG.SURVEY.ADD_CHARS_RADIO_URBAN + '"]:radio').val()
        };
    };


    return Fx_ui_survey_component;
});