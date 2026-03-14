/**
 * Latest news preview section for home page
 */

import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { SectionHeader } from '../shared/SectionHeader';
import { NewsCard } from '../shared/NewsCard';
import { NEWS_ARTICLES } from '../../../lib/constants';

export function NewsTeaser() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const latestArticles = NEWS_ARTICLES.slice(0, 3);

  return (
    <section ref={ref} className="py-20 bg-[var(--neutral-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            title="Latest News"
            subtitle="Stay updated with our recent activities and impact stories"
          />
          <Link
            to="/news"
            className="hidden md:inline-flex items-center gap-2 text-[var(--gold)] font-semibold hover:gap-3 transition-all"
          >
            View All <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <NewsCard {...article} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold"
          >
            View All Articles <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
