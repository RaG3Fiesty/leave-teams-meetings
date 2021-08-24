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
    (async () => {
      const number = await parseInt(
        await document
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
          await document.getElementById("hangup-button")?.click();

          console.log("hung up");

          peak = 0;
          threshold = 10;
        }
      } else {
        const roster_panel = await document.getElementsByTagName(
          "calling-roster"
        )[0];

        if (!roster_panel && !roster_panel?.className?.includes("ng-hide")) {
          const roster_button = await document.getElementById("roster-button");

          if (!roster_button?.ariaLabel?.includes("Hide participants")) {
            await roster_button?.click();
          }
          console.log("opened roster panel");
        }
      }
    })();
  }, 5000);
})();
