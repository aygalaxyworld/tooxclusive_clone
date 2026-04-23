import Link from "next/link";
import { footerColumns } from "@/app/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        {footerColumns.map((column) => (
          <section key={column.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-100 mb-3">
              {column.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.href}`}>
                  <Link href={link.href} className="hover:text-fuchsia-300 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">
        © {year} Tooxclusive Clone · Built with Next.js
      </div>
    </footer>
  );
}
