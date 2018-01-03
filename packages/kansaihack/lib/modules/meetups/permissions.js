/*

Meetups permissions

*/

import Users from 'meteor/vulcan:users';

const guestsActions = [
  'meetups.view'
];
Users.groups.guests.can(guestsActions);

const membersActions = [
  'meetups.view',
  'meetups.new', 
  'meetups.edit.own', 
  'meetups.remove.own', 
  'meetups.upvote', 
  'meetups.cancelUpvote', 
  'meetups.downvote',
  'meetups.cancelDownvote'
];
Users.groups.members.can(membersActions);

const adminActions = [
  'meetups.edit.all',
  'meetups.remove.all'
];
Users.groups.admins.can(adminActions);