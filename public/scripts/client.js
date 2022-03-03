/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  $('#form-error').hide(); // Where should this go?
  //$('.tweet').hide();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetData) {
    const $tweet = `
    <article class="tweet">
      <header class="tweet-header">
        <img src="${tweetData.user.avatars}" class="tweet-icon">
        <div class="user-name">${tweetData.user.handle}</div>
      </header>
      <div class="flex-actual-tweet">
        <div class="actual-tweet">${escape(tweetData.content.text)}</div>
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

  const loadNewTweet = function() {
    $.ajax({
      url: '/tweets/',
      type: 'GET'
    })
    .then(function(jsonData) {
      console.log('json data NEW TWEET recieved:', jsonData);
      const $tweet = createTweetElement(jsonData[jsonData.length - 1]);
      $('#tweet-container').append($tweet);
    })
    .catch(function(error) {
      console.log(`Error: ${error}`);
    })
  };


  $('#tweet-form-id').submit(function(event){
    event.preventDefault();
    let data = $('#tweet-text').val();
    if (data === null || data === "") {
      //remove var call?
      const emptyInput = $('#form-error').text('Input required!');//Make border of textarea red as well?
      $('#form-error').slideDown();
      return false;
    }
    if (data.length > 140) {
      const tooLong = $('#form-error').text('Tweet too long!');//Is using .text best practice here?
      $('#form-error').slideDown();
      return false;
    }
    $('#form-error').slideUp();
    $.ajax({
      url: '/tweets/',
      type: 'POST',
      data: $(this).serialize()
    })
    .then(function(data) {
      $('textarea').val("");
      loadNewTweet();
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

  
  loadTweets(); 

});