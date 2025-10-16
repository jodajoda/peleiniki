import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * SEO Component for managing meta tags dynamically
 * Updates document title and meta tags for each page
 */
function SEO({
  title,
  description,
  keywords,
  ogType = 'website',
  ogImage,
  ogImageAlt,
  twitterCard = 'summary_large_image',
  canonicalUrl
}) {
  // Base URL for the website
  const baseUrl = 'https://jodajoda.github.io/peleiniki';

  // Default OG image if none provided
  const defaultOgImage = `${baseUrl}/assets/homepage/hero.jpg`;
  const defaultOgImageAlt = 'Pelei Niki Fotográfus - Családi Fotózás';

  // Full page title
  const fullTitle = title
    ? `${title} | Pelei Niki Fotográfus`
    : 'Pelei Niki Fotográfus - Családi Fotózás';

  // Complete OG image URL
  const ogImageUrl = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`)
    : defaultOgImage;

  const ogImageAltText = ogImageAlt || defaultOgImageAlt;

  // Canonical URL
  const canonical = canonicalUrl
    ? `${baseUrl}${canonicalUrl}`
    : window.location.href;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
        } else if (selector.includes('name')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Update basic meta tags
    updateMetaTag('meta[name="description"]', 'content', description);
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', 'content', keywords);
    }

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'content', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:type"]', 'content', ogType);
    updateMetaTag('meta[property="og:url"]', 'content', canonical);
    updateMetaTag('meta[property="og:image"]', 'content', ogImageUrl);
    updateMetaTag('meta[property="og:image:alt"]', 'content', ogImageAltText);
    updateMetaTag('meta[property="og:locale"]', 'content', 'hu_HU');
    updateMetaTag('meta[property="og:site_name"]', 'content', 'Pelei Niki Fotográfus');

    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', 'content', twitterCard);
    updateMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    updateMetaTag('meta[name="twitter:image"]', 'content', ogImageUrl);
    updateMetaTag('meta[name="twitter:image:alt"]', 'content', ogImageAltText);

    // Update canonical URL
    updateLinkTag('canonical', canonical);

    // Cleanup function (optional)
    return () => {
      // You could remove tags here if needed, but usually not necessary
    };
  }, [fullTitle, description, keywords, ogType, ogImageUrl, ogImageAltText, twitterCard, canonical]);

  // This component doesn't render anything
  return null;
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  ogType: PropTypes.string,
  ogImage: PropTypes.string,
  ogImageAlt: PropTypes.string,
  twitterCard: PropTypes.string,
  canonicalUrl: PropTypes.string
};

export default SEO;
