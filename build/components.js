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
  template: `<h5> {{ arg }} </h5>`,
  props: ['arg']
};