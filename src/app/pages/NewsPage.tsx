/**
 * News page - Blog-style article listings with filtering
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { SectionHeader } from '../components/shared/SectionHeader';
import { NewsCard } from '../components/shared/NewsCard';
import { NEWS_ARTICLES } from '../../lib/constants';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const categories = ['All', 'Community', 'Education', 'Health', 'Events', 'Research'];

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="News and updates"
          className="absolute inset-0 w-full h-full object-cover"
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-[var(--navy)]/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-4"
          >
            News & Updates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Stay informed about our latest activities, programs, and impact stories
          </motion.p>
        </div>
      </section>

      {/* Featured removed for consistent card heights */}

      {/* Category Filter */}
      <section className="py-12 bg-[var(--neutral-100)] border-y border-gray-200 sticky top-20 z-30 backdrop-blur-sm bg-[var(--neutral-100)]/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[var(--gold)] text-[var(--navy)] shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section ref={ref} className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {NEWS_ARTICLES.filter(a => selectedCategory === 'All' || a.category === selectedCategory).length > 0 ? (
            <div className="responsive-grid">
              {NEWS_ARTICLES
                .filter(a => selectedCategory === 'All' || a.category === selectedCategory)
                .map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <NewsCard {...article} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
