import React from "react";
import Link from "next/link";

interface BulletLinkProps {
  href?: string;
  title?: string;
}

export default function BulletLink({ href, title }: BulletLinkProps) {
  const safeHref = href || "https://music.apple.com";
  const safeTitle = title || "Untitled Link";

  return (
    <div>
      <Link href={safeHref} aria-label={`Navigate to ${safeTitle}`}>
        <div className="text-black border-b-2 py-3 text-sm border-gray-100 hover:text-red-600 cursor-pointer">
          <h3 className="flex items-center">
            <span className="mr-3">
              <i className="fa-solid fa-caret-right text-black group-hover:text-red-600"></i>
            </span>
            {safeTitle}
          </h3>
        </div>
      </Link>
    </div>
  );
}
