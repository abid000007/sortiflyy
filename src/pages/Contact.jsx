import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Mail, Phone, Clock, ArrowRight } from 'lucide-react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

const inputCls =
  'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-zinc-600 ' +
  'focus:border-white/60 focus:ring-2 focus:ring-white/10 focus:outline-none transition'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', industry: '', message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${API_URL}/api/demo-request`, formData)
      setSuccess(true)
      setFormData({ name: '', company: '', email: '', phone: '', industry: '', message: '' })
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to submit. Make sure the backend server is running (python server.py).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4">
      {/* aurora background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full bg-zinc-500/10 blur-[120px]" />
        <div className="aurora-blob-2 absolute bottom-0 -right-40 w-[30rem] h-[30rem] rounded-full bg-zinc-400/10 blur-[120px]" />
      </div>
      <div className="fixed inset-0 -z-10 bg-grid" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-5">
            See Your AI Agent <span className="text-shimmer">Built Live.</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            30 minutes with a senior architect — not a sales rep. Demo, infrastructure review, and exact ROI math.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-6 items-start">
          {/* info card */}
          <motion.div
            className="glass rounded-3xl p-7"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <h3 className="font-semibold text-lg mb-5">What happens next</h3>
            <ul className="space-y-3.5 mb-8">
              {[
                'We respond within one business day',
                'Demo tailored to your call flows',
                'AWS & compliance review included',
                'Deployment plan in under 48 hours'
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-sm text-zinc-300">
                  <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" /> {t}
                </li>
              ))}
            </ul>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <a href="mailto:abidrahim05@gmail.com" className="flex items-center gap-3 text-sm text-zinc-300 hover:text-white transition-colors">
                <span className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-zinc-100"><Mail size={16} /></span>
                abidrahim05@gmail.com
              </a>
              <a href="tel:+923334029849" className="flex items-center gap-3 text-sm text-zinc-300 hover:text-white transition-colors">
                <span className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-zinc-100"><Phone size={16} /></span>
                +92 333 4029849
              </a>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-zinc-100"><Clock size={16} /></span>
                Response within one business day
              </div>
            </div>
          </motion.div>

          {/* form */}
          <motion.div
            className="glass rounded-3xl p-8"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            {success ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Check size={36} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Request received!</h3>
                <p className="text-zinc-400 max-w-sm mx-auto">
                  A senior architect will reach out within one business day to schedule your demo.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputCls} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company *</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} required className={inputCls} placeholder="Acme Inc." />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Work email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputCls} placeholder="jane@acme.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputCls} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">What do you need? *</label>
                  <select name="industry" value={formData.industry} onChange={handleChange} required className={`${inputCls} [&>option]:bg-zinc-900`}>
                    <option value="">Select a service</option>
                    <option value="voice-agents">AI Voice Agents</option>
                    <option value="automation">Business Process Automation</option>
                    <option value="aws">AWS Cloud Infrastructure</option>
                    <option value="compliance">Compliance & Security</option>
                    <option value="saas">SaaS App Development</option>
                    <option value="integrations">CRM / API Integrations</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tell us about your project</label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange} rows="4" className={inputCls}
                    placeholder="E.g., We miss ~30% of calls during peak hours and want to automate booking + move our app to AWS..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold bg-white text-black hover:bg-zinc-200 transition-all duration-500 shadow-lg shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending…' : 'Book My Free Demo'}
                  {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
                <p className="text-xs text-zinc-600 text-center">
                  No spam, ever. Your details go straight to the engineering team.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
