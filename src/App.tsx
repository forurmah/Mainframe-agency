import { useState, useRef, useEffect, useCallback } from 'react';
import { useTypewriter } from './hooks/useTypewriter';
import { InfoModal, ModalType } from './components/InfoModal';
import { ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';

const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [initialModalPrompt, setInitialModalPrompt] = useState('');
  const [inquiryText, setInquiryText] = useState('');

  // Video Scrubbing State & Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('00:00.0');
  const [durationFormatted, setDurationFormatted] = useState('00:00.0');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Typewriter hook as specified
  const { displayed, done } = useTypewriter({
    text: TYPEWRITER_TEXT,
    speed: 38,
    startDelay: 600,
  });

  // Attempt to seek video without flooding seek operations
  const attemptSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    if (isSeekingRef.current) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.005) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  }, []);

  // onSeeked handler to queue the next seek if targetTime has moved, preventing seek-flooding
  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (video && video.duration) {
      setVideoProgress((video.currentTime / video.duration) * 100);
      const mins = Math.floor(video.currentTime / 60);
      const secs = (video.currentTime % 60).toFixed(1).padStart(4, '0');
      setCurrentTimeFormatted(`0${mins}:${secs}`);
    }
    attemptSeek();
  }, [attemptSeek]);

  // Format duration helper
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const mins = Math.floor(video.duration / 60);
      const secs = (video.duration % 60).toFixed(1).padStart(4, '0');
      setDurationFormatted(`0${mins}:${secs}`);
      // Show first frame cleanly
      if (video.currentTime === 0) {
        video.currentTime = 0.01;
      }
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setVideoProgress((video.currentTime / video.duration) * 100);
      const mins = Math.floor(video.currentTime / 60);
      const secs = (video.currentTime % 60).toFixed(1).padStart(4, '0');
      setCurrentTimeFormatted(`0${mins}:${secs}`);
    }
  };

  // Horizontal mouse & touch scrubbing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        prevXRef.current = e.clientX;
        return;
      }

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      // When actively scrubbing, pause playback if playing
      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      }

      const SENSITIVITY = 0.8;
      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      let newTarget = targetTimeRef.current + timeOffset;
      newTarget = Math.max(0, Math.min(video.duration, newTarget));
      targetTimeRef.current = newTarget;

      attemptSeek();
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Mobile touch scrubbing
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration) || e.touches.length === 0) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.touches[0].clientX;
        return;
      }

      const delta = e.touches[0].clientX - prevXRef.current;
      prevXRef.current = e.touches[0].clientX;

      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      }

      const SENSITIVITY = 0.8;
      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      let newTarget = targetTimeRef.current + timeOffset;
      newTarget = Math.max(0, Math.min(video.duration, newTarget));
      targetTimeRef.current = newTarget;

      attemptSeek();
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [attemptSeek]);

  // Toggle video play / pause
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Toggle video mute / unmute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Quick prompt submission
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setInitialModalPrompt(inquiryText.trim());
    setActiveModal('Contact');
    setInquiryText('');
  };

  const handleSuggestionClick = (topic: string) => {
    setInitialModalPrompt(`We are interested in discussing ${topic} with Mainframe.`);
    setActiveModal('Contact');
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden select-none">
      {/* ============================================================== */}
      {/* BACKGROUND VIDEO (mouse-scrub controlled)                      */}
      {/* ============================================================== */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted={isMuted}
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onSeeked={handleSeeked}
        className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: '70% center',
        }}
      />

      {/* Subtle cinematic gradient vignette for maximum readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50 pointer-events-none" />

      {/* ============================================================== */}
      {/* NAVBAR (fixed, z-index: 10)                                    */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        {/* Logo (left) */}
        <div className="flex items-center">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white select-none cursor-pointer"
            style={{ fontFamily: 'var(--font-heading)' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Mainframe®
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <nav className="hidden md:flex items-center text-[23px] text-white">
          <button
            type="button"
            onClick={() => setActiveModal('Labs')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0 text-white font-inherit"
          >
            Labs
          </button>
          <span>,&nbsp;</span>
          <button
            type="button"
            onClick={() => setActiveModal('Studio')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0 text-white font-inherit"
          >
            Studio
          </button>
          <span>,&nbsp;</span>
          <button
            type="button"
            onClick={() => setActiveModal('Openings')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0 text-white font-inherit"
          >
            Openings
          </button>
          <span>,&nbsp;</span>
          <button
            type="button"
            onClick={() => setActiveModal('Shop')}
            className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0 p-0 text-white font-inherit"
          >
            Shop
          </button>
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            setActiveModal('Contact');
          }}
          className="hidden md:block text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
        >
          Get in touch
        </a>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 focus:outline-none z-20 cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('Labs');
          }}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity text-left cursor-pointer"
        >
          Labs
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('Studio');
          }}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity text-left cursor-pointer"
        >
          Studio
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('Openings');
          }}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity text-left cursor-pointer"
        >
          Openings
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            setActiveModal('Shop');
          }}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity text-left cursor-pointer"
        >
          Shop
        </button>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            setActiveModal('Contact');
          }}
          className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity cursor-pointer mt-4"
        >
          Get in touch
        </a>
      </div>

      {/* ============================================================== */}
      {/* HERO SECTION (z-index: 1)                                      */}
      {/* ============================================================== */}
      <section className="h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden relative z-[1]">
        <div className="max-w-xl relative z-10">
          {/* 1. Blurred intro label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#fff',
              filter: 'blur(4px)',
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            Mainframe's Adaptive Response Interface Agent
          </div>

          {/* 2. Typewriter text */}
          <p className="text-[26px] sm:text-[34px] md:text-[42px] leading-[1.25] tracking-tight font-normal text-white mb-5 sm:mb-6">
            {displayed}
            {!done && (
              <span className="inline-block w-[2.5px] h-[0.9em] bg-white ml-1.5 align-baseline animate-pulse" />
            )}
          </p>

          {/* Interactive capabilities & inquiry prompt for A.R.I.A */}
          <div
            className={`transition-all duration-700 ease-out space-y-4 ${
              done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
            }`}
          >
            {/* Quick response suggestions */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Interactive Experiences',
                'Spatial Design',
                'Identity Systems',
                'Autonomous UI',
              ].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleSuggestionClick(topic)}
                  className="text-xs sm:text-sm tracking-wide text-white/80 hover:text-white border border-white/20 hover:border-white/60 bg-black/40 hover:bg-white/10 px-3.5 py-1.5 transition-all cursor-pointer backdrop-blur-sm"
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Quick inquiry bar */}
            <form onSubmit={handleInquirySubmit} className="relative max-w-md pt-1">
              <input
                type="text"
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="Type your project concept or brief..."
                className="w-full bg-black/60 border border-white/25 hover:border-white/50 focus:border-white text-white placeholder-white/40 text-sm px-4 py-2.5 pr-11 backdrop-blur-md focus:outline-none transition-all"
              />
              <button
                type="submit"
                aria-label="Send inquiry"
                className="absolute right-1 top-2.5 p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Ambient Bottom Bar: Scrubbing telemetry & HUD controls */}
        <div className="absolute bottom-4 sm:bottom-6 left-5 sm:left-8 right-5 sm:right-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/60 pointer-events-auto">
          {/* Timeline mouse scrub indicator */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 tracking-wider uppercase text-[11px] text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Scrub ↔ to traverse timeline</span>
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="font-mono text-white/80">
              {currentTimeFormatted} <span className="text-white/30">/</span> {durationFormatted}
            </span>
          </div>

          {/* Micro controls: Play/Pause, Mute, and Scrubber Bar */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Scrubber progress visualizer */}
            <div
              className="h-[2px] w-28 sm:w-36 bg-white/20 relative overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                const video = videoRef.current;
                if (video && video.duration) {
                  targetTimeRef.current = ratio * video.duration;
                  attemptSeek();
                }
              }}
              title="Click to jump timeline"
            >
              <div
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${videoProgress}%` }}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlayPause}
                className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause video' : 'Play video preview'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Info & Contact Modal for Labs, Studio, Openings, Shop, Contact */}
      <InfoModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
        initialPrompt={initialModalPrompt}
      />
    </main>
  );
}
