$(function() {

  $('#form-error').hide();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetData) {
    const $tweet = `
    <article class="tweet">
      <header class="tweet-header">
        <div id="icon-name">
          <img src="${tweetData.user.avatars}" class="tweet-icon">
          <div class="user-name-tag">${tweetData.user.name}</div>
        </div>
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
    // Used to load a newly written tweet
    $.ajax({
      url: '/tweets/',
      type: 'GET'
    })
    .then(function(jsonData) {
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
      $('#form-error').text('⛔Input required!⛔');
      $('#form-error').slideDown();
      return false;
    }
    if (data.length > 140) {
      $('#form-error').text('⛔Tweet too long!⛔');
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
    // Used to load tweets that already exist in db on refresh
    $.ajax({
      url: '/tweets/',
      type: 'GET'
    })
    .then(function(jsonData) {
      renderTweet(jsonData);
    })
    .catch(function(error) {
      console.log(`Error: ${error}`);
    })
  };

  loadTweets(); 

});