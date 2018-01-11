import { debug, getSetting } from 'meteor/vulcan:core';
import { Meetups } from '../../modules/meetups/';
import { Events } from '../../modules/events/';
import Meetup from 'meetup-api';

const meetupAPIKey = getSetting('meetup.apiKey');
const meetup = Meetup({ key: meetupAPIKey });

export const insertAllEvents = async () => {

  // get all meetups from Meetup.com API
  const meetups = Meetups.find().fetch();

  debug(`// Fetching events for ${meetups.length} meetup groups…`);
  
  meetups.forEach(meetup => {
    const events = fetchAndInsertEvents(meetup); 
  });

  debug(`// Done fetching events for ${meetups.length} meetup groups`);
  
  return events;
}

export const fetchAndInsertEvents = async (meetup) => {

  const { meetupUrlName, meetupId } = meetup;

  debug(`// Fetching events for group ${meetupUrlName}`);

  // get all events for the meetup from Meetup.com API
  const events = getEvents(meetupUrlName);

  // only keep upcoming and public events
  const upcomingEvents = events.filter(...)

  events.forEach(event => {

    // find out if event already exists in our database
    const e = Events.findOne({ meetupEventId: event.id });

    // if not, insert it
    if (!e) {
      
      const newEvent = {
        meetupId: meetupId,
        meetupEventId: event.id,
        name: event.name,
        time: new Date(event.time),
        localDate: event.local_date,
        localTime: event.local_time,
        venue: event.venue,
        url: event.link,
        description: event.description,
      }

      debug(`// Inserting event ${newEvent.name} happening on ${newEvent.time}`);

      await newMutation({
        Events,
        document: newEvent, 
        validate: false,
      });

    }
  });

  return events;
}