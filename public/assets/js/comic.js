// Query url stuff
const params = new URLSearchParams(window.location.search)
const query = params.get('query1')
const getComic = _ => {
  axios.get(`/api/comicVine/comicPage/${query}`)
    .then((comic) => {
      // COMIC DATA TO RENDER IS STORED IN comic.data
      console.log(comic.data[0])
      renderSingleComic(comic)
    })
    .catch(err => console.log(err))
}

getComic()

renderSingleComic = (comic) => {
  let comicData = document.createElement('div')
  comicData.classList = 'card horizontal rounded-corners'
  comicData.innerHTML = `
      <div class="card-image">
        <img class="materialboxed" src="${comic.data[0].image.super_url}">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <h2>${comic.data[0].volume.name} #${comic.data[0].issue_number}</h2>
          <h3>${comic.data[0].name}</h3>
          <h4>Cover Date: ${comic.data[0].cover_date}</h4>
          <h4>Average Rating: X/10</h4>
          <h5>Description</h5>
          ${comic.data[0].description}
        </div>
        <div class="card-action">
        <p class="right">Add to your collection</p>
        <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">+</i></a>
      </div>
    </div>
    `
  document.getElementById('comicCard').append(comicData)
}
