const qs = require('qs');

// Syntax: value NOT BETWEEN low AND high;
//
// Or,
//
//   Syntax: value < low OR value > high;

const query = qs.stringify({
  filters: {
    id: {
      $notIn: [1],
    },
  },
}, {
  encodeValuesOnly: true, // prettify url
});

console.log(`{{BASE_URL}}/api/desks?${query}`)


// GET /api/users?filters[username][$eq]=John
