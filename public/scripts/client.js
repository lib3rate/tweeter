/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function() {
  
  // Importing the timeago function to show the time passed on the tweet post
  
  $("time.timeago").timeago();

  // Transforming the tweet object into an HTML element

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

  // Adding the tweets to the existing base HTML

  const renderTweets = function(tweetsArray) {
    for (let tweet of tweetsArray) {
      const currentTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(currentTweet)
    }
  }

  // Adding the tweet to the tweets database

  $('form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
    })
      // .then(renderTweets(tweetText))
      .then(console.log('Added to the database'))
  });

  // Loading the tweets feed when opening the page

  const loadTweets = function() {
    console.log('Page loaded, performing ajax call...');
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then(function (response) {
        renderTweets(response);
      });
  }

  loadTweets();

});