// ==UserScript==
// @name         DLsite Owned Item Highlight
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
      if (element.querySelector(".btn_dl")) {
        element.style.backgroundColor = "#FAD4C8";
      }
    });
})();
