import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

const placeholderImagesList: ImagePlaceholder[] = data.placeholderImages;

export const PlaceHolderImages = new Map(
  placeholderImagesList.map(image => [image.id, image])
);

export function getPlaceholderImage(id: string): ImagePlaceholder {
  return PlaceHolderImages.get(id) ?? {
    id: 'placeholder',
    description: 'A placeholder image',
    imageUrl: 'https://picsum.photos/seed/placeholder/600/400',
    imageHint: 'placeholder',
  };
}
