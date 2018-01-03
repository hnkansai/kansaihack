/*

Events helpers

*/

import { Events } from './index.js';
import { Utils } from 'meteor/vulcan:core';

//////////////////
// Link Helpers //
//////////////////

/**
 * @summary Get URL of a comment page.
 * @param {Object} comment
 */
Events.getPageUrl = function(event, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';  //???
  return `${prefix}/events/${event._id}/${event.slug}`;
};
