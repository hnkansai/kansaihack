/*

Events permissions

*/

import Users from 'meteor/vulcan:users';

const guestsActions = [
  'events.view'
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  'events.view',
  'events.new', 
  'events.edit.own', 
  'events.remove.own', 
  'events.upvote', 
  'events.cancelUpvote', 
  'events.downvote',
  'events.cancelDownvote'
];
Users.groups.members.can(membersActions);

const adminActions = [
  'events.edit.all',
  'events.remove.all'
];
Users.groups.admins.can(adminActions);