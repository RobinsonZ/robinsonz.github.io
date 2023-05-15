import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

// animation stuff
// TODO: disable animations if user prefers reduced motion
document.addEventListener("DOMContentLoaded", function () {
  var doReplace = function (attribute) {
    return function () {
      console.log("replacing " + attribute)
      var replacers = document.querySelectorAll("[data-" + attribute + "]");
      console.log(replacers)
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
});

// this has to go afterwards, because weird syntax happens with this inline definition
(async () => {
  console.log("tsparticles loading");
  await loadFull(tsParticles);

  const particlesConfig = await (
    await fetch(new URL("./static/particles.json", import.meta.url))
  ).json();

  console.log("config", particlesConfig);
  await tsParticles.load("ts-particles", particlesConfig);
  // await tsParticles.load("ts-particles", {
  //   preset: "fireworks",
  // });
  console.log("tsparticles loaded");
  console.log(tsParticles.domItem(0).actualOptions);
})();
