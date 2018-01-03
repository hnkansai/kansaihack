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
 export const Events = createCollection({

   collectionName: 'Events',

   typeName: 'Event',

   schema,

   resolvers: getDefaultResolvers('Events'),

   mutations: getDefaultMutations('Events'),

});

Events.checkAccess = (currentUser, event) => {
  // all events are public for now
  return true
}