import { registerFragment } from 'meteor/vulcan:core';

// ----------------------------- Comments ------------------------------ //

registerFragment(`
  fragment EventFragment on Event {
    name
    description
    url
  }
`);

