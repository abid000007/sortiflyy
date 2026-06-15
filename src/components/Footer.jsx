import { Link } from 'react-router-dom'
import { Mail, Phone, ArrowUpRight } from 'lucide-react'

const services = [
  'AI Voice Agents', 'Process Automation', 'AWS Infrastructure',
  'Compliance & Security', 'SaaS Development', 'CRM Integrations'
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-16 px-4 mt-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-xl mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.4" strokeLinecap="round" className="w-5 h-5">
                  <path d="M3 12q2-7 4 0t4 0 4 0 4 0" />
                </svg>
              </div>
              <span>Sortifly<span className="text-zinc-500">.</span></span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mb-5">
              AI voice agents, business automation, and enterprise engineering — AWS infrastructure,
              compliance, and SaaS development from one accountable senior team.
            </p>
            <div className="flex flex-wrap gap-2">
              {['SOC 2-aligned', 'HIPAA-ready', 'AWS Certified', '99.99% uptime'].map((b) => (
                <span key={b} className="text-xs font-medium glass rounded-full px-3 py-1.5 text-zinc-300">{b}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s}>
                  <a href="/#services" className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    {s} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:abidrahim@sortifly.com" className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors">
                  <Mail size={15} /> abidrahim@sortifly.com
                </a>
              </li>
              <li>
                <a href="tel:+923334029849" className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors">
                  <Phone size={15} /> +92 333 4029849
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black shadow-lg shadow-white/10 hover:-translate-y-0.5 transition-transform"
                >
                  Book a Demo <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-7 flex justify-between items-center flex-wrap gap-3 text-sm text-zinc-500">
          <div>© {new Date().getFullYear()} Sortifly. All rights reserved.</div>
          <div>Engineering the future of voice automation.</div>
        </div>
      </div>
    </footer>
  )
}
