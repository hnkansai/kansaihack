/*

Comments schema

*/

import Users from 'meteor/vulcan:users';
import marked from 'marked';
import { Utils } from 'meteor/vulcan:core';

/**
 * @summary Comments schema
 * @type {Object}
 */
const schema = {
  /**
    ID
  */
  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  /**
    The timestamp of meetup creation
  */
  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['admins'],
    onInsert: (document, currentUser) => {
      return new Date();
    }
  },
  
  name: {
    type: String,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    description: `The name of the meetup`,
  },

  url: {
    type: String,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  image: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  description: {
    type: String,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'textarea'
  },

  slug: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (meetup) => {
      return Utils.slugify(meetup.name);
    },
    onEdit: (modifier, post) => {
      if (modifier.$set.name) {
        return Utils.slugify(modifier.$set.name);
      }
    }
  },

  // GraphQL only fields

  pageUrl: {
    type: String,
    optional: true,
    resolveAs: {
      fieldName: 'pageUrl',
      type: 'String',
      resolver: (meetup, args, context) => {
        return context.Meetups.getPageUrl(meetup, true);
      },
    }  
  },
};

export default schema;
