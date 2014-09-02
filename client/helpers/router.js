Router.configure({
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  layoutTemplate: 'layout',
});

Router.map(function() {
    this.route('hello', { 
      path: '/', 
      template: 'hello',
      waitOn: function () {
        return Meteor.subscribe('creatures');
      } 
    });
    this.route('monster_list', { 
      path: '/monsters',
      waitOn: function () { 
        return Meteor.subscribe('creatures');
      } 
    });
    this.route('new_monster', { 
      path: '/new/monster', 
      waitOn: function() {
        return Meteor.subscribe('types');
      }
    });
    this.route('monster', { 
      path: '/monster/:_id',
      template: 'monster_show',
      data: function() {
        return Creatures.findOne({_id: this.params._id });
      }, waitOn: function () {
        return Meteor.subscribe('creature', this.params._id);
      }
    });
    this.route('type_list', { 
      path: '/types',
      waitOn: function () {
        console.log(Router);
        return Meteor.subscribe('types');
      }
    });
    this.route('type', { 
      path: '/type/:_id',
      data: function() {
        return Types.findOne({ _id: this.params._id });
      },
      waitOn: function () {
        return Meteor.subscribe('type', this.params._id);
      }
    });
    this.route('type_edit', {
      path: '/edit/type/:_id',
      data: function() {
        return Types.findOne({ _id: this.params._id });
      }, 
      waitOn: function() {
        return Meteor.subscribe('type', this.params._id); //TODO single type
      }
    });
    this.route('new_type', {
      path: '/new/type',
      template: 'type_edit'
    });
    this.route('documentation', {
      path: '/documentation'
    });
});