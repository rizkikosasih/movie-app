export const _url = 'https://omdbapi.com'
export const _token = '31be17cc'
export const generateUrl = (params = {}) => {
  let url = `${_url}/?apikey=${_token}`
  for (const key in params) {
    url += `&${key}=${encodeURIComponent(params[key])}`
  }
  return url
}
export const getPageList = (totalPages, page, maxLength) => {
  const range = (start, end) => {
    return Array.from(Array(end - start + 1), (_, i) => i + start)
  }

  const sideWidth = maxLength < 9 ? 1 : 2
  const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1
  const rightWidth = (maxLength - sideWidth * 2 - 3) >> 1

  if (totalPages <= maxLength) {
    return range(1, totalPages)
  }

  if (page <= maxLength - sideWidth - 1 - rightWidth) {
    return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages))
  }

  if (page >= totalPages - sideWidth - 1 - rightWidth) {
    return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages))
  }

  return range(1, sideWidth).concat(
    0,
    range(page - leftWidth, page + rightWidth),
    0,
    range(totalPages - sideWidth + 1, totalPages)
  )
}
