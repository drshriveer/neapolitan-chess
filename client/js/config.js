require.config({

  deps: ["main"],

  paths : {
    backbone : 'libs/backbone/backbone-min',
    underscore : 'libs/underscore/underscore-min',
    jquery : 'libs/jquery/jquery.min',
    marionette : 'libs/marionette/lib/backbone.marionette.min',
    handlebars: 'libs/hbs/Handlebars',
    hbs: 'libs/hbs/hbs',
    i18nprecompile: 'libs/hbs/hbs/i18nprecompile',
    json2: 'libs/hbs/hbs/json2',
    jqueryui: 'libs/jqueryui/ui/jquery-ui'
  },

  shim : {
    jquery : {
      exports : '$'
    },
    underscore : {
      exports : '_'
    },
    backbone : {
      deps : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    marionette : {
      deps : ['jquery', 'underscore', 'backbone'],
      exports : 'Marionette'
    },
    hbs: {
      deps: ['handlebars', 'json2', 'i18nprecompile'],
      exports: "hbs"
    }

  },

  hbs: {
    disableI18n: true,
    disableHelpers: true,
    helperPathCallback: function (name) {       // ('/template/helpers/'+name by default)
        return 'cs!' + name;
      },
    templateExtension: "hbs"
  }


})