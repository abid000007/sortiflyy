import { motion } from 'framer-motion'
import { Check, Mail, Phone, Clock, ArrowUpRight } from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'abidrahim@sortifly.com',
    href: 'mailto:abidrahim@sortifly.com',
    hint: 'Best for project briefs and detailed questions',
  },
  {
    icon: Phone,
    label: 'Call or WhatsApp',
    value: '+92 333 4029849',
    href: 'tel:+923334029849',
    hint: 'Speak directly with a senior architect',
  },
]

export default function Contact() {
  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4">
      {/* aurora background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full bg-zinc-500/10 blur-[120px]" />
        <div className="aurora-blob-2 absolute bottom-0 -right-40 w-[30rem] h-[30rem] rounded-full bg-zinc-400/10 blur-[120px]" />
      </div>
      <div className="fixed inset-0 -z-10 bg-grid" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-5">
            Let's Build Something <span className="text-shimmer">Remarkable.</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Reach out directly — you'll talk to a senior architect, not a sales rep.
            We respond within one business day.
          </p>
        </motion.div>

        {/* contact method cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {contactMethods.map((m, i) => (
            <motion.a
              key={m.label}
              href={m.href}
              className="glass rounded-3xl p-7 group hover:-translate-y-1 transition-transform duration-300"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="p-3 rounded-2xl bg-white/5 border border-white/15 text-zinc-100">
                  <m.icon size={20} />
                </span>
                <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1.5">{m.label}</div>
              <div className="text-lg font-semibold mb-2 break-words">{m.value}</div>
              <p className="text-sm text-zinc-400">{m.hint}</p>
            </motion.a>
          ))}
        </div>

        {/* details + what happens next */}
        <motion.div
          className="glass rounded-3xl p-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-5">What happens next</h3>
              <ul className="space-y-3.5">
                {[
                  'We respond within one business day',
                  'Demo tailored to your call flows',
                  'AWS & compliance review included',
                  'Deployment plan in under 48 hours',
                ].map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-zinc-300">
                    <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:border-l md:border-white/10 md:pl-8">
              <h3 className="font-semibold text-lg mb-5">Working hours</h3>
              <div className="flex items-center gap-3 text-sm text-zinc-300 mb-4">
                <span className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-zinc-100"><Clock size={16} /></span>
                Mon–Sat, 9:00 AM – 8:00 PM (PKT)
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Prefer email? Drop us a line at{' '}
                <a href="mailto:abidrahim@sortifly.com" className="text-white underline underline-offset-4 hover:text-zinc-300">
                  abidrahim@sortifly.com
                </a>{' '}
                with a short brief and we'll get back to you with next steps.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['SOC 2-aligned', 'HIPAA-ready', 'AWS Certified'].map((b) => (
                  <span key={b} className="text-xs font-medium glass rounded-full px-3 py-1.5 text-zinc-300">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
