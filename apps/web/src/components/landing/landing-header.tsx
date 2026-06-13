'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky z-50 md:top-0">
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 backdrop-blur-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="text-lg font-semibold text-white">traqory</span>
          </Link>

          {/* Navigation */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 font-mono uppercase md:flex">
            <Link
              href="/pricing"
              className="rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-[#111] hover:text-white"
            >
              Pricing
            </Link>

            <Link
              href="/docs"
              className="rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-[#111] hover:text-white"
            >
              Docs
            </Link>

            <Link
              href="/changelog"
              className="rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-[#111] hover:text-white"
            >
              Changelog
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              className="rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-[#111] hover:text-white"
            >
              Github
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 font-mono uppercase md:flex">
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-[#111] hover:text-white"
            >
              Login
            </Link>

            {/* <Link
              href="/register"
              className="
                flex
                h-8
                w-full
                items-center
                justify-center
                gap-2
                border
                border-[#14532d]
                bg-[#052e16]
                px-4
                text-xs
                font-mono
                uppercase
                tracking-widest
                text-[#86efac]
                transition-colors
                hover:border-[#166534]
                hover:bg-[#064e23]
              "
            >
              Get Started
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-8 w-8 items-center justify-center border border-white/5 bg-[#050505] md:hidden"
          >
            <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.15 }}>
              <Menu className="h-4 w-4 text-white" />
            </motion.div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed right-0 top-0 z-[60] h-screen w-72 border-l border-white/5 bg-[#050505]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 p-5">
                <span className="text-lg font-semibold text-white">traqory</span>

                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center border border-white/5"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Navigation */}
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="flex flex-col font-mono uppercase border-b border-white/5 "
              >
                {[
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Docs', href: '/docs' },
                  { label: 'Changelog', href: '/changelog' },
                  { label: 'Github', href: 'https://github.com' },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: 12,
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                      },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block px-5 py-4 text-sm text-gray-400 transition-colors hover:bg-[#111] hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Bottom Actions */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.2,
                }}
                className="absolute bottom-5 left-5 right-5 flex flex-col gap-2 font-mono uppercase"
              >
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-center text-sm text-gray-400 transition-colors hover:bg-[#111] hover:text-white"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    h-8
                    items-center
                    justify-center
                    gap-2
                    border
                    border-[#14532d]
                    bg-[#052e16]
                    px-4
                    text-xs
                    font-mono
                    uppercase
                    tracking-widest
                    text-[#86efac]
                    transition-colors
                    hover:border-[#166534]
                    hover:bg-[#064e23]
                  "
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
