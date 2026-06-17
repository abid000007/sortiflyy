import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/#services', label: 'Services', anchor: true },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30' : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-xl group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.4" strokeLinecap="round" className="w-5 h-5">
                <path d="M3 12q2-7 4 0t4 0 4 0 4 0" />
              </svg>
            </div>
            <span>Sortifly<span className="text-zinc-500">.</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) =>
              l.anchor ? (
                <a key={l.label} href={l.to} className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} to={l.to} className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                  {l.label}
                </Link>
              )
            )}
          </div>

          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-sm bg-white text-black hover:bg-zinc-200 rounded-full font-semibold shadow-lg shadow-white/10 transition-all duration-500 hover:-translate-y-0.5"
          >
            Book Demo <ArrowRight size={15} />
          </Link>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 glass rounded-lg">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-5 space-y-1">
            {links.map((l) =>
              l.anchor ? (
                <a key={l.label} href={l.to} onClick={() => setIsOpen(false)} className="block py-3 px-2 border-b border-white/5 font-medium">
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} to={l.to} className="block py-3 px-2 border-b border-white/5 font-medium">
                  {l.label}
                </Link>
              )
            )}
            <Link to="/contact" className="block mt-4 px-4 py-3 bg-white text-black rounded-full text-center font-semibold">
              Book Demo
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
