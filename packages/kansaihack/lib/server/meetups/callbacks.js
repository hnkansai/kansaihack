import { addCallback, getSetting } from 'meteor/vulcan:core';
import BluebirdPromise from 'bluebird';
import Meetup from 'meetup-api';
BluebirdPromise.promisifyAll(Meetup);

const meetupAPIKey = getSetting('meetup.apiKey');
const meetup = Meetup({ key: meetupAPIKey });

async function addMeetupInfoOnNewMeetup (meetup, currentUser) {
  const { meetupUrlName } = meetup;

  const meetupData = await getMeetupData(meetupUrlName);

  meetup = {
    ...meetup,
    name: meetupData.name,
    description: meetupData.description,
    city: meetupData.city,
    membersCount: meetupData.members,
    logo: {
      large: meetupData.group_photo.highres_link,
      medium: meetupData.group_photo.photo_link,
      small: meetupData.group_photo.thumb_link,
    },
    photo: {
      large: meetupData.key_photo.highres_link,
      medium: meetupData.key_photo.photo_link,
      small: meetupData.key_photo.thumb_link,
    },
    meetupCategory: meetupData.category.name,
  }

  return meetup;
}

addCallback('meetups.new.before', addMeetupInfoOnNewMeetup);

async function addMeetupInfoOnEditMeetup (modifier, meetup, currentUser) {
  if (modifier.$set && modifier.$set.meetupUrlName && modifier.$set.meetupUrlName !== meetup.meetupUrlName) {
    const { meetupUrlName } = modifier.$set.meetupUrlName;

    const meetupData = await getMeetupData(meetupUrlName);

    modifier.$set = {
      ...modifier.$set,
      name: meetupData.name,
      description: meetupData.description,
      city: meetupData.city,
      membersCount: meetupData.members,
      logo: {
        large: meetupData.group_photo.highres_link,
        medium: meetupData.group_photo.photo_link,
        small: meetupData.group_photo.thumb_link,
      },
      photo: {
        large: meetupData.key_photo.highres_link,
        medium: meetupData.key_photo.photo_link,
        small: meetupData.key_photo.thumb_link,
      },
      meetupCategory: meetupData.category.name,
    }
  }

  return modifier;
}

addCallback('meetups.edit.before', addMeetupInfoOnEditMeetup);