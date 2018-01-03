import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'meetups.dashboard',     path: '/admin/meetups',                    componentName: 'MeetupsDashboard'}, // index route
  {name:'events.dashboard',     path: '/admin/events',                    componentName: 'EventsDashboard'}, // index route
  //???

  {name:'posts.list',     path: '/',                    componentName: 'PostsHome'}, // index route
  {name:'posts.daily',    path:'daily',                 componentName: 'PostsDaily'},
  {name:'posts.single',   path:'posts/:_id(/:slug)',    componentName: 'PostsSingle'},
  {name:'users.single',   path:'users/:slug',           componentName: 'UsersSingle'},
  {name:'users.account',  path:'account',               componentName: 'UsersAccount'},
  {name:'users.edit',     path:'users/:slug/edit',      componentName: 'UsersAccount'},
]);
