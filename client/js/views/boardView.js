
Neapolitan.BoardView = Backbone.Marionette.itemView({
  template: "templates/board"
});

Neapolitan.RowView = Backbone.Marionette.CollectionView.extend({
  itemView: Neapolitan.AlertView,
  emptyView: Neapolitan.SaveView
});
]

Neapolitan.SquareView = Backbone.Marionette.ItemView.extend({
  template: "templates/square",
  events: {
    'drag img': 'onDrag'
  },

  initialize: function(){

  },

  onDrag: function(event){
    console.log('im being draggeeeddd');
  }
});

