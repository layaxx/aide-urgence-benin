export type Gallery = {
  images: Array<GalleryImage>
  title: string
}

export type GalleryImage = {
  width?: number
  height?: number
  path: string
  type?: string
}

export type FlatGallery = {
  images: string[]
  title: string
}
