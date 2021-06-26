let comicDesc = []

// clear comics
const clearComics = _ => {
  document.getElementById('comicResults').innerHTML = ''
}

// create comic in db
const createComic = comic => {
  axios.post('api/comic', comic, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((newComic) => {
      console.log('from createComic comicID is ', newComic.data.id)
      return newComic.data.id
    })
    .catch(err => console.log('error in create comic:', err))
}

// render comics
const renderRequest = comics => {
  comics.forEach((element, i) => {
    const comic = document.createElement('div')
    comic.classList = 'col s4 search-card-height search-card-width comicCard'
    comic.innerHTML = `
    <div class="card horizontal">
      <div class="card-image">
        <img class="comic-image" src="${element.image.medium_url}">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <br>
          <h6>${element.volume.name}</h6>
          <hr>
          <p>Issue: <span>${element.issue_number}</span></p>
          <p>${element.name}</p>
        </div>
        <div class="card-action">
          <a data-description="${i}" data-cover_date="${element.cover_date}" class="my-trigger modal-trigger" href="#modal1">Add to list</a>
        </div>
      </div>
    </div>
    `
    comicDesc[i] = element.description
    document.getElementById('comicResults').append(comic)
  })
}

// SUBMIT BUTTON LISTENER
document.getElementById('searchSubmit').addEventListener('click', event => {
  event.preventDefault()
  document.getElementById('spinner').classList = ''
  const query = document.getElementById('comicSearch').value
  axios.get(`/api/comicVine/${query}`)
    .then((comics) => {
      clearComics()
      renderRequest(comics.data)
      document.getElementById('spinner').classList = 'hide'
      sizeFunction()
    })
    .catch(err => console.log(err))
})

// MODAL listener
document.addEventListener('click', event => {
  if (event.target.classList.contains('my-trigger')) {
    // TITLE: parent parent children0 children1
    document.getElementById('modalTitle').innerHTML = event.target.parentElement.parentElement.children[0].children[1].innerHTML
    // NAME:
    document.getElementById('modalIssueName').innerHTML = event.target.parentElement.parentElement.children[0].children[4].innerHTML
    // ISSUE:
    document.getElementById('modalIssueNumber').innerHTML = event.target.parentElement.parentElement.children[0].children[3].children[0].innerHTML
    // cover image : parent parent parent children0 children0
    document.getElementById('addFromModal').dataset.coverImage = event.target.parentElement.parentElement.parentElement.children[0].children[0].src
    // description and cover_date
    document.getElementById('addFromModal').dataset.description = event.target.dataset.description
    document.getElementById('addFromModal').dataset.cover_date = event.target.dataset.cover_date
  }
})

// code to get the actual description: erroring out because mysql cant store long strings
// description: comicDesc[document.getElementById('addFromModal').dataset.description],
// get comic object ready for export
document.getElementById('addFromModal').addEventListener('click', _ => {
  const comic = {
    name: document.getElementById('modalTitle').innerHTML,
    description: null,
    cover_image: document.getElementById('addFromModal').dataset.coverImage,
    issue_number: document.getElementById('modalIssueNumber').innerHTML,
    issue_name: document.getElementById('modalIssueName').innerHTML,
    cover_date: document.getElementById('addFromModal').dataset.cover_date
  }

  // Logic
  // 1: check if Comic is in db. if it is then use its id, if not then add it and get that id, store in local variable comic_id
  // 2: get the user's list id with a user axios req
  // 3: post ComicList obj using user's input data, list_id, and comic_id

  // step 1
  let comicID = ''
  axios.get(`api/comic/exists/${comic.name}/${comic.issue_number}/${comic.issue_name}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((comicId) => {
      console.log('from comicExists comicID is ', comicId.data)
      comicID = comicId.data
      // ROUTE 1
      // step 2
      axios.get('api/lists/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((myList) => {
          console.log('from comicExists my list id: ', myList.data.id)
          // step 3
          axios.post('/api/comiclist', {
            rating: document.getElementById('rating').value,
            completion_status: document.getElementById('completion').value,
            comic_id: comicID,
            list_id: myList.data.id
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(_ => console.log('added ComicList to db!'))
            .catch(err => console.log('error in post comicList from comicExists :', err))
        })
        .catch(err => console.log('error in get my list', err))
        // end ROUTE 1
    })
    .catch(err => {
      console.log('no such comic exists', err)
      // create comic
      axios.post('api/comic', comic, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((newComic) => {
          console.log('Comic created! id:', newComic.data.id)
          comicID = newComic.data.id
          // ROUTE 2
          // step 2
          axios.get('api/lists/', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then((myList) => {
              console.log('from comicExists : ', myList.data.id)
              // step 3
              axios.post('/api/comiclist', {
                rating: document.getElementById('rating').value,
                completion_status: document.getElementById('completion').value,
                comic_id: comicID,
                list_id: myList.data.id
              }, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              })
                .then(_ => console.log('added ComicList to db!'))
                .catch(err => console.log('error in post comicList from comicExists :', err))
            })
            .catch(err => console.log('error in get my list', err))
          // END ROUTE 2
        })
        .catch(err => console.log('error in create comic, not created:', err))
    })
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('comic-image')) {
    const query1 = event.target.parentElement.parentElement.children[1].children[0].children[1].innerHTML
    const query2 = event.target.parentElement.parentElement.children[1].children[0].children[3].children[0].innerHTML
    const query3 = event.target.parentElement.parentElement.children[1].children[0].children[4].innerHTML
    window.location = `./comic.html?query1=${query1} ${query2} ${query3}`
  }
})

const sizeFunction = _ => {
  let thisWidth = window.outerWidth

  if (thisWidth < 1350 && thisWidth >= 725) {
    // document.getElementsByClassName('comicCard').classList = 'col s6 search-card-height search-card-width comicCard'
    const elems = document.getElementsByClassName('comicCard')
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList = 'col s6 search-card-height search-card-width comicCard'
    }
  } else if (thisWidth < 725) {
    const elems = document.getElementsByClassName('comicCard')
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList = 'col s12 search-card-height search-card-width comicCard'
    }
  } else {
    const elems = document.getElementsByClassName('comicCard')
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList = 'col s4 search-card-height search-card-width comicCard'
    }
  }
}