// ==UserScript==
// @name         Leave class automatically
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Leave meetings on teams depending on number of attendees
// @author       You
// @match        https://teams.microsoft.com/*
// @icon         https://www.google.com/s2/favicons?domain=teams.microsoft.com
// @grant        nonea
// ==/UserScript==

(function () {
  "use strict";
  let peak = 0;

  setInterval(() => {
    const number = parseInt(
      document
        .getElementsByClassName("roster-list-title")[1]
        ?.ariaLabel?.split("Attendees ")[1]
    );

    let threshold = 10;

    if (number) {
      peak < number ? (peak = number) : (peak = peak);

      if (peak > 50) {
        threshold = 30;
      } else if (peak > 32) {
        threshold = 22;
      } else if (peak > 22) {
        threshold = 18;
      } else {
        threshold = 12;
      }

      console.log({ peak, threshold, number });

      if (number <= threshold) {
        document.getElementById("hangup-button").click();
        console.log("hung up");
        peak = 0;
        threshold = 10;
      }
    } else {
      const roster_panel = document.getElementsByTagName("calling-roster")[0];

      if (!roster_panel || roster_panel.className.includes("ng-hide")) {
        document.getElementById("roster-button").click();
        console.log("opened roster panel");
      }
    }
  }, 5000);
})();
