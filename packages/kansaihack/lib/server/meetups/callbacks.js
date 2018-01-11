import { debug, addCallback, getSetting } from 'meteor/vulcan:core';
import Meetup from 'meetup-api';
import Bluebird from 'bluebird';

const meetupAPIKey = getSetting('meetup.apiKey');
const meetup = Meetup({ key: meetupAPIKey });
const meetupAsync = Bluebird.promisifyAll(meetup);

async function addMeetupInfoOnNewMeetup (meetup, currentUser) {
  const { meetupUrlName } = meetup;

  debug(`// Fetching data for new meetup ${meetupUrlName}…`);

  const meetupData = await meetupAsync.getGroupAsync({ urlname: meetupUrlName });

  meetup = {
    ...meetup,
    name: meetupData.name,
    description: meetupData.description,
    city: meetupData.city,
    membersCount: meetupData.members,
    meetupCategory: meetupData.category.name,
  }

  if (meetupData.group_photo) {
    meetup.logo = {
      large: meetupData.group_photo.highres_link,
      medium: meetupData.group_photo.photo_link,
      small: meetupData.group_photo.thumb_link,
    };
  }

  if (meetupData.key_photo) {
    meetup.photo = {
      large: meetupData.key_photo.highres_link,
      medium: meetupData.key_photo.photo_link,
      small: meetupData.key_photo.thumb_link,
    };
  }

  return meetup;
}

addCallback('meetups.new.before', addMeetupInfoOnNewMeetup);

async function addMeetupInfoOnEditMeetup (modifier, meetup, currentUser) {
  // if (modifier.$set && modifier.$set.meetupUrlName && modifier.$set.meetupUrlName !== meetup.meetupUrlName) {
    const { meetupUrlName } = modifier.$set;

    debug(`// Fetching data for modified meetup ${meetupUrlName}…`);
    
    const meetupData = await meetupAsync.getGroupAsync({ urlname: meetupUrlName });

    modifier.$set = {
      ...modifier.$set,
      name: meetupData.name,
      description: meetupData.description,
      city: meetupData.city,
      membersCount: meetupData.members,
      meetupCategory: meetupData.category.name,
    }

    if (meetupData.group_photo) {
      modifier.$set.logo = {
        large: meetupData.group_photo.highres_link,
        medium: meetupData.group_photo.photo_link,
        small: meetupData.group_photo.thumb_link,
      };
    }

    if (meetupData.key_photo) {
      modifier.$set.photo = {
        large: meetupData.key_photo.highres_link,
        medium: meetupData.key_photo.photo_link,
        small: meetupData.key_photo.thumb_link,
      };
    }
  // }

  return modifier;
}

addCallback('meetups.edit.before', addMeetupInfoOnEditMeetup);