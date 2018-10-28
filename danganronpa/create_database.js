// Node.js + Express server backend for petsapp
// v2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// COGS121 by Philip Guo
// https://github.com/pgbovine/COGS121

// run this once to create the initial database as the pets.db file
//   node create_database.js

// to clear the database, simply delete the pets.db file:
//   rm pets.db

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('danganronpa.db');

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database table:
  // db.run("CREATE TABLE users_to_pets (name TEXT, job TEXT, pet TEXT)");
     // store status as 0 (false), and 1 (true)
  db.run("CREATE TABLE triggerhappy (emp_num INTEGER, last_name TEXT, first_name TEXT, job TEXT, status INTEGER, picture TEXT)");

  // insert 3 rows of data:
  db.run("INSERT INTO triggerhappy VALUES (1, 'Maizono', 'Sayaka', 'super duper idol', 1, 'sayaka.jpg')");
  db.run("INSERT INTO triggerhappy VALUES (2, 'Enoshima', 'Junko', 'super duper supermodel', 1, 'junko.jpg')");
  db.run("INSERT INTO triggerhappy VALUES (3, 'Nanami', 'Chiaki', 'super duper gamer', 1, 'chiaki.jpg')");

  console.log('successfully created the triggerhappy table in danganronpa.db');

  // print them out to confirm their contents:
  db.each("SELECT emp_num, last_name, first_name, job, status, picture FROM triggerhappy", (err, row) => {
      console.log(row.emp_num + ' - ' + row.last_name + " = " + row.first_name + ' - ' + row.job + ' - ' + row.status + ' - ' + row.picture);
  });
});

db.close();
