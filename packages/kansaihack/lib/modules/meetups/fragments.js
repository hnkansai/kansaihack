import { registerFragment } from 'meteor/vulcan:core';

// ----------------------------- Comments ------------------------------ //

registerFragment(`
  fragment MeetupFragment on Meetup {
    _id
    name
    description
    url
  }
`);

