import { addCallback, getSetting } from 'meteor/vulcan:core';
import Meetup from 'meetup-api';

const meetupAPIKey = getSetting('meetup.apiKey');
const meetup = Meetup({ key: meetupAPIKey });

async function addMeetupInfoOnNewMeetup (meetup, currentUser) {
  const { meetupUrlName } = meetup;

  debug(`// Fetching data for new meetup ${meetupUrlName}…`);

  const meetupData = await getMeetupData(meetupUrlName);

  meetup = {
    ...meetup,
    name: meetupData.name,
    description: meetupData.description,
    city: meetupData.city,
    membersCount: meetupData.members,
    photo: {
      large: meetupData.group_photo.highres_link,
      medium: meetupData.group_photo.photo_link,
      small: meetupData.group_photo.thumb_link,
    },
    meetupCategory: meetupData.category.name,
  }

  return meetup;
}

addCallback('meetups.new.before', addMeetupInfoOnNewMeetup);

async function addMeetupInfoOnEditMeetup (modifier, meetup, currentUser) {
  if (modifier.$set && modifier.$set.meetupUrlName && modifier.$set.meetupUrlName !== meetup.meetupUrlName) {
    const { meetupUrlName } = modifier.$set.meetupUrlName;

    debug(`// Fetching data for modified meetup ${meetupUrlName}…`);
    
    const meetupData = await getMeetupData(meetupUrlName);

    modifier.$set = {
      ...modifier.$set,
      name: meetupData.name,
      description: meetupData.description,
      city: meetupData.city,
      membersCount: meetupData.members,
      photo: {
        large: meetupData.group_photo.highres_link,
        medium: meetupData.group_photo.photo_link,
        small: meetupData.group_photo.thumb_link,
      },
      meetupCategory: meetupData.category.name,
    }
  }

  return modifier;
}

addCallback('meetups.edit.before', addMeetupInfoOnEditMeetup);