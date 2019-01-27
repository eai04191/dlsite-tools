// ==UserScript==
// @name         DLsite Owned Item Highlight
// @namespace    mizle.net
// @version      0.1
// @author       Eai
// @license      MIT
// @supportURL   https://github.com/eai04191/dlsite-tools/issues
// @match        https://www.dlsite.com/*/fsr/*
// @match        https://www.dlsite.com/*/campaign/*
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
