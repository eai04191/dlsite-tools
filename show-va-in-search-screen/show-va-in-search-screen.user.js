// ==UserScript==
// @name         DLsite Show VA in Search Screen
// @namespace    mizle.net
// @version      0.1
// @author       Eai
// @match        https://www.dlsite.com/*/fsr/*
// @match        https://www.dlsite.com/*/campaign/*
// @grant        none
// ==/UserScript==

(function() {
  "use strict";

  document
    .querySelectorAll(".search_result_img_box_inner")
    .forEach(function(element) {
      if (element.querySelector(".type_SOU")) {
        const url = element.querySelector(".work_thumb_inner").href;
        fetch(url)
          .then(function(response) {
            return response.text();
          })
          .then(function(html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            return doc.querySelector("#work_outline");
          })
          .then(function(element) {
            const actors = document.evaluate(
              "//th[text()='声優']/following-sibling::td",
              element,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            );
            return actors;
          })
          .then(function(actors) {
            const html = actors.singleNodeValue.innerHTML;
            const maker = element.querySelector(".maker_name ");
            const dupNode = maker.cloneNode(false);
            dupNode.innerHTML = "声優: " + html;
            dupNode.style.whiteSpace = "normal";
            maker.parentNode.insertBefore(dupNode, maker.nextSibling);
          })
          .catch(function(err) {
            console.warn(url, err);
          });
      }
    });
})();
