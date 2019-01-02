import get from "./get";
import post from "./post";
import karinUtil from "../karin/index";

karinUtil.setGetPost(get, post);
const karin = karinUtil;
export { get, post, karin };
