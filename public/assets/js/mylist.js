// mylist.js logic

// needs to render the list from user's List.
// the actual thing we are rendering is the List's "ComicList" array.

// get the comic with a Comic.findOne using the comic id in ComicList.
// COVER || TITLE || ISSUE NUMBER || ISSUE NAME (if exists)

// get the last 2 pieces of data from ComicList
// SCORE(rating) || PROGRESS(read_status?)

// UPDATE button should only work with the ComicList object.
// put a data-id attriute on the button when rendering
// renders a user's list of comics
const renderItems = () => {
  axios.get('/api/users/getID', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(({data: userID}) => {
    axios.get(`/api/users/${userID}`)
    .then(({data: userInfo}) => {
      userInfo.list.forEach(comic => {
        let listItem = document.createElement('tr')
        listItem.innerHTML = `
        <td><img class="list-cover" src="${comic.cover_image}" alt="cover"</td>
        <td>${comic.name}</td>
        <td>${comic.issue_number}</td>
        <td>${comic.issue_name}</td>
        <td>${userInfo.comicList.rating} / 10</td>
        <td>${userInfo.comicList.completion_status}</td>
        <td><button class="btn waves-effect edit waves-light blue-grey darken-2 rounded-corners"><i class="far fa-edit"></i></button></td>
      `
        document.getElementById('comicList').append(listItem)
      })
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

renderItems()
