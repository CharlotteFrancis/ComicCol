// STARTING OVER
// LOGIC
// needs to pull from comicvine based on the comic icon they click on either the search results or mylist.

// How to get a specific issue when they click on it -- use the data from the previous page

// const clearData = _ => {
//   document.getElementById('comicData').innerHTML = ''
//   document.getElementById('comicCover').innerHTML = ''
// }



renderComicTest = () => {
  let comicData = document.createElement('div')
  comicData.classList = 'card horizontal rounded-corners'
  comicData.innerHTML = `
      <div class="card-image">
        <img class="materialboxed" src="https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/6686014-07.jpg">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <h2>Thor #7</h2>
          <h3>Young Thor's Lament</h3>
          <h4>Cover Date: 2019-01-01</h4>
          <h4>Average Rating: X/10</h4>
          <h5>Description</h5>
          <p><em>A TALE OF YOUNG THOR FROM THE VIKING AGE!</em></p>
              <p><em>Every time Thor comes to Midgard, he gets all the mead, battle and romance a young god could possibly want. But he still can't figure out how to prove himself worthy of Mjolnir. And now Odin is determined to keep his son away from Midgard for good. And young Loki knows just the way to do it.</em></p>
        </div>
        <div class="card-action">
        <p class="right">Add to your collection</p>
        <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">+</i></a>
      </div>
    </div>
    `
  document.getElementById('comicCard').append(comicData)
}

renderComicTest()

renderComicTest2 = () => {
  axios.get(`/api/comicVine/${query}`)
    .then((comic) => {
      renderComicTest(comic.data)
    })
    .catch(err => console.log(err))
  }
//   let comicData = document.createElement('div')
//   comicData.classList = 'card horizontal rounded-corners'
//   comicData.innerHTML = `
//       <div class="card-image">
//         <img class="materialboxed" src="https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/6686014-07.jpg">
//       </div>
//       <div class="card-stacked">
//         <div class="card-content">
//           <h2>Batman #7</h2>
//           <h3>Young Thor's Lament</h3>
//           <h4>Cover Date: 2019-01-01</h4>
//           <h4>Average Rating: X/10</h4>
//           <h5>Description</h5>
//           <p><em>A TALE OF YOUNG THOR FROM THE VIKING AGE!</em></p>
//               <p><em>Every time Thor comes to Midgard, he gets all the mead, battle and romance a young god could possibly want. But he still can't figure out how to prove himself worthy of Mjolnir. And now Odin is determined to keep his son away from Midgard for good. And young Loki knows just the way to do it.</em></p>
//         </div>
//         <div class="card-action">
//         <p class="right">Add to your collection</p>
//         <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">+</i></a>
//       </div>
//     </div>
//     `
//   document.getElementById('comicCard').append(comicData)
// }

renderComicTest2()