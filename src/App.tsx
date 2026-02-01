import { useEffect, useState } from 'react'

const styles = `
  :root {
    --neon-cyan: #00f5ff;
    --neon-magenta: #ff00ff;
    --neon-yellow: #ffff00;
    --deep-space: #0a0a0f;
    --space-purple: #1a1a2e;
    --glass-bg: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.08);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Syne', sans-serif;
    background: var(--deep-space);
    color: white;
    overflow-x: hidden;
    min-height: 100vh;
  }

  .font-mono {
    font-family: 'Space Mono', monospace;
  }

  /* Cosmic Background */
  .cosmic-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    background: 
      radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 245, 255, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse 60% 40% at 80% 50%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse 50% 30% at 20% 80%, rgba(255, 255, 0, 0.08) 0%, transparent 50%),
      var(--deep-space);
  }

  /* Floating Particles */
  .particle {
    position: fixed;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    pointer-events: none;
    animation: float-particle 15s infinite ease-in-out;
  }

  @keyframes float-particle {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translate(100px, -150px) scale(1.5);
      opacity: 0.8;
    }
    50% {
      transform: translate(-50px, -300px) scale(0.8);
      opacity: 0.5;
    }
    75% {
      transform: translate(150px, -200px) scale(1.2);
      opacity: 0.7;
    }
  }

  /* Glowing Portal Effect */
  .portal-ring {
    position: absolute;
    border-radius: 50%;
    border: 2px solid transparent;
    animation: portal-spin 8s linear infinite;
  }

  .portal-ring-1 {
    width: 300px;
    height: 300px;
    border-color: var(--neon-cyan);
    box-shadow: 0 0 30px var(--neon-cyan), inset 0 0 30px rgba(0, 245, 255, 0.1);
    animation-duration: 12s;
  }

  .portal-ring-2 {
    width: 240px;
    height: 240px;
    border-color: var(--neon-magenta);
    box-shadow: 0 0 25px var(--neon-magenta), inset 0 0 25px rgba(255, 0, 255, 0.1);
    animation-duration: 8s;
    animation-direction: reverse;
  }

  .portal-ring-3 {
    width: 180px;
    height: 180px;
    border-color: var(--neon-yellow);
    box-shadow: 0 0 20px var(--neon-yellow), inset 0 0 20px rgba(255, 255, 0, 0.1);
    animation-duration: 6s;
  }

  @keyframes portal-spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* Glassmorphism Card */
  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass-card:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
  }

  /* Neon Text Effects */
  .neon-text-cyan {
    color: var(--neon-cyan);
    text-shadow: 0 0 10px var(--neon-cyan), 0 0 40px rgba(0, 245, 255, 0.5);
  }

  .neon-text-magenta {
    color: var(--neon-magenta);
    text-shadow: 0 0 10px var(--neon-magenta), 0 0 40px rgba(255, 0, 255, 0.5);
  }

  .neon-text-yellow {
    color: var(--neon-yellow);
    text-shadow: 0 0 10px var(--neon-yellow), 0 0 40px rgba(255, 255, 0, 0.5);
  }

  /* Gradient Text */
  .gradient-text {
    background: linear-gradient(135deg, var(--neon-cyan) 0%, var(--neon-magenta) 50%, var(--neon-yellow) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* CTA Button */
  .cta-button {
    position: relative;
    padding: 18px 48px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: var(--deep-space);
    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta));
    border: none;
    border-radius: 100px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s ease;
  }

  .cta-button:hover::before {
    left: 100%;
  }

  .cta-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 40px rgba(0, 245, 255, 0.5), 0 0 80px rgba(255, 0, 255, 0.3);
  }

  /* Step Number */
  .step-number {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Mono', monospace;
    font-size: 24px;
    font-weight: 700;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(255, 0, 255, 0.2));
    border: 2px solid rgba(255, 255, 255, 0.1);
  }

  /* Tweet Mock */
  .tweet-mock {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 20px;
    font-family: 'Space Mono', monospace;
    font-size: 14px;
  }

  /* Reveal Animations */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  /* Scanline Effect */
  .scanlines::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.1) 2px,
      rgba(0, 0, 0, 0.1) 4px
    );
    pointer-events: none;
    opacity: 0.3;
  }

  /* Orbit animation for examples */
  .orbit-item {
    animation: subtle-float 6s ease-in-out infinite;
  }

  @keyframes subtle-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  /* Footer styling */
  .footer-link {
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: var(--neon-cyan);
  }
`

function App() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Add initial reveal for hero
    setTimeout(() => {
      setVisibleSections(prev => new Set([...prev, 'hero']))
    }, 100)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[data-reveal]').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 15,
    color: ['var(--neon-cyan)', 'var(--neon-magenta)', 'var(--neon-yellow)'][i % 3]
  }))

  const isVisible = (id: string) => visibleSections.has(id)

  return (
    <>
      <style>{styles}</style>
      
      {/* Cosmic Background */}
      <div className="cosmic-bg" />
      
      {/* Floating Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 10px ${p.color}`
          }}
        />
      ))}

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🤖</div>
              <span className="font-bold text-xl tracking-tight">clonkbot</span>
            </div>
            <a
              href="https://twitter.com/clonkbot"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-5 py-2.5 text-sm font-mono hover:scale-105 transition-transform"
            >
              @clonkbot
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative px-6 pt-20">
          <div className="text-center max-w-5xl mx-auto">
            {/* Portal Animation */}
            <div className="relative w-[300px] h-[300px] mx-auto mb-12">
              <div className="portal-ring portal-ring-1 absolute top-1/2 left-1/2" />
              <div className="portal-ring portal-ring-2 absolute top-1/2 left-1/2" />
              <div className="portal-ring portal-ring-3 absolute top-1/2 left-1/2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl">
                🤖
              </div>
            </div>

            <div className={`reveal ${isVisible('hero') ? 'visible' : ''}`}>
              <p className="font-mono text-sm tracking-[0.3em] text-gray-400 mb-4 uppercase">
                Tweet → Deploy → Magic
              </p>
            </div>

            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-8 reveal reveal-delay-1 ${isVisible('hero') ? 'visible' : ''}`}>
              Turn any tweet into a{' '}
              <span className="gradient-text">deployed app</span>
            </h1>

            <p className={`text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 reveal reveal-delay-2 ${isVisible('hero') ? 'visible' : ''}`}>
              Just tag <span className="neon-text-cyan font-bold">@clonkbot</span> in your tweet.
              Watch it transform into a live web application in seconds.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center reveal reveal-delay-3 ${isVisible('hero') ? 'visible' : ''}`}>
              <a
                href="https://twitter.com/intent/tweet?text=@clonkbot%20build%20me%20a%20"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                Try it now →
              </a>
              <a
                href="#how-it-works"
                className="font-mono text-sm text-gray-400 hover:text-white transition-colors px-6 py-4"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
            <span className="font-mono text-xs">scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" data-reveal className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-20 reveal ${isVisible('how-it-works') ? 'visible' : ''}`}>
              <p className="font-mono text-sm tracking-[0.3em] neon-text-magenta mb-4">WORKFLOW</p>
              <h2 className="text-4xl md:text-6xl font-bold">How it works</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Tweet your idea',
                  description: 'Describe the app you want. Tag @clonkbot in your tweet to trigger the magic.',
                  icon: '✍️',
                  color: 'neon-text-cyan'
                },
                {
                  step: '02',
                  title: 'AI builds it',
                  description: 'Our bot reads your request, generates production-ready code, and deploys it instantly.',
                  icon: '⚡',
                  color: 'neon-text-magenta'
                },
                {
                  step: '03',
                  title: 'Get your app',
                  description: 'Receive a reply with your live, deployed app URL. Share it with the world.',
                  icon: '🚀',
                  color: 'neon-text-yellow'
                }
              ].map((item, index) => (
                <div
                  key={item.step}
                  className={`glass-card p-8 reveal reveal-delay-${index + 1} ${isVisible('how-it-works') ? 'visible' : ''}`}
                >
                  <div className="step-number mb-6">
                    <span className={item.color}>{item.step}</span>
                  </div>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Section */}
        <section id="examples" data-reveal className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-20 reveal ${isVisible('examples') ? 'visible' : ''}`}>
              <p className="font-mono text-sm tracking-[0.3em] neon-text-yellow mb-4">EXAMPLES</p>
              <h2 className="text-4xl md:text-6xl font-bold">What can you build?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  tweet: '@clonkbot build me a pomodoro timer with a cozy aesthetic',
                  result: 'Pomodoro Timer',
                  type: 'Productivity'
                },
                {
                  tweet: '@clonkbot create a random color palette generator',
                  result: 'Color Generator',
                  type: 'Design Tool'
                },
                {
                  tweet: '@clonkbot make a habit tracker with streaks',
                  result: 'Habit Tracker',
                  type: 'Lifestyle'
                },
                {
                  tweet: '@clonkbot build a markdown editor with live preview',
                  result: 'Markdown Editor',
                  type: 'Developer Tool'
                }
              ].map((example, index) => (
                <div
                  key={index}
                  className={`orbit-item glass-card p-8 reveal reveal-delay-${(index % 4) + 1} ${isVisible('examples') ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <div className="tweet-mock mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500" />
                      <div>
                        <div className="font-bold text-sm">You</div>
                        <div className="text-gray-500 text-xs">@yourhandle</div>
                      </div>
                    </div>
                    <p className="text-gray-300">{example.tweet}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-xs text-gray-500 mb-1">{example.type}</p>
                      <p className="text-xl font-bold gradient-text">{example.result}</p>
                    </div>
                    <div className="text-3xl">→</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" data-reveal className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className={`glass-card p-12 md:p-20 text-center relative overflow-hidden reveal ${isVisible('cta') ? 'visible' : ''}`}>
              {/* Background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-cyan-500/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="text-6xl mb-8">🚀</div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to <span className="gradient-text">build something?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
                  Your next app is just a tweet away. Describe what you want and let the magic happen.
                </p>
                <a
                  href="https://twitter.com/intent/tweet?text=@clonkbot%20build%20me%20a%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button inline-block"
                >
                  Tweet @clonkbot now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-500 text-sm font-mono">
              Requested by{' '}
              <a
                href="https://twitter.com/0xPaulius"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link hover:text-cyan-400"
              >
                @0xPaulius
              </a>
              {' · '}
              Built by{' '}
              <a
                href="https://twitter.com/clonkbot"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link hover:text-purple-400"
              >
                @clonkbot
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App