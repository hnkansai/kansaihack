/*

Meetups helpers

*/

import { Meetups } from './index.js';
import { Utils } from 'meteor/vulcan:core';

//////////////////
// Link Helpers //
//////////////////

/**
 * @summary Get URL of a comment page.
 * @param {Object} comment
 */
Meetups.getPageUrl = function(meetup, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0,-1) : '';
  return `${prefix}/meetups/${meetup._id}/${meetup.slug}`;
};
