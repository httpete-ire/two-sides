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

    return {
      scope: {
        mainVideo: '@',
        hiddenVideo: '@'
      },
      template: '<h1>Hello world</h1>',
      link: link
    };

    function link (scope, elem, attrs) {

      var config = {};
      config.videos = [scope.mainVideo, scope.hiddenVideo];
      config.autoPlay = (Boolean(scope.autoPlay)) ? 1 : 0;

      if (config.videos.length !== 2) {
        return;
      }

      YoutubeAPI.loadAPi();

      $window.onYouTubeIframeAPIReady = function() {

      }

    };


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
