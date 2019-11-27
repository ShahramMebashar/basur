import dom from "./utils/dom";

const navbar = {};

navbar.init = function(el) {
  this.nav = el;
  this.navItems = el.querySelectorAll(".navbar__item");
  this.getDropdownMs();
  this.addEvent();
};
navbar.getDropdownMs = function() {
  this.dropdownTriggers = Array.prototype.slice
    .call(this.navItems)
    .filter(item => /has--dropdown/.test(item.className));
};

navbar.closeAllMenus = function(currentItem) {
  Array.prototype.forEach.call(this.dropdownTriggers, function(item) {
    if (dom.hasClass(item, "is-active") && item == currentItem) return;
    dom.removeClass(item, "is-active");
  });
};

navbar.addEvent = function() {
  const $this = this;
  Array.prototype.forEach.call(this.dropdownTriggers, function(item) {
    let target;

    //closing dropdown when click outside
    function documentHandler(e) {
      dom.removeClass(target, "is-active");
    }
    item.addEventListener("click", function(e) {
      e.stopPropagation();
      target = e.currentTarget;

      //Cloase All active menu
      $this.closeAllMenus(item);

      const menu =
        target.getElementsByClassName("nav-dropdown")[0] ||
        target.getElementsByClassName("nav-mega")[0];
      if (!menu) return;

      if (dom.hasClass(target, "is-active")) {
        dom.removeClass(target, "is-active");
        document.removeEventListener("click", documentHandler);
      } else {
        dom.addClass(target, "is-active");
        document.addEventListener("click", documentHandler);
      }
    });
  });
};

export default navbar;
