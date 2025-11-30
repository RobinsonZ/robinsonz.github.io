import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("json", json);

import { icon } from "@fortawesome/fontawesome-svg-core";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons/faFileAlt";

import resumePdf from "./static/robinsonz-resume.pdf";

const externalLinkSymbol = icon(faArrowUpRightFromSquare, {
  transform: { size: 12 },
});

const fileSymbol = icon(faFileAlt, {
  transform: { size: 12 },
});

function replaceCodeSpanWithLink(textToReplace, link, linkText, isFile) {
  const icon = isFile ? fileSymbol : externalLinkSymbol;

  const codeSpanWithText = document.evaluate(
    `//*[@id="contacts-json"]//span[contains(text(), "${textToReplace}")]`,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  if (isFile) {
    codeSpanWithText.innerHTML = `<a class="hover:underline no-underline" href="${link}" download>"<span class="font-serif">${icon.html}&hairsp;</span>${linkText}"</a>`;
  } else {
    codeSpanWithText.innerHTML = `<a class="hover:underline no-underline" href="${link}">"${linkText}<span class="font-serif">&hairsp;${icon.html}</span>"</a>`;
  }
}

// for turning background dark when user scrolls far enough
let backgroundIsDark = false;

// animation stuff
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

  const animationStorageKey = "animationLastRun";
  const oneDayMs = 24 * 60 * 60 * 1000;

  let shouldPlayAnimation = true;
  try {
    const lastRun = parseInt(localStorage.getItem(animationStorageKey) || "", 10);
    if (Number.isFinite(lastRun)) {
      shouldPlayAnimation = Date.now() - lastRun > oneDayMs;
    }
  } catch (e) {
    // localStorage unavailable; fall back to playing animation
    shouldPlayAnimation = true;
  }

  const replacementSchedule = [
    ["replace-instant", 1],
    ["replace-1s", 1000],
    ["replace-2s", 2000],
    ["replace-3s", 3000],
    ["replace-4s", 4000],
  ];

  if (shouldPlayAnimation) {
    const now = Date.now();
    replacementSchedule.forEach(([attribute, delay]) => {
      setTimeout(doReplace(attribute), delay);
    });
    try {
      localStorage.setItem(animationStorageKey, now.toString());
    } catch (e) {
      // ignore storage failures
    }
  } else {
    // apply all replacements immediately so blocks are visible without animation
    replacementSchedule.forEach(([attribute]) => {
      doReplace(attribute)();
    });
  }

  // hljs.highlightAll();

  // absolutely awful processing to make the code block look nice
  replaceCodeSpanWithLink(
    "github.com/RobinsonZ",
    "https://github.com/RobinsonZ",
    "RobinsonZ",
    false
  );
  replaceCodeSpanWithLink(
    "linkedin.com/in/robinsonz/",
    "https://linkedin.com/in/robinsonz/",
    "in/robinsonz",
    false
  );
  replaceCodeSpanWithLink("resume.pdf", resumePdf, "resume.pdf", true);
  replaceCodeSpanWithLink("robinsonz.me/blog", "/blog", "robinsonz.me/blog", false);

  // it gets worse
  // go through and add auto-hiding linebreaks to all the colons in the JSON, so that we
  // linebreak between key and value only up to the medium breakpoint
  const jsonCodeblock = document.getElementById("contacts-json");
  jsonCodeblock.innerHTML = jsonCodeblock.innerHTML.replace(
    /:<\/span> /g,
    ':</span> <span class="min-[460px]:hidden">\n    </span>'
  );

  // fix copyright year if needed
  document.getElementById("copy-year").textContent = new Date()
    .getFullYear()
    .toString();


  const splashCover = document.getElementById("splash-cover");

  // I'm not done with the awful hacks yet
  // add scroll listener to unhide the "cover" div when we scroll far enough

  // this fixes the problem where on platforms with overscroll-y behavior, you
  // could scroll past the div and view the particles underneath
  addEventListener("scroll", (event) => {
    if (window.scrollY >= window.visualViewport.height) {
      if (!backgroundIsDark) {
        window.requestAnimationFrame(() => {
          splashCover.classList.remove("invisible");
        });

        backgroundIsDark = true;
      }
    } else if (backgroundIsDark) {
      window.requestAnimationFrame(() => {
        splashCover.classList.add("invisible");
      });

      backgroundIsDark = false;
    }
  });
});

// this has to go afterwards, because weird syntax happens with this inline definition
(async () => {
  await loadSlim(tsParticles);

  const particlesConfig = await (
    await fetch(new URL("./static/particles.json", import.meta.url))
  ).json();

  await tsParticles.load("ts-particles", particlesConfig);
})();
