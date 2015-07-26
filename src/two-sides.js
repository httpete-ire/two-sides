(function () {
  'use strict';

  angular
  .module('twoSides', []);


  angular
  .module('twoSides')
  .directive('twoSides', twoSides)
  .factory('YoutubeAPI', YoutubeAPI);

  /**
   * [twoSides description]
   * @return {[type]} [description]
   */
  function twoSides(YoutubeAPI, $window) {

    var uniqueId = 1;

    return {
      scope: {
        mainVideo: '@',
        hiddenVideo: '@',
        autoplay: '@',
        key: '@'
      },
      template: ['<div id="topVideo"></div>','<div id="hiddenVideo"></div>'].join(''),
      link: link
    };

    function link (scope, elem, attrs) {

      var config = {};
      config.videos = [];
      config.videos.push({ id: 'topVideo', youtubeId: scope.mainVideo});
      config.videos.push({ id: 'hiddenVideo', youtubeId: scope.hiddenVideo});
      config.count = config.videos.length;
      config.autoPlay = (Boolean(scope.autoplay)) ? true : false;
      config.key = parseInt(scope.key) || 82;

      if (config.videos.length !== 2) {
        return;
      }

      var hiddenVideo = elem[0].querySelector('#hiddenVideo');
      var topVideo = elem[0].querySelector('#topVideo');

      YoutubeAPI.loadAPi();

      switchVideos(topVideo, hiddenVideo);

      $window.onYouTubeIframeAPIReady = function() {

        angular.forEach(config.videos, function(video) {

          video.player = new YT.Player(video.id, {
            height: '100%',
            width: '100%',
            videoId: video.youtubeId,
            playerVars : {
              'autoplay': '0',
              'controls': '0',
              'modestbranding': '1',
              'rel': '0',
              'showinfo': '0'
            },
            events: {
              'onReady' : videosReady,
              'onStateChange' : onPlayerStateChange
            }
          });

        });

      }

      function onPlayerStateChange (e) {
        if (e.data === YT.PlayerState.PLAYING) {
          playVideos();
        } else if (e.data === YT.PlayerState.PAUSED) {
          pauseVideos();
        }
      }

      function videosReady() {
        config.count--;

        if (config.count === 0) {

          muteVideo(config.videos[1].player);

          if (config.autoPlay) {
            playVideos();
          }

          angular.element($window).on('keyup', handlePress);
          angular.element($window).on('keydown', handlePress);

          // get the iframes
          hiddenVideo = elem[0].querySelector('#hiddenVideo');
          topVideo = elem[0].querySelector('#topVideo');

        }
      }

      function handlePress(e) {
        var key = e.which || e.keyCode;

        if(key === config.key) {

          var showVideo;
          var hideVideo;
          var mute;
          var unmute;

          if(e.type === 'keyup') {
            showVideo = topVideo;
            hideVideo = hiddenVideo;
            mute = config.videos[1].player;
            unmute = config.videos[0].player;
          } else {
            showVideo = hiddenVideo;
            hideVideo = topVideo;
            mute = config.videos[0].player;
            unmute = config.videos[1].player;
          }

          switchVideos(showVideo, hideVideo);
          muteVideo(mute);
          unmuteVideo(unmute);
        }
      }

      function playVideos() {
        _callOnAllVideos('playVideo');
      }

      function pauseVideos() {
        _callOnAllVideos('pauseVideo');

      }

      function stopVideos() {
        _callOnAllVideos('stopVideo');
      }

      function _callOnAllVideos(fn) {
        angular.forEach(config.videos, function(video) {
          video.player[fn]();
        });
      }

    } // /link

    function muteVideo(player) {
      player.mute();
    }

    function unmuteVideo(player) {
      player.unMute();
    }

    function switchVideos(showVideo, hideVideo) {
      showVideo.style.display = "block";
      hideVideo.style.display = "none";
    }

  }

  /**
   * [YoutubeAPI description]
   */
  function YoutubeAPI($document) {
    var YoutubeAPI = {};

    YoutubeAPI.isLoaded = function() {
      return (typeof YT !== 'undefined');
    }

    YoutubeAPI.loadAPi = function() {

      if(YoutubeAPI.isLoaded()) {
        return;
      }

      var tag = document.createElement('script');
      tag.src = "http://www.youtube.com/iframe_api";

      var firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(tag, firstScript);
    };

    return YoutubeAPI;
  }

})();
