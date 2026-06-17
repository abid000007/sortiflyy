import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, animate } from 'framer-motion'
import {
  Phone, Workflow, Cloud, ShieldCheck, Boxes, Database, Zap, MessagesSquare,
  Smartphone, Globe, BrainCircuit,
  ArrowRight, Check, Sparkles, Star
} from 'lucide-react'
import Hero3D from '../components/Hero3D'
import TiltCard from '../components/TiltCard'

/* ---------------- helpers ---------------- */

function Counter({ to, decimals = 0, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v)
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix}{val.toFixed(decimals)}{suffix}
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <motion.div
      className="max-w-3xl mx-auto text-center mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-zinc-300 mb-5">
        <Sparkles size={14} /> {eyebrow}
      </motion.div>
      <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
        {title}
      </motion.h2>
      {sub && (
        <motion.p variants={fadeUp} custom={2} className="text-lg text-zinc-400">
          {sub}
        </motion.p>
      )}
    </motion.div>
  )
}

/* ---------------- data ---------------- */

const services = [
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Native and cross-platform iOS & Android apps — built with React Native and Flutter. Fast, polished, and App Store / Play Store ready.',
    chip: 'bg-white/5 text-zinc-100 border-white/15',
    glow: 'group-hover:shadow-white/10'
  },
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'High-performance websites and web apps — modern React frontends, robust APIs, and responsive, pixel-perfect UI that converts.',
    chip: 'bg-white/5 text-zinc-100 border-white/15',
    glow: 'group-hover:shadow-white/10'
  },
  {
    icon: Boxes,
    title: 'SaaS Development',
    desc: 'Multi-tenant SaaS platforms built end-to-end: auth, billing, dashboards, and APIs — from MVP to scale in weeks, not quarters.',
    chip: 'bg-white/5 text-zinc-100 border-white/15',
    glow: 'group-hover:shadow-white/10'
  },
  {
    icon: BrainCircuit,
    title: 'AI Model Development',
    desc: 'Custom AI/ML models — LLM fine-tuning, RAG pipelines, computer vision, and predictive analytics, deployed to production.',
    chip: 'bg-white/5 text-zinc-100 border-white/15',
    glow: 'group-hover:shadow-white/10'
  }
]

const steps = [
  { n: '01', t: 'Discovery Call', d: 'A senior architect maps your call flows, infrastructure, and compliance needs in 45 minutes.' },
  { n: '02', t: 'Build & Train', d: 'Your agent and automations are built on AWS, trained on your data, stress-tested against hundreds of scenarios.' },
  { n: '03', t: 'Launch in 7 Days', d: 'Go live on your existing phone numbers and tools. CRM, calendar, and Slack connected on day one.' },
  { n: '04', t: 'Optimize Weekly', d: 'Transcript reviews, prompt tuning, and A/B-tested scripts. Your system gets smarter every week.' }
]

const testimonials = [
  {
    quote: 'We were missing 35% of inbound calls. Sortifly\'s agent answered 100% from week one — it paid for itself in 11 days.',
    name: 'Dr. Rachel Torres',
    role: 'Owner, Meridian Dental Group',
    grad: 'from-zinc-400 to-zinc-600',
    initials: 'RT'
  },
  {
    quote: 'They rebuilt our entire stack on AWS and added an AI ISA that calls leads in under 60 seconds. Showings are up 3.4×.',
    name: 'Marcus Kim',
    role: 'Managing Broker, Apex Realty',
    grad: 'from-zinc-300 to-zinc-500',
    initials: 'MK'
  },
  {
    quote: 'SOC 2 audit passed first try thanks to their compliance work. The voice agents were the bonus that cut support costs 63%.',
    name: 'Amara Liu',
    role: 'VP Ops, Velocity Auto Group',
    grad: 'from-zinc-500 to-zinc-700',
    initials: 'AL'
  }
]

const techs = ['AWS', 'Terraform', 'Kubernetes', 'Python', 'React', 'TypeScript', 'PostgreSQL', 'Twilio', 'HubSpot', 'Salesforce', 'OpenAI', 'Anthropic', 'Snowflake', 'Docker']

/* ---------------- page ---------------- */

export default function Home() {
  return (
    <div className="relative w-full">
      <Hero3D />

      {/* aurora background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full bg-zinc-500/10 blur-[120px]" />
        <div className="aurora-blob-2 absolute top-1/4 -right-40 w-[30rem] h-[30rem] rounded-full bg-zinc-400/10 blur-[120px]" />
        <div className="aurora-blob absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-zinc-600/10 blur-[120px]" />
      </div>
      <div className="fixed inset-0 -z-10 bg-grid" />

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center pt-24 px-4">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-zinc-300 mb-7">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              AI Agents + Enterprise Engineering, one senior team
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-7">
              Automate Every Call.
              <br />
              <span className="text-shimmer">Engineer Everything</span>
              <br />
              Behind It.
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-zinc-400 max-w-xl mb-9">
              AI voice agents that sell and support 24/7 — built on compliant AWS infrastructure,
              wired into your CRM, by the team that ships SaaS platforms for a living.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-white text-black hover:bg-zinc-200 transition-all duration-500 shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5"
              >
                Book a Free Demo
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold glass text-zinc-200 hover:border-white/30 hover:-translate-y-0.5 transition-all"
              >
                Explore Services
              </a>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-zinc-500">
              {['Live in 7 days', 'SOC 2-aligned & HIPAA-ready', 'AWS Certified team'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-400" /> {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* hero stat card stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <TiltCard className="glass rounded-3xl p-8" max={7}>
              <div className="flex items-center gap-4 mb-7">
                <div className="pulse-ring relative w-13 h-13 p-3.5 rounded-full bg-white text-black">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="font-semibold">Ava — Voice Agent</div>
                  <div className="text-sm text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live call in progress
                  </div>
                </div>
                <div className="ml-auto text-zinc-500 text-sm font-mono">00:47</div>
              </div>

              {[
                { who: 'AI', text: 'Thanks for calling Meridian Dental! I have Thursday 2:30 or Friday 10 AM open — which works?', style: 'bg-white/10 border-white/15' },
                { who: 'Caller', text: 'Thursday works great.', style: 'bg-white/5 border-white/10 ml-auto' },
                { who: 'AI', text: 'Booked! Confirmation text on its way. Anything else?', style: 'bg-white/10 border-white/15' }
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.8 }}
                  className={`max-w-[85%] border rounded-2xl px-4 py-2.5 text-sm mb-3 ${m.style}`}
                >
                  <span className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">{m.who}</span>
                  {m.text}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.6 }}
                className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3"
              >
                <Check size={16} /> Appointment booked · CRM updated · 0 humans involved
              </motion.div>
            </TiltCard>

            {/* floating chips */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-4 glass rounded-2xl px-4 py-3 text-sm font-medium"
            >
              ☁️ AWS uptime <span className="text-zinc-100 font-bold">99.99%</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="absolute -bottom-6 -left-6 glass rounded-2xl px-4 py-3 text-sm font-medium"
            >
              🛡️ SOC 2 evidence <span className="text-emerald-300 font-bold">ready</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ TECH MARQUEE ============ */}
      <section className="relative py-10 border-y border-white/5">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-zinc-500 mb-6">
          Built with the enterprise stack
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="marquee-track gap-14 pr-14">
            {[...techs, ...techs].map((t, i) => (
              <span key={i} className="text-xl font-semibold text-zinc-600 hover:text-white transition-colors whitespace-nowrap">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto glass rounded-3xl grid grid-cols-2 lg:grid-cols-4 overflow-hidden">
          {[
            { to: 3.2, decimals: 1, suffix: 'M+', label: 'Calls handled by our agents' },
            { to: 200, suffix: '+', label: 'Production launches shipped' },
            { to: 99.99, decimals: 2, suffix: '%', label: 'AWS infrastructure uptime' },
            { to: 63, suffix: '%', label: 'Avg. cost reduction vs. teams' }
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 text-center border-white/5 [&:not(:first-child)]:border-l max-lg:[&:nth-child(3)]:border-l-0 max-lg:[&:nth-child(odd)]:border-l-0 max-lg:[&:nth-child(n+3)]:border-t"
            >
              <div className="text-4xl md:text-5xl font-bold text-shimmer mb-2">
                <Counter to={s.to} decimals={s.decimals || 0} suffix={s.suffix} />
              </div>
              <div className="text-sm text-zinc-500">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHead
            eyebrow="Full-Stack Capabilities"
            title={<>One Team. <span className="text-shimmer">Every Layer.</span></>}
            sub="From mobile and web to full SaaS platforms and custom AI models — we design, build, and ship the entire product end-to-end."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className={`group ai-card glass rounded-2xl p-6 h-full transition-shadow duration-300 hover:shadow-2xl ${s.glow}`}>
                  <div className={`inline-flex p-3 rounded-xl border mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 ${s.chip}`}>
                    <s.icon size={22} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2.5">{s.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            eyebrow="How It Works"
            title="From First Call to Fully Deployed in 7 Days"
          />
          <div className="grid md:grid-cols-4 gap-5 relative">
            <motion.div
              className="hidden md:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-white/10 via-white/40 to-white/10 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center md:text-left"
              >
                <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-2xl glass text-2xl font-bold text-shimmer mb-5">
                  {s.n}
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.t}</h3>
                <p className="text-sm text-zinc-400">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            eyebrow="Client Results"
            title={<>Teams That Stopped Missing Calls.<br />And Started <span className="text-shimmer">Shipping Faster.</span></>}
          />
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <TiltCard className="glass rounded-2xl p-7 h-full flex flex-col" max={6}>
                  <div className="flex gap-1 text-zinc-200 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={15} fill="currentColor" />)}
                  </div>
                  <p className="text-zinc-300 leading-relaxed flex-1 mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.grad} flex items-center justify-center font-bold text-sm`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-zinc-500">{t.role}</div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden"
        >
          <div className="cta-glow absolute inset-0 rounded-3xl overflow-hidden opacity-60" />
          <div className="relative m-[1.5px] rounded-3xl bg-[#0a0a0b]/95 px-8 py-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Every Day You Wait,<br />
              <span className="text-shimmer">Your Competitors Answer First.</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
              Book a free 30-minute session. We'll demo a voice agent on your use case,
              review your infrastructure, and map the exact ROI — live on the call.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-lg bg-white text-black hover:bg-zinc-200 transition-all duration-500 shadow-xl shadow-white/10 hover:-translate-y-0.5"
            >
              Book Your Free Demo
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
