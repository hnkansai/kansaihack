import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import compose from 'recompose/compose';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';

import { Meetups } from '../../modules/meetups/collection.js';

const MeetupsDashboard = () => (
  <div className="meetups-dashboard">
    <h3>
      Meetups
    </h3>

    <Components.Datatable
      collection={Meetups}
      options={{
        fragmentName: 'MeetupFragment',
      }}
      columns={[
        'meetupUrlName',
        'name', 
        'city',
        'description',
        'url',
        'logo',
        'photo',
        'membersCount',
        'meetupCategory',
      ]}
      showNew={true}
      showEdit={true}
    />
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/sign-up'
}
registerComponent('MeetupsDashboard', MeetupsDashboard, [withAccess, accessOptions]);

// export default RoomsDashboard;
