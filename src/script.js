import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("json", json);

import "@fortawesome/fontawesome-free/js/all";

function replaceCodeSpanWithLink(textToReplace, link, linkText) {
  const codeSpanWithText = document.evaluate(
    `//*[@id="contacts-json"]//span[contains(text(), "${textToReplace}")]`,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  codeSpanWithText.innerHTML = `<a class="hover:underline" href="${link}">"${linkText}<span class="font-serif">&thinsp;<i class="fa-solid fa-arrow-up-right-from-square fa-xs"></i>&hairsp;</span>"</a>`;
}

// animation stuff
// TODO: disable animations if user prefers reduced motion
document.addEventListener("DOMContentLoaded", function () {
  var doReplace = function (attribute) {
    return function () {
      var replacers = document.querySelectorAll("[data-" + attribute + "]");
      for (var i = 0; i < replacers.length; i++) {
        let replaceClasses = JSON.parse(
          replacers[i].getAttribute("data-" + attribute).replace(/'/g, '"')
        );
        Object.keys(replaceClasses).forEach(function (key) {
          replacers[i].classList.remove(key);
          if (replaceClasses[key]) {
            replacers[i].classList.add(replaceClasses[key]);
          }
        });
      }
    };
  };

  setTimeout(doReplace("replace-instant"), 1);
  setTimeout(doReplace("replace-1s"), 1000);
  setTimeout(doReplace("replace-2s"), 2000);
  setTimeout(doReplace("replace-3s"), 3000);
  setTimeout(doReplace("replace-4s"), 4000);

  hljs.highlightAll();

  // absolutely awful processing to make the code block look nice
  replaceCodeSpanWithLink(
    "github.com/RobinsonZ",
    "https://github.com/RobinsonZ",
    "RobinsonZ"
  );
  replaceCodeSpanWithLink(
    "linkedin.com/in/robinsonz/",
    "https://linkedin.com/in/robinsonz/",
    "in/robinsonz"
  );

  // it gets worse
  // go through and add auto-hiding linebreaks to all the colons in the JSON, so that we
  // linebreak between key and value only up to the medium breakpoint
  const jsonCodeblock = document.getElementById("contacts-json");
  jsonCodeblock.innerHTML = jsonCodeblock.innerHTML.replace(
    /:<\/span> /g,
    ':</span> <span class="sm:hidden">\n    </span>'
  );

  // fix copyright year if needed
  document.getElementById("copy-year").textContent = new Date().getFullYear().toString();
});

// this has to go afterwards, because weird syntax happens with this inline definition
(async () => {
  await loadFull(tsParticles);

  const particlesConfig = await (
    await fetch(new URL("./static/particles.json", import.meta.url))
  ).json();

  await tsParticles.load("ts-particles", particlesConfig);
})();
