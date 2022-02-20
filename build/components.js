const PageBanner = {
  template: `<header>
    <div class="navbar navbar-default">
      <div class="navbar-header">
        <h1>{{ pagename }}</h1>
      </div>
    </div>
  </header>`,
  props: ['pagename']
};

const CLIAgumentDisplay = {
  template: `<div>
  <h5> {{ arg }} </h5>
  <div class="btn-group">
  <button type="button" class="btn btn__danger" @click="deleteArgument">
    Delete
  </button>
</div>
</div>`,
  props: ['arg'],
  methods: {
    deleteArgument() {
      this.$emit("argument-deleted");
    },
  }
};