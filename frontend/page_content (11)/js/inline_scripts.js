WebFont.load({  google: {    families: ["Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"]  }});

!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);


{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.primesec.ai/#organization",
      "name": "Prime Security",
      "legalName": "PrimeSec Inc.",
      "url": "https://www.primesec.ai/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.primesec.ai/#logo",
        "url": "https://cdn.prod.website-files.com/6a3e64ff64a92f2281e8e82a/6a3ec3628769352bc69fdecc_favicon.png",
        "contentUrl": "https://cdn.prod.website-files.com/6a3e64ff64a92f2281e8e82a/6a3ec3628769352bc69fdecc_favicon.png",
        "width": 192,
        "height": 192
      },
      "description": "Prime Security builds an agentic product security platform whose AI agents review software design, code, and cloud context to find exploitable attack vectors across the development lifecycle.",
      "foundingDate": "2023",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "108 W. 13th Street, Suite 100",
        "addressLocality": "Wilmington",
        "addressRegion": "DE",
        "postalCode": "19801",
        "addressCountry": "US"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "@id": "https://www.primesec.ai/#support",
          "contactType": "customer support",
          "email": "support@primesec.ai",
          "url": "https://www.primesec.ai/support"
        },
        {
          "@type": "ContactPoint",
          "@id": "https://www.primesec.ai/#privacy",
          "contactType": "privacy",
          "email": "privacy@primesec.ai",
          "url": "https://www.primesec.ai/policies/privacy-policy"
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/primesecurityai",
        "https://www.youtube.com/@PrimeSecurityOfficial"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.primesec.ai/#website",
      "name": "Prime Security",
      "url": "https://www.primesec.ai/",
      "publisher": {
        "@id": "https://www.primesec.ai/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.primesec.ai/#software",
      "name": "Prime Security Agentic Product Security Platform",
      "description": "An agentic product security platform that reviews architecture, code, and cloud context to surface exploitable attack vectors across the development lifecycle.",
      "url": "https://www.primesec.ai/platform",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "Web",
      "featureList": [
        "Autonomous Design Reviews",
        "AI Security Code Reviews",
        "Coding Guardrails for Agents",
        "Supply Chain Security",
        "Continuous White Box Pentesting"
      ],
      "provider": {
        "@id": "https://www.primesec.ai/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.primesec.ai/#webpage",
      "name": "Prime Security | Agentic Product Security Platform",
      "description": "Detect, prioritize, and remediate software design risks before they reach production with Prime's Agentic Product Security Platform.",
      "url": "https://www.primesec.ai/",
      "isPartOf": {
        "@id": "https://www.primesec.ai/#website"
      },
      "about": {
        "@id": "https://www.primesec.ai/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@id": "https://www.primesec.ai/#software"
      }
    }
  ]
}



  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied'
  });
  


  (function(w,d,s,l,i){
    w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);    
  })(window,document,'script','dataLayer','GTM-P8ZKMMQ3');
  


  (function(){
    var n=Math.random().toString(36).substring(7),o=document.createElement("script");
    o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n;
    o.async=!0;o.defer=!0;
    o.onload=function(){
      setTimeout(function(){
        if(window.trackingFunctions&&typeof window.trackingFunctions.onLoad==='function'){
          try{window.trackingFunctions.onLoad({appId:"66a3cac5c1761903efe76cf7"})}catch(e){}
        }
      },100);
    };
    document.head.appendChild(o);
  })();
  


  _linkedin_partner_id="8304474";
  window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];
  window._linkedin_data_partner_ids.push(_linkedin_partner_id);
  (function(l){
    if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
    var s=document.getElementsByTagName("script")[0],b=document.createElement("script");
    b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";    
    s.parentNode.insertBefore(b,s);
  })(window.lintrk);
  


  !function(e){"use strict";var a=e&&e.namespace;if(a&&e.profileId&&e.cdn){var r=window[a];if(r&&Array.isArray(r)||(r=window[a]=[]),!r.initialized&&!r._loaded)if(r._loaded)console&&console.warn("[Radar] Duplicate initialization attempted");else{r._loaded=!0;["track","page","identify","group","alias","ready","debug","on","off","once","trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset","register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware","addDestinationMiddleware"].forEach((function(e){var i;r[e]=(i=e,function(){var e=window[a];if(e.initialized)return e[i].apply(e,arguments);var r=[].slice.call(arguments);return r.unshift(i),e.push(r),e})})),r.bootstrap=function(){var a=document.createElement("script");a.async=!0,a.type="text/javascript",a.id="__radar__",a.dataset.settings=JSON.stringify(e),a.src="https://"+e.cdn+"/releases/latest/radar.min.js";var r=document.scripts[0];r.parentNode.insertBefore(a,r)},r.bootstrap()}}else"undefined"!=typeof console&&console.error("[Radar] Configuration incomplete")}({"cdn":"cdn.snitcher.com","apiEndpoint":"radar.snitcher.com","profileId":"royk4F6lPlI","namespace":"Monaco","waitForConsent":true});
  


    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    
    // Set default consent to denied for all except security (required)
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'granted',
      'wait_for_update': 500
    });
  


  document.addEventListener("DOMContentLoaded", () => {
  const navButton = document.querySelector('[data-nav-button="toggle"]');
  const body = document.body;
  
  // Select regular links and links inside the dropdown, 
  // but EXCLUDE the dropdown trigger itself so it doesn't break the toggle
  const navLinks = document.querySelectorAll(`
    .nav_menu .nav-link:not(.w-dropdown-toggle), 
    .navbar_dropdown-link,
    .nav_button-wrapper .nav-link
  `);

  if (navButton) {
    navButton.addEventListener("click", () => {
      body.classList.toggle("nav-open");
      
      // Optional Lenis control:
      // if (body.classList.contains("nav-open")) window.lenis.stop();
      // else window.lenis.start();
    });
  }

  // Remove the scroll lock if a user clicks an actual link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      // if (window.lenis) window.lenis.start();
    });
  });
});



  document.addEventListener('DOMContentLoaded', function () {
    var COOKIE_NAME = 'navBannerDismissedId';

    function getCookie(name) {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    }

    function setCookie(name, value) {
      // 1 year expiry — effectively "forever" until cookies are cleared
      var maxAge = 60 * 60 * 24 * 365;
      document.cookie = name + '=' + encodeURIComponent(value) +
        '; max-age=' + maxAge + '; path=/; SameSite=Lax';
    }

    var closeBtn = document.querySelector('.nav_banner-close');
    var banner = document.querySelector('.nav_banner');
    var textEl = document.querySelector('.nav_banner-link .text-size-small.is-custom');
    if (!banner) return;

    // Identify the current banner. Prefer a manual data-banner-id attribute
    // on the .nav_banner element, e.g. data-banner-id="promo-july-2026".
    // Falls back to the banner text if no id is set.
    var currentBannerId = banner.getAttribute('data-banner-id') ||
      (textEl ? textEl.textContent.trim() : '');

    var dismissedId = getCookie(COOKIE_NAME);
    if (dismissedId && dismissedId === currentBannerId) {
      banner.style.display = 'none';
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        setCookie(COOKIE_NAME, currentBannerId);
        banner.classList.add('is-hidden');
        banner.addEventListener('transitionend', function handler() {
          banner.style.display = 'none';
          banner.removeEventListener('transitionend', handler);
        });
      });
    }
  });



  document.addEventListener('DOMContentLoaded', function () {
    var maxChars = 80;
    var el = document.querySelector('.nav_banner-link .text-size-small.is-custom');
    if (el) {
      var fullText = el.textContent.trim();
      if (fullText.length > maxChars) {
        el.textContent = fullText.slice(0, maxChars).trim() + '...';
      }
    }
  });



document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.categories_item-btn');

  // --- 1. Set up hover behavior, but respect "current page" buttons ---
  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => btn.classList.add('is-active'));
    btn.addEventListener('mouseleave', () => {
      // Don't remove the active state if this button represents the current page
      if (btn.dataset.current === 'true') return;
      btn.classList.remove('is-active');
    });
  });

  // --- 2. Determine current page and mark/activate the matching button ---
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');

  buttons.forEach(btn => {
    btn.dataset.current = 'false';
    btn.classList.remove('is-active');
  });

  if (path === '/resources') {
    const staticBtn = document.querySelector('[data-button="categories-static-btn"]');
    if (staticBtn) {
      staticBtn.classList.add('is-active');
      staticBtn.dataset.current = 'true';
    }
    return;
  }

  if (path.startsWith('/categories/')) {
    const slug = path.split('/').pop().replace(/-/g, ' '); // "blog", "news", etc.

    buttons.forEach(btn => {
      const btnText = btn.textContent.trim().toLowerCase();
      if (btnText === slug) {
        btn.classList.add('is-active');
        btn.dataset.current = 'true';
      }
    });
  }
});



(function () {
  'use strict';
  var SELECTOR = '.marquee__track';   // change to match your Webflow element
  var DEFAULT_DURATION = 26;          // seconds per set (lower = faster)
  var COPIES = 3;                     // copies for a seamless wrap (>= 2)
  var REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init(track) {
    if (!track || track.__marqueeInit) return;
    var originals = Array.prototype.slice.call(track.children);
    if (!originals.length) return;
    track.__marqueeInit = true;
    for (var c = 1; c < COPIES; c++)
      for (var i = 0; i < originals.length; i++) track.appendChild(originals[i].cloneNode(true));
    if (REDUCE) return;

    track.style.willChange = 'transform';
    if (!track.style.whiteSpace) track.style.whiteSpace = 'nowrap';
    var dur = parseFloat(track.getAttribute('data-marquee-duration')) || DEFAULT_DURATION;
    var reverse = track.hasAttribute('data-marquee-reverse');
    var setW = 0, offset = 0, last = 0, raf = 0;

    function measure() { setW = track.scrollWidth / COPIES; }
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!last) { last = now; return; }
      var dt = (now - last) / 1000; last = now;
      if (dt > 0.1) dt = 0.1;
      if (setW <= 0) { measure(); return; }
      offset = (offset + (setW / dur) * dt) % setW;
      var x = reverse ? (offset - setW) : -offset;
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
    }
    function run() { measure(); if (!raf) raf = requestAnimationFrame(frame); }

    var pending = Array.prototype.slice.call(track.querySelectorAll('img')).filter(function (im) { return !im.complete; });
    if (!pending.length) { run(); }
    else {
      var left = pending.length;
      var done = function () { if (--left <= 0) run(); };
      pending.forEach(function (im) { im.addEventListener('load', done, { once: true }); im.addEventListener('error', done, { once: true }); });
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
    window.addEventListener('load', run);
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(measure, 200); });
  }
  function boot() { var t = document.querySelectorAll(SELECTOR); for (var i = 0; i < t.length; i++) init(t[i]); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();



(function () {
  // Act-1 progress where the bar shows. Bundle default: 0.4 to 0.56.
  var START = 0;
  var END = 0.56;

  var stage = document.querySelector('.stage-scroll');
  if (!stage) return;

  function tick() {
    var range = stage.offsetHeight - innerHeight;
    var s = Math.min(1, Math.max(0, -stage.getBoundingClientRect().top / range));
    var p = Math.min(1, s / (innerWidth >= 992 ? 0.375 : 1));
    var on = p >= START && p < END;
    if (document.body.classList.contains('logo-early') !== on) {
      document.body.classList.toggle('logo-early', on);
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();



(function () {
  var el = document.querySelector('.section_statement.show-tablet');
  if (!el) return;
  var START = 0.65, END = 0.35; // top 35%-from-bottom -> 0 ; 35%-from-top -> 1
  el.style.willChange = 'opacity';
  function render() {
    var vh = window.innerHeight, top = el.getBoundingClientRect().top;
    var t = (START * vh - top) / ((START - END) * vh);
    el.style.opacity = Math.min(Math.max(t, 0), 1).toFixed(3);
  }
  var ticking = false;
  function onScroll(){ if (ticking) return; ticking = true; requestAnimationFrame(function(){ render(); ticking = false; }); }
  render();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
})();


gsap.registerPlugin(ScrollTrigger,SplitText);


  document.addEventListener("DOMContentLoaded", () => {
    //START OF DOM

    //Lenis Setup
    let lenis;
    
    // Initialize Lenis (only outside Webflow Editor)
    if (typeof Webflow === "undefined" || (Webflow.env && Webflow.env("editor") === undefined)) {
      lenis = new Lenis({
        lerp: 0.15,
        wheelMultiplier: 1,
        gestureOrientation: "vertical",
        normalizeWheel: false,
        smoothTouch: false,
      });

      // --- START OF DYNAMIC OFFSET & TOC FIX ---
      document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a[href^="#"]');
        
        if (anchor) {
          const targetId = anchor.getAttribute('href');
          
          if (targetId === '#' || targetId === '' || anchor.hasAttribute('data-w-tab')) return; 

          if (targetId.startsWith('#')) {
             const targetElement = document.querySelector(targetId);

             if (targetElement) {
               e.preventDefault(); 
               e.stopPropagation(); 
               
               // DYNAMIC OFFSET: Automatically get the height of your fixed navbar
               let scrollOffset = -80; // Fallback value
               const navbar = document.querySelector('.navbar'); // <--- UPDATE THIS CLASS IF NEEDED
               
               if (navbar) {
                 scrollOffset = -(navbar.offsetHeight); // Turns height into a negative number for Lenis
               }
               
               // THE FIX: Faster duration and proper mathematical easing
               lenis.scrollTo(targetElement, {
                 offset: scrollOffset, 
                 duration: 0.8, 
                 easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
               });
             }
          }
        }
      }, true); 
      // --- END OF DYNAMIC OFFSET & TOC FIX ---

      // Disable pointer-events on videos while scrolling
      const videoWrappers = document.querySelectorAll('.common-lock-up_video.w-video.w-embed');
      let lastScrollPos = lenis.scroll || window.scrollY;

      function checkScroll() {
        const currentScrollPos = lenis.scroll || window.scrollY;

        videoWrappers.forEach(wrapper => {
          wrapper.style.pointerEvents = currentScrollPos !== lastScrollPos ? 'none' : 'auto';
        });

        lastScrollPos = currentScrollPos;
        requestAnimationFrame(checkScroll);
      }

      requestAnimationFrame(checkScroll);

      // Back to Top Button
      const backToTop = document.getElementById("backToTop");
      if (backToTop) {
        backToTop.addEventListener("click", (e) => {
          e.preventDefault();
          lenis.scrollTo(0, {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        });

        window.addEventListener("scroll", () => {
          const visible = window.scrollY > 300;
          backToTop.style.opacity = visible ? "1" : "0";
          backToTop.style.pointerEvents = visible ? "auto" : "none";
        }, { passive: true });
      }

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // jQuery check
    if (typeof $ === "undefined") {
      console.warn("jQuery is required for this script.");
      return;
    }

    // Start Lenis
    $("[data-lenis-start]").on("click", function () {
      lenis.start();
    });

    // Stop Lenis
    $("[data-lenis-stop]").on("click", function () {
      lenis.stop();
    });

    // Toggle Lenis Scroll
    $("[data-lenis-toggle]").on("click", function () {
      $(this).toggleClass("stop-scroll");
      $(this).hasClass("stop-scroll") ? lenis?.stop() : lenis?.start();
    });

    //END OF DOM
  });



  document.addEventListener("DOMContentLoaded", () => {
    //START OF DOM

    // Array to store SplitText instances
    let splits = [];

    function runSplitText() {
      // Revert previous splits
      splits.forEach(s => s.revert());
      splits = [];

      // Find all target elements
      const elements = document.querySelectorAll("[text-animate], [split-text]");

      elements.forEach(el => {
        const splitInstance = new SplitText(el, {
          type: "lines, words",
          linesClass: "line",
          wordsClass: "word",
          mask: "lines"
        });
        splits.push(splitInstance);
      });
    }

    // Wait until fonts are loaded before splitting
    document.fonts.ready.then(() => {
      runSplitText();

      // Re-split on width change
      let windowWidth = window.innerWidth;
      window.addEventListener("resize", () => {
        if (windowWidth !== window.innerWidth) {
          windowWidth = window.innerWidth;
          runSplitText();
        }
      });

      // Animation Types
      let animateLines = document.querySelectorAll("[text-animate='lines']");
      let animateWord = document.querySelectorAll("[text-animate='words']");
      let animateScrub = document.querySelectorAll("[text-animate='scrub']");

      // Lines Slide Up Animation
      animateLines.forEach(function (el) {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom bottom"
          }
        }).from(el.querySelectorAll(".line"), {
          yPercent: 115,
          duration: 1,
          ease: "power3.out",
          stagger: 0.01,
          delay: 0.5
        });
      });

      // Words Slide Up Animation
      animateWord.forEach(function (el) {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom bottom"
          }
        }).from(el.querySelectorAll(".word"), {
          yPercent: 115,
          duration: 1,
          ease: "power3.out",
          stagger: 0.01,
          delay: 0.5
        });
      });

      // Word Fade-In Scrub Animation
      animateScrub.forEach(function (el) {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        }).from(el.querySelectorAll(".word"), {
          opacity: 0.3,
          duration: 0.4,
          ease: "power1.out",
          stagger: 0.1
        });
      });
    });

    // Fade In Children
    $("[fade-in]").each(function () {
      gsap.timeline({
        scrollTrigger: {
          trigger: this,
          start: "top bottom",
          end: "bottom bottom"
        }
      }).from($(this).children(), {
        opacity: 0,
        y: "1.5rem",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.01,
        delay: 0.5
      });
    });

    // Fade In Self
    $("[fade-in-self]").each(function () {
      gsap.timeline({
        scrollTrigger: {
          trigger: this,
          start: "top bottom",
          end: "bottom bottom"
        }
      }).from($(this), {
        opacity: 0,
        y: "1.5rem",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.01,
        delay: 0.5
      });
    });

    // Parallax Images
    $("[parallax-image]").each(function () {
      gsap.timeline({
        scrollTrigger: {
          trigger: this,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }).from($(this), {
        yPercent: -15,
        ease: "none"
      });
    });

    // Avoid Flashing Content
    document.fonts.ready.then(() => {
      gsap.set(".page-wrapper", { opacity: 1 });
    });

    //END OF DOM
  });



document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector('.nav_inner');
    const scrollThreshold = 0.01; // 1%

    function checkScroll() {
        // Calculate scroll percentage
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollTop / docHeight;

        if (scrollPercent > scrollThreshold) {
            nav.classList.add('is-scroll');
        } else {
            nav.classList.remove('is-scroll');
        }
    }

    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Check on initial load/refresh
    checkScroll();
});



  document.addEventListener("DOMContentLoaded", () => {
    // START OF DOM

    const currentYear = new Date().getFullYear();
    document.querySelectorAll('[data-current-year]').forEach(el => {
      el.textContent = currentYear;
    });

    //END OF DOM
  });



  document.addEventListener("DOMContentLoaded", () => {
    function initAccordions() {
      const accordions = document.querySelectorAll('[data-accordion="component"]');

      accordions.forEach(acc => {
        acc.addEventListener('click', () => {
          const isOpen = acc.getAttribute('data-accordion-state') === 'open';

          // Close every accordion on the page (not just siblings under one parent)
          accordions.forEach(item => {
            item.setAttribute('data-accordion-state', 'close');
          });

          // Re-open the clicked one only if it wasn't already open
          acc.setAttribute('data-accordion-state', isOpen ? 'close' : 'open');
        });
      });
    }

    initAccordions();
  });



gsap.registerPlugin(SplitText);

function initButton066() {
  const buttons = document.querySelectorAll('[data-button-066]');
  if (buttons.length === 0) return;

  buttons.forEach((element) => {
    const text = element.querySelector('[data-button-066-text]');
    const icon = element.querySelector('[data-button-066-icon]');
    if (!text) return;

    const splitText = new SplitText(text, {
      type: 'chars',
      tag: 'span',
      charsClass: 'button-066__split-char',
      propIndex: true,
    });

    gsap.set(splitText.chars, { display: 'inline-block' });

    const charCount = splitText.chars?.length ?? 0;
    const iconIsBeforeText = !!icon && !!(icon.compareDocumentPosition(text) & Node.DOCUMENT_POSITION_FOLLOWING);
    const getDirection = (globalIndex) => (globalIndex % 2 === 0 ? -1 : 1);

    if (icon) {
      const iconGlobalIndex = iconIsBeforeText ? 0 : charCount;
      icon.style.setProperty('--button-066-char-direction', getDirection(iconGlobalIndex));

      const index = iconIsBeforeText ? 0 : charCount + 1;
      icon.style.setProperty('--index', index);
      element.style.setProperty('--button-066-index-offset', '0');
    }

    const charStartIndex = iconIsBeforeText ? 1 : 0;

    splitText.chars.forEach((charEl, i) => {
      const globalIndex = charStartIndex + i;
      charEl.style.setProperty('--button-066-char-direction', getDirection(globalIndex));
    });
  });
}

// Initialize Button 066
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton066();
  });
});



document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector('.nav_inner');
    const dropdownToggle = document.querySelector('.w-dropdown-toggle');
    const scrollThreshold = 0.01;

    // Set your transition duration here
    const transitionTime = '0.3s';

    function checkScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollTop / docHeight;

        if (scrollPercent > scrollThreshold && !dropdownToggle.classList.contains('w--open')) {
            nav.style.transition = `all ${transitionTime} ease`;
            nav.classList.add('is-scroll');
        } else {
            nav.classList.remove('is-scroll');
        }
    }

    window.addEventListener('scroll', checkScroll);

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === "class") {
                const isOpen = dropdownToggle.classList.contains('w--open');
                
                if (isOpen) {
                    // Set transition to 0s for instant removal
                    nav.style.transition = '0s';
                    nav.classList.remove('is-scroll');
                } else {
                    // Re-apply transition and check scroll position
                    nav.style.transition = `all ${transitionTime} ease`;
                    checkScroll();
                }
            }
        });
    });

    observer.observe(dropdownToggle, { attributes: true });
});



  document.addEventListener("DOMContentLoaded", () => {
    // START OF DOM
    // Nav Change State
    let nav = $(".nav");
    gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=80",
        onEnterBack: () => {
          nav.removeClass("is-scrolled");
        },
        onLeave: () => {
          nav.addClass("is-scrolled");
        }
      }
    });
    // Mobile Menu
    function initMenuOpen() {
      // Elements that just need the staggered animation (no close-on-click)
      const animatedEls = document.querySelectorAll(
        "[data-nav-link], [data-nav-animate]"
      );
      // Apply CSS transition delay to all animated elements
      animatedEls.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
      });

      // Elements that close the menu on click
      const navLinks = document.querySelectorAll("[data-nav-link]");
      const toggleBtns = document.querySelectorAll(
        '[data-nav-button="toggle"]'
      );
      const closeBtns = document.querySelectorAll(
        '[data-nav-button="close"]'
      );
      const navStatusEl = document.querySelector("[data-nav-status]");
      const navMenuInner = document.querySelector(".nav_menu-inner");
      // Ensure an initial state
      if (navStatusEl && !navStatusEl.getAttribute("data-nav-status")) {
        navStatusEl.setAttribute("data-nav-status", "closed");
      }
      const openMenu = () => {
        if (!navStatusEl) return;
        navStatusEl.setAttribute("data-nav-status", "open");
        navMenuInner?.classList.add("is-open");
        lenis.stop();
      };
      const closeMenu = () => {
        if (!navStatusEl) return;
        navStatusEl.setAttribute("data-nav-status", "closed");
        navMenuInner?.classList.remove("is-open");
        lenis.start();
      };
      const keyHandler = (e) => {
        if (
          e.key === "Escape" &&
          navStatusEl?.getAttribute("data-nav-status") === "open"
        ) {
          closeMenu();
        }
      };
      const toggleHandler = () => {
        if (!navStatusEl) return;
        const isOpen =
          navStatusEl.getAttribute("data-nav-status") === "open";
        isOpen ? closeMenu() : openMenu();
      };
      const closeHandler = () => {
        closeMenu();
      };
      // Add event listeners
      toggleBtns.forEach((btn) =>
        btn.addEventListener("click", toggleHandler)
      );
      closeBtns.forEach((btn) =>
        btn.addEventListener("click", closeHandler)
      );
      // Only data-nav-link closes the menu on click
      navLinks.forEach((link) =>
        link.addEventListener("click", closeHandler)
      );
      document.addEventListener("keydown", keyHandler);
      // Cleanup function
      return () => {
        toggleBtns.forEach((btn) =>
          btn.removeEventListener("click", toggleHandler)
        );
        closeBtns.forEach((btn) =>
          btn.removeEventListener("click", closeHandler)
        );
        navLinks.forEach((link) =>
          link.removeEventListener("click", closeHandler)
        );
        document.removeEventListener("keydown", keyHandler);
      };
    }
    let cleanupMenu = null;
    function handleResponsiveInit() {
      const isTabletDown = window.matchMedia(
        "(max-width: 991px)"
      ).matches;
      if (isTabletDown && !cleanupMenu) {
        cleanupMenu = initMenuOpen();
      } else if (!isTabletDown && cleanupMenu) {
        cleanupMenu();
        cleanupMenu = null;
        const navStatusEl = document.querySelector(
          "[data-nav-status]"
        );
        const navMenuInner = document.querySelector(".nav_menu-inner");
        if (navStatusEl) {
          navStatusEl.setAttribute("data-nav-status", "closed");
        }
        navMenuInner?.classList.remove("is-open");
        lenis.start();
      }
    }
    // Init
    handleResponsiveInit();
    window.addEventListener("resize", handleResponsiveInit);
    // END OF DOM
  });



  document.addEventListener("DOMContentLoaded", () => {

    ScrollTrigger.matchMedia({

      // ===== DESKTOP ONLY (992px and up) =====
      "(min-width: 992px)": function () {

        const video = document.querySelector(".bg-video-2 video");

        ScrollTrigger.create({
          trigger: ".cta-sticky",
          start: "60% top",
          once: true,
          onEnter: () => {
            if (video && video.paused) video.play();
          }
        });

        gsap.to(".footer_logo-wrap-2", {
          y: "60svh",
          ease: "none",
          scrollTrigger: {
            trigger: ".cta-sticky",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            // markers: true,
          }
        });

      },

      // ===== TABLET (768px - 991px) =====
      "(min-width: 768px) and (max-width: 991px)": function () {

        const video = document.querySelector(".bg-video-2 video");

        ScrollTrigger.create({
          trigger: ".cta-sticky",
          start: "60% top",
          once: true,
          onEnter: () => {
            if (video && video.paused) video.play();
          }
        });

        gsap.to(".footer_logo-wrap-2", {
          y: "75svh",
          ease: "none",
          scrollTrigger: {
            trigger: ".cta-sticky",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            // markers: true,
          }
        });

      },

      // ===== MOBILE (up to 767px, landscape + portrait) =====
      "(max-width: 767px)": function () {

        const video = document.querySelector(".bg-video-2 video");

        ScrollTrigger.create({
          trigger: ".cta-sticky",
          start: "60% top",
          once: true,
          onEnter: () => {
            if (video && video.paused) video.play();
          }
        });

        gsap.to(".footer_logo-wrap-2", {
          y: "75svh",
          ease: "none",
          scrollTrigger: {
            trigger: ".cta-sticky",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            // markers: true,
          }
        });

      }

    });

  });



  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".section_footer").forEach((footerSection) => {
      const video = footerSection.querySelector(".bg-video-2 video");

      ScrollTrigger.create({
        trigger: footerSection,
        start: "top 50%", // fires when the section's top crosses the middle of the viewport
        once: true,
        onEnter: () => {
          if (video && video.paused) video.play();
        }
      });
    });
  });



  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.team-slider_component').forEach((component) => {
      const cmsWrap = component.querySelector('.swiper');
      if (!cmsWrap) return;

      // Prevent transitions from firing on initial load
      cmsWrap.classList.add('is-initializing');

      // Randomize which sign starts the pattern, so it's not identical every page load
      const startSign = Math.random() < 0.5 ? 1 : -1;

      cmsWrap.querySelectorAll('.swiper-slide').forEach((slide, index) => {
        const magnitude = 20 + Math.random() * 10; // random 20–30
        // Sign flips every 2 slides: +,+,-,-,+,+,-,- ...
        const block = Math.floor(index / 2);
        const sign = block % 2 === 0 ? startSign : -startSign;
        const randomDeg = sign * magnitude;
        slide.style.setProperty('--rock-rotate', `${randomDeg.toFixed(2)}deg`);
      });

      const swiper = new Swiper(cmsWrap, {
        slidesPerView: 'auto',
        followFinger: true,
        freeMode: false,
        spaceBetween: 200,
        slideToClickedSlide: false,
        centeredSlides: true,
        loop: true,
        autoHeight: false,
        speed: 900,
        slideActiveClass: 'is-active',
        slideDuplicateActiveClass: 'is-active',
        mousewheel: {
          forceToAxis: true,
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        navigation: {
          nextEl: component.querySelector('.testimonial_arrow.is-next'),
          prevEl: component.querySelector('.testimonial_arrow.is-prev'),
        },
        pagination: {
          el: component.querySelector('.team-slider_bullet_wrap'),
          bulletActiveClass: 'is-active',
          bulletClass: 'team-slider_bullet_item',
          bulletElement: 'button',
          clickable: true,
        },
        scrollbar: {
          el: component.querySelector('.team-slider_draggable_wrap'),
          draggable: true,
          dragClass: 'team-slider_draggable_handle',
          snapOnRelease: true,
        },
        on: {
          init() {
            // Force layout, then re-enable transitions on the next frame
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                cmsWrap.classList.remove('is-initializing');
              });
            });
          },
        },
      });
    });
  });



  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.testimonials_rock-wrapper').forEach((wrapper) => {
      // Negative delay drops each wrapper into a different point of the loop immediately
      const randomDelay = -(Math.random() * 7).toFixed(2);
      // Slight duration variance so they drift out of phase over time too
      const randomDuration = (6 + Math.random() * 2).toFixed(2); // 6s–8s
      // Randomly flip direction on each axis independently
      const dirX = Math.random() < 0.5 ? 1 : -1;
      const dirY = Math.random() < 0.5 ? 1 : -1;
      wrapper.style.setProperty('--float-delay', `${randomDelay}s`);
      wrapper.style.setProperty('--float-duration', `${randomDuration}s`);
      wrapper.style.setProperty('--float-dir-x', dirX);
      wrapper.style.setProperty('--float-dir-y', dirY);
    });
  });



document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".s_component").forEach((component) => {
    const sWrap = component.querySelector(".swiper");
    if (!sWrap) return;

    const navNumberEl = component.querySelector(".testimonials_nav-number");
    const currentEl = navNumberEl?.querySelector(".s_nav-current");
    const totalEl = navNumberEl?.querySelector(".s_nav-total");

    // pads single digits with a leading zero: 1 -> "01", 12 -> "12"
    const pad = (num) => String(num).padStart(2, "0");

    const updateNavNumber = (swiper) => {
      if (!navNumberEl) return;

      // realIndex accounts for loop mode; use activeIndex if loop is off
      const current = (swiper.params.loop ? swiper.realIndex : swiper.activeIndex) + 1;
      const total = swiper.params.loop
        ? swiper.slides.length - (swiper.loopedSlides ? swiper.loopedSlides * 2 : 0)
        : swiper.slides.length;

      if (currentEl && totalEl) {
        currentEl.textContent = pad(current);
        totalEl.textContent = pad(total);
      } else {
        // fallback if it's just one text node like "01/03"
        navNumberEl.textContent = `${pad(current)}/${pad(total)}`;
      }
    };

    const swiper = new Swiper(sWrap, {
      slidesPerView: "auto",
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      centeredSlides: true,
      spaceBetween: 20,
      autoHeight: false,
      speed: 700,
      slideActiveClass: "is-active",
      slideDuplicateActiveClass: "is-active",
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      navigation: {
        nextEl: component.querySelector(".s_btn_element.is-next"),
        prevEl: component.querySelector(".s_btn_element.is-prev"),
      },
      pagination: {
        el: component.querySelector(".s_bullet_wrap"),
        bulletActiveClass: "is-active",
        bulletClass: "s_bullet_item",
        bulletElement: "button",
        clickable: true,
      },
      scrollbar: {
        el: component.querySelector(".s_draggable_wrap"),
        draggable: true,
        dragClass: "s_handle",
        snapOnRelease: true,
      },
      on: {
        init: updateNavNumber,
        slideChange: updateNavNumber,
      },
    });
  });
});



  document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('[data-why-accordion]');

    function setHeight(item, opening) {
      const wrap = item.querySelector('.why_paragraph-wrap');
      if (!wrap) return;

      if (opening) {
        // measure natural height
        wrap.style.height = 'auto';
        const fullHeight = wrap.scrollHeight;
        wrap.style.height = '0px';
        // force reflow so the transition triggers from 0
        wrap.offsetHeight;
        wrap.style.height = fullHeight + 'px';
      } else {
        // collapse from current height to 0
        const currentHeight = wrap.scrollHeight;
        wrap.style.height = currentHeight + 'px';
        wrap.offsetHeight;
        wrap.style.height = '0px';
      }
    }

    function openItem(item) {
      item.classList.add('is-active');
      setHeight(item, true);
    }

    function closeItem(item) {
      item.classList.remove('is-active');
      setHeight(item, false);
    }

    // Initialize: first item open, rest closed
    accordions.forEach((item, index) => {
      if (index === 0) {
        item.classList.add('is-active');
        const wrap = item.querySelector('.why_paragraph-wrap');
        if (wrap) wrap.style.height = wrap.scrollHeight + 'px';
      } else {
        item.classList.remove('is-active');
      }
    });

    accordions.forEach((item) => {
      const trigger = item.querySelector('.why_content-top');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('is-active');

        accordions.forEach((other) => {
          if (other.classList.contains('is-active')) {
            closeItem(other);
          }
        });

        if (!isActive) {
          openItem(item);
        }
      });
    });
  });



  document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = document.querySelector('.why_wrapper'); // 180svh
    const stickyEl = document.querySelector('.why_content-wrapper'); // 100svh, sticky
    const items = document.querySelectorAll('[data-why-scroll]');
    const total = items.length;

    if (!wrapper || !stickyEl || !total) return;

    const DURATION = 0.4;
    const EASE = 'power2.out';

    const ACTIVE_HEADING_COLOR = '#f5f5f0';
    const ACTIVE_NUMBER_COLOR = '#f9fe2e';
    const DISABLED_HEADING_COLOR = '#343434';
    const DISABLED_NUMBER_COLOR = '#343434';

    function setActive(index) {
      items.forEach((item, i) => {
        const paragraphWrap = item.querySelector('.why_paragraph-wrap');
        const heading = item.querySelector('.why_content-heading');
        const number = item.querySelector('.why_content-number');
        const spacer = item.querySelector('.why_spacer');

        if (i === index) {
          gsap.to(paragraphWrap, { height: 'auto', duration: DURATION, ease: EASE });
          gsap.to(heading, { color: ACTIVE_HEADING_COLOR, duration: DURATION, ease: EASE });
          gsap.to(number, { color: ACTIVE_NUMBER_COLOR, duration: DURATION, ease: EASE });
          if (spacer) gsap.set(spacer, { display: 'block' });
        } else {
          gsap.to(paragraphWrap, { height: 0, duration: DURATION, ease: EASE });
          gsap.to(heading, { color: DISABLED_HEADING_COLOR, duration: DURATION, ease: EASE });
          gsap.to(number, { color: DISABLED_NUMBER_COLOR, duration: DURATION, ease: EASE });
          if (spacer) gsap.set(spacer, { display: 'none' });
        }
      });
    }

    // Initial state: first item active, rest disabled (no animation on load)
    items.forEach((item, i) => {
      const paragraphWrap = item.querySelector('.why_paragraph-wrap');
      const heading = item.querySelector('.why_content-heading');
      const number = item.querySelector('.why_content-number');
      const spacer = item.querySelector('.why_spacer');

      gsap.set(paragraphWrap, { height: i === 0 ? 'auto' : 0 });
      gsap.set(heading, { color: i === 0 ? ACTIVE_HEADING_COLOR : DISABLED_HEADING_COLOR });
      gsap.set(number, { color: i === 0 ? ACTIVE_NUMBER_COLOR : DISABLED_NUMBER_COLOR });
      if (spacer) gsap.set(spacer, { display: i === 0 ? 'block' : 'none' });
    });

    let currentIndex = 0;

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      // End exactly when the sticky element disengages:
      // total scroll distance while sticky = wrapper height - sticky element height
      end: () => `+=${wrapper.offsetHeight - stickyEl.offsetHeight}`,
      // markers: true, // uncomment to debug start/end positions
      onUpdate: (self) => {
        let index = Math.floor(self.progress * total);
        if (index >= total) index = total - 1;
        if (index < 0) index = 0;

        if (index !== currentIndex) {
          currentIndex = index;
          setActive(currentIndex);
        }
      },
      onLeaveBack: () => {
        currentIndex = 0;
        setActive(0);
      },
    });

    // Recalculate end value on resize since it depends on element heights
    ScrollTrigger.addEventListener('refreshInit', () => {
      // ScrollTrigger automatically re-evaluates the function-based `end`
    });
  });



  (function () {
    const items = document.querySelectorAll('[data-why-accordion="item"]');

    function setHeight(item, open) {
      const wrap = item.querySelector('[data-why-accordion="paragraph-wrap"]');
      if (open) {
        wrap.style.height = wrap.scrollHeight + 'px';
        // once expanded, allow auto height for responsive content
        wrap.addEventListener('transitionend', function handler(e) {
          if (e.propertyName === 'height' && item.classList.contains('is-active')) {
            wrap.style.height = 'auto';
          }
          wrap.removeEventListener('transitionend', handler);
        });
      } else {
        // if currently auto, set explicit px first so the transition can run
        if (wrap.style.height === 'auto' || wrap.style.height === '') {
          wrap.style.height = wrap.scrollHeight + 'px';
          // force reflow
          wrap.offsetHeight;
        }
        requestAnimationFrame(() => {
          wrap.style.height = '0px';
        });
      }
    }

    items.forEach((item) => {
      const top = item.querySelector('[data-why-accordion="content-top"]');
      top.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-active');
        if (isOpen) return; // clicking the open one keeps it open; remove this line to allow full close

        items.forEach((other) => {
          if (other !== item && other.classList.contains('is-active')) {
            other.classList.remove('is-active');
            setHeight(other, false);
          }
        });

        item.classList.add('is-active');
        setHeight(item, true);
      });
    });

    // initialize first item's wrap to auto height on load
    window.addEventListener('load', () => {
      items.forEach((item) => {
        if (item.classList.contains('is-active')) {
          const wrap = item.querySelector('[data-why-accordion="paragraph-wrap"]');
          wrap.style.height = wrap.scrollHeight + 'px';
          requestAnimationFrame(() => {
            wrap.style.height = 'auto';
          });
        }
      });
    });
  })();



  document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('[data-tabs-accordion]');

    function setHeight(item, opening) {
      const wrap = item.querySelector('.tabs_paragraph-wrap');
      if (!wrap) return;
      if (opening) {
        wrap.style.height = 'auto';
        const fullHeight = wrap.scrollHeight;
        wrap.style.height = '0px';
        wrap.offsetHeight;
        wrap.style.height = fullHeight + 'px';
        wrap.addEventListener('transitionend', function handler(e) {
          if (e.propertyName === 'height' && item.classList.contains('is-active')) {
            wrap.style.height = 'auto';
          }
          wrap.removeEventListener('transitionend', handler);
        });
      } else {
        wrap.style.height = wrap.scrollHeight + 'px';
        wrap.offsetHeight;
        wrap.style.height = '0px';
      }
    }

    function openItem(item) {
      item.classList.add('is-active');
      setHeight(item, true);
    }

    function closeItem(item) {
      item.classList.remove('is-active');
      setHeight(item, false);
    }

    accordions.forEach((item, index) => {
      const wrap = item.querySelector('.tabs_paragraph-wrap');
      if (index === 0) {
        item.classList.add('is-active');
        if (wrap) wrap.style.height = 'auto';
      } else {
        item.classList.remove('is-active');
        if (wrap) wrap.style.height = '0px';
      }
    });

    accordions.forEach((item) => {
      const trigger = item.querySelector('.tabs_content-top');
      if (!trigger) return;
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('is-active');
        const offset = 120;

        const triggerTop = trigger.getBoundingClientRect().top;
        let heightAbove = 0;
        accordions.forEach((other) => {
          if (other === item) return;
          if (!other.classList.contains('is-active')) return;
          const otherTop = other.querySelector('.tabs_content-top').getBoundingClientRect().top;
          if (otherTop < triggerTop) {
            const wrap = other.querySelector('.tabs_paragraph-wrap');
            if (wrap) heightAbove += wrap.scrollHeight;
          }
        });

        accordions.forEach((other) => {
          if (other.classList.contains('is-active')) {
            closeItem(other);
          }
        });

        if (!isActive) {
          openItem(item);
          const targetY = window.scrollY + triggerTop - heightAbove - offset;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      });
    });
  });


(function(a,e,b,f,g,c,d){a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)};c=e.createElement(f);c.async=1;c.src="https://www.clarity.ms/tag/"+g;d=e.getElementsByTagName(f)[0];d.parentNode.insertBefore(c,d)})(window,document,"clarity","script","nuzd62ptt3");

_linkedin_partner_id="6421658";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);

(function(a){a||(window.lintrk=function(c,d){window.lintrk.q.push([c,d])},window.lintrk.q=[]);a=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=!0;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";a.parentNode.insertBefore(b,a)})(window.lintrk);

!function(a,b,d,e){if(!a.oaiq){var c=function(){c.q.push(arguments)};c.q=[];a.oaiq=c;a=b.createElement(d);a.async=1;a.src=e;b=b.getElementsByTagName(d)[0];b.parentNode.insertBefore(a,b)}}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"3Qqq9m6ziHVG6v7Dd9Cu1e",debug:!0});oaiq("measure","page_viewed",{type:"contents"});oaiq("measure","registration_completed",{type:"customer_action"});