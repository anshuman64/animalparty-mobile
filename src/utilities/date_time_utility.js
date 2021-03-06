//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

const MONTH_NAMES = ["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const SHORT_MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const SHORT_DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Prettifies date-time format on messages
export const renderMessageDate = (date) => {
  let todayDate    = new Date();               // current date-time
  let creationDate = new Date(date);           // creation date-time
  let diff         = todayDate - creationDate; // time difference in milliseconds
  let minsDiff     = diff / (1000 * 60);       // time difference in minutes
  let hoursDiff    = minsDiff / 60;            // time difference in hours
  let daysDiff     = hoursDiff / 24;           // time difference in days

  let hour = creationDate.getHours();
  let mins = (creationDate.getMinutes() < 10 ? '0' : '') + creationDate.getMinutes();
  let m    = ' AM';

  if (hour === 0) {         // If creationDate is at 00:xx, change to 12:xx
    hour = 12;
  } else if (hour === 12) {  // If creationDate is after noon, change to 12:xx PM
    m    = ' PM';
  } else if (hour > 12) {  // If creationDate is after noon, change to 1:xx PM
    m    = ' PM';
    hour = hour % 12;
  }

  if (todayDate.getDate() - creationDate.getDate() < 1 && daysDiff < 1) {
    // If creationDate was some time today, return the time
    return hour + ':' + mins + m;
  } else if (daysDiff < 7) {
    // If creationDate was some time this week, return the day and time
    return SHORT_DAY_NAMES[creationDate.getDay()] + ' ' + hour + ':' + mins + m;
  } else if (todayDate.getFullYear() - creationDate.getFullYear() < 1) {
    // If creationDate was some time this year, return month, date, and time
    return SHORT_MONTH_NAMES[creationDate.getMonth()] + ' ' + creationDate.getDate() + ' at ' + hour + ':' + mins + m;
  } else {
    // Else, return month day, year and time
    return SHORT_MONTH_NAMES[creationDate.getMonth()] + ' ' + creationDate.getDate() + ', ' + creationDate.getFullYear() + ' at ' + hour + ':' + mins + m;
  }
};


// Prettifies date-time format on ConvserationListItem
export const renderConversationDate = (date) => {
  let todayDate    = new Date();               // current date-time
  let creationDate = new Date(date);           // creation date-time
  let diff         = todayDate - creationDate; // time difference in milliseconds
  let minsDiff     = diff / (1000 * 60);       // time difference in minutes
  let hoursDiff    = minsDiff / 60;            // time difference in hours
  let daysDiff     = hoursDiff / 24;           // time difference in days

  let hour = creationDate.getHours();
  let mins = (creationDate.getMinutes() < 10 ? '0' : '') + creationDate.getMinutes();
  let m    = ' AM';

  if (hour === 0) {         // If creationDate is at 00:xx, change to 12:xx
    hour = 12;
  } else if (hour === 12) {  // If creationDate is after noon, change to 12:xx PM
    m    = ' PM';
  } else if (hour > 12) {  // If creationDate is after noon, change to 1:xx PM
    m    = ' PM';
    hour = hour % 12;
  }

  if (todayDate.getDate() - creationDate.getDate() < 1 && daysDiff < 1) {
    // If creationDate was some time today, return the time
    return hour + ':' + mins + m;
  } else if (daysDiff < 7) {
    // If creationDate was some time this week, return the day
    return SHORT_DAY_NAMES[creationDate.getDay()];
  } else if (todayDate.getFullYear() - creationDate.getFullYear() < 1) {
    // If creationDate was some time this year, return month and date
    return SHORT_MONTH_NAMES[creationDate.getMonth()] + ' ' + creationDate.getDate();
  } else {
    // Else, return month, date, year
    return SHORT_MONTH_NAMES[creationDate.getMonth()] + ' ' + creationDate.getDate() + ', ' + creationDate.getFullYear();
  }
};
