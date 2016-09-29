/*global define, amplify*/
define([
    'jquery',
    'views/base/view',
    'text!templates/domain/compareData.hbs',
    'i18n!nls/compareData',
    'config/events',
    'config/config',
    'fx-table/start',
    'fx-chart/start',
    'amplify'
], function ($,View, template, i18nLabels, E,C, Table,Chart) {

    'use strict';

    var s = {
      ELEMENT: ".element",
      DATA_ELEMENTS: ".data_elements",
      ELEMENT_CONTAINER: ".elementItems",
      ELEMENT_SELECTOR: ".elements_selector",
      ELEMENT_CHECKS: "input[name=element]",
      PANEL: ".panel-collapse",
      SHORT_NAMES: ".list-group-item",
      INDICATOR: "#indicator_name",
      INDICATOR1:"#indicator",
      INDICATOR_CONTAINER: ".selected-indicators",
      INDICATOR_FAMILIES: ".indicatorFamilies",
      INDICATOR_ELEMENTS: "input[name=indic_element]",
      COUNTRY_SELECT: "#select_All",
      COUNTRY_CLEAR: "#clear_All",
      COUNTRY_CONTAINER: ".countryItems",
      COUNTRY_A_CHECKS: "input[name=countryA]",
      COUNTRY_B_CHECKS: "input[name=countryB]",
      YEAR_SELECT: "#selectAll",
      YEAR_CLEAR: "#clearAll",
      YEAR_CONTAINER: ".yearItems",
      YEAR_CHECKS: "input[name=year]",
      METADATA: ".metadata",
      GETDATA: "#getData",
      DATA_OUTPUT: "#dataContainer",
      DATA_DESC: ".dataDesc",
      GRAPH: "#graph",
      GRAPH_OPTIONS: "#graph_options",
      GRAPH_TITLE: "#graph_title"
    };

    var DataView = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: 'modules',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return {
                //title: this.domain,
                subDomainItems: this.subDomainItemsSorted,
                countries: this.countryList,
                years: this.year,
                im: this.ims
             };
        },

        attach: function () {

            console.log(Table);

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'compareData'});

            this._bindEventListeners();

        },

        _bindEventListeners: function(){
          var subDomainItems = this.subDomainItemsSorted;
          var countries = this.countryList;
          var years = this.year;
          var country = [];
          var year = [];
          //console.log('Sub Domain Items', subDomainItems);
          $(document).ready(function(){
            $(s.SHORT_NAMES).on('click',function(index){
                var indicator = $(this).text();
                var value = $(this).val();
                var Children_level1 = {};
                var Children_level2 ={};
                var Children_level3 =[];
                var element = [];
                Children_level1 = subDomainItems[value];
                //console.log(Children_level1);
                $(s.INDICATOR_FAMILIES).empty();
                $(s.DATA_ELEMENTS).empty();
                $(s.ELEMENT_CONTAINER).empty();
                $(s.ELEMENT_CHECKS).prop('checked',false);
                $(s.COUNTRY_CONTAINER).empty();
                $(s.COUNTRY_CHECKS).prop('checked',false);
                $(s.YEAR_CONTAINER).empty();
                $(s.YEAR_CHECKS).prop('checked',false);
                $(s.COUNTRY_A_CHECKS).prop('checked',false);
                $(s.COUNTRY_B_CHECKS).prop('checked',false);
                $(s.INDICATOR_ELEMENTS).prop('checked',false);
                $('#indic_name').empty();
                $('#indic_unit').empty();
                $('#export_data').empty();
                $('#make_chart').empty();
                $(s.DATA_OUTPUT).empty();
                $(s.GRAPH).empty();
                $(s.GRAPH_OPTIONS).empty();
                $(s.GRAPH_TITLE).empty();
                
                Children_level2 = _.find(Children_level1[0]["children"],function(obj){
                  return obj.title["EN"] == indicator;
                });

                _.each(Children_level2["children"],function(obj){
                  $(s.INDICATOR_FAMILIES).append('<div class="radio"><label>'+
                  '<input id="'+obj.code+'" type="radio" name="indic_element" value="'+obj.code+'"/>'
                    +obj.title["EN"]+'</label></div>').show();
                });

                $(s.INDICATOR_ELEMENTS).on('click',function(){
                  var family = $(this).prop('id');
                  $(s.DATA_ELEMENTS).empty();
                  var series = _.find(Children_level2["children"],function(obj){
                    return obj.code == family;
                  });

                  series["children"] = _.sortBy(series["children"],function(s){
                    return s.code;
                  });
                  var el = series["children"][0];
                  var long_name = el.title["EN"].split('#');

                  $(s.INDICATOR1).html('<div id="'+series["children"][0].code+'" style="display: inline-block;"><a class="btn btn-default">'+
                  indicator+
                  '&nbsp;&nbsp;<span class="glyphicon glyphicon-remove"></span></a></div>').show();

                  var div_id = '#'+series["children"][0].code;
                  $(div_id).on('click',function(){
                    $(this).empty();
                    $(s.INDICATOR).empty();
                    $(s.ELEMENT_CONTAINER).empty();
                    $(s.ELEMENT_CHECKS).prop('checked',false);
                    $(s.COUNTRY_CONTAINER).empty();
                    $(s.COUNTRY_CHECKS).prop('checked',false);
                    $(s.YEAR_CONTAINER).empty();
                    $(s.YEAR_CHECKS).prop('checked',false);
                    $(s.COUNTRY_A_CHECKS).prop('checked',false);
                    $(s.COUNTRY_B_CHECKS).prop('checked',false);
                    $(s.INDICATOR_ELEMENTS).prop('checked',false);
                    $('#indic_name').empty();
                    $('#indic_unit').empty();
                    $('#export_data').empty();
                    $('#make_chart').empty();
                    $(s.DATA_OUTPUT).empty();
                    $(s.GRAPH).empty();
                    $(s.GRAPH_OPTIONS).empty();
                    $(s.GRAPH_TITLE).empty();
                  });

                  _.each(series["children"],function(obj1){
                    var series_name = obj1.title["EN"].split('#');
                    $(s.DATA_ELEMENTS).append('<div class="radio"><label>'+
                    '<input id="'+obj1.code+'" type="radio" name="element" value="'+series_name[1]+'"/>'
                      +series_name[1]+'</label></div>')
                  });

                  $(s.ELEMENT_CHECKS).on('click',function(){
                     var radio_id = '#'+ $(this)[0].id;
                     var div_id5 = '#indic_'+$(this)[0].id;
                    $(s.ELEMENT_CONTAINER).html('<div id="'+div_id5+'" style="display: inline-block;"><a class="btn btn-default">'+$(this).val()+
                    '</div>').show();

                  });
                });

                $(s.INDICATOR).html('<h3 class="card-subtitle text-muted">'+indicator+'</h3>').show();
                $(s.SHORT_NAMES).removeClass("red-cell");
                $(this).addClass("red-cell");
                //console.log('Value',value);
                //console.log('Children',Children_level1);
                //console.log('Children',Children_level2);
                //console.log('Children',Children_level3);
                //console.log('Div',s.INDICATOR);
            });


          //for selecting country one by one and removing them using checkbox
          $(s.COUNTRY_A_CHECKS).on('click',function(){
            var country_val = $(this);
            var id = $(country_val).prop('id');

            $(s.COUNTRY_CONTAINER).append('<div id="countryA_'+id+'" value = "'+$(country_val).val()+'" style="display: inline-block;"><a class="btn btn-default">'+$(country_val).val()+
          '&nbsp;&nbsp;<span class="glyphicon glyphicon-remove"></span></div>').show();
            var div_id1 = '#countryA_'+ id;
            $(div_id1).on('click',function(){
              $(div_id1).remove();
              $(s.COUNTRY_A_CHECKS).prop('checked',false);
            });

      });
      $(s.COUNTRY_B_CHECKS).on('click',function(){
        var country_val = $(this);
        var id = $(country_val).prop('id');
        $(s.COUNTRY_CONTAINER).append('<div id="countryB_'+id+'"  value = "'+$(country_val).val()+'" style="display: inline-block;"><a class="btn btn-default">'+$(country_val).val()+
      '&nbsp;&nbsp;<span class="glyphicon glyphicon-remove"></span></div>').show();

        var div_id1 = '#countryB_'+ id;
        $(div_id1).on('click',function(){
          $(div_id1).remove();
          $(s.COUNTRY_B_CHECKS).prop('checked',false);
        });


  });

          //for Selecting all the years
          $(s.YEAR_SELECT).on('click',function(){
            $(s.YEAR_CHECKS).prop('checked', true);

            _.each($(s.YEAR_CHECKS),function(obj){
              var year_id = $(obj).prop('id');
              var year = $(obj).val()
              $(s.YEAR_CONTAINER).append('<div id="year_'+year_id+'" style="display: inline-block;"><a class="btn btn-default">'+year+
              '&nbsp;&nbsp;<span class="glyphicon glyphicon-remove"></span></div>').show();

              var div_id3 = '#year_'+year_id;
              $(div_id3).on('click',function(){
                $(div_id3).remove();
                var checkbox_id = '#'+year_id;
                $(checkbox_id).prop('checked',false);
              });
            });
          });
          //clearing all years
          $(s.YEAR_CLEAR).on('click',function(){
            $(s.YEAR_CHECKS).prop('checked', false);
            $(s.YEAR_CONTAINER).empty();
            $(s.DATA_OUTPUT).empty();
          });

          //for selecting years one by one and removing them using checkbox
          $(s.YEAR_CHECKS).on('click',function(){
            var year_val = $(this);

            if($(this).is(':checked')==false){
             var div_id = '#year_'+ $(this).val();
             $(div_id).remove();
          }else{
            $(s.YEAR_CONTAINER).append('<div id="year_'+$(this).val()+'" style="display: inline-block;"><a class="btn btn-default">'+$(this).val()+
          '&nbsp;&nbsp;<span class="glyphicon glyphicon-remove"></span></div>').show();

          var div_id2 = '#year_'+$(year_val).prop('id');
            $(div_id2).on('click',function(){
              $(div_id2).remove();
              var checkbox_id = '#'+$(year_val).prop('id');
              $(checkbox_id).prop('checked',false);
            });
          }
          });
          });

          $(s.GETDATA).on('click',function(){
            var baseUrl = C.SERVICE_BASE_ADDRESS+"/v2/msd/resources/uid/";
            var countries = [];
            var years = [];
            var elements = [];
            var dataSet1 = [];
            self.dataSet = [];
            self.olap = {};


            $(s.DATA_DESC).html('<h3>Indicator&nbsp;:&nbsp;<div id="indic_name" style="display: inline-block;"></div></h3>'+
                '<h3>Unit&nbsp;:&nbsp;<div id="indic_unit" style="display: inline-block;"></div></h3>'+
                '<h3>Export Data &nbsp; : &nbsp; <div id="export_data" style="display: inline-block;"></div></h3>').show();


           $(s.DATA_OUTPUT).empty();

            _.each($(s.COUNTRY_CONTAINER).children(),function(obj){
              var country = obj.id.split('_');
              countries.push(country[1]);
            });
            //console.log(c_names)
            _.each($(s.YEAR_CONTAINER).children(),function(obj){
              var year = obj.id.split('_');
              years.push(year[1]);
            });


            _.each($(s.ELEMENT_CONTAINER).children(),function(obj){
              var element = obj.id.split('indic_');
              elements.push(element[1]);
            });


            var indicator = "INDICATOR_"+ elements[0];
            var dataUrl = baseUrl+indicator+"?language=EN";
            var id = 0;

            $.ajax({
              async: false,
              dataType: 'json',
              url: dataUrl,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res) {

                  _.each(countries,function(obj){
                    id = obj;
                    var dataVal1 = _.filter(res["data"],function(obj1){
                      return obj1[0] == obj;
                    });
                    _.each(years,function(obj2){
                      var dataVal2 = _.filter(dataVal1,function(obj3){
                        return obj3[3] == obj2;
                      });
                      if(dataVal2.length != 0) {
                        dataSet1.push(dataVal2[0]);
                      }
                    });
                  });
                  //console.log(res);

                 }
            });


            var title = dataSet1[0][7]+' - '+$(s.ELEMENT_CONTAINER).children().text()+ ' - '+ $(s.COUNTRY_CONTAINER).children().text();

            //console.log(dataSet1);
            var FX = { metadata:{ dsd:{ columns:[
              {"id" : "country","title" : {"EN" : "Country Code"},key:true},
              {"id" : "Unit_Id","title" : {"EN" : "Unit Code"},key:true},
              {"id" : "value","title" : {"EN" : "Data Value"},subject:"value",dataType:"number"},
              {"id" : "Year","title" : {"EN" : "Year"},key:true,subject:"time"},
              {"id" : "Structure_Id","title":{"EN" : "Indicator Classification"}},
              {"id" : "country_EN","title" : {"EN" : "Country"}},
              {"id" : "Unit_EN","title" : {"EN" : "Unit"}},
              {"id" : "Indicator_EN","title" : {"EN" : "Indicator Name"}}]}},
              "data" : dataSet1};
          var config={ rows :["country","country_EN","Unit_Id","Unit_EN","Structure_Id","Indicator_EN","Year","value"],aggregationFn:{value:"sum"},formatter:"localstring", decimals:1, showRowHeaders:true, model:FX, el:$(s.DATA_OUTPUT) };
          var chart_config = {
                                series :["country_EN","Indicator_EN","Unit_EN"],
                                x :["Year"],
                                aggregations:["Indicator_EN"],
                                y:["value"],
                                aggregationFn:{value:"sum"},
                                formatter:"value",
                                decimals:1,
                                model:FX,
                                el:$(s.GRAPH),
                                type:"line"
                                //config :{"http://api.highcharts.com/highcharts"}
                              };

                if(dataSet1.length != 0){
                  $('#indic_name').html('<label>'+dataSet1[0][7]+'-'+$(s.ELEMENT_CONTAINER).children().text()+'</label>').show();
                  $('#indic_unit').html('<label>'+dataSet1[0][6]+'</label>').show();
                  $('#export_data').html('<div id="csv" style="display: inline-block;"><a class="btn btn-info">CSV'+
                '</div><div id="excel" style="display: inline-block;"><a class="btn btn-info">EXCEL</div>').show();

                  self.chart = new Chart(chart_config);
                  self.olap = new Table(config);
                  $(s.GRAPH_TITLE).html(title).show();
                  $(s.GRAPH_OPTIONS).html('<select id="graphOptions" class="form-control"><option value="line">Line</option>'+
                  '<option value="column">Column</option><option value="column_stacked">Column Stacked</option>'+
                  '<option value="area">Area</option><option value="area_stacked">Area Stacked</option>'+
                  '<option value="scatter">Scatter</option>'+
                  '<option value="boxplot">Box Plot</option><select></div>').show();

                  /*$(s.DATA_OUTPUT).append('<tr><th class="col-md-2">Country Code</th><th class="col-md-3">Country'+
                  '</th><th class="col-md-1">Year</th><th class="col-md-1">Unit Id</th>'+
                  '<th class="col-md-2">Unit</th><th class="col-md-3">Data Value</th></tr>').show();

                  _.each(dataSet1,function(obj){
                  //  console.log(obj);
                        $(s.DATA_OUTPUT).append('<tr><td>'+obj[0]+'</td>'+
                        '<td>'+obj[5]+'</td><td>'+obj[3]+
                        '</td><td>'+obj[1]+'</td><td>'+obj[6]+
                        '</td><td>'+obj[2].toFixed(1)+'</td></tr>').show();
                  });*/
                  $('#graphOptions').on('change',function(){
                    chart_config.type = $(this).val();
                    console.log($(this).val());
                    self.chart = new Chart(chart_config);
                  });

                }else{
                  $(s.DATA_OUTPUT).append('<tr><th class="col-md-2">Country Code</th><th class="col-md-3">Country'+
                  '</th><th class="col-md-1">Year</th><th class="col-md-1">Unit Id</th>'+
                  '<th class="col-md-2">Unit</th><th class="col-md-3">Data Value</th></tr>'+
                  '<tr><td></td><td colspan="10"><h2 style="font-size: 15px;text-align: center;font-weight:normal;">Sorry  the requested data is not available</h2></td></tr>').show();
                  $(s.GRAPH).html('<h2 style="font-size: 15px;text-align: center;font-weight:normal;">Sorry  the requested data is not available</h2>').show();
                }
          });
        },

        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },

        initialize: function(params){
            var subDomainList_url= C.SERVICE_BASE_ADDRESS+"/v2/msd/resources/data/uid/ESCAP_INDICATOR_STRUCTURE?language=EN";
            var countries_url=C.SERVICE_BASE_ADDRESS+"/v2/msd/resources/data/uid/ESCAP_COUNTRIES?language=EN";
            var self = this
            var domainList = {};
            var subDomainItems = {};
            var subDomainItemsSorted = {};
            var subDomains ={};
            var countryList_1 ={};
            var countryList_2 ={};
            var object = {};
            var year = {};
            var Year =[];
            var images = [];
            var num = _.range(10,170,10);

            View.prototype.initialize.call(this, arguments);

            $.extend(true, this, params);
            self.DomainList = {};
            self.subDomains = {};
            self.subDomainItems ={};
            self.subDomainItemsSorted = [];
            self.countryList={};
            self.year = [];
            self.ims = images;
            //self.domain = [];

            _.each(num,function(n){
                var im = "src/images/escap/"+n+".png";
                var ref = "#collapse"+n;
                images.push({"im":im,
                            "ref":ref});
            });

            $.ajax({
                async: false,
                dataType: 'json',
                url: subDomainList_url,
                contentType: "application/json; charset=utf-8",
                type: 'get',
                success:function(res) {
                   //console.log(res);
                   domainList = _.groupBy(res,function(obj){
                     return obj.code;
                   });

                   subDomainItems = _.each(domainList,function(obj){
                     obj[0]["children"] = _.sortBy(obj[0]["children"],function(obj1){
                       obj1["children"] = _.sortBy(obj1["children"],function(obj2){
                         return obj2.code;
                       });
                       return obj1.code;
                     });
                   });

                   self.subDomainItemsSorted = subDomainItems;
                }
            });


            $.ajax({
              async: false,
              dataType: 'json',
              url: countries_url,
              contentType: "application/json; charset=utf-8",
              type: 'get',
              success:function(res){
                countryList_1 = res.splice(1,1);


                //console.log('Countries_1', res);
                res.splice(5,0,countryList_1);

                //self.countryList = res;
                //console.log('Countries_1', res);
                self.countryList = _.each(res,function(obj){
                   if(obj["children"]){
                     object =  _.sortBy(obj["children"],function(obj1){
                           return obj1.title["EN"];
                       });
                     obj["children"] = object;
                   }else{
                     var val8 = obj[0]["children"].splice(1,1);
                     var val7 = obj[0]["children"].splice(1,1);
                     var val6 = obj[0]["children"].splice(1,1);
                     var val5 = obj[0]["children"].splice(1,1);
                     var val4 = obj[0]["children"].splice(1,1);
                     var val3 = obj[0]["children"].splice(1,1);
                     var val2 = obj[0]["children"].splice(1,1);
                     var val1 = obj[0]["children"].splice(1,1);
                     var val9 = obj[0]["children"];

                     val4.splice(1,0,val3);
                     val4.splice(2,0,val5);
                     val4.splice(3,0,val1);
                     val4.splice(4,0,val2);
                     val4.splice(5,0,val6);
                     val4.splice(6,0,val7);
                     val4.splice(7,0,val8);
                     val4.splice(8,0,val9);

                     obj[0]["children"] = val4;
                   }

                  });
                //console.log(self.countryList);
              }
            });


            _.each(_.range(1990,2017),function(obj){
             Year.push({"Year" : obj});
           });

           self.year = Year.reverse();
           //console.log('Year:',self.year);
        }

    });

    return DataView;
});
