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
  let keepRotating = [true, true, true];
  let isStopping = false;

  document.querySelector("#firstPrompt").style.opacity = "50%";
  document.querySelector("#secondPrompt").style.opacity = "50%";
  document.querySelector("#thirdPrompt").style.opacity = "50%";

  const rotate = () => {
    if (!autoRotate) return;

    const firstPrompt =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const secondPrompt = nouns[Math.floor(Math.random() * nouns.length)];
    const thirdPrompt = adverbs[Math.floor(Math.random() * adverbs.length)];

    const [first, second, third] = keepRotating;

    first && (document.querySelector("#firstPrompt").innerHTML = firstPrompt);
    second &&
      (document.querySelector("#secondPrompt").innerHTML = secondPrompt);
    third && (document.querySelector("#thirdPrompt").innerHTML = thirdPrompt);
  };

  let h = setInterval(rotate, 100);

  let timestamp = Date.now();

  document.querySelector("#inspireMe").addEventListener("click", () => {
    if (isStopping) {
      gtag("event", "clickInspireButtonWhileSpinning");
      return;
    } else {
      gtag("event", "clickInspireButton", {
        event_value: Math.round((Date.now() - timestamp) / 1000),
      });
      timestamp = Date.now();
    }

    document.querySelector("#firstPrompt").style.opacity = "50%";
    document.querySelector("#secondPrompt").style.opacity = "50%";
    document.querySelector("#thirdPrompt").style.opacity = "50%";

    h = h || setInterval(rotate, 100);
    isStopping = true;
    keepRotating = [true, true, true];

    setTimeout(() => {
      keepRotating[0] = false;
      const firstPrompt =
        adjectives[Math.floor(Math.random() * adjectives.length)];
      document.querySelector("#firstPrompt").innerHTML = firstPrompt;
      document.querySelector("#firstPrompt").style.opacity = "100%";

      setTimeout(() => {
        keepRotating[1] = false;
        const secondPrompt = nouns[Math.floor(Math.random() * nouns.length)];
        document.querySelector("#secondPrompt").innerHTML = secondPrompt;
        document.querySelector("#secondPrompt").style.opacity = "100%";

        setTimeout(() => {
          keepRotating[2] = false;
          const thirdPrompt =
            adverbs[Math.floor(Math.random() * adverbs.length)];
          document.querySelector("#thirdPrompt").innerHTML = thirdPrompt;
          document.querySelector("#thirdPrompt").style.opacity = "100%";

          isStopping = false;
          h = clearInterval(h);
        }, 500);
      }, 500);
    }, 500);
  });
});
