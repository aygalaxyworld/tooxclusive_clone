import Link from "next/link";
import React from "react";
import Image from "next/image";

interface CalloutCardProps {
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  title?: string;
  author?: string;
  authorUrl?: string;
  postUrl?: string;
  date?: string;
}

export default function CalloutCard({
  imageUrl,
  imageAlt,
  category,
  title,
  author,
  authorUrl,
  postUrl,
  date,
}: CalloutCardProps) {
  const safeImage = imageUrl || "/placeholder.jpg";
  const safeAlt = imageAlt || "Latest release";
  const safeCategory = category || "Music";
  const safeTitle = title || "Untitled Release";
  const safeAuthor = author || "Unknown";
  const safeAuthorUrl = authorUrl || "#";
  const safePostUrl = postUrl || "https://music.apple.com";
  const safeDate = date || "Live API";

  return (
    <div className="relative overflow-visible mb-10">
      <Link href={safePostUrl} aria-label={`Read more about ${safeTitle}`}>
        <div className="h-60">
          <Image
            src={safeImage}
            alt={safeAlt}
            width={350}
            height={250}
            className="object-cover"
          />
        </div>
      </Link>
      <div className="absolute grid grid-cols-1 bg-white left-4 -bottom-10 w-11/12 h-1/4 px-6 pt-4 pb-20 mt-1">
        <h5 className="text-xs font-medium text-gray-300 uppercase mb-1">
          <Link href={safePostUrl}>{safeCategory}</Link>
        </h5>
        <h5 className="text-sm font-bold mb-1 text-gray-900">
          <Link href={safePostUrl} className="hover:text-red-600">
            {safeTitle}
          </Link>
        </h5>
        <h5 className="text-xs font-bold uppercase text-gray-500 flex items-center space-x-1">
          <span className="font-normal text-gray-600">BY</span>
          <Link href={safeAuthorUrl} className="text-red-600">
            {safeAuthor}
          </Link>
          <Link
            href={safePostUrl}
            className="flex items-center space-x-1 hover:text-gray-800"
          >
            <i className="fa-regular fa-clock text-blue-700"></i>
            <span>{safeDate}</span>
          </Link>
        </h5>
      </div>
    </div>
  );
}
