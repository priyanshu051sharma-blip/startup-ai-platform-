"use client";

import React from "react";
import { motion } from "framer-motion";

const logos = [
  { name: "Startup India", abbr: "SI" },
  { name: "Microsoft for Startups", abbr: "MS" },
  { name: "AWS Activate", abbr: "AWS" },
  { name: "Google for Startups", abbr: "GFS" },
  { name: "IEEE", abbr: "IEEE" },
  { name: "YC Inspired", abbr: "YC" },
  { name: "NASSCOM", abbr: "NC" },
  { name: "IIT Incubator", abbr: "IIT" },
];

export function TrustedBy() {
  return (
    <section className="py-20 relative overflow-hidden" aria-labelledby="trusted-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="trusted-heading"
          className="text-center text-[#737373] text-sm font-medium tracking-widest uppercase mb-10"
        >
          Trusted by founders from leading programs & ecosystems
        </motion.p>

        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none" />

          <motion.div
            className="flex gap-8 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            aria-hidden="true"
          >
            {[...logos, ...logos].map((logo, i) => (
              <motion.div
                key={`${logo.name}-${i}`}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 glass rounded-2xl px-6 py-4 flex items-center gap-3 cursor-default group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F8CFF]/20 to-[#7C3AED]/20 flex items-center justify-center">
                  <span className="text-[#4F8CFF] text-xs font-bold">
                    {logo.abbr.substring(0, 2)}
                  </span>
                </div>
                <span className="text-[#B4B4B4] text-sm font-medium group-hover:text-white transition-colors whitespace-nowrap">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
