import {
  Image, ImageProps, Skeleton
} from '@chakra-ui/react'
import { useState } from 'react';

type INFTImageProps = {

} & ImageProps;

export default function NFTImage(props: INFTImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Skeleton isLoaded={loaded}>
      <Image
        {...props}
        onLoad={() => setLoaded(true)}
      />
    </Skeleton>
  )
}