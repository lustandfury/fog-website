import React from 'react';

const ArrowIcon = () => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="arrow-icon"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 12.1484C4 11.5962 4.44772 11.1484 5 11.1484H19C19.5523 11.1484 20 11.5962 20 12.1484C20 12.7007 19.5523 13.1484 19 13.1484H5C4.44772 13.1484 4 12.7007 4 12.1484Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2929 4.44133C11.6834 4.05081 12.3166 4.05081 12.7071 4.44133L19.7071 11.4413C20.0976 11.8319 20.0976 12.465 19.7071 12.8555L12.7071 19.8555C12.3166 20.2461 11.6834 20.2461 11.2929 19.8555C10.9024 19.465 10.9024 18.8319 11.2929 18.4413L17.5858 12.1484L11.2929 5.85554C10.9024 5.46502 10.9024 4.83185 11.2929 4.44133Z"
        fill="white"
      />
    </svg>
  );
};

interface OfferCardProps {
  imageUrl: string;
  altText?: string;
  title: string;
  url: string;
}

export const OfferCard: React.FC<OfferCardProps> = ({ 
  imageUrl, 
  altText, 
  title, 
  url 
}) => {
  return (
    <a href={url} className="block group">
      <article className="flex items-center gap-5 text-base text-white lg:flex-col sm:flex-row mt-2 rounded-[5px] max-md:max-w-full group-hover:border-white transition-colors cursor-pointer">
        {imageUrl && (
          <div className="overflow-hidden rounded-[5px]">
            <img
              src={imageUrl}
              alt={altText || title}
              className="w-full h-full object-cover transition-transform duration-[.8s] ease-in-out group-hover:scale-110"
            />
          </div>
        )}
        <div className="self-stretch flex min-w-60 items-top gap-[5px] my-auto">
          <span className="self-stretch my-auto text-white group-hover:text-primary transition-colors duration-200">
            {title}
          </span>
          <div className="transition-transform duration-200 group-hover:translate-x-1">
            <ArrowIcon />
          </div>
        </div>
      </article>
    </a>
  );
};

export default OfferCard;