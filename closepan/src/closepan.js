const mixin = {
  data() {
    return { active: !!this.value };
  },
  props: {
    value: {
      required: true
    }
  },
  watch: {
    value(v) {
      this.active = !!v;
    },
    active(v) {
      !!v !== this.value && this.$emit("input", v);
    }
  },
  methods: {
    toggle() {
      this.active = !this.active;
    }
  }
};
const tansition = {
  enter(el, done) {
    // Remove initial transition
    el.style.transition = "none";

    // Get height that is to be scrolled
    el.style.overflow = "hidden";
    el.style.height = null;
    el.style.display = "block";
    const height = `${el.clientHeight}px`;
    el.style.height = 0;
    el.style.transition = null;
    setTimeout(() => (el.style.height = height), 50);
  },

  afterEnter(el) {
    el.style.height = "auto";
    el.style.overflow = null;
  },

  leave(el, done) {
    // Remove initial transition
    el.style.transition = "none";
    // Set height before we transition to 0
    el.style.overflow = "hidden";
    const h = `${el.clientHeight}px`;
    el.style.height = h;
    el.style.transition = null;
    setTimeout(() => (el.style.height = 0), 50);
  }
};
const animateCom = {
  functional: true,
  render(h, context) {
    return h(
      "transition",
      {
        on: tansition
      },
      context.children
    );
  }
};

Vue.component("closepan", {
  mixins: [mixin], 
  methods: {
    getContent(h) {
      return h(
        "div",
        {
          class: "expansion-panel__body",
          directives: [
            {
              name: "show",
              value: this.active
            }
          ]
        },
        [this.$slots.default]
      );
    },
    getHeader(h) {
      return h(
        "div",
        {
          on: {
            click: () => {
              this.active = !this.active;
            }
          }
        },
        [this.$slots.header]
      );
    }
  },
  render(h) {
    var chilren = [];
    chilren.push(this.getHeader(h));
    chilren.push(h(animateCom, [this.getContent(h)]));
    return h("div", chilren);
  }
});

