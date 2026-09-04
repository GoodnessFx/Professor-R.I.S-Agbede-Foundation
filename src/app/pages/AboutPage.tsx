/**
 * About page - Foundation story and team
 */

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { SectionHeader } from '../components/shared/SectionHeader';
import { TRUSTEES, VALUES } from '../../lib/constants';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { User } from 'lucide-react';

export function AboutPage() {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: boardRef, inView: boardInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="hero-banner relative min-h-[280px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20,30,45,0.55)' }} />
        <div className="relative z-10 text-center text-white px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-4"
          >
            About the Honouree
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl max-w-2xl mx-auto"
          >
            Honouring the legacy of Professor R.I.S Agbede and his commitment to humanity
          </motion.p>
        </div>
      </section>

      {/* Biography Section */}
      <section ref={heroRef} id="honouree" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28"
            >
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-[var(--gold)] rounded-lg transform rotate-3" />
                <ImageWithFallback
                  src="/images/professor-agbede-portrait.jpeg"
                  alt="Professor Rowland Ibrahim Shehu Agbede"
                  className="relative rounded-lg shadow-2xl w-full object-cover"
                  style={{ maxHeight: '600px' }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl font-serif font-bold text-[var(--navy)] mb-2">
                Professor R.I.S Agbede
              </h2>
              <p className="text-xl text-[var(--gold)] mb-6">Honouree</p>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Professor Rowland Ibrahim Shehu Agbede was a giant amongst men, a distinguished scholar and a devoted family man. He was born on February 3rd, 1949, in Kaduna, Kaduna State, to the family of the late Alhaji Ibrahim and Hajiya Maryam Azumi Agbede of Okpekpe, Etsako East, Edo State, as the first son of eleven. His life was marked by a pursuit of excellence and a commitment to faith.
                </p>
                <p>
                  He completed his primary school education at St Michael's School, Kaduna, and his secondary school education at Holy Trinity Grammar School in Sabon Gida, Ora, in the present Edo State. He then went on to Ahmadu Bello University, ABU, where he achieved a Doctor of Veterinary Medicine in 1975.
                </p>
                <p>
                  In 1976, after completing his year of national youth service, he joined Ahmadu Bello University, Zaria, at the rank of Lecturer 2 with an eventual promotion to Professor in 1989, the youngest ever (at the time) in ABU's history.
                </p>
                <p>
                  En route to this, in 1977, through the Commonwealth Academic Staff Award programme, he completed a Master of Veterinary Science in applied Parasitology at the University of Liverpool, England, School of Tropical Medicine.
                </p>
                <p>
                  By 1984, he had also completed a PhD in Parasitology at the University of Queensland, Australia, through the Federal Government of Nigeria Scholarship and the ABU study fellowship programme. His research at the University of Queensland provided valuable insights into the dynamics of blood meal digestion in ticks and identified a new stage in the life cycle of the intracellular parasite, Babesia bovis. As a result, he was invited to participate in a large ongoing research programme on vaccination of cattle against ticks at the CSIRO Laboratories in Brisbane and to write a chapter in "Morphology, Physiology and Behavioural Biology of Ticks," published by Ellis Horwood Chichester in 1986, which remains in print. Throughout his life, he remained a prolific scholarly writer with publications from as early as 1975, three books, and over a hundred publications and journal papers, spanning Parasitology, Veterinary Entomology, Tropical Biosciences and more. His work has received over 1200 citations and is still being referenced today, with over 400 citations since 2020.
                </p>
                <p>
                  After 37 years at Ahmadu Bello University Zaria, he joined the University of Abuja in 2014 where he served as Head of his department and retired from active service in 2019 after 43 years of service.
                </p>
                <p>
                  His list of achievements also includes 8 years as team leader for the European Economic Commission (EEC) sponsored project on the Control of African Animal Trypanosomiasis, coordinator of the African Regional Postgraduate Programme in Insect Science at ICIPE Nairobi, Kenya, from 1992 to 2014, the Fulbright Senior African Research Scholar award in 1995 from the University of Florida, and numerous fellowships, notably with the Nigerian Society of Parasitology and the College of Veterinary Surgeons. He was a very active member of the Parasitology and Public Health Society of Nigeria, where he served as the 3rd Editor-in-Chief of the Nigerian Journal for Parasitology for 9 years. He also served as president of the Society and was eventually appointed to the board of trustees, a position he held until his passing.
                </p>
                <p>
                  Beyond his academic accolades, he was a pillar of strength to his family and community. He served as President of the Men's Missionary Union (MMU) at Calvary Baptist Church, his home church in Zaria, for many years. After moving to Abuja, he joined the Hospital Chapel, where he served on the marriage and counselling committee and was a committed member of the brothers' fellowship. He enjoyed travelling, loved sport, particularly tennis and football, and was an active member of the ABU Lawn Tennis club. Husband to Mrs Hauwa Agbede for 46 years, they had 4 children and 3 grandchildren, with many more who saw him as a father figure.
                </p>
                <p>
                  Though his passing leaves a void in our hearts, we rejoice knowing he has completed his race and is now resting peacefully with his Creator. His life reflects his personal mantra:
                </p>

                <blockquote className="border-l-4 border-[var(--gold)] pl-6 py-3 my-6 bg-[var(--neutral-100)] rounded-r-lg">
                  <p className="text-lg italic font-serif text-[var(--navy)] leading-relaxed">
                    "Seest thou a man diligent in his works? he shall stand before kings; he shall not stand before mean men."
                  </p>
                  <footer className="mt-2 text-sm font-semibold text-[var(--gold)]">Proverbs 22:29</footer>
                </blockquote>

                <p className="text-gray-500 italic">Thank you.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Objectives */}
      <section ref={valuesRef} className="section-padding bg-[var(--neutral-100)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="responsive-grid mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <h3 className="text-2xl font-serif font-bold text-[var(--navy)] mb-4">Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To support indigent persons with end stage kidney disease to access replacement therapy across Nigeria.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <h3 className="text-2xl font-serif font-bold text-[var(--navy)] mb-4">Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                A Nigeria where kidney disease is no longer a death sentence for the indigent, through accessible healthcare and sustainable support.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-md"
          >
            <h3 className="text-2xl font-serif font-bold text-[var(--navy)] mb-6">Our Objectives</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Support indigent persons with end stage kidney disease to access replacement therapy",
                "Support a prize for excellence in the study of parasitology and support trainings and capacity-building related to kidney health",
                "Collaborate with hospitals, healthcare providers, and other organizations to support kidney disease awareness, prevention, and early detection programs",
                "Establish patient support programs including counseling, education, emotional support, nutrition, and social welfare assistance to patients and caregivers",
                "Provide financial assistance for laboratory investigations and related medical services for indigent end stage kidney disease patients"
              ].map((objective, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{objective}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Board of Trustees */}
      <section ref={boardRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Board of Trustees"
            subtitle="Experienced leaders committed to driving positive change"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {TRUSTEES.map((trustee, index) => (
              <motion.div
                key={trustee.id}
                initial={{ opacity: 0, y: 30 }}
                animate={boardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[var(--neutral-100)] mx-auto mb-4 overflow-hidden border border-[var(--navy)]/10 shadow-sm flex items-center justify-center">
                  {trustee.avatar ? (
                    <ImageWithFallback
                      src={trustee.avatar}
                      alt={trustee.name}
                      className="w-full h-full object-cover scale-[1.08]"
                      style={{
                        objectPosition:
                          trustee.name === 'Zakari Agbede'
                            ? 'center top'
                            : trustee.name === 'Nuhu Agbede'
                              ? 'center 22%'
                              : trustee.name === 'Dr. Ramatu Agbede'
                                ? 'center 12%'
                                : 'center center',
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[var(--neutral-100)]">
                      <User size={48} className="text-[var(--navy)]/30" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-serif font-semibold text-[var(--navy)] mb-1">
                  {trustee.name}
                </h3>
                <p className="text-[var(--gold)]">{trustee.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Registration */}
      <section className="py-12 bg-[var(--neutral-100)] border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            Registered Non-Profit Organization | CAC No: 9382765 | 
            Registered with Special Control Unit Against Money Laundering (SCUML)
          </p>
        </div>
      </section>
    </div>
  );
}
