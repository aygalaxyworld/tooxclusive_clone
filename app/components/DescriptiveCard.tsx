import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DescriptiveCardProps {
  href?: string;
  src?: string;
  alt?: string;
  rating?: string;
  title?: string;
  date?: string;
}

export default function DescriptiveCard({
  href,
  src,
  alt,
  rating,
  title,
  date,
}: DescriptiveCardProps) {
  const safeHref = href || "https://music.apple.com";
  const safeSrc = src || "/placeholder.jpg";
  const safeAlt = alt || "Latest release";
  const safeRating = rating || "HOT";
  const safeTitle = title || "Untitled Release";
  const safeDate = date || "Live API";

  return (
    <div className="flex flex-col w-full">
      <Link href={safeHref} aria-label={`Read more about ${safeTitle}`}>
        <div className="relative">
          <Image
            src={safeSrc}
            alt={safeAlt}
            width={500}
            height={200}
            className="object-cover"
          />
          <span className="absolute left-3 bottom-3 bg-red-600 text-xs font-medium px-2 text-white">
            {safeRating}
          </span>
        </div>
        <h3 className="text-black text-lg font-semibold mt-3 hover:text-red-500">
          {safeTitle}
        </h3>
        <h3 className="text-left font-medium text-xs text-black uppercase mt-2">
          <i className="fa-regular fa-clock text-blue-700"></i>
          <span className="ml-2">{safeDate}</span>
        </h3>
      </Link>
    </div>
  );
}
