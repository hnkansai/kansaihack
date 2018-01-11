import { debug, getSetting, newMutator } from 'meteor/vulcan:core';
import { Meetups } from '../../modules/meetups/';
import { Events } from '../../modules/events/';
import Meetup from 'meetup-api';
import Bluebird from 'bluebird';

const meetupAPIKey = getSetting('meetup.apiKey');
const meetup = Meetup({ key: meetupAPIKey });
const meetupAsync = Bluebird.promisifyAll(meetup);

export const insertAllEvents = async () => {

  // get all meetups from Meetup.com API
  const meetups = Meetups.find().fetch();

  debug(`// Fetching events for ${meetups.length} meetup groups…`);
  
  meetups.forEach(meetup => {
    fetchAndInsertEvents(meetup); 
  });

  debug(`// Done fetching events for ${meetups.length} meetup groups`);
  
}

export const fetchAndInsertEvents = async (meetup) => {

  let count = 0;
  const { meetupUrlName, meetupId } = meetup;

  debug(`// Fetching events for group ${meetupUrlName}`);

  // TODO
  // get all events for the meetup from Meetup.com API
  const events = getEvents(meetupUrlName);

  // TODO
  // only keep upcoming and public events
  const upcomingEvents = events.filter(/*...*/);

  // cannot use forEach here
  // see https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
  for (let e of event) {

    // find out if event already exists in our database
    const existingEvent = Events.findOne({ meetupEventId: event.id });

    // if not, insert it
    if (!existingEvent) {
      
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

      debug(`// Inserting event ${newEvent.name} (happening on ${newEvent.time})`);

      const result = await newMutator({
        Events,
        document: newEvent, 
        validate: false,
      });

      count++;
    }
  }

  debug(`// Inserted ${count} new events for meetup group ${meetupUrlName}`);
  
  return events;
}