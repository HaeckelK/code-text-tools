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