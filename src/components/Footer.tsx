import React from 'react';
import Link from 'next/link';
import { legalConfig } from '@/config/legal.config';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 text-sm py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company & Legal Info */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-base">{legalConfig.companyName}</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Designed for real production deployment with strict security, privacy protection, and transparent legal compliance.
          </p>
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} {legalConfig.legalEntityName}. All rights reserved.
          </div>
        </div>

        {/* Legal & Policy Links */}
        <div>
          <h4 className="text-slate-200 font-medium mb-3 text-xs uppercase tracking-wider">Legal Policies</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
            <li><Link href="/cookies" className="hover:text-cyan-400 transition-colors">Cookie Policy</Link></li>
            <li><Link href="/refund-policy" className="hover:text-cyan-400 transition-colors">Refund Policy</Link></li>
            <li><Link href="/advertising-policy" className="hover:text-cyan-400 transition-colors">Advertising Policy</Link></li>
            <li><Link href="/copyright" className="hover:text-cyan-400 transition-colors">Copyright / DMCA</Link></li>
          </ul>
        </div>

        {/* User Data & Trust */}
        <div>
          <h4 className="text-slate-200 font-medium mb-3 text-xs uppercase tracking-wider">User Rights & Trust</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/delete-account" className="hover:text-cyan-400 transition-colors">Delete Account</Link></li>
            <li><Link href="/data-export" className="hover:text-cyan-400 transition-colors">Export Personal Data</Link></li>
            <li><Link href="/security" className="hover:text-cyan-400 transition-colors">Security Overview</Link></li>
            <li><Link href="/report-abuse" className="hover:text-cyan-400 transition-colors">Report Abuse</Link></li>
            <li><Link href="/third-party-services" className="hover:text-cyan-400 transition-colors">Third-Party Services</Link></li>
            <li><Link href="/licenses" className="hover:text-cyan-400 transition-colors">Open Source Licenses</Link></li>
          </ul>
        </div>

        {/* Company & Support */}
        <div>
          <h4 className="text-slate-200 font-medium mb-3 text-xs uppercase tracking-wider">Company & Support</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link></li>
            <li><Link href="/ads.txt" target="_blank" className="hover:text-cyan-400 transition-colors">ads.txt</Link></li>
            <li><Link href="/app-ads.txt" target="_blank" className="hover:text-cyan-400 transition-colors">app-ads.txt</Link></li>
            <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Admin Dashboard</Link></li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
