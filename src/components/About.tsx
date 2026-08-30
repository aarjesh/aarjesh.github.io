'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { config } from '@/lib/config';
import RevealSection from './RevealSection';
import SectionHeader from './SectionHeader';
import type { ResolvedSection } from '@/lib/sections';

const lineVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function About({ cfg }: { cfg: ResolvedSection }) {
  const { profile, xpYears } = config;
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.2 });

  const terminalLines = [
    { type: 'com', text: '// generated: now' },
    { type: 'cmd', text: '$ cat profile.json' },
    { type: 'raw', text: '{' },
    { type: 'kv', key: '"alias"', val: `"${profile.alias}"` },
    { type: 'kv', key: '"focus"', val: `[${profile.focus.map(f => `"${f}"`).join(', ')}]` },
    { type: 'kv', key: '"languages"', val: `[${profile.languages.map(l => `"${l}"`).join(', ')}]` },
    { type: 'kv', key: '"runtimes"', val: `[${profile.runtimes.map(r => `"${r}"`).join(', ')}]` },
    { type: 'kv', key: '"clouds"', val: `[${profile.clouds.map(c => `"${c}"`).join(', ')}]` },
    { type: 'kv', key: '"databases"', val: `[${profile.databases.map(d => `"${d}"`).join(', ')}]` },
    { type: 'kv', key: '"currently_reading"', val: `"${profile.reading}"` },
    { type: 'kvb', key: '"open_to_work"', val: 'true' },
    { type: 'raw', text: '}' },
    { type: 'cursor', text: '$ _' },
  ];

  return (
    <RevealSection id="about">
      <SectionHeader num={cfg.num} title={cfg.title} hint={cfg.hint} />
      <div className="about-grid" ref={gridRef}>
        <div className="about-copy">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            I&apos;m an I.T. Analyst at Tata Consultancy Services with <span className="accent">{xpYears} years</span> of experience building GenAI and LLM-powered business solutions. Before TCS, I spent 3.5 years at Ericsson, growing through 3 roles — from Software Engineer Intern to Software Engineer to Data Engineer — where I built a strong foundation in software and data engineering. That experience now fuels my current focus: designing and building intelligent, <span className="accent">AI-first products</span> powered by Generative AI and Large Language Models (LLM).
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            I hold a B.Tech in Information Technology from Jalpaiguri Government Engineering College, and I actively work with <span className="accent">prompt engineering</span>, <span className="accent">LLM application design</span>, and product management to bring GenAI solutions from concept to impact. My credentials include the Generative AI Driver&apos;s License and 3+ certifications spanning AI architecture and cloud/data workshops — reflecting my deep commitment to staying at the forefront of this fast-evolving field.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            I speak 3 languages — English, Bengali, and Hindi — and I&apos;ve co-authored 1 published paper on defect tolerance in nanocrossbar arrays. Based in Kolkata, India, I&apos;m passionate about turning complex challenges into <span className="accent">elegant, AI-driven solutions</span>, and I&apos;m always excited to connect, collaborate, and build the next generation of intelligent products.
          </motion.p>
          <motion.div
            className="signature"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.75, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            — signed, Aarjesh
          </motion.div>
        </div>
        <motion.div
          className="terminal-card"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="tbar">
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
            <span className="label">~/whoami.json</span>
          </div>
          <div className="tbody">
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {line.type === 'com' && <span className="com">{line.text}</span>}
                {line.type === 'cmd' && <><span className="prompt">$</span> cat profile.json</>}
                {line.type === 'raw' && line.text}
                {line.type === 'kv' && (
                  <span className="indent">
                    <span className="key">{line.key}</span>: <span className="str">{line.val}</span>,
                  </span>
                )}
                {line.type === 'kvb' && (
                  <span className="indent">
                    <span className="key">{line.key}</span>: <span style={{ color: 'var(--accent)' }}>{line.val}</span>
                  </span>
                )}
                {line.type === 'cursor' && <><span className="prompt">$</span> _<span className="cursor-blink" /></>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </RevealSection>
  );
}
