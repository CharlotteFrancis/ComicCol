// const { default: axios } = require("axios")

let comicData = []

// Query url stuff
const params = new URLSearchParams(window.location.search)
const query = params.get('query1')
const getComic = _ => {
  axios.get(`/api/comicVine/comicPage/${query}`)
    .then((comic) => {
      // COMIC DATA TO RENDER IS STORED IN comic.data
      console.log(comic.data[0])
      comicData = comic.data[0]
      renderSingleComic(comic)
    })
    .catch(err => console.log(err))
}

getComic()

renderSingleComic = (comic) => {
  let comicData = document.createElement('div')
  comicData.innerHTML = `
    <div class="card horizontal rounded-corners hide-on-small-only">
      <div class="card-image">
        <img class="materialboxed" src="${comic.data[0].image.super_url}">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <h3>${comic.data[0].volume.name} #${comic.data[0].issue_number}</h3>
          <hr style="width: 35%;" class="left">
          <br>
          <h5 style="display: inline;">${comic.data[0].name}</h5> 
          <h5 style="display: inline;"> · </h5>
          <h5 style="display: inline;">${comic.data[0].cover_date}</h5>
          <h5>Description:</h5>
          ${comic.data[0].description}
        </div>
      </div>
    </div>
    <div class="card rounded-corners hide-on-med-and-up">
      <div class="card-image">
        <img class="materialboxed" src="${comic.data[0].image.super_url}">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <h3>${comic.data[0].volume.name} #${comic.data[0].issue_number}</h3>
          <hr style="width: 35%;" class="left">
          <br>
          <h5 style="display: inline;">${comic.data[0].name}</h5> 
          <h5 style="display: inline;"> · </h5>
          <h5 style="display: inline;">${comic.data[0].cover_date}</h5>
          <h5>Description:</h5>
          ${comic.data[0].description}
        </div>
      </div>
    </div>
    `
  document.getElementById('comicCard').append(comicData)

  axios.get(`api/comic/exists/${comic.data[0].volume.name}/${comic.data[0].issue_number}/${comic.data[0].name}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(thisComic => {
      console.log(thisComic.data)
      axios.get(`api/comic/${thisComic.data}`)
        .then((myComic) => {
          myComic.data.reviews.forEach(element => {
            console.log(element)
            renderReviews(element)
          })
          // end console.log
        })
        .catch(err => console.log('There is an error in the get comic by id: ', err))
    })
    .catch(_ => {
      document.getElementById('addYourReview').classList.add('hide')
      document.getElementById('reviewText').classList.add('hide')
      console.log('no reviews')
    })
}

const renderReviews = (review) => {
  console.log(review.user_id)
  axios.get(`api/users/${review.user_id}`)
    .then(({ data: whatIsThis }) => {
      let reviewData = document.createElement('div')
      reviewData.classList = "col s12"
      reviewData.innerHTML = `
        <div class="card blue-grey darken-1 comment-card">
          <div class="card-content white-text">
            <p class="card-title">
              <h6 style="margin-bottom: 2px; display: inline;">${whatIsThis.username}</h6>
              <p style="display: inline; font-size:small">·</p>
              <p style="display: inline;">${review.createdAt.slice(0, 10)}</p>
            </p>
            <hr>
            ${review.text}
          </div>
        </div>
      `
      document.getElementById('reviewCard').append(reviewData)
    })
    .catch(err => console.log(err))
}

// event listener for posting a review
document.getElementById('commentSubmit').addEventListener('click', event => {
  event.preventDefault()
  axios.get(`api/comic/exists/${comicData.volume.name}/${comicData.issue_number}/${comicData.name}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((comicId) => {
      axios.post('/api/review',
        {
          text: document.getElementById('comment-text').value,
          comic_id: comicId.data
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(({ data: review }) => {
          console.log(review)
          renderReviews(review)
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(err)
      // add comic to db and get iud
    })
})
