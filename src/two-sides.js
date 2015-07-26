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
        autoplay: '@'
      },
      template: ['<div id="topVideo"></div>', '<div id="hiddenVideo"></div>'].join(''),
      link: link
    };

    function link (scope, elem, attrs) {

      var config = {};
      config.videos = [];
      config.videos.push({ id: 'topVideo', youtubeId: scope.mainVideo});
      config.videos.push({ id: 'hiddenVideo', youtubeId: scope.hiddenVideo});

      config.autoPlay = (Boolean(scope.autoplay)) ? '1' : '0';

      if (config.videos.length !== 2) {
        return;
      }

      YoutubeAPI.loadAPi();

      $window.onYouTubeIframeAPIReady = function() {

        angular.forEach(config.videos, function(video) {

          video.player = new YT.Player(video.id, {
            height: '390',
            width: '640',
            videoId: video.youtubeId,
            playerVars : {
              'autoplay': 0,
              'controls': '0',
              'modestbranding': '1',
              'rel': '0',
              'showinfo': '0'
            }
          });

        });

      }

    } // /link


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
      tag.src = "https://www.youtube.com/iframe_api";

      var firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(tag, firstScript);
    };

    return YoutubeAPI;
  }

})();
