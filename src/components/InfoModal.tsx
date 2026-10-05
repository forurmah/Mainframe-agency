import { useEffect } from 'react';
import { X, ArrowUpRight, Check, Send } from 'lucide-react';
import { useState } from 'react';

export type ModalType = 'Labs' | 'Studio' | 'Openings' | 'Shop' | 'Contact' | null;

interface InfoModalProps {
  type: ModalType;
  onClose: () => void;
  initialPrompt?: string;
}

export function InfoModal({ type, onClose, initialPrompt = '' }: InfoModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState(initialPrompt);
  const [selectedService, setSelectedService] = useState('Brand & Digital Experience');

  useEffect(() => {
    if (initialPrompt) {
      setContactMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl animate-fade-in">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-[#0a0a0a] border border-white/15 text-white rounded-none p-6 sm:p-10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
          <div className="flex items-baseline gap-3">
            <span className="text-[20px] font-medium tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Mainframe®
            </span>
            <span className="text-white/40 text-sm">/</span>
            <span className="text-lg text-white/80 font-normal">{type}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content by Type */}
        {type === 'Labs' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-normal tracking-tight mb-3">
                Mainframe Applied Research & Experimental Systems
              </h3>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                Labs is our exploratory division where we build speculative user interfaces, bespoke spatial interactions, real-time shaders, and generative agent runtimes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 border border-white/10 bg-white/[0.02] hover:border-white/30 transition-colors">
                <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Project 01 · 2026</div>
                <h4 className="text-lg font-medium mb-1">A.R.I.A Subsystem</h4>
                <p className="text-sm text-white/60 mb-4">
                  Adaptive Response Interface Agent capable of modulating layout and spatial presence dynamically based on real-time sensory inputs.
                </p>
                <span className="inline-flex items-center text-xs text-white/80 underline underline-offset-4">
                  Active in Hero Environment
                </span>
              </div>

              <div className="p-5 border border-white/10 bg-white/[0.02] hover:border-white/30 transition-colors">
                <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Project 02 · 2026</div>
                <h4 className="text-lg font-medium mb-1">Volumetric Time-Scrub Engine</h4>
                <p className="text-sm text-white/60 mb-4">
                  Ultra-low-latency timeline interpolation engine synchronizing high-resolution video streams with raw cursor vector delta coordinates.
                </p>
                <span className="inline-flex items-center text-xs text-white/80 underline underline-offset-4">
                  Deployed on Mainframe Core
                </span>
              </div>

              <div className="p-5 border border-white/10 bg-white/[0.02] hover:border-white/30 transition-colors">
                <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Project 03 · 2026</div>
                <h4 className="text-lg font-medium mb-1">Kinetic Typography 04</h4>
                <p className="text-sm text-white/60 mb-4">
                  Variable font matrix responding to sound velocity and user proximity in real-time WebGL space.
                </p>
                <span className="inline-flex items-center text-xs text-white/80 underline underline-offset-4">
                  Available in Type Specimen
                </span>
              </div>

              <div className="p-5 border border-white/10 bg-white/[0.02] hover:border-white/30 transition-colors">
                <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Project 04 · 2026</div>
                <h4 className="text-lg font-medium mb-1">Neuro-Shader Shifter</h4>
                <p className="text-sm text-white/60 mb-4">
                  GPU compute fragment shaders generating emergent chromatic aberration and holographic depth.
                </p>
                <span className="inline-flex items-center text-xs text-white/80 underline underline-offset-4">
                  Open Spec RFC
                </span>
              </div>
            </div>
          </div>
        )}

        {type === 'Studio' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-normal tracking-tight mb-3">
                Disciplined Craft at the Confluence of Art and Systems
              </h3>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                Founded in 2024, Mainframe is an independent studio operating across Tokyo, London, and San Francisco. We build digital brands, products, and interactive environments for people with uncompromising taste.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-y border-white/10 py-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Locations</div>
                <div className="text-sm text-white/90">Tokyo / London / SF</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Capabilities</div>
                <div className="text-sm text-white/90">Identity, Creative Tech, Spatial UI</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Recognition</div>
                <div className="text-sm text-white/90">Awwwards SOTD, D&AD, TDC 2025</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4">Selected Collaborators</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white/80">
                <div className="p-3 border border-white/10 bg-white/[0.02]">Nothing Tech</div>
                <div className="p-3 border border-white/10 bg-white/[0.02]">Humane Systems</div>
                <div className="p-3 border border-white/10 bg-white/[0.02]">Kvadrat Design</div>
                <div className="p-3 border border-white/10 bg-white/[0.02]">Acronym Lab</div>
              </div>
            </div>
          </div>
        )}

        {type === 'Openings' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-normal tracking-tight mb-3">
                Open Roles at Mainframe
              </h3>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                We are a small, focused collective. We look for individuals who blend deep engineering rigor with aesthetic intuition.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Creative Technologist / WebGL Engineer',
                  loc: 'Tokyo or Remote',
                  type: 'Full-time',
                  desc: 'Crafting spatial web experiences, high-performance canvas engines, and real-time audio-visual interactive architectures.',
                },
                {
                  title: 'Design Director — Systems & Brand',
                  loc: 'London or Hybrid',
                  type: 'Full-time',
                  desc: 'Leading identity programs, typography craftsmanship, and visual narrative for next-generation hardware and software brands.',
                },
                {
                  title: 'Frontend Systems Architect (React / TS)',
                  loc: 'San Francisco or Remote',
                  type: 'Full-time',
                  desc: 'Building ultra-fluid responsive frontends, micro-interactions, motion pipelines, and production web app frameworks.',
                },
              ].map((role) => (
                <div
                  key={role.title}
                  className="p-5 border border-white/10 hover:border-white/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-lg font-medium text-white">{role.title}</h4>
                    <p className="text-sm text-white/60 mt-1 max-w-xl">{role.desc}</p>
                    <div className="flex items-center gap-3 text-xs text-white/40 mt-2">
                      <span>{role.loc}</span>
                      <span>·</span>
                      <span>{role.type}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setContactMessage(`Hi Mainframe, I'd like to apply for the ${role.title} role.`);
                      // Switch to contact
                    }}
                    className="self-start sm:self-center px-4 py-2 text-xs uppercase tracking-widest border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all cursor-pointer whitespace-nowrap"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'Shop' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-normal tracking-tight mb-3">
                Editions & Physical Artifacts
              </h3>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                Limited runs of physical objects, publications, and hardware prototypes crafted in collaboration with specialized fabricators.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  name: 'MF-01 Monolith Desk Piece',
                  price: '$240',
                  status: 'Edition of 100',
                  desc: 'CNC-milled aerospace aluminum totem with laser-etched typographic matrix.',
                },
                {
                  name: 'Mainframe Anthology Vol. 01',
                  price: '$75',
                  status: 'In Stock',
                  desc: '320-page hardcover documentation of digital spatial research, risograph printed on Munken Lynx.',
                },
                {
                  name: 'A.R.I.A Sound Specimen Vinyl',
                  price: '$45',
                  status: 'Pre-order',
                  desc: '180g heavyweight clear vinyl containing raw synthetic soundscapes and interface cues.',
                },
              ].map((item) => (
                <div key={item.name} className="border border-white/10 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-white/40 mb-3">
                      <span>{item.status}</span>
                      <span className="text-white font-mono">{item.price}</span>
                    </div>
                    <h4 className="text-base font-medium mb-2">{item.name}</h4>
                    <p className="text-xs text-white/60 leading-relaxed mb-6">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Reserved order inquiry for: ${item.name}`);
                    }}
                    className="w-full py-2.5 text-xs uppercase tracking-widest border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all cursor-pointer"
                  >
                    Acquire Edition
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'Contact' && (
          <div>
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 text-white mb-2">
                  <Check size={24} />
                </div>
                <h3 className="text-2xl font-normal">Transmission Received</h3>
                <p className="text-white/60 max-w-md mx-auto text-sm">
                  Thank you for reaching out. A.R.I.A and our partners will review your project brief and get back to you within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all cursor-pointer"
                >
                  Return to Environment
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-normal tracking-tight mb-2">
                    Let's Build Something Exceptional
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base">
                    Tell us about your brand, product vision, or speculative project. Direct communication: <a href="mailto:hello@mainframe.studio" className="text-white underline underline-offset-2">hello@mainframe.studio</a>
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                      Focus Area
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'Brand & Experience',
                        'Spatial & WebGL',
                        'AI & Interface Systems',
                        'General Inquiry',
                      ].map((service) => (
                        <button
                          type="button"
                          key={service}
                          onClick={() => setSelectedService(service)}
                          className={`p-2.5 text-xs text-left border transition-all cursor-pointer ${
                            selectedService === service
                              ? 'border-white bg-white text-black font-medium'
                              : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                      Project Overview or Question
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell us what you're thinking, desired launch timeline, and approximate budget..."
                      className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-white/40">
                      Response time: typically under 24h
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs uppercase tracking-widest font-medium hover:bg-white/90 transition-all cursor-pointer"
                    >
                      <span>Send Transmission</span>
                      <Send size={14} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
