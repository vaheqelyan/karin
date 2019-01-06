import get from "./get";
import karinUtil from "../karin/index";

karinUtil.setGetPost(get, ()=>console.log('Http requests are temporarily not supported.'));

const karin = karinUtil;
export { get, karin };
