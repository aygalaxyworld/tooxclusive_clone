import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  width?: string;
  href: string;
  src?: string;
  alt?: string;
  title?: string;
  date?: string;
}

export default function Card({
  href,
  src,
  alt,
  title,
  date,
  width = "w-full",
}: CardProps) {
  const safeSrc = src || "/placeholder.jpg";
  const safeAlt = alt || "Latest release";
  const safeTitle = title || "Untitled Release";
  const safeDate = date || "Live API";

  return (
    <div className={width}>
      <Link href={href} aria-label={`View details for ${safeTitle}`}>
        <div className="relative h-56 sm:h-64">
          {/* Image Section */}
          <Image
            src={safeSrc}
            alt={safeAlt}
            fill
            className="object-cover"
            priority
          />

          {/* Content Section */}
          <div className="absolute left-3 bottom-6">
            <h3 className="text-white text-lg font-semibold">{safeTitle}</h3>
            <h3 className="text-left font-medium text-xs text-white uppercase mt-2">
              <i className="fa-regular fa-clock"></i>
              <span className="ml-2">{safeDate}</span>
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
