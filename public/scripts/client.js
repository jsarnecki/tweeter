/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

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

  $('#tweet-form-id').submit(function(event){
    event.preventDefault();
    let data = $('#tweet-text').val();
    //Validate before ajax request
    if (data === null || data === "") {
      alert("Error: Can not submit empty tweet");
      return false;
    }
    if (data.length > 140) {
      alert("Error: Tweet too long");
      return false;
    }
    
    $.ajax({
      url: '/tweets/',
      type: 'POST',
      data: $(this).serialize()
    })
    .then(function(data) {
      $('textarea').val("");
      loadTweets();
      // $('#tweet-container').append(data);
    })
    .catch(function(error) {
      console.log(`Error: ${error}`);
    })
  });


  const loadTweets = function() {
    $.ajax({
      url: '/tweets/',
      type: 'GET'
    })
    .then(function(jsonData) {
      renderTweet(jsonData);
      console.log('json data recieved:', jsonData);
    })
    .catch(function(error) {
      console.log(`Error: ${error}`);
    })
  };

  loadTweets(); //Now do not need the hardcoded array of tweet objects, as the get request grabs them from /tweets/


});