import { registerFragment } from 'meteor/vulcan:core';

// ----------------------------- Comments ------------------------------ //

registerFragment(`
  fragment EventFragment on Event {
    _id
    name
    description
    url
  }
`);

