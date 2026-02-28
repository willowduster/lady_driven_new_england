import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function JoinTeam() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', car: '', experience: '', instagram: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getInputStyle = (field) => ({
    width: '100%',
    background: focusedField === field ? 'rgba(10,10,25,1)' : 'rgba(10,10,20,0.9)',
    border: `1px solid ${focusedField === field ? 'var(--teal)' : 'rgba(0,245,212,0.2)'}`,
    color: 'var(--white)',
    padding: '14px 18px',
    fontFamily: 'Orbitron, monospace',
    fontSize: '0.85rem',
    fontWeight: 500,
    letterSpacing: '1px',
    outline: 'none',
    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
    marginBottom: '18px',
    boxShadow: focusedField === field ? '0 0 20px rgba(0,245,212,0.1), inset 0 0 20px rgba(0,245,212,0.03)' : 'none',
  });

  const labelStyle = {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'rgba(0,245,212,0.7)',
    letterSpacing: '3px',
    marginBottom: '8px',
    fontFamily: 'Orbitron, monospace',
    textTransform: 'uppercase',
  };

  return (
    <section id="join" ref={ref} style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #0a0a1e 0%, #050508 100%)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,245,212,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.025) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-title neon-text-teal"
        >
          [ JOIN THE TEAM ]
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(240,240,255,0.55)', letterSpacing: '2px', marginBottom: '40px', marginTop: '-30px', fontFamily: 'Orbitron', lineHeight: 2 }}
        >
          Want to join our female-only team? We&apos;re recruiting!
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              textAlign: 'center',
              padding: '60px 30px',
              border: '2px solid var(--teal)',
              boxShadow: '0 0 40px rgba(0,245,212,0.2)',
              background: 'rgba(10,10,15,0.9)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,245,212,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div
              className="carousel-emoji-float"
              style={{ fontSize: '4rem', marginBottom: '20px' }}
            >
              🏁
            </div>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.3rem', color: 'var(--teal)', textShadow: '0 0 15px var(--teal)', marginBottom: '15px', letterSpacing: '3px' }}>APPLICATION RECEIVED!</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(240,240,255,0.7)', lineHeight: 1.9, maxWidth: '400px', margin: '0 auto' }}>
              Welcome to the Lady Driven family! We&apos;ll be in touch soon. In the meantime, follow us on <a href="https://www.instagram.com/ladydrivennewengland/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pink)', textDecoration: 'none' }}>Instagram</a>!
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(10,10,15,0.9)',
              border: '1px solid rgba(0,245,212,0.15)',
              padding: '40px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Corner decorations */}
            {[
              { top: 0, left: 0, bTop: 'var(--teal)', bLeft: 'var(--teal)' },
              { top: 0, right: 0, bTop: 'var(--pink)', bRight: 'var(--pink)' },
              { bottom: 0, left: 0, bBottom: 'var(--pink)', bLeft: 'var(--pink)' },
              { bottom: 0, right: 0, bBottom: 'var(--teal)', bRight: 'var(--teal)' },
            ].map((corner, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + ci * 0.1 }}
                style={{
                  position: 'absolute', width: '25px', height: '25px',
                  ...(corner.top !== undefined && { top: 0 }),
                  ...(corner.bottom !== undefined && { bottom: 0 }),
                  ...(corner.left !== undefined && { left: 0 }),
                  ...(corner.right !== undefined && { right: 0 }),
                  borderTop: corner.bTop ? `2px solid ${corner.bTop}` : 'none',
                  borderBottom: corner.bBottom ? `2px solid ${corner.bBottom}` : 'none',
                  borderLeft: corner.bLeft ? `2px solid ${corner.bLeft}` : 'none',
                  borderRight: corner.bRight ? `2px solid ${corner.bRight}` : 'none',
                }}
              />
            ))}

            {/* Top glow */}
            <div style={{ position: 'absolute', top: 0, left: '25px', right: '25px', height: '1px', background: 'linear-gradient(90deg, var(--teal), transparent 30%, transparent 70%, var(--pink))', opacity: 0.3 }} />

            <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(240,240,255,0.7)', lineHeight: 2, marginBottom: '30px', fontFamily: 'Orbitron, monospace', letterSpacing: '1px' }}>
              Ready to roll with us? Fill out the form below or shoot us a DM on Instagram. We welcome enthusiasts of all vehicles and experience levels!
            </p>

            <form onSubmit={handleSubmit}>
              <div>
                <label style={labelStyle}>YOUR NAME</label>
                <input
                  style={getInputStyle('name')}
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label style={labelStyle}>EMAIL</label>
                <input
                  style={getInputStyle('email')}
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={labelStyle}>YOUR RIDE</label>
                  <input
                    style={getInputStyle('car')}
                    type="text"
                    value={form.car}
                    onChange={e => setForm({...form, car: e.target.value})}
                    onFocus={() => setFocusedField('car')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Year, Make, Model"
                  />
                </div>
                <div>
                  <label style={labelStyle}>INSTAGRAM</label>
                  <input
                    style={getInputStyle('instagram')}
                    type="text"
                    value={form.instagram}
                    onChange={e => setForm({...form, instagram: e.target.value})}
                    onFocus={() => setFocusedField('instagram')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="@yourhandle"
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>EXPERIENCE LEVEL</label>
                <select
                  style={{...getInputStyle('experience'), cursor: 'pointer'}}
                  value={form.experience}
                  onChange={e => setForm({...form, experience: e.target.value})}
                  onFocus={() => setFocusedField('experience')}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="">Select your level</option>
                  <option value="new">New to the car scene</option>
                  <option value="casual">Casual enthusiast</option>
                  <option value="experienced">Experienced — shows, cruises, etc.</option>
                  <option value="track">Track / Race experience</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>TELL US YOUR STORY</label>
                <textarea
                  style={{...getInputStyle('message'), minHeight: '110px', resize: 'vertical'}}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="What drives you? What's your dream build?"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 35px rgba(0,245,212,0.4)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '18px',
                  background: 'linear-gradient(135deg, rgba(123,47,190,0.2), rgba(0,245,212,0.2))',
                  border: '2px solid var(--teal)',
                  color: 'var(--teal)',
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '4px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  textShadow: '0 0 10px var(--teal)',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>▶ SUBMIT APPLICATION</span>
              </motion.button>

              <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.75rem', fontWeight: 500, color: 'rgba(240,240,255,0.4)', letterSpacing: '1px', fontFamily: 'Orbitron' }}>
                Or email us at <a href="mailto:ladydrivennewengland@gmail.com" style={{ color: 'var(--teal)', textDecoration: 'none' }}>ladydrivennewengland@gmail.com</a>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
