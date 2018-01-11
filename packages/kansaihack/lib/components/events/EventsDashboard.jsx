import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import compose from 'recompose/compose';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';

import { Events } from '../../modules/events/collection.js';

const EventMeetupEventId = ({ document }) => <a href={`https://www.meetup.com/${document.meetupUrlName}/events/${document.meetupEventId}/`} target="_blank">{document.name}</a>

const EventDescription = ({ document }) => <div dangerouslySetInnerHTML={{ __html: document.description }} />

const EventsDashboard = () => (
  <div className="events-dashboard">
    <h3>
      Events
    </h3>

    <Components.Datatable
      collection={Events}
      options={{
        fragmentName: 'EventFragment',
      }}
      columns={[
        {
          name: 'name',
          component: EventMeetupEventId
        },
        {
          name: 'description',
          component: EventDescription,
        },
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
registerComponent('EventsDashboard', EventsDashboard, [withAccess, accessOptions]);
