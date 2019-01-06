const karinUtil = {
  get: null,
  post: null,

  setGetPost(get, post) {
    this.get = get;
    this.post = post;
  },
  create(params) {
    return {
      get: this.get(params),
      post: this.post(params),
    };
  },
};

export default karinUtil;
