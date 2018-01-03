import { registerFragment } from 'meteor/vulcan:core';

// ------------------------------ Users ------------------------------ //

// note: fragment used by default on UsersProfile, PostsList & CommentsList fragments
registerFragment(`
  fragment UsersMinimumInfo on User {
    # vulcan:users
    _id
    slug
    username
    displayName
    emailHash
    avatarUrl
  }
`);

registerFragment(`
  fragment UsersProfile on User {
    # vulcan:users
    ...UsersMinimumInfo
    createdAt
    isAdmin
    bio
    htmlBio
    twitterUsername
    website
    groups
    # vulcan:comments
    commentCount
  }
`);

