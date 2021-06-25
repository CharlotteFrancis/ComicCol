let comicDesc = []

// clear comics
const clearComics = _ => {
  document.getElementById('comicResults').innerHTML = ''
}

// render comics
const renderRequest = comics => {
  comics.forEach((element, i) => {
    const comic = document.createElement('div')
    comic.classList = 'col s4 search-card-height search-card-width'
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
  const query = document.getElementById('comicSearch').value
  axios.get(`/api/comicVine/${query}`)
    .then((comics) => {
      clearComics()
      renderRequest(comics.data)
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

// get comic object ready for export
document.getElementById('addFromModal').addEventListener('click', _ => {
  const comic = {
    name: document.getElementById('modalTitle').innerHTML,
    description: comicDesc[document.getElementById('addFromModal').dataset.description],
    cover_image: document.getElementById('addFromModal').dataset.coverImage,
    issue_number: document.getElementById('modalIssueNumber').innerHTML,
    issue_name: document.getElementById('modalIssueName').innerHTML,
    cover_date: document.getElementById('addFromModal').dataset.cover_date
  }

  // actually this needs comiclist object id for the axios request
  const comicList = {
    rating: document.getElementById('rating').value,
    completion_status: document.getElementById('completion').value
  }

  console.log(document.getElementById('addFromModal').dataset.description)
  console.log(comicList)
  console.log(comic)
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('comic-image')) {
    const query1 = event.target.parentElement.parentElement.children[1].children[0].children[1].innerHTML
    const query2 = event.target.parentElement.parentElement.children[1].children[0].children[3].children[0].innerHTML
    const query3 = event.target.parentElement.parentElement.children[1].children[0].children[4].innerHTML
    window.location = `./comic.html?query1=${query1} ${query2} ${query3}`
  }
})
