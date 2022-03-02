/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1646084902862
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1646171302862
    }
  ];

  const createTweetElement = function(tweetData) {
    const $tweet = `
    <article class="tweet">
      <header class="tweet-header">
        <img src="${tweetData.user.avatars}" class="tweet-icon">
        <div class="user-name">${tweetData.user.handle}</div>
      </header>
      <div class="flex-actual-tweet">
        <div class="actual-tweet">${tweetData.content.text}</div>
      </div>
      <hr>
      <footer>
        <div class="time-passed">${timeago.format(tweetData.created_at)}</div>
        <div class="footer-buttons">
          <i class="fa-solid fa-heart fa-2xs"></i>
          <i class="fa-solid fa-retweet fa-2xs"></i>
          <i class="fa-solid fa-flag fa-2xs"></i>
        </div>
      </footer>
    </article>`
  return $tweet;
  };

  const renderTweet = function(tweetData) {
    for (let tweetInfo of tweetData) {
      const $tweet = createTweetElement(tweetInfo);
      $('#tweet-container').append($tweet);
    }
  };

  renderTweet(data);


  $('#tweet-form-id').submit(function(event){ //on submit must be the form ID, not the button id
    event.preventDefault();
    let data = $('#tweet-text').val();
    //console.log('data before serialize:', data);
    $.ajax({
      url: '/tweets/',
      type: 'POST',
      data: $(this).serialize() //Use $(this) as it becomes a jquery object 
    })
    .then(function(data) {
     // alert('success');
      console.log('data:', data);
    })
    .catch(function(error) {
      console.log(`Error: ${error}`);
    })
  })


});