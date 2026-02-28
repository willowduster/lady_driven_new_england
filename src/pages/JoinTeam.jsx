import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function JoinTeam() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', car: '', experience: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(10,10,20,0.9)',
    border: '1px solid rgba(0,245,212,0.3)',
    color: 'var(--white)',
    padding: '14px 18px',
    fontFamily: 'Orbitron, monospace',
    fontSize: '0.75rem',
    letterSpacing: '1px',
    outline: 'none',
    transition: 'all 0.3s',
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.6rem',
    color: 'rgba(0,245,212,0.7)',
    letterSpacing: '3px',
    marginBottom: '6px',
    fontFamily: 'Orbitron, monospace',
  };

  return (
    <section id="join" ref={ref} style={{ padding: '100px 20px', background: 'linear-gradient(180deg, #0a0a1e 0%, #050508 100%)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,245,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title neon-text-teal"
        >
          [ JOIN THE TEAM ]
        </motion.h2>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              border: '2px solid var(--teal)',
              boxShadow: '0 0 30px rgba(0,245,212,0.3)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🏁</div>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.5rem', color: 'var(--teal)', textShadow: '0 0 15px var(--teal)', marginBottom: '15px' }}>APPLICATION RECEIVED!</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(240,240,255,0.7)', lineHeight: 1.8 }}>
              Welcome to the Lady Driven family. We&apos;ll be in touch soon — keep your engine warm! 🚗💨
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(10,10,15,0.95)',
              border: '1px solid rgba(0,245,212,0.2)',
              padding: '40px',
              position: 'relative',
            }}
          >
            {/* Corner decorations */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '30px', height: '30px', borderTop: '2px solid var(--teal)', borderLeft: '2px solid var(--teal)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '30px', height: '30px', borderTop: '2px solid var(--pink)', borderRight: '2px solid var(--pink)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px', borderBottom: '2px solid var(--pink)', borderLeft: '2px solid var(--pink)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', borderBottom: '2px solid var(--teal)', borderRight: '2px solid var(--teal)' }} />

            <p style={{ fontSize: '0.8rem', color: 'rgba(240,240,255,0.7)', lineHeight: 1.9, marginBottom: '35px', fontFamily: 'Orbitron, monospace', letterSpacing: '1px' }}>
              Ready to roll with us? Fill out the application below and we&apos;ll get back to you faster than a quarter mile run.
            </p>

            <form onSubmit={handleSubmit}>
              <div>
                <label style={labelStyle}>YOUR NAME</label>
                <input style={inputStyle} type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" />
              </div>
              <div>
                <label style={labelStyle}>EMAIL</label>
                <input style={inputStyle} type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" />
              </div>
              <div>
                <label style={labelStyle}>YOUR CAR</label>
                <input style={inputStyle} type="text" value={form.car} onChange={e => setForm({...form, car: e.target.value})} placeholder="Year, Make, Model" />
              </div>
              <div>
                <label style={labelStyle}>EXPERIENCE LEVEL</label>
                <select style={{...inputStyle, cursor: 'pointer'}} value={form.experience} onChange={e => setForm({...form, experience: e.target.value})}>
                  <option value="">Select your level</option>
                  <option value="new">New to the scene</option>
                  <option value="casual">Casual enthusiast</option>
                  <option value="track">Track/Race experience</option>
                  <option value="pro">Professional driver</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>TELL US YOUR STORY</label>
                <textarea
                  style={{...inputStyle, minHeight: '120px', resize: 'vertical'}}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  placeholder="What drives you? (pun intended)"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,245,212,0.5)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '18px',
                  background: 'linear-gradient(135deg, rgba(123,47,190,0.3), rgba(0,245,212,0.3))',
                  border: '2px solid var(--teal)',
                  color: 'var(--teal)',
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '4px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  textShadow: '0 0 10px var(--teal)',
                  transition: 'all 0.3s',
                }}
              >
                ▶ SUBMIT APPLICATION
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        style={{
          textAlign: 'center',
          marginTop: '80px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(123,47,190,0.2)',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '0.55rem',
          color: 'rgba(240,240,255,0.3)',
          letterSpacing: '3px',
          lineHeight: 2.5,
        }}
      >
        <div style={{ color: 'var(--pink)', opacity: 0.7, marginBottom: '10px', fontSize: '0.7rem' }}>LADY DRIVEN NEW ENGLAND</div>
        <div>© 2026 LDNE · ALL RIGHTS RESERVED</div>
        <div style={{ marginTop: '10px' }}>
          <span style={{ color: 'var(--purple-bright)', marginRight: '20px' }}>INSTAGRAM</span>
          <span style={{ color: 'var(--teal)', marginRight: '20px' }}>FACEBOOK</span>
          <span style={{ color: 'var(--pink)' }}>TIKTOK</span>
        </div>
      </motion.div>
    </section>
  );
}
