
'use client';

// This function is designed to work on the client side if needed,
// but it's safe for server-side use as well.

/**
 * Creates a standardized local image path from a given name.
 * It converts the name to a URL-friendly slug and assumes a .jpg extension.
 * This encourages a consistent naming convention in the /public/images directory.
 *
 * Example: "AC Repair Service" -> "/images/ac-repair-service.jpg"
 *
 * If the provided name is falsy, it returns a path to a generic placeholder image.
 *
 * @param {string | null | undefined} name - The name of the service, item, or category.
 * @returns {string} The constructed local image path.
 */
export function getLocalImageByName(name?: string | null): string {
  const FALLBACK_IMAGE = '/images/placeholder.jpg';

  if (!name) {
    return FALLBACK_IMAGE;
  }

  // If a full path is already provided, use it directly. This allows for overrides.
  if (name.startsWith('/') || name.startsWith('http')) {
    return name;
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/ & /g, '-and-') // handle ampersands
    .replace(/[^a-z0-9-]/g, '-') // replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // collapse multiple hyphens
    .replace(/^-|-$/g, ''); // trim leading/trailing hyphens

  if (!slug) {
    return FALLBACK_IMAGE;
  }

  // Assume .jpg for consistency. The ImageWithFallback component will handle any loading errors.
  return `/images/${slug}.jpg`;
}
