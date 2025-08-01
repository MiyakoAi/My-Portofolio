import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { personalInfo } from '../../constants/personalInfo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = personalInfo.bio,
  keywords = 'backend developer, full stack, react, node.js, portfolio',
  image = '/Tumbnail.png'
}) => {
  const location = useLocation();
  const baseUrl = 'https://my-portofolio-tau-ten.vercel.app'; // Updated with your Vercel domain
  const currentUrl = `${baseUrl}${location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  const pageTitle = title 
    ? `${title} | ${personalInfo.name}` 
    : `${personalInfo.name}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={personalInfo.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`${personalInfo.name} Portfolio`} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#7ee787" />
      <meta name="msapplication-TileColor" content="#0d1117" />
    </Helmet>
  );
};

export default SEO;