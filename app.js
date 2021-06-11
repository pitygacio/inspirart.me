const all = Promise.all([
  fetch("./nouns").then((res) => res.text()),
  fetch("./adjs").then((res) => res.text()),
  fetch("./advs").then((res) => res.text()),
]);

window.addEventListener("load", async () => {
  const [nounsStr, adjectivesStr, adverbsStr] = await all;

  const nouns = nounsStr.split(/\n/);
  const adjectives = adjectivesStr.split(/\n/);
  const adverbs = adverbsStr.split(/\n/);

  let autoRotate = true;

  document.querySelector("#firstPrompt").style.opacity = "50%";
  document.querySelector("#secondPrompt").style.opacity = "50%";
  document.querySelector("#thirdPrompt").style.opacity = "50%";

  const rotate = () => {
    if (!autoRotate) return;
    const firstPrompt =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const secondPrompt = nouns[Math.floor(Math.random() * nouns.length)];
    const thirdPrompt = adverbs[Math.floor(Math.random() * adverbs.length)];

    document.querySelector("#firstPrompt").innerHTML = firstPrompt;
    document.querySelector("#secondPrompt").innerHTML = secondPrompt;
    document.querySelector("#thirdPrompt").innerHTML = thirdPrompt;
  };

  const h = setInterval(rotate, 100);

  document.querySelector("#inspireMe").addEventListener("click", () => {
    autoRotate = false;
    clearInterval(h);
    const firstPrompt =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const secondPrompt = nouns[Math.floor(Math.random() * nouns.length)];
    const thirdPrompt = adverbs[Math.floor(Math.random() * adverbs.length)];

    document.querySelector("#firstPrompt").innerHTML = firstPrompt;
    document.querySelector("#secondPrompt").innerHTML = secondPrompt;
    document.querySelector("#thirdPrompt").innerHTML = thirdPrompt;

    document.querySelector("#firstPrompt").style.opacity = "100%";
    document.querySelector("#secondPrompt").style.opacity = "100%";
    document.querySelector("#thirdPrompt").style.opacity = "100%";
  });
});
