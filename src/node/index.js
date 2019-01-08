import post from "./post";
import get from "./get";
import karinUtil from "../karin/index";

// eslint-disable-next-line
karinUtil.setGetPost(get, post);

const karin = karinUtil;
export { get, post, karin };
