/**
 * Latest news preview section for home page
 */

import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { SectionHeader } from '../shared/SectionHeader';
import { NewsCard } from '../shared/NewsCard';
import { NEWS_ARTICLES } from '../../../lib/constants';

const CATEGORIES = ['All', 'Community', 'Education', 'Health', 'Events', 'Research'];

export function NewsTeaser() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredArticles = activeCategory === 'All' 
    ? NEWS_ARTICLES.slice(0, 6)
    : NEWS_ARTICLES.filter(article => article.category === activeCategory).slice(0, 6);

  return (
    <section ref={ref} className="section-padding bg-[var(--neutral-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-6">
          <SectionHeader
            title="News & Updates"
            subtitle="Latest developments in kidney disease support and awareness"
          />
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`tap-target px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === category
                    ? 'bg-[var(--gold)] border-[var(--gold)] text-white'
                    : 'bg-transparent border-gray-300 text-gray-600 hover:border-[var(--gold)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="responsive-grid mt-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <NewsCard {...article} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold hover:gap-3 transition-all text-lg"
          >
            View All News <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
