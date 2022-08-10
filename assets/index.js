import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

loadFull(tsParticles);

tsParticles
  .loadJSON("ts-particles", "/dist/static/particles.json")
  .then((container) => {
    console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
    console.error(error);
  });

// animation stuff
document.addEventListener("DOMContentLoaded", function () {
  var doReplace = function (attribute) {
    return function () {
      var replacers = document.querySelectorAll("[data-" + attribute + "]");
      for (var i = 0; i < replacers.length; i++) {
        let replaceClasses = JSON.parse(
          replacers[i].dataset[attribute].replace(/'/g, '"')
        );
        Object.keys(replaceClasses).forEach(function (key) {
          replacers[i].classList.remove(key);
          replacers[i].classList.add(replaceClasses[key]);
        });
      }
    };
  };

  setTimeout(doReplace("replace-1s"), 1000);
  setTimeout(doReplace("replace-2s"), 2000);
});
