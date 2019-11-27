import navbar from "./navbar";

const triggers = document.querySelectorAll("[data-trigger]");
Array.prototype.forEach.call(triggers, function(trigger, index) {
  trigger.addEventListener("click", function(e) {
    //Humberger
    if (
      trigger.classList.contains("nav-humberger") &&
      trigger.classList.contains("is--active")
    ) {
      trigger.classList.remove("is--active");
    } else {
      trigger.classList.add("is--active");
    }

    //get the trigger target
    const triggerAttr = trigger.getAttribute("data-trigger").slice(1);
    const el = document.getElementById(triggerAttr);

    if (!el.classList.contains("is--active")) {
      el.classList.add("is--active");
      return;
    }
    el.classList.remove("is--active");
  });
});

navbar.init(document.getElementById("main-navbar"));
