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
            peak > 35 ? (threshold = 18) : (threshold = 10);

            console.log({ peak, threshold, number });

            if (number <= threshold) {
                document.getElementById("hangup-button").click();
                console.log("clicked");
                peak = 0;
            }
        }
    }, 5000);
})();
