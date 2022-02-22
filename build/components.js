const PageBanner = {
  template: `<header>
    <div>
      <div>
        <h1>{{ pagename }}</h1>
      </div>
    </div>
  </header>`,
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
  template: `<div>
  <h3>Editing: {{name}}</h3>
  <form @submit.prevent="saveEditor">
    Name: <input type="text" v-model.trim="name" ref="nameInput"><br>
    Type: 
    <select type="text" v-model="type">
      <option>str</option>
      <option>int</option>
      <option>float</option>
      <option>bool</option>
    </select>
    <br>
    DefaultValue: <input type="text" v-model.lazy.trim="defaultValue"><br>
    Variable Name: <input type="text" v-model.lazy.trim="variableName" ref="variableNameInput"><br>
    Required: 
    <select type="text" v-model="required">
      <option>true</option>
      <option>false</option>
    </select>
    <br>
  </form>
  <button type="button" class="btn btn-success" @click="saveEditor">
    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
  </button>
  <button type="button" class="btn btn-danger" @click="cancelEditor">
    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
  </button>
</div>`,
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
  <div class="btn-group" style="padding: 2px;" v-if="!isEditing">
    <button type="button" class="btn btn-info" @click="toggleEditor">
      <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
    </button>
    <button type="button" class="btn btn-secondary" @click="moveUp">
      <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
    </button>
    <button type="button" class="btn btn-secondary" @click="moveDown">
      <span class="glyphicon glyphicon-arrow-down" aria-hidden="false"></span>
    </button>
    <button type="button" class="btn btn-secondary" @click="copyArgument">
      <span class="glyphicon glyphicon-copy" aria-hidden="true"></span>
    </button>
    <button type="button" class="btn btn-danger" @click="deleteArgument">
      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
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
    },
    toggleEditor() {
      this.isEditing = !this.isEditing;
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