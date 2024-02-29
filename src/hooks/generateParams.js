import urlParams from "params-url";
import { _url, _token } from "../constants";

const generateParams = (params = {}) => {
  return urlParams.generate(_url, params)
}

export default generateParams
