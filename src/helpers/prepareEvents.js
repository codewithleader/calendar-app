// This function is for preparing events for calendar. Specifically, it is for the properties end and start.

import dayjs from 'dayjs';

export const prepareEvents = (events = []) => {
  return events.map(
    event => ({
      ...event,
      start: dayjs(event.start).toDate(),
      end: dayjs(event.end).toDate(),
    })
  );
};

// Suggestion for GitHub Copilot:
// export const prepareEvents = (events = []) => {
//   return events.map(event => {
//     return {
//       ...event,
//       start: new Date(event.start),
//       end: new Date(event.end),
//     };
//   });
// };
