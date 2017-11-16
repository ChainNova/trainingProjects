// lazyload config

angular.module('app')
/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
    .constant('JQ_CONFIG', {
        easyPieChart:   ['../bower_components/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
        sparkline:      ['../bower_components/jquery/charts/sparkline/jquery.sparkline.min.js'],
        plot:           ['../bower_components/jquery/charts/flot/jquery.flot.min.js',
            '../bower_components/jquery/charts/flot/jquery.flot.resize.js',
            '../bower_components/jquery/charts/flot/jquery.flot.tooltip.min.js',
            '../bower_components/jquery/charts/flot/jquery.flot.spline.js',
            '../bower_components/jquery/charts/flot/jquery.flot.orderBars.js',
            '../bower_components/jquery/charts/flot/jquery.flot.pie.min.js'],
        slimScroll:     ['../bower_components/jquery/slimscroll/jquery.slimscroll.min.js'],
        sortable:       ['../bower_components/jquery/sortable/jquery.sortable.js'],
        nestable:       ['../bower_components/jquery/nestable/jquery.nestable.js',
            '../bower_components/jquery/nestable/nestable.css'],
        filestyle:      ['../bower_components/jquery/file/bootstrap-filestyle.min.js'],
        slider:         ['../bower_components/jquery/slider/bootstrap-slider.js',
            '../bower_components/jquery/slider/slider.css'],
        chosen:         ['../bower_components/jquery/chosen/chosen.jquery.min.js',
            '../bower_components/jquery/chosen/chosen.css'],
        TouchSpin:      ['../bower_components/jquery/spinner/jquery.bootstrap-touchspin.min.js',
            '../bower_components/jquery/spinner/jquery.bootstrap-touchspin.css'],
        wysiwyg:        ['../bower_components/jquery/wysiwyg/bootstrap-wysiwyg.js',
            '../bower_components/jquery/wysiwyg/jquery.hotkeys.js'],
        dataTable:      ['../bower_components/jquery/datatables/jquery.dataTables.min.js',
            '../bower_components/jquery/datatables/dataTables.bootstrap.js',
            '../bower_components/jquery/datatables/dataTables.bootstrap.css'],
        vectorMap:      ['../bower_components/jquery/jvectormap/jquery-jvectormap.min.js',
            '../bower_components/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
            '../bower_components/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
            '../bower_components/jquery/jvectormap/jquery-jvectormap.css'],
        footable:       ['../bower_components/jquery/footable/footable.all.min.js',
            '../bower_components/jquery/footable/footable.core.css']
    }
)
    // oclazyload config
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        // We configure ocLazyLoad to use the lib script.js as the async loader
        $ocLazyLoadProvider.config({
            debug:  false,
            events: true,
            modules: [
                {
                    name: 'smart-table',
                    files: [
                        '../bower_components/angular-smart-table/dist/smart-table.js',
                        '../bower_components/angular-smart-table/dist/smart-table.min.js'
                    ]
                },
                {
                    name: 'ngGrid',
                    files: [
                            '../bower_components/ng-grid/build/ng-grid.min.js',
                            '../bower_components/ng-grid/ng-grid.css'
                    ]
                },
                {
                    name: 'ui.select',
                    files: [
                        '../bower_components/angular-ui-select/select.min.js',
                        '../bower_components/angular-ui-select/select.min.css'
                    ]
                },
                {
                    name:'angularFileUpload',
                    files: [
                        '../bower_components/angular-file-upload/angular-file-upload.min.js'
                    ]
                },
                {
                    name:'ui.calendar',
                    files: ['../bower_components/angular-ui-calendar/calendar.js']
                },
                {
                    name: 'ngImgCrop',
                    files: [
                        '../bower_components/ngImgCrop/ng-img-crop.js',
                        '../bower_components/ngImgCrop/ng-img-crop.css'
                    ]
                },
                {
                    name: 'angularBootstrapNavTree',
                    files: [
                        '../bower_components/angular-bootstrap-nav-tree/abn_tree_directive.js',
                        '../bower_components/angular-bootstrap-nav-tree/abn_tree.css'
                    ]
                },
                {
                    name: 'toaster',
                    files: [
                        '../bower_components/angularjs-toaster/toaster.js',
                        '../bower_components/angularjs-toaster/toaster.css'
                    ]
                },
                {
                    name: 'textAngular',
                    files: [
                        '../bower_components/textAngular/textAngular-sanitize.min.js',
                        '../bower_components/textAngular/textAngular.min.js'
                    ]
                },
                {
                    name: 'vr.directives.slider',
                    files: [
                        '../bower_components/angular-slider/angular-slider.min.js',
                        '../bower_components/angular-slider/angular-slider.css'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular',
                    files: [
                        '../bower_components/videogular/videogular.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.controls',
                    files: [
                        '../bower_components/videogular/plugins/controls.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.buffering',
                    files: [
                        '../bower_components/videogular/plugins/buffering.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.overlayplay',
                    files: [
                        '../bower_components/videogular/plugins/overlay-play.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.poster',
                    files: [
                        '../bower_components/videogular/plugins/poster.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.imaads',
                    files: [
                        '../bower_components/videogular/plugins/ima-ads.min.js'
                    ]
                }
            ]
        });
    }])
;