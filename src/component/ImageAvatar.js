import React from 'react'
import { Image } from 'semantic-ui-react'

const ImageAvatar = ({username, src}) => (
  <>
    <Image src={src} avatar />
    <span>{username}</span>
  </>
)

export default ImageAvatar