"use client";

import { motion } from "framer-motion";
import { LIFE_PROFILE } from "@/lib/constants";
import SectionHeader from "@/components/layout/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";
import Badge from "@/components/ui/Badge";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const STATUS_BADGE: Record<string, "feat" | "init" | "default"> = {
  finished: "feat",
  reading: "default",
  wishlist: "init",
};

export default function ReadingSection() {
  return (
    <section className="py-20">
      <SectionHeader command="ls ~/bookshelf/" id="reading" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {LIFE_PROFILE.books.map((book) => (
          <motion.div key={book.title} variants={item}>
            <GlowCard className="h-full">
              <div className="flex items-center justify-between mb-3">
                <Badge variant={STATUS_BADGE[book.status]}>{book.status}</Badge>
                <span className="text-xs font-mono text-text-secondary">{book.genre}</span>
              </div>

              <h3 className="font-mono text-sm font-bold text-accent-amber mb-1">
                {book.title}
              </h3>
              <p className="text-xs text-text-secondary mb-3">{book.author}</p>

              {book.review && (
                <p className="text-sm text-text-secondary leading-relaxed mb-2">
                  {book.review}
                </p>
              )}

              {book.rating && (
                <div className="text-accent-amber text-sm">
                  {"★".repeat(book.rating)}
                  {"☆".repeat(5 - book.rating)}
                </div>
              )}
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
