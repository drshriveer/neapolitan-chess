define(['underscore', 'backbone','marionette', 'hbs!templates/landing'], function(_,Backbone, Marionette, templ){

  var LandingView = Backbone.Marionette.ItemView.extend({
    template: templ
  });

  return LandingView;
});

