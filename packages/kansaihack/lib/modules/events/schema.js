/*

Events schema

*/

import Users from 'meteor/vulcan:users';
import marked from 'marked';
import { Utils } from 'meteor/vulcan:core';

/**
 * @summary Events schema
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
 
  meetupEventId: {
    type: String,
    viewableBy: ['guests'],
  },

  name: {
    type: String,
    viewableBy: ['guests'],
    // insertableBy: ['members'],
    // editableBy: ['members'],
    searchable: true,
  },

  url: {
    type: String,
    viewableBy: ['guests'],
    // insertableBy: ['members'],
    // editableBy: ['members'],
  },

  image: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    // insertableBy: ['members'],
    // editableBy: ['members'],
  },

  description: {
    type: String,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    // editableBy: ['members'],
    // control: 'textarea'
    searchable: true,
  },

  slug: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (event) => {
      return Utils.slugify(event.name);
    },
    onEdit: (modifier, post) => {
      if (modifier.$set.name) {
        return Utils.slugify(modifier.$set.name);
      }
    }
  },

  meetupId: {
    type: String,
    viewableBy: ['guests'],
    // insertableBy: ['members'],
    // editableBy: ['members'],
    resolveAs: {
      fieldName: 'meetup',
      type: 'Meetup',
      resolver: (event, args, context) => {
        return context.Meetups.loader.load(event.meetupId);
      },
      addOriginalField: true,
    },
    query: `
      MeetupsList{
        _id
        name
      }
    `,
    options: props => props.data.MeetupsList.map(meetup => ({
      value: meetup._id,
      label: meetup.name,
    })),
    control: 'select',
  },

  time: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'datetime',
  },

  // GraphQL only fields

  meetupUrlName: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: async (event, args, context) => {
        const meetup = await context.Meetups.loader.load(event.meetupId);
        return meetup.meetupUrlName;
      },
    }
  },

  pageUrl: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (event, args, context) => {
        return context.Events.getPageUrl(event, true);
      },
    }
  },
};

export default schema;
