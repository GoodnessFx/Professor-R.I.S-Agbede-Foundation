/**
 * Single news article page
 */

import { useParams, Link } from 'react-router';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { NEWS_ARTICLES } from '../../lib/constants';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function NewsArticlePage() {
  const { slug } = useParams();
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="pt-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/news" className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold mb-6">
          <ArrowLeft size={18} /> Back to News
        </Link>
        <h1 className="text-3xl font-serif font-bold text-[var(--navy)]">Article not found</h1>
        <p className="text-gray-600 mt-2">The article you are looking for may have been moved or removed.</p>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--navy)]/70" />
        <div className="relative z-10 text-white text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            {article.title}
          </motion.h1>
          <div className="flex items-center justify-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Calendar size={16} />{article.date}</span>
            <span className="flex items-center gap-1"><User size={16} />{article.author}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Link to="/news" className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold mb-8">
            <ArrowLeft size={18} /> Back to News
          </Link>
          <article className="prose prose-lg max-w-none">
            <blockquote className="border-l-4 pl-4 italic text-[var(--navy)]/90">
              {article.pullQuote}
            </blockquote>
            <p>{article.excerpt}</p>
            {(article.content ?? []).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>
          {/* Related */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-serif font-bold text-[var(--navy)] mb-4">Related Articles</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {NEWS_ARTICLES.filter(a => a.slug !== article.slug).slice(0, 4).map(a => (
                <Link key={a.id} to={`/news/${a.slug}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--neutral-100)] transition-colors">
                  <ImageWithFallback src={a.image} alt={a.title} className="w-20 h-14 object-cover rounded-md" />
                  <div>
                    <p className="text-sm text-[var(--gold)]">{a.category}</p>
                    <p className="text-[var(--navy)] font-medium">{a.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
