Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

Router.map(function() {
    this.route('hello', { path: '/' });
    this.route('monster_list', { path: '/monsters' });
    this.route('monster', { path: '/monster/:id' });
    this.route('type_list', { path: '/types' });
    this.route('type', { path: '/type/:id' });
    
});