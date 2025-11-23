(function(){
  var params = new URLSearchParams(window.location.search || "");
  var rawSearch = (window.location.search || "").replace(/^\?/, "");
  var iframe = document.getElementById('myIframe');

  // ---- LESSON RESOLUTION (CLEAN SYSTEM) ----
  var lessonKey = params.get('lesson') || '';

  // Support iframe.html?lesson-1 style (no '=')
  if (!lessonKey && rawSearch && rawSearch.indexOf('=') === -1 && rawSearch.indexOf('lesson-') === 0) {
    lessonKey = rawSearch;
  }

  var lessonData = null;

  if (lessonKey && window.lessonMap && window.lessonMap[lessonKey]) {
    lessonData = window.lessonMap[lessonKey];
    if (lessonData.label) {
      document.title = lessonData.label + " unblocked | Retro Bowl 45";
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && lessonData.article) {
        var txt = "";
        if (Array.isArray(lessonData.article)) {
          txt = lessonData.article.join(" ");
        } else {
          txt = String(lessonData.article);
        }
        metaDesc.setAttribute("content", txt.substring(0, 160));
      }
      var canon = document.querySelector('link[rel="canonical"]');
      if (canon) {
        var url = window.location.origin + window.location.pathname + "?" + lessonKey;
        canon.setAttribute("href", url);
      }
    }
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && lessonData.article) {
        var txt = "";
        if (Array.isArray(lessonData.article)) {
          txt = lessonData.article.join(" ");
        } else {
          txt = String(lessonData.article);
        }
        metaDesc.setAttribute("content", txt.substring(0, 160));
      }
    }
  }

  // Set iframe src from lessonData.game_url
  if (iframe) {
    if (lessonData && lessonData.game_url) {
      iframe.src = lessonData.game_url;
    } else {
      console.error("No valid lesson/game_url found for key:", lessonKey);
    }
  }

  // ---- ARTICLE BLOCK UNDER IFRAME ----
  if (lessonData && lessonData.article) {
    var container = document.querySelector('.container-iframe');
    if (container) {
      var section = document.createElement('section');
      section.className = 'lesson-article';

      var h1 = document.createElement('h1');
      h1.textContent = lessonData.label + " unblocked";
      section.appendChild(h1);

      var articleData = lessonData.article;
      if (typeof articleData === "string") {
        articleData = [articleData];
      }
      if (Array.isArray(articleData)) {
        articleData.forEach(function(txt){
          if (!txt) return;
          var p = document.createElement('p');
          p.textContent = txt;
          section.appendChild(p);
        });
      }

      container.parentNode.insertBefore(section, container.nextSibling);
    }
  }

  // ---- FULLSCREEN & REFRESH ----
  function inFullscreen(){
    return !!(document.fullscreenElement ||
              document.webkitFullscreenElement ||
              document.mozFullScreenElement ||
              document.msFullscreenElement);
  }

  window.toggleFullscreen = function(){
    if (!iframe) return;

    if (!inFullscreen()) {
      if (iframe.requestFullscreen) return iframe.requestFullscreen();
      if (iframe.webkitRequestFullscreen) return iframe.webkitRequestFullscreen();
      if (iframe.mozRequestFullScreen) return iframe.mozRequestFullScreen();
      if (iframe.msRequestFullscreen) return iframe.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) return document.exitFullscreen();
      if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
      if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
      if (document.msExitFullscreen) return document.msExitFullscreen();
    }
  };

  window.refreshIframe = function(){
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  // ---- DISCORD WIDGET BUTTON ----
  var discordBtn = document.getElementById('whysofeinious-button');
  if (discordBtn) {
    discordBtn.addEventListener('click', function() {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = function() {
        new Crate({
          server: '1272664240175448208',
          channel: '1272664509156298773'
        });
      };
    });
  }

  // ---- OPEN IFRAME URL IN NEW TAB ----
  var openBtn = document.getElementById('openIframeSource');
  if (openBtn) {
    openBtn.addEventListener('click', function() {
      if (!iframe || !iframe.src) return;
      var link = document.createElement('a');
      link.href = iframe.src;
      link.target = '_blank';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
})();
