import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 mt-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          {/* Logo */}
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <Link href="https://pagedone.io/" className="flex justify-center lg:justify-start">
              <img src="/footer-logo.svg"/>
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-600 hover:text-gray-900">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg text-black font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-5 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Pagedone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
