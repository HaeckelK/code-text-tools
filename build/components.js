const PageBanner = {
  template: `<section class="hero is-info">
  <div class="hero-body">
    <p class="title">
      {{ pagename }}
    </p>
  </div>
</section>`,
  props: ['pagename']
};

const PageFooter = {
  template: `<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>My Code Buddy</strong> by <a href="https://github.com/HaeckelK/code-text-tools">HaeckelK</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
    </p>
  </div>
</footer>`
};


const CLIArgumentEditorForm = {
  template: `<nav class="panel is-info">
  <p class="panel-heading">
    Editing: {{name}}
    <button class="delete is-pulled-right" @click="cancelEditor"></button>
  </p>
  <div class="panel-block is-active">
    <form @submit.prevent="saveEditor">

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Argument name" v-model.lazy.trim="name" ref="nameInput">
      </div>
    </div>

    <div class="field">
      <label class="label">Type</label>
      <div class="control">
        <div class="select">
          <select type="text" v-model="type">
            <option>str</option>
            <option>int</option>
            <option>float</option>
            <option>bool</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Default Value</label>
      <div class="control">
        <input class="input" type="text" v-model.lazy.trim="defaultValue" ref="nameInput">
      </div>
    </div>

    <div class="field">
      <label class="label">Variable Name</label>
      <div class="control">
        <input class="input" type="text" v-model.lazy.trim="variableName" ref="nameInput">
      </div>
    </div>

    <label class="checkbox">
      <input type="checkbox" v-model="required">
      Required
    </label>
  </form>
  </div>
  <div class="panel-block is-active">
    <button type="button" class="button is-success is-small" @click="saveEditor">
      Confirm
    </button>
  </div>
</nav>`,
  props: ['arg'],
  data() {
    return {
      name: this.arg.name,
      variableName: this.arg.variableName,
      type: this.arg.type,
      defaultValue: this.arg.default,
      required: this.arg.required
    };
  },
  methods: {
    cancelEditor() {
      this.$emit('cancel-editor');
    },
    saveEditor() {
      let editedArgument = {
        name: this.name,
        type: this.type,
        variableName: this.variableName,
        default: this.defaultValue,
        required: this.required
      }
      this.$emit('save-editor', editedArgument);
    }
  }
}

const CLIAgumentDisplay = {
  template: `<div>
  <div style="padding: 2px;" v-if="!isEditing">
    <button type="button" class="button is-info is-small" @click="toggleEditor">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button type="button" class="button is-info is-small" @click="moveUp">
      <i class="fa-solid fa-arrow-up"></i>
    </button>
    <button type="button" class="button is-info is-small" @click="moveDown">
      <i class="fa-solid fa-arrow-down"></i>
    </button>
    <button type="button" class="button is-success is-small" @click="copyArgument">
      <i class="fa-solid fa-clone"></i>
    </button>
    <button type="button" class="button is-danger is-small" @click="deleteArgument">
      <i class="fa-solid fa-minus"></i>
    </button>
    <span style="padding-left: 30px; font-weight: bold;">{{ arg.name }} [{{arg.type}}]</span>
  </div>
  <editor v-else
          :arg="arg"
          @cancel-editor="toggleEditor"
          @save-editor="edited"></editor>
</div>`,
  components: { 'editor': CLIArgumentEditorForm },
  props: ['arg'],
  data() {
    return {
      isEditing: false
    };
  },
  methods: {
    deleteArgument() {
      this.$emit("delete-argument");
    },
    moveUp() {
      this.$emit('move-up', this.arg.id);
    },
    moveDown() {
      this.$emit('move-down', this.arg.id);
    },
    copyArgument() {
      this.$emit('copy-argument', this.arg.id);
    },
    edited(editedArgument) {
      editedArgument.id = this.arg.id;
      this.isEditing = false;
      this.$emit('edited-argument', editedArgument);
      this.$emit('editor-closed');
    },
    toggleEditor() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        this.$emit('editor-open');
      } else {
        this.$emit('editor-closed');
      }
    }
  }
};

const CLIArgumentForm = {
  template: `<div>
  <form class="box" @submit.prevent="onSubmit">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Argument name" v-model.lazy.trim="name" ref="nameInput">
      </div>
    </div>

    <div class="field">
      <label class="label">Type</label>
      <div class="control">
        <div class="select">
          <select type="text" v-model="type">
            <option>str</option>
            <option>int</option>
            <option>float</option>
            <option>bool</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Default Value</label>
      <div class="control">
        <input class="input" type="text" placeholder="Default Value" v-model.lazy.trim="defaultValue">
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link is-small" type="submit">Add</button>
      </div>
    </div>

  </form>
</div>`,
  methods: {
    onSubmit() {
      if (this.name === "") {
        return;
      }

      const argument = newArgument(this.name, this.type, this.name, this.defaultValue);
      this.$emit('add-argument', argument);
      this.name = "";
      this.type = "str";
      this.defaultValue = "";
      const nameInputRef = this.$refs.nameInput;
      nameInputRef.focus();
    }
  },
  data() {
    return {
      name: "",
      type: "str",
      defaultValue: ""
    }
  }
}