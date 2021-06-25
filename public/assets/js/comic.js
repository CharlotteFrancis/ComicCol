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

const getReviews = _ => {
  axios.get(`/reviews`)
    .then((reviews) => {
      console.log(review)
    })
    .catch(err => console.log(err))
}

renderReviews = (reviews) => {
  let reviewData = document.createElement('div')
  reviewData.classList = "col s12"
  reviewData.innerHTML = `
    <div class="card blue-grey darken-1 comment-card">
      <div class="card-content white-text">
        <p class="card-title">
          <h6 style="margin-bottom: 2px; display: inline;">Username</h6>
          <p style="display: inline; font-size:small">·</p>
          <p style="display: inline;">X/10</p>
          <p style="font-size: smaller;">6/22/2021</p>
        </p>
        <hr>
        <p>This issue carries on directly from the last one as Wonder Woman is forced to fight Circe. There was an interesting altercation immediately before Diana realizes something is wrong. Seeing that her plan isn't working Circe instead tells Diana she will return Themyscira providing that she takes the life of an innocence.</p>
      </div>
    </div>
  `
  document.getElementById('reviewCard').append(reviewData)
}

renderReviews()

// event listener for posting a review
document.getElementById('commentSubmit').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/review',
    {
      text: document.getElementById('comment-text').value
    }, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: review }) => {
      console.log(review)
      // renderReviews(review)
    })
    .catch(err => console.log(err))
})