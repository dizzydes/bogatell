import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Technical Due Diligence | Bogatell',
  description: 'Technical and data due diligence for funding and lower middle market M&A.',
  openGraph: {
    type: 'website',
    title: 'Technical Due Diligence | Bogatell',
    description:
      'Technical and data due diligence for funding and lower middle market M&A.',
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        />
        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16915718759"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16915718759');
          `}
        </Script>
        <Script id="reb2b-tracking" strategy="afterInteractive">
          {`
            !function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("VN080H3V1K6J");
          `}
        </Script>

      </head>
      <body suppressHydrationWarning>
        {children}
        {/* --- HYPERLAND MVP + POSTHOG (Gospel + Smart Tracking) --- */}
{/* --- ANTIFREEZE "VERBOSE" TRACKER --- */}
{/* --- ANTIFREEZE: AGGRESSIVE LOADER & TRACKER --- */}
{/*        <Script
          id="antifreeze-complete"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                  // --- 1. CONFIGURATION ---
                  var MASTER_KEY = "phc_3a7jHLXWH76dbFwtQ2smTB4HQ95QDuWXMAtbv2v6Gbn";
                  var API_HOST = "https://eu.i.posthog.com";

                  var currentScript = document.currentScript || document.querySelector('script[src*="tracker.js"]');
                  var userConfig = window.AFConfig || {};
                  var clientId = userConfig.clientId || (currentScript ? currentScript.getAttribute('data-client-id') : null);
                  var clientId = "TEST"
                  if (!clientId) { console.warn("AF: Tracking skipped. No 'clientId'."); return; }

                  // --- 2. LOADER ---
                  if (!window.posthog) {
                      !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
                      window.posthog.init(MASTER_KEY, { api_host: API_HOST, cookie_name: '__af_' + clientId });
                  }

                  function safeCapture(event, props) {
                      if (window.posthog && window.posthog.capture) {
                          props = props || {};
                          props.client_id = clientId; 
                          window.posthog.capture(event, props);
                      }
                  }

                  // --- 3. HELPER: Class Cleaner ---
                  function getCleanClass(el) {
                      if (!el.className || typeof el.className !== 'string') return '';
                      var classes = el.className.split(' ');
                      // Filter out Tailwind/Bootstrap visual noise to find the "ID-like" class
                      var valid = classes.find(function(c) {
                          return !c.match(/^(flex|grid|block|hidden|relative|absolute|fixed|text-|bg-|p-|m-|w-|h-|border-|gap-|rounded|shadow|items-|justify-|top-|bottom-|left-|right-|z-|space-|max-|min-|font-)/);
                      });
                      return valid ? '.' + valid : '';
                  }

                  // --- 4. HELPER: Identifiers ---
                  
                  // Level 1: The Leaf (Specific Element)
                  function getLeafSignature(el) {
                      if (!el) return 'UNKNOWN';
                      if (el.id) return el.tagName + '#' + el.id;
                      return el.tagName + getCleanClass(el);
                  }

                  // Level 2: The Top Level (Semantic Container)
                  function getTopLevelSignature(el) {
                      var current = el;
                      var depth = 0;
                      // Climb up to find the "Module" or "Section"
                      while (current && current.tagName !== 'BODY' && depth < 10) {
                          var tag = current.tagName;
                          // 1. Explicit ID
                          if (current.id) return { sig: tag + '#' + current.id, el: current };
                          
                          // 2. Semantic Landmark
                          if (['SECTION', 'ARTICLE', 'MAIN', 'NAV', 'HEADER', 'FOOTER', 'ASIDE', 'FORM'].indexOf(tag) !== -1) {
                              return { sig: tag + getCleanClass(current), el: current };
                          }
                          
                          // 3. Named Component (e.g., .pricing-card)
                          var cls = current.className && typeof current.className === 'string' ? current.className : '';
                          if (cls.includes('card') || cls.includes('container') || cls.includes('wrapper')) {
                              return { sig: tag + getCleanClass(current), el: current };
                          }
                          current = current.parentElement;
                          depth++;
                      }
                      return { sig: 'BODY', el: document.body };
                  }

                  function getCleanText(el) {
                      return (el.innerText || el.alt || el.title || "").replace(/\s+/g, ' ').substring(0, 100);
                  }

                  // --- 5. CLICK TRACKING ---
                  document.addEventListener('click', function(e) {
                      var target = e.target.closest('a, button, input[type="submit"], div[role="button"], .card, img');
                      if (target) {
                          var top = getTopLevelSignature(target);
                          safeCapture('element_click', {
                              element: getLeafSignature(target),       // e.g., BUTTON.primary
                              element_text: getCleanText(target),      // e.g., "Book Now"
                              element_top_level: top.sig,              // e.g., SECTION#pricing
                              element_top_level_text: getCleanText(top.el), // e.g., "Pricing Plan Standard..."
                              href: target.href || ""
                          });
                      }
                  }, true);

                  // --- 6. ATTENTION TRACKING ---
                  var TRACKER = { 
                      activeKey: null, // Composite key to detect changes in either level
                      seconds: 0,
                      // Cache previous state for the 'focus_change' event
                      lastLeaf: null, lastLeafText: null, 
                      lastTop: null, lastTopText: null
                  };
                  
                  setInterval(function() {
                      if (document.hidden) return; 

                      var el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
                      if (!el) return;

                      // Identify Levels
                      var leafSig = getLeafSignature(el);
                      var leafText = getCleanText(el);
                      
                      var topObj = getTopLevelSignature(el);
                      var topSig = topObj.sig;
                      var topText = getCleanText(topObj.el);

                      // Unique Key: We switch context if EITHER the specific item OR the section changes
                      var uniqueKey = leafSig + '::' + topSig;

                      if (TRACKER.activeKey === uniqueKey) {
                          TRACKER.seconds++;
                          // Heartbeat (4s)
                          if (TRACKER.seconds > 0 && TRACKER.seconds % 4 === 0) {
                               safeCapture('element_attention', {
                                  element: leafSig,
                                  element_text: leafText,
                                  element_top_level: topSig,
                                  element_top_level_text: topText,
                                  seconds_visible: TRACKER.seconds,
                                  trigger: 'heartbeat'
                               });
                          }
                      } else {
                          // Focus Change: Send data for the PREVIOUS item
                          if (TRACKER.activeKey && TRACKER.seconds > 1) {
                              safeCapture('element_attention', {
                                  element: TRACKER.lastLeaf,
                                  element_text: TRACKER.lastLeafText,
                                  element_top_level: TRACKER.lastTop,
                                  element_top_level_text: TRACKER.lastTopText,
                                  seconds_visible: TRACKER.seconds,
                                  trigger: 'focus_change'
                              });
                          }
                          // Update State
                          TRACKER.activeKey = uniqueKey;
                          TRACKER.seconds = 0;
                          
                          // Store for next "previous" send
                          TRACKER.lastLeaf = leafSig;
                          TRACKER.lastLeafText = leafText;
                          TRACKER.lastTop = topSig;
                          TRACKER.lastTopText = topText;
                      }
                  }, 1000);

              })();
            `
          }}
        />*/}
        {/* AF New Test */}
        <Script id="af-config" strategy="beforeInteractive">
            {`
               window.AFConfig = {
               clientId: "bogatell_prod" 
            };
          `}
        </Script>
        <Script src="https://cdn.autoland.dev/tracker.min.js" strategy="afterInteractive" />
        <Script id="crisp-chat" strategy="afterInteractive">
          {`
            window.$crisp=[];window.CRISP_WEBSITE_ID="b8e22307-6063-4edb-bddd-3df879e7f12f";
            (function(){
              d=document;s=d.createElement("script");
              s.src="https://client.crisp.chat/l.js";
              s.async=1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </Script>
        {/* Analytics and marketing scripts */}
        {/* Defer non-essential scripts */}
        <Script
          id="vtag-ai-js"
          src="https://r2.leadsy.ai/tag.js"
          data-pid="o8snTsHv1SUDJ5qo"
          data-version="062024"
          strategy="lazyOnload"
        />
        <Script
          id="gtag-src"
          src="https://www.googletagmanager.com/gtag/js?id=G-SF3R44BTYG"
          strategy="lazyOnload"
        />
        <Script id="gtag-inline" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', 'G-SF3R44BTYG');
          `}
        </Script>
        <Script id="hotjar-delay" strategy="afterInteractive">
          {`
            setTimeout(function(){
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6599790,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            }, 3000);
          `}
        </Script>
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            try {
              _linkedin_partner_id = "8485826";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
            } catch (e) {
              console.warn("LinkedIn Insight Tag failed to load:", e);
            }
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} alt="" src="https://px.ads.linkedin.com/collect/?pid=8485826&fmt=gif" />
        </noscript>
      </body>
    </html>
  );
}