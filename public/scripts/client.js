/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function() {
  
  $("time.timeago").timeago();

  const createTweetElement = function(tweet) {
    const postedTweet = `
      <article class="posted-tweet">
        <header>
          <div>
            <img src=${tweet.user.avatars} class="user-image-small">
            <text>${tweet.user.name}</text>
          </div>
          <text class="handle">${tweet.user.handle}</text>
        </header>
        <text class="posted-tweet-text">
          ${tweet.content.text}
        </text>
        <footer>
          <text>
          ${$.timeago(tweet.created_at)}
          </text>
          <div>
            Icons
          </div>
        </footer>
      </article>
    `
    return postedTweet;
  }

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweetsArray) {
    for (let tweet of tweetsArray) {
      const $currentTweet = createTweetElement(tweet);
      $('#tweets-container').append($currentTweet)
    }
  }

  renderTweets(data);

  $('form').on('submit', function(event) {
    event.preventDefault();
  })

});