// Tab Cloak (Title + Favicon) - works site-wide via localStorage
// Storage keys:
//  - tc_title: string
//  - tc_icon:  string (url/path)
(function () {
  function setFavicon(href) {
    if (!href) return;
    var head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;

    // Remove existing favicons
    var existing = head.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"]');
    for (var i = 0; i < existing.length; i++) {
      if (existing[i] && existing[i].parentNode) existing[i].parentNode.removeChild(existing[i]);
    }

    var link = document.createElement('link');
    link.rel = 'icon';
    link.href = href;
    head.appendChild(link);
  }

  function applyTabCloak() {
    try {
      var t = localStorage.getItem('tc_title');
      var i = localStorage.getItem('tc_icon');

      if (t && typeof t === 'string') document.title = t;
      if (i && typeof i === 'string') setFavicon(i);
    } catch (e) {
      // ignore
    }
  }

  // Expose for settings page
  window.__applyTabCloak = applyTabCloak;
  window.__setTabCloak = function (title, icon) {
    try {
      if (title != null) localStorage.setItem('tc_title', String(title));
      if (icon != null) localStorage.setItem('tc_icon', String(icon));
    } catch (e) {}
    applyTabCloak();
  };
  window.__resetTabCloak = function () {
    try {
      localStorage.removeItem('tc_title');
      localStorage.removeItem('tc_icon');
    } catch (e) {}
    applyTabCloak();
  };

  // Apply as early as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTabCloak);
  } else {
    applyTabCloak();
  }
})();