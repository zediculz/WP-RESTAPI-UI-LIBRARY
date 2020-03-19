class Model {
  //do all fetch required
  constructor(config) {
    this.config = config;
    this.fetch_url = {
      post: ``,
      media: ``
    };
  }

  _getPost() {
      console.log("fetchig posts");
        let value = []
      value.push({ id: 1, title: 'title 1', message: 'message 1' })
      return value
  }
}

class View {
  //renders the view and dom
  constructor(settings) {
    this.settings = settings;
  }

  postView(value, fun) {
    console.log("rendering daata");
    return fun(value);
  }
}

function Cotroller() {
  //link the view and the model to construct a library
  this.Model = new Model();
  this.View = new View();
  this.renderPost = function(fun) {
    let val = this.Model._getPost();
    this.View.postView(val, data => {
      return fun(data)
    });
  };
}
