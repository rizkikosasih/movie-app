import { _url, _token } from '../constants'

const generateUrl = (params = {}) => {
  let url = `${_url}/?apikey=${_token}`
  for (const key in params) {
    url += `&${key}=${encodeURIComponent(params[key])}`
  }
  return url
}

export default generateUrl
