import imageSize from "image-size"
import http from "https"

export function normalizeImages(images: string[]) {
  return images.map((path) => {
    try {
      return { path: path.replace("/public/", "/"), ...getImageSize(path) }
    } catch (error) {
      console.warn(error)
      return { path }
    }
  })
}

function getImageSize(path: string) {
  if (isRemoteURL(path)) {
    http.get(new URL(path), async (stream) => {
      return await getStreamImageSize(stream)
    })
  } else {
    if (path.startsWith("/")) {
      path = "." + path
    } else if (!path.startsWith("./")) {
      path = "./" + path
    }
    try {
      return imageSize(path)
    } catch (error) {
      console.warn(error)
    }
  }
}

function isRemoteURL(input: string) {
  let url

  try {
    url = new URL(input)
  } catch (_) {
    return false
  }

  return url.protocol === "http:" || url.protocol === "https:"
}

async function getStreamImageSize(stream: any) {
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(chunk)
    try {
      return imageSize(Buffer.concat(chunks))
    } catch (error) {
      /* Not ready yet */
    }
  }

  return imageSize(Buffer.concat(chunks))
}
