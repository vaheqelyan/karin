import get from "./get";
import karinUtil from "../karin/index";

// eslint-disable-next-line
karinUtil.setGetPost(get, ()=>console.warn('Http requests are temporarily not supported.'));

const karin = karinUtil;
export { get, karin };
