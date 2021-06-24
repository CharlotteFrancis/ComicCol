
// basic "Add to list" modal logic:

// 1: modal populates itself using parent object it was called from
// shows options for read status, rating, etc im

// im lazy to do number 1 LOL

// 2: when the user clicks on the confirm button create a comic object,
// query the comic db with a "findOne" to see if comic exists in our db

// 3: if comic exists, create ComicList object that points to the existing
// comic + the user id, with the rating and read status from the user.

// 3.1: if comic does not exist, post newly created comic to the db
// then make a ComicList object that points to the new comic and the user id
// with rating etc.
