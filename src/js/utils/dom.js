const dom = {
  toggleClass: function(el, $class) {
    if (this.hasClass(el, $class)) {
      this.removeClass(el, $class);
    } else {
      this.addClass(el, $class);
    }
    return this;
  },

  hasClass(el, $class) {
    let $hasClass = false;

    if (this.supportClassList()) {
      $hasClass = el.classList.contains($class);
    } else {
      const reg = new RegExp($class, "g");
      $hasClass = reg.test(el.className);
    }

    return $hasClass;
  },

  removeClass(el, $class) {
    if (this.supportClassList()) {
      el.classList.remove($class);
    } else {
      const reg = new RegExp($class, "g");
      el.className = el.className.replace(reg, "");
    }

    return this;
  },

  addClass(el, $class) {
    if (this.supportClassList()) {
      el.classList.add($class);
    } else {
      el.className = el.className.trim() + " " + $class;
    }

    return this;
  },

  supportClassList() {
    return !!document.createElement("div").classList;
  }
};

export default dom;
