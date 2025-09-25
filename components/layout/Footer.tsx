import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { footerSections, socialLinks, companyInfo } from '@/data/mockData';
import Button from '@/components/ui/Button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="container-max section-padding">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="font-display font-bold text-xl text-neutral-800">
                  {companyInfo.name}
                </span>
              </Link>
              
              <p className="text-neutral-600 max-w-md leading-relaxed">
                {companyInfo.description}
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.platform}
                    href={social.url}
                    className="w-10 h-10 bg-neutral-100 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    aria-label={social.platform}
                  >
                    <Image
                      src={social.icon}
                      alt={social.platform}
                      width={20}
                      height={20}
                      className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all duration-200"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="font-display font-semibold text-lg text-neutral-800">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-neutral-600 hover:text-primary-500 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-t border-neutral-200">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-2xl font-display font-bold text-neutral-800">
              عضویت در خبرنامه
            </h3>
            <p className="text-neutral-600">
              جدیدترین اخبار محصولات و تخفیف‌ها را دریافت کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Button>
                عضویت
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-neutral-500 text-sm">
              © 2025 {companyInfo.name}. تمامی حقوق محفوظ است.
            </p>
            <div className="flex space-x-6 space-x-reverse text-sm">
              <Link href="#" className="text-neutral-500 hover:text-primary-500 transition-colors duration-200">
                حریم خصوصی
              </Link>
              <Link href="#" className="text-neutral-500 hover:text-primary-500 transition-colors duration-200">
                شرایط استفاده
              </Link>
              <Link href="#" className="text-neutral-500 hover:text-primary-500 transition-colors duration-200">
                کوکی‌ها
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
