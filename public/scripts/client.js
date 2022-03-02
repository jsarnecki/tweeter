/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  const tempData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1646070134264
  };

  // const createTweetElement = function(tweetData) {
  //   const $actualTweet = $(`<div class="actual-tweet">${tweetData.content.text}</div>`);
  //   const $tweetAvatar = $(`<div class="tweetIcon">${tweetData.user.avatars}</div>`);
  //   const $tweetUser = $(`<div class="userName">${tweetData.user.handle}</div>`);
  //   const $dataCreated = $(`<div class="time-passed">${tweetData.created_at}</div>`);
  //   //Date as well?
  //   let tweetObj = {
  //     $actualTweet,
  //     $tweetAvatar,
  //     $tweetUser,
  //     $dataCreated
  //   }
  //   return tweetObj;
  // };

  const createTweetElement = function(tweetData) {
    // const $actualTweet = $(`<div class="actual-tweet">${tweetData.content.text}</div>`);
    // const $tweetAvatar = $(`<div class="tweetIcon">${tweetData.user.avatars}</div>`);
    // const $tweetUser = $(`<div class="userName">${tweetData.user.handle}</div>`);
    // const $dataCreated = $(`<div class="time-passed">${tweetData.created_at}</div>`);
    const $tweet = `<section class="tweet-container">
    <article class="tweet">
      <header class="tweet-header">
        <img src="${tweetData.user.avatars}" class="tweetIcon">
        <div class="userName">${tweetData.user.handle}</div>
      </header>
      <div class="actual-tweet">${tweetData.content.text}</div>
      <hr>
      <footer>
        <div class="time-passed">${tweetData.created_at}</div>
        <div class="footer-buttons">
          <i class="fa-solid fa-heart fa-2xs"></i>
          <i class="fa-solid fa-retweet fa-2xs"></i>
          <i class="fa-solid fa-flag fa-2xs"></i>
        </div>
      </footer>
    </article>
  </section>`
  return $tweet;
  };


  const $tweet = createTweetElement(tempData);

  console.log($tweet);

  $('.tweet-container').append($tweet);








})