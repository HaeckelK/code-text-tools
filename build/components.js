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
    <button type="button" class="btn btn-info">
      <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
    </button>
    <button type="button" class="btn btn-secondary" @click="moveUp">
      <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
    </button>
    <button type="button" class="btn btn-secondary" @click="moveDown">
      <span class="glyphicon glyphicon-arrow-down" aria-hidden="false"></span>
    </button>
    <button type="button" class="btn btn-danger" @click="deleteArgument">
      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
    </button>
  </div>
</div>`,
  props: ['arg'],
  methods: {
    deleteArgument() {
      this.$emit("delete-argument");
    },
    moveUp() {
      this.$emit('move-up', this.arg.id);
    },
    moveDown() {
      this.$emit('move-down', this.arg.id);
    }
  }
};

const CLIArgumentForm = {
  template: `<div>
  <form @submit.prevent="onSubmit">
    <button type="submit" class="btn btn-primary">
      Add
    </button>
  </form>
</div>`,
methods: {
    onSubmit() {
      if (this.label === "") {
        return;
      }
      this.$emit('add-argument');
    }
  }
}