const BodyFormatters = {
  "application/json": data => generateBodyJson(data),
  "application/x-www-form-urlencoded": data => generateBodyString(data)
}

const generateBodyJson = data => {
  return JSON.stringify(data)
}

export const generateBodyString = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export const prepareBody = (headersInit, data = {}) => {
  // Find the Content-Type key regardless of casing
  const headers = new Headers(headersInit)
  const contentType = headers.get("Content-Type") || ""

  // Execute the strategy or fall back to default
  const formatter = BodyFormatters[contentType]
  return formatter ? formatter(data) : generateBodyJson(data)
}