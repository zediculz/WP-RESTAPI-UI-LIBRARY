//wordpress restapi vanilla javascript ui solution
//the aim is to biuld a restapi library
//that will hlp use set up wordpress blog on restapi easily
//lightweight, makes working with wordpress easy for js developers
//a tool that does the rest api calls and allow user to build the ui

//start march 10th 2020


//FIRST ASSIGNMENT 
//CREATE CONFIG HANDLER
//url, pages

class WpApp {
  constructor(url) {
    this.url = `${url}`;
    //navBar.onToggle();
    this.location = location.href;
    this.homeNo = 1;
    this.appRoute()
  }

  appRoute() {
    console.log(this.location);
    if (this.location === `/`) {
      this.page = "home";
    }

    if (
      this.location === `http://127.0.0.1:5501/page/album.html` ||
      this.location === `http://127.0.0.1:5501/page/music.html` ||
      this.location === `http://127.0.0.1:5501/page/video.html` ||
      this.location === `http://127.0.0.1:5501/page/video.html`
    ) {
      this.page = "page";
    }

    if (this.location === `http://127.0.0.1:5501/singlepost.html`) {
      this.page = "single";
    }
  }

  //fetch post and generate post card
  fetchPosts(fun) {
    fetch(`${this.url}?page=${this.homeNo}`)
      .then(res => res.json())
      .then(data => {
        data.map(post => {
          return fun(post);
        });
      });
  }

  nextPage(fun) {
    this.homeNo = this.homeNo + 1;
    fetch(`${this.url}?page=${this.homeNo}`)
      .then(res => res.json())
      .then(data => {
        data.map(post => {
          return fun(post);
        });
      });
  }

  prevPage(fun) {
    this.homeNo = this.homeNo - 1;
    if (this.homeNo < 1) {
      this.homeNo = 1
      fetch(`${this.url}?page=${this.homeNo}`)
      .then(res => res.json())
      .then(data => {
        data.map(post => {
          return fun(post);
        });
      });
    } else {
      fetch(`${this.url}?page=${this.homeNo}`)
      .then(res => res.json())
      .then(data => {
        data.map(post => {
          return fun(post);
        });
      });
    }
  }

  //Sidebar function
  sideBar(fun) {
    fetch(this.url)
      .then(res => res.json())
      .then(data => {
        let rand = Math.floor(Math.random() * 10)
        //console.log(rand)
        let firstFive = data.splice(0, rand);
        //console.log(firstFive)
        firstFive.filter(post => {
          return fun(post);
        });
      });
  }

  //Loading Page Posts
  pageLoad(dom) {
    fetch(this.url)
      .then(res => res.json())
      .then(data => {
        data.map(post => {
          return dom(post);
        });
      });
  }

  //load post image by id
  loadImage(id, fun) {
    fetch(`http://newsite.local/wp-json/wp/v2/media/${id}`)
      .then(res => res.json())
      .then(function(data) {
        let src = data.guid.rendered;
        return fun(src);
      });
  }

  //load single post
  loadSinglePost(d, view) {
    let id = single.getSession();
    fetch(`${this.url}/${d}`)
      .then(res => res.json())
      .then(post => {
        return view(post);
      });
  }

  loadRelated(vue) {
    fetch("http://newsite.local/wp-json/wp/v2/posts?page=1")
      .then(res => res.json())
      .then(data => {
        let rand = Math.floor(Math.random() * 3);
        let four = data.splice(rand, 4);
        four.map(post => {
          vue(post);
        });
      });
  }

  jamLoad(view) {
    fetch(this.url).then(res => res.json()).then(data => {
      let five = data.splice(0, 5)
      view(five)
    })
  }

}



//Single Pages Methods
//make use of sessions
//load pages accordingly
const single = {
  id: null,

  openPost: function(id) {
    this.storeSession(id);
    console.log(single);
    location.href = "../singlepost.html";
  },

  storeSession: function(id) {
    sessionStorage.setItem("current-post", id);
    this.id = id;
  },

  getSession: function() {
    return sessionStorage.getItem("current-post");
  }
};


console.log('from api')


class FETCH_MODULE{
  constructor(config) {
    this.config = config
    this.fetch_url = {
      post: `${this.config.url}/wp-json/wp/v2/posts`,
      media: `${this.config.url}/wp-json/wp/v2/media/`
    }
  }

  _getPosts(view) {
    fetch(this.fetch_url.post).then(res => res.json())
      .then(data => {
      return(view(data))
      }).catch(err => console.log(err))
  }

  _getCategories() {
    fetch(this.url).then(res => res.json())
      .then(data => {
      return(view(data))
    })
  }

  _featuredImages(view) {
    fetch(this.fetch_url.media).then(res => res.json())
      .then(data => {
      return(view(data))
    })
  }

  _getSinglePosts() {
    fetch(this.url).then(res => res.json())
      .then(data => {
      return(view(data))
    })
  }
}

const config = {
  url: `http://httv2offline.local`
}


let a = new FETCH_MODULE(config)
a._getPosts((post)=> console.log(post))