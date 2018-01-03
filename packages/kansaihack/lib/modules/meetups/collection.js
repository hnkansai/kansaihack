/*

Comments collection

*/

import schema from './schema.js';
import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/**
 * @summary The global namespace for Comments.
 * @namespace Comments
 */
 export const Meetups = createCollection({

   collectionName: 'Meetups',

   typeName: 'Meetup',

   schema,

   resolvers: getDefaultResolvers('Meetups'),

   mutations: getDefaultMutations('Meetups'),

});

Meetups.checkAccess = (currentUser, meetup) => {
  // all meetups are public for now
  return true
}