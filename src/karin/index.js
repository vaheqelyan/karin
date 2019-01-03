const karinUtil = {
  get: null,
  post: null,

  setGetPost(get, post) {
    this.get = get;
    this.post = post;
    return 10;
  },
  create(params) {
    return {
      get: this.get(params),
      post: this.post(params),
    };
  },
};

export default karinUtil;
