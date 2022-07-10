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
  setTimeout(function () {
    var replacers = document.querySelectorAll("[data-replace]");
    for (var i = 0; i < replacers.length; i++) {
      let replaceClasses = JSON.parse(
        replacers[i].dataset.replace.replace(/'/g, '"')
      );
      Object.keys(replaceClasses).forEach(function (key) {
        replacers[i].classList.remove(key);
        replacers[i].classList.add(replaceClasses[key]);
      });
    }
  }, 1000);
});
