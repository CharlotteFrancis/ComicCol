const { Comic } = require('../models')

const comics = [
  {
    name: 'Scarlet Witch',
    description: `<p><em>WITCHCRAFT IS SAFE! BUT WHAT DOES THAT MEAN FOR WANDA?</em></p><p><em>Witchcraft has been saved. Now Wanda has an even harder thing ahead of her - planning her life now her task is done.</em></p><p><em>But first she must face a witch-demon who possesses a young boy with a bloodline connection to witches of yore.</em></p><p><em>Join us as Wanda must battle evil both in present-day New York...and Havana, Cuba in 1954!!</em></p>`,
    cover_image: 'https://comicvine.gamespot.com/a/uploads/scale_medium/6/67663/5712144-15.jpg',
    issue_number: '15',
    cover_date: '2017-04-30'
  },
  {
    name: 'Thor',
    description: `<p><em>The Odinson is back. And he clearly doesn't like that someone else is holding his hammer. You know what that means, right?</em></p>`,
    cover_image: 'https://comicvine.gamespot.com/a/uploads/scale_medium/6/67663/4354933-04.jpg',
    issue_number: '4',
    cover_date: '2015-03-31'
  },
  {
    name: 'The Amazing Spider-Man',
    description: `<p><em>AMAZING SPIDER-MAN reaches another landmark and we're celebrating Spider- Style!</em ></p ><p><em>As if things weren't bad enough for Spider-Man with Sin-Eater's reign of terror reaching riot level... THE GREEN GOBLIN IS BACK!</em></p><p><em>Spidey has been through a lot, but even the worst things that have ever happened to Spider-Man have just been a prelude for what happens here, with an epic main story by a veritable Hall of Fame of Spider-Creators.</em></p>`,
    cover_image: 'https://comicvine.gamespot.com/a/uploads/scale_medium/6/67663/7607019-49.jpg',
    issue_number: '49',
    cover_date: '2020-12-01'
  },
  {
    name: 'Invincible: The End of All Things',
    description: `<p><em>Alliances shift as the battle between Invincible and Thragg rages on. But what is Robot up to on Earth? Every single story for the past 14 years has been leading up to this epic series conclusion!</em></p><p><em>Collects INVINCIBLE #139-144.</em></p>`,
    cover_image: 'https://comicvine.gamespot.com/a/uploads/scale_medium/6/67663/6352628-25.jpg',
    issue_number: '2',
    cover_date: '2018-03-31'
  }
]

const seedComics = () => Comic.bulkCreate(comics)

module.exports = seedComics