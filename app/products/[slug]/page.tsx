import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProductSlugs } from '@/data/mockProducts';
import { Review } from '@/types';
import Gallery from './Gallery';
import SpecTable from './SpecTable';
import ReviewForm from './ReviewForm';
import ConsultationForm from './ConsultationForm';
import CTAButtons from './CTAButtons';
import StarRating from '@/components/ui/StarRating';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  return {
    title: `${product.title}`,
    description: `${product.shortDesc} - قیمت: ${new Intl.NumberFormat('fa-IR').format(product.price)} تومان. امتیاز: ${averageRating.toFixed(1)} از 5`,
    keywords: [
      product.title,
      ...product.tags,
      product.category,
      'آکند شیمی خزر',
      'محصولات نظافتی',
      'ضدعفونی کننده',
      'خرید آنلاین'
    ],
    openGraph: {
      title: product.title,
      description: product.shortDesc,
      type: 'website',
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      siteName: 'آکند شیمی خزر',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.shortDesc,
      images: [product.images[0]],
    },
    alternates: {
      canonical: `https://akandchimi.com/products/${params.slug}`,
    },
  };
}

const ProductDetailPage: React.FC<ProductPageProps> = ({ params }) => {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Calculate average rating
  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // JSON-LD Structured Data for Product
  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDesc,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: 'آکند شیمی خزر',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'آکند شیمی خزر',
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      url: `https://akandchimi.com/products/${params.slug}`,
      priceCurrency: 'IRR',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'آکند شیمی خزر',
      },
    },
    aggregateRating: product.reviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: product.reviews.length,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    review: product.reviews.map(review => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        '@type': 'Person',
        name: review.name,
      },
      reviewBody: review.comment,
      datePublished: review.date,
    })),
  };

  // All interactive CTAs are handled in the client-only CTAButtons component

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-max section-padding py-4">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-primary-500 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-primary-500 transition-colors">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-max section-padding py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left Column - Gallery */}
          <div>
            <Gallery images={product.images} title={product.title} />
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {product.shortDesc}
              </p>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <StarRating rating={averageRating} size="lg" />
                <span className="text-sm text-gray-500">
                  ({product.reviews.length} reviews)
                </span>
              </div>

              {/* Category & Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <CTAButtons catalogPdfUrl={product.catalogPdfUrl} />
          </div>
        </div>

        {/* Video Demo */}
        {product.videoUrl && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Demo Video</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <iframe
                  src={product.videoUrl}
                  title={`${product.title} Demo Video`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}

        {/* Product Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: product.longDesc }}
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
          <SpecTable specs={product.specs} />
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews ({product.reviews.length})
          </h2>
          
          {/* Reviews List */}
          {product.reviews.length > 0 ? (
            <div className="space-y-6 mb-8">
              {product.reviews.map((review: Review) => (
                <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start space-x-4">
                    {review.avatar && (
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <time className="text-sm text-gray-500">
                          {formatDate(review.date)}
                        </time>
                      </div>
                      <StarRating rating={review.rating} size="sm" className="mb-3" />
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mb-8">
              <p className="text-gray-500">No reviews have been submitted for this product yet.</p>
            </div>
          )}

          {/* Add Review Form */}
          <ReviewForm />
        </div>

        {/* Consultation Form */}
        <div className="mb-12">
          <ConsultationForm productTitle={product.title} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
