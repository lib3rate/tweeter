/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function() {
  
  // Importing the timeago function to show the time passed on the tweet post
  
  $("time.timeago").timeago();

  // Escaping Cross-Site Scripting (XSS)

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
          ${escape(tweet.content.text)}
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

  // Loading the tweets feed when opening the page

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .then(function (response) {
        renderTweets(response);
      });
  }

  // Adding the tweet to the tweets database and displaying it as the most recent

  $('form').on('submit', function(event) {
    
    event.preventDefault();

    let tweetText = $('#tweet-text').val();
    
    if (tweetText.length > 140) {
      $('.error').html('The tweet exceeds the maximum length');
      $('.error').slideDown('fast');
    } else if (!tweetText) {
      // $('.error').val('Please enter the tweet');
      $('.error').html('Please enter the tweet');
      $('.error').slideDown('fast');
    } else {
      $('.error').slideUp('fast');
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
      })
        .then($('#tweets-container').empty())
        // .then($('#tweet-text').empty())
        .then(loadTweets)
    }
    
  });

  loadTweets()

  // Should it be onLoad?
  // $(document).onLoad(loadTweets());

});