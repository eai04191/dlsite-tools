// ==UserScript==
// @name         DLsite Review Points in Item page
// @namespace    mizle.net
// @version      0.0.1
// @author       Eai
// @license      MIT
// @supportURL   https://github.com/eai04191/dlsite-tools/issues
// @match        https://www.dlsite.com/*/work/=/product_id/*
// ==/UserScript==

(function() {
    "use strict";

    const id = location.href.match(/(..\d{6})/)[1];
    const type = location.href.match(/dlsite\.com\/(.+)\/work/)[1];

    const url = `https://www.dlsite.com/${type}/review/write/work/=/product_id/${id}.html`;
    fetch(url)
        .then(res => res.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const score = doc.querySelector(".rating_list_reveiw [checked]")
                ? doc.querySelector(".rating_list_reveiw [checked]").value
                : "なし";
            return score;
        })
        .then(score => {
            const star = document.querySelector(".star_rating");
            star.insertAdjacentHTML("beforeend", " あなたの評価: " + score);
        })
        .catch(err => {
            console.warn(url, err);
        });
})();
