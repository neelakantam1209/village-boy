'use client';

import Image, { type ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

// The single source of truth for the fallback image, pointing to a local file.
const FALLBACK_IMAGE_URL = '/images/placeholder.jpg';

const ImageWithFallback = (props: ImageProps) => {
    const { src, ...rest } = props;
    // Start with the provided src. If it's falsy, immediately use the fallback.
    const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE_URL);

    useEffect(() => {
        // If the src prop changes, update the state. If the new src is falsy, use fallback.
        setImgSrc(src || FALLBACK_IMAGE_URL);
    }, [src]);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                // If the image at `imgSrc` fails to load, permanently switch to the fallback.
                setImgSrc(FALLBACK_IMAGE_URL);
            }}
        />
    );
};

export default ImageWithFallback;
