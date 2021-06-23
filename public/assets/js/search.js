
// clear comics
const clearComics = _ => {
  document.getElementById('comicResults').innerHTML = ''
}

// render comics
const renderRequest = comics => {
  comics.forEach(element => {
    const comic = document.createElement('div')
    comic.classList = 'col s4 search-card-height search-card-width'
    comic.innerHTML = `
    <div class="card horizontal">
          <div class="card-image">
             <img src="${element.image.medium_url}">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <br>
              <h6>${element.volume.name}</h6>
              <hr>
              <p>Issue: ${element.issue_number}</p>
              <p>${element.name}</p>
            </div>
            <div class="card-action">
              <a class="my-trigger modal-trigger" href="#modal1">Add to list</a>
            </div>
          </div>
        </div>
    `
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
    // parent parent children0 children1
    document.getElementById('modalTitle').innerHTML = event.target.parentElement.parentElement.children[0].children[1].innerHTML
    // test this with a console log
    console.log('modal listener works')
    console.log('title is:' + event.target.parentElement.parentElement.children[0].children[1].innerHTML)
  }
})
