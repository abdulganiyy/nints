import Link from "next/link";
import {
  Wallet,
  //   Facebook,
  //   Instagram,
  //   Linkedin,
  //   Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Smartphone,
  Globe,
} from "lucide-react";

const companyLinks = [
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const services = [
  {
    label: "Wallet",
    href: "/wallet",
  },
  {
    label: "Airtime",
    href: "/airtime",
  },
  {
    label: "Data",
    href: "/data",
  },
  {
    label: "Bills",
    href: "/bills",
  },
  {
    label: "Savings",
    href: "/savings",
  },
  {
    label: "Loans",
    href: "/loans",
  },
];

const legal = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms of Service",
    href: "/terms",
  },
  {
    label: "Cookie Policy",
    href: "/cookies",
  },
  {
    label: "Help Center",
    href: "/help",
  },
];

const socials = [
  {
    icon: Mail,
    href: "#",
  },
  {
    icon: Mail,
    href: "#",
  },
  {
    icon: Mail,
    href: "#",
  },
  {
    icon: Mail,
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top */}

        <div className="grid gap-12 py-20 lg:grid-cols-5">
          {/* Company */}

          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Wallet className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">Nints</h2>

                <p className="text-sm text-slate-400">
                  Smart Financial Platform
                </p>
              </div>
            </Link>

            <p className="mt-8 max-w-md leading-8 text-slate-400">
              Manage your money with one secure platform. Fund your wallet, buy
              airtime and data, pay bills, build savings, and access financial
              services with ease.
            </p>

            {/* Contact */}

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-500" />

                <span>support@nints.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-500" />

                <span>+234 800 000 0000</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-emerald-500" />

                <span>Lagos, Nigeria</span>
              </div>
            </div>

            {/* Social */}

            <div className="mt-8 flex gap-3">
              {socials.map((social, index) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="rounded-xl bg-slate-900 p-3 transition hover:bg-emerald-600"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Company */}

          <div>
            <h3 className="font-semibold text-white">Company</h3>

            <ul className="mt-6 space-y-4">
              {companyLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </div>

          {/* Services */}

          <div>
            <h3 className="font-semibold text-white">Services</h3>

            <ul className="mt-6 space-y-4">
              {services.map((service) => (
                <FooterLink key={service.label} {...service} />
              ))}

              <li>
                <span className="flex items-center gap-2 text-slate-500">
                  <Globe className="h-4 w-4" />
                  International Transfers
                  <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
                    Soon
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}

          <div>
            <h3 className="font-semibold text-white">Legal</h3>

            <ul className="mt-6 space-y-4">
              {legal.map((item) => (
                <FooterLink key={item.label} {...item} />
              ))}
            </ul>

            {/* Apps */}

            <div className="mt-10">
              <h4 className="font-semibold text-white">Mobile Apps</h4>

              <div className="mt-4 space-y-3">
                <button className="flex w-full items-center justify-between rounded-xl border border-slate-700 px-4 py-3 transition hover:border-emerald-500">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5" />

                    <span>Download App</span>
                  </div>

                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="border-t border-slate-800" />

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Nints. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <span>Built for modern digital finance.</span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-600 md:block" />

            <span>Wallet • Airtime • Data • Savings • Loans</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  label: string;
  href: string;
}

function FooterLink({ label, href }: FooterLinkProps) {
  return (
    <li>
      <Link href={href} className="transition hover:text-emerald-400">
        {label}
      </Link>
    </li>
  );
}
