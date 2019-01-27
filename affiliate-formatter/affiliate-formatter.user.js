// ==UserScript==
// @name         DLsite Affiliate Formatter
// @description  DLsiteのアフィリエイトリンクをどこでも作れる便利なやつ
// @namespace    mizle.net
// @version      0.2
// @author       Eai
// @license      MIT
// @supportURL   https://github.com/eai04191/dlsite-tools/issues
// @match        https://www.dlsite.com/*
// ==/UserScript==

(function () {
  "use strict";

  const affiliateID = "eai04191";
  const mastodonHost = "stellaria.network";

  function headerInjection() {
    let header = document.getElementsByClassName("eisysGroupHeaderAccount")[0];
    let title = document.title;
    let URL = location.href;

    let category = URL.match(/dlsite.com\/(home|soft|comic|maniax|pro|books|girls|girls-pro|gay|eng|ecchi-eng)\//)[1];

    let affiliateURL = "";
    if (/work\/=\/product_id\//.test(URL)) {
      // 作品ページ
      let workID = URL.match(/(..\d{6})/)[1];
      affiliateURL = `http://www.dlsite.com/${category}/dlaf/=/link/work/aid/${affiliateID}/id/${workID}.html`;
    } else {
      // 作品以外のページ
      affiliateURL = `http://www.dlsite.com/${category}/dlaf/=/aid/${affiliateID}/url/${encodeURIComponent(URL)}`;
    }

    let tweetURLBase = "https://twitter.com/intent/tweet?text=";
    let tootURLBase = `https://${mastodonHost}/share?text=`;
    let tweetText = `${title} ${affiliateURL}`;

    let injectionHTML = `
<li class="eisysGroupHeaderService-link type-dlsite" id="dlaf">
<a href="${tweetURLBase + encodeURIComponent(tweetText)}" target="_blank" id="dlaf-tweet">ツイート</a>
<a href="${tootURLBase + encodeURIComponent(tweetText)}" target="_blank" id="dlaf-tweet">トゥート</a>
<a href="#" id="dlaf-copy-url">URLコピー</a>
<a href="#" id="dlaf-copy-md">MDコピー</a>
</li>`;
    header.innerHTML = injectionHTML + header.innerHTML;

    document.getElementById("dlaf-copy-url").onclick = function () {
      window.prompt("Copy to clipboard: Ctrl+C, Enter", affiliateURL);
    };

    document.getElementById("dlaf-copy-md").onclick = function () {
      let md = `[${title}](${affiliateURL})`;
      window.prompt("Copy to clipboard: Ctrl+C, Enter", md);
    };
  }

  headerInjection();
})();