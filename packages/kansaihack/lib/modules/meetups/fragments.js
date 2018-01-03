import { registerFragment } from 'meteor/vulcan:core';

// ----------------------------- Comments ------------------------------ //

registerFragment(`
  fragment MeetupFragment on Meetup {
    name
    description
    url
  }
`);

