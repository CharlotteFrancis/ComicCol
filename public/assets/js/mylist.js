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
  document.getElementById('comicList').innerHTML = ''
  axios.get('/api/lists', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((userList) => {
      console.log(userList.data.comics)
      const myComics = userList.data.comics
      myComics.forEach(element => {
        // inside for each
        let comic = document.createElement('tr')
        comic.innerHTML = `
        <td class="list-td"><img class="list-cover" src="${element.cover_image}" alt="cover"></td>
        <td class="list-td">${element.name}</td>
        <td class="list-td">${element.issue_number}</td>
        <td class="list-td">${element.issue_name}</td>
        <td class="list-td">${element.comic_list.rating} / 10</td>
        <td class="list-td">${element.comic_list.completion_status}</td>
        <td class="list-td"><a href="#modal1" data-id="${element.comic_list.id}" class="btn waves-effect edit waves-light blue-grey darken-2 rounded-corners modal-trigger"><i class="far fa-edit my-trigger"></i></a></td>
        `
        document.getElementById('comicList').append(comic)
      })
      // Yay ! got it to working
    })
    .catch(err => console.log(err))
}

renderItems()

// Listeners for edit button & image click
document.addEventListener('click', event => {
  if (event.target.classList.contains('modal-trigger')) {
    console.log('hitting this code')
    document.getElementById('modalTitle').innerHTML = event.target.parentElement.parentElement.children[1].innerHTML
    document.getElementById('modalIssueName').innerHTML = event.target.parentElement.parentElement.children[3].innerHTML
    document.getElementById('modalIssueNumber').innerHTML = event.target.parentElement.parentElement.children[2].innerHTML
    document.getElementById('updateFromModal').dataset.id = event.target.dataset.id
    document.getElementById('deleteFromModal').dataset.id = event.target.dataset.id
  } else if (event.target.classList.contains('my-trigger')) {
    console.log('smacking this code')
    console.log(event.target.parentElement.classList)
    document.getElementById('modalTitle').innerHTML = event.target.parentElement.parentElement.parentElement.children[1].innerHTML
    document.getElementById('modalIssueName').innerHTML = event.target.parentElement.parentElement.parentElement.children[3].innerHTML
    document.getElementById('modalIssueNumber').innerHTML = event.target.parentElement.parentElement.parentElement.children[2].innerHTML
    document.getElementById('updateFromModal').dataset.id = event.target.parentElement.dataset.id
    document.getElementById('deleteFromModal').dataset.id = event.target.parentElement.dataset.id
  } else if (event.target.classList.contains('list-cover')) {
    console.log('hitting this code')
    const query1 = event.target.parentElement.parentElement.children[1].innerHTML
    const query2 = event.target.parentElement.parentElement.children[2].innerHTML
    const query3 = event.target.parentElement.parentElement.children[3].innerHTML
    window.location = `./comic.html?query1=${query1} ${query2} ${query3}`
  }
})

// Listener to commit edit to ComicList
document.getElementById('updateFromModal').addEventListener('click', event => {
  // basically get the data and make an object
  const comicListId = event.target.dataset.id

  const updatedComicList = {
    rating: parseInt(document.getElementById('rating').value),
    completion_status: document.getElementById('completion').value
  }
  console.log(updatedComicList)

  axios.put(`api/comiclist/${comicListId}`, updatedComicList, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(_ => {
      renderItems()
    })
    .catch(err => console.log(err))
})

//Listening for delete? works 😎
document.getElementById('deleteFromModal').addEventListener('click', event => {
  axios.delete(`api/comicList/${event.target.dataset.id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(() => {
    renderItems()
  })
  .catch(err => console.log(err))
})