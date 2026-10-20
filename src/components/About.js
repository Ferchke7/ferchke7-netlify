import React, { useState, useMemo } from "react";
import MyImage from "./images/prof.jpg";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconMail,
  IconTerminal2,
  IconCpu,
  IconServer,
  IconGitPullRequest,
  IconCertificate,
  IconSchool,
  IconLanguage,
  IconSparkles,
  IconVolume,
  IconVolumeOff,
  IconCheck,
  IconCopy,
  IconExternalLink,
  IconRocket
} from "@tabler/icons-react";
import { resumeProfile } from "../shared/data/resumeProfile";
import { useGithubActivity } from "../shared/hooks/useGithubActivity";
import NeonChart from "../shared/ui/NeonChart";
import MatrixRainCanvas from "../shared/ui/MatrixRainCanvas";
import MatrixTerminal from "../shared/ui/MatrixTerminal";
import {
  setAudioEnabled,
  playBeep,
  playWarpSound
} from "../shared/audio/matrixAudio";

export default function About() {
  const [matrixTheme, setMatrixTheme] = useState("green"); // 'green' | 'cyan' | 'red'
  const [warpBurst, setWarpBurst] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState("all");

  const { activityBundle } = useGithubActivity();

  const handleToggleAudio = () => {
    const next = !audioActive;
    setAudioActive(next);
    setAudioEnabled(next);
    if (next) playBeep(880, 0.1);
  };

  const handleTriggerBurst = () => {
    setWarpBurst(true);
    playWarpSound();
    setTimeout(() => setWarpBurst(false), 2400);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(resumeProfile.email);
    setCopiedEmail(true);
    playBeep(1200, 0.08);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const chartOptions = useMemo(() => {
    const isCyan = matrixTheme === "cyan";
    const isRed = matrixTheme === "red";

    const primaryColor = isCyan ? "#00f0ff" : isRed ? "#ff2a6d" : "#00ff66";
    const secondaryColor = isCyan ? "#ff007f" : isRed ? "#ffae00" : "#25f4ee";
    const mutedColor = "#8899aa";

    return {
      radar: {
        backgroundColor: "transparent",
        radar: {
          radius: "68%",
          splitNumber: 4,
          indicator: resumeProfile.skillClusters.map((cluster) => ({
            name: cluster.name,
            max: 100,
          })),
          axisName: {
            color: primaryColor,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
          },
          splitLine: {
            lineStyle: {
              color: isCyan
                ? "rgba(0, 240, 255, 0.2)"
                : isRed
                ? "rgba(255, 42, 109, 0.2)"
                : "rgba(0, 255, 102, 0.2)",
            },
          },
          splitArea: {
            areaStyle: {
              color: [
                "rgba(255, 255, 255, 0.01)",
                isCyan
                  ? "rgba(0, 240, 255, 0.04)"
                  : isRed
                  ? "rgba(255, 42, 109, 0.04)"
                  : "rgba(0, 255, 102, 0.04)",
              ],
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.15)",
            },
          },
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: resumeProfile.skillClusters.map((c) => c.value),
                name: "Architecture Competency",
                areaStyle: {
                  color: isCyan
                    ? "rgba(0, 240, 255, 0.25)"
                    : isRed
                    ? "rgba(255, 42, 109, 0.25)"
                    : "rgba(0, 255, 102, 0.25)",
                },
                lineStyle: {
                  color: primaryColor,
                  width: 2.5,
                  shadowBlur: 14,
                  shadowColor: primaryColor,
                },
                symbolSize: 6,
                itemStyle: {
                  color: "#ffffff",
                  borderColor: primaryColor,
                  borderWidth: 2,
                },
              },
            ],
          },
        ],
      },
      languages: {
        backgroundColor: "transparent",
        color: [primaryColor, secondaryColor, "#9d6cff", "#ffd166", "#00d2ff"],
        tooltip: { trigger: "item" },
        legend: {
          bottom: 0,
          textStyle: { color: mutedColor, fontFamily: "JetBrains Mono" },
        },
        series: [
          {
            type: "pie",
            radius: ["45%", "70%"],
            center: ["50%", "45%"],
            avoidLabelOverlap: true,
            label: {
              color: "#e2e8f0",
              fontFamily: "JetBrains Mono",
              fontSize: 11,
            },
            labelLine: { lineStyle: { color: "rgba(255,255,255,0.3)" } },
            data:
              activityBundle.languageDistribution.length > 0
                ? activityBundle.languageDistribution
                : [
                    { name: "C#", value: 45 },
                    { name: "Go", value: 30 },
                    { name: "TypeScript", value: 15 },
                    { name: "Python", value: 10 },
                  ],
          },
        ],
      },
    };
  }, [matrixTheme, activityBundle]);

  const filteredSkillCategories = useMemo(() => {
    if (activeSkillCategory === "all") return resumeProfile.skillCategories;
    return resumeProfile.skillCategories.filter(
      (cat) => cat.id === activeSkillCategory
    );
  }, [activeSkillCategory]);

  return (
    <div className={`matrix-universe theme-${matrixTheme}`}>
      {/* Background Interactive Matrix Rain */}
      <MatrixRainCanvas
        theme={matrixTheme}
        burst={warpBurst}
        speed={1}
        opacity={0.42}
      />

      {/* Cyber HUD Control Header */}
      <header className="matrix-hud-header">
        <div className="hud-container">
          <div className="hud-brand">
            <span className="hud-bracket">[</span>
            <span className="hud-callsign">FM::CORE</span>
            <span className="hud-bracket">]</span>
            <span className="hud-system-status">SYS_STATUS: OPTIMAL</span>
          </div>

          <nav className="hud-nav" aria-label="Quick jump">
            <a href="#operator" className="hud-nav-link">OPERATOR</a>
            <a href="#skills" className="hud-nav-link">SKILLS</a>
            <a href="#missions" className="hud-nav-link">MISSIONS</a>
            <a href="#wolverine" className="hud-nav-link">OPEN_SOURCE</a>
            <a href="#terminal" className="hud-nav-link">TERMINAL</a>
            <a href="#contact" className="hud-nav-link">CONNECT</a>
          </nav>

          <div className="hud-controls">
            {/* Theme switcher */}
            <div className="theme-toggle-group" title="Select Matrix Stream Color">
              <button
                type="button"
                className={`theme-dot dot-green ${matrixTheme === "green" ? "active" : ""}`}
                onClick={() => setMatrixTheme("green")}
                aria-label="Matrix Green Theme"
              />
              <button
                type="button"
                className={`theme-dot dot-cyan ${matrixTheme === "cyan" ? "active" : ""}`}
                onClick={() => setMatrixTheme("cyan")}
                aria-label="Cyber Cyan Theme"
              />
              <button
                type="button"
                className={`theme-dot dot-red ${matrixTheme === "red" ? "active" : ""}`}
                onClick={() => setMatrixTheme("red")}
                aria-label="Red Pill Theme"
              />
            </div>

            {/* Warp button */}
            <button
              type="button"
              className={`hud-warp-btn ${warpBurst ? "bursting" : ""}`}
              onClick={handleTriggerBurst}
              title="Trigger Stream Warp Speed"
            >
              <IconRocket size={14} />
              <span>WARP</span>
            </button>

            {/* Sound toggle */}
            <button
              type="button"
              className={`hud-sound-btn ${audioActive ? "sound-on" : ""}`}
              onClick={handleToggleAudio}
              title="Toggle Web Audio SFX"
            >
              {audioActive ? <IconVolume size={14} /> : <IconVolumeOff size={14} />}
              <span>{audioActive ? "SFX: ON" : "SFX: OFF"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Single Page Content */}
      <main className="matrix-main-content">
        {/* HERO / OPERATOR SECTION */}
        <section id="operator" className="section-operator">
          <div className="operator-card">
            <div className="operator-scanner-line" />

            <div className="operator-identity-row">
              <div className="avatar-frame">
                <img
                  src={MyImage}
                  alt="Majitov Ferdavs"
                  className="operator-avatar-img"
                />
                <div className="avatar-corner tl" />
                <div className="avatar-corner tr" />
                <div className="avatar-corner bl" />
                <div className="avatar-corner br" />
                <div className="avatar-online-badge">
                  <span className="live-dot" />
                  <span>ONLINE // UTC+5 / UTC+1</span>
                </div>
              </div>

              <div className="operator-data">
                <div className="operator-badge-row">
                  <span className="matrix-chip chip-highlight">AI ENGINEER</span>
                  <span className="matrix-chip">SENIOR SOFTWARE ENGINEER</span>
                  <span className="matrix-chip chip-accent">DISTRIBUTED ARCHITECT</span>
                </div>

                <h1 className="operator-name">{resumeProfile.name}</h1>
                <p className="operator-title">{resumeProfile.title}</p>
                <p className="operator-subtitle">{resumeProfile.subtitle}</p>

                <p className="operator-summary">{resumeProfile.summary}</p>

                <div className="operator-action-row">
                  <a href="#contact" className="matrix-btn btn-primary">
                    <IconBrandTelegram size={16} />
                    <span>INITIATE HANDSHAKE</span>
                  </a>
                  <a href="#terminal" className="matrix-btn btn-secondary">
                    <IconTerminal2 size={16} />
                    <span>RUN TERMINAL REPL</span>
                  </a>
                  <button
                    type="button"
                    className="matrix-btn btn-ghost"
                    onClick={handleCopyEmail}
                  >
                    {copiedEmail ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    <span>{copiedEmail ? "EMAIL COPIED!" : "COPY EMAIL"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* TELEMETRY TELEMETRIC METRICS */}
            <div className="telemetry-grid">
              {resumeProfile.telemetry.map((metric, idx) => (
                <div key={idx} className="telemetry-cell">
                  <span className="telemetry-value">{metric.value}</span>
                  <span className="telemetry-label">{metric.label}</span>
                  <span className="telemetry-desc">{metric.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS MATRIX & ARCHITECTURE RADAR */}
        <section id="skills" className="section-skills">
          <div className="section-heading-row">
            <div className="section-tag">
              <IconCpu size={16} />
              <span>MODULE // 01</span>
            </div>
            <h2 className="section-title">TECHNICAL & ARCHITECTURAL MATRIX</h2>
            <p className="section-desc">
              Multi-Agent Orchestration • High-Throughput .NET / Go Services •
              Transactional Messaging • Cloud Infrastructure
            </p>
          </div>

          {/* Radar & Language Visualizers */}
          <div className="visualizer-grid">
            <div className="visualizer-card">
              <div className="card-top-bar">
                <span className="card-dot" />
                <span className="card-title">ARCHITECTURAL FOCUS RADAR</span>
                <span className="card-status">LIVE TELEMETRY</span>
              </div>
              <NeonChart option={chartOptions.radar} className="radar-canvas" />
            </div>

            <div className="visualizer-card">
              <div className="card-top-bar">
                <span className="card-dot" />
                <span className="card-title">PRODUCTION CODE DISTRIBUTION</span>
                <span className="card-status">GITHUB METRICS</span>
              </div>
              <NeonChart option={chartOptions.languages} className="pie-canvas" />
            </div>
          </div>

          {/* Skill Filter Tabs */}
          <div className="skill-filter-tabs">
            <button
              type="button"
              className={`filter-tab ${activeSkillCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveSkillCategory("all")}
            >
              ALL CAPABILITIES
            </button>
            {resumeProfile.skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-tab ${activeSkillCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveSkillCategory(cat.id)}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Skill Clusters Grid */}
          <div className="skill-category-grid">
            {filteredSkillCategories.map((category) => (
              <div key={category.id} className="skill-category-card">
                <div className="category-header">
                  <h3 className="category-title">{category.title}</h3>
                  <span className="category-badge">{category.badge}</span>
                </div>

                <div className="skills-badge-list">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-item-row">
                      <div className="skill-item-info">
                        <span className="skill-item-name">{skill.name}</span>
                        <span className="skill-item-tag">{skill.tag}</span>
                      </div>
                      <span className="skill-item-level">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION LOG / EXPERIENCE TRACK */}
        <section id="missions" className="section-missions">
          <div className="section-heading-row">
            <div className="section-tag">
              <IconServer size={16} />
              <span>MODULE // 02</span>
            </div>
            <h2 className="section-title">BATTLE-TESTED MISSION LOG</h2>
            <p className="section-desc">
              6+ years delivering mission-critical platforms across South Korea and global remote contracts.
            </p>
          </div>

          <div className="timeline-container">
            {resumeProfile.experience.map((mission, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-rail">
                  <div className="rail-marker" />
                  <div className="rail-line" />
                </div>

                <div className="timeline-content-card">
                  <div className="mission-header">
                    <div>
                      <div className="mission-company-row">
                        <h3 className="mission-company">{mission.company}</h3>
                        <span className="mission-type">{mission.type}</span>
                      </div>
                      <div className="mission-role">{mission.role}</div>
                    </div>
                    <span className="mission-period">{mission.period}</span>
                  </div>

                  <div className="mission-highlight-banner">
                    <IconSparkles size={14} />
                    <span>{mission.highlight}</span>
                  </div>

                  <ul className="mission-bullet-list">
                    {mission.highlightsList.map((bullet, bIdx) => (
                      <li key={bIdx} className="mission-bullet">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mission-stack-tags">
                    {mission.stack.map((tech, tIdx) => (
                      <span key={tIdx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OPEN SOURCE HIGHLIGHT // WOLVERINE */}
        <section id="wolverine" className="section-opensource">
          <div className="section-heading-row">
            <div className="section-tag">
              <IconGitPullRequest size={16} />
              <span>MODULE // 03</span>
            </div>
            <h2 className="section-title">OPEN SOURCE IMPACT</h2>
            <p className="section-desc">
              Active contributor to core .NET messaging infrastructure.
            </p>
          </div>

          <div className="oss-card">
            <div className="oss-top">
              <div>
                <span className="oss-badge">7 MERGED PULL REQUESTS</span>
                <h3 className="oss-title">{resumeProfile.openSource.title}</h3>
                <p className="oss-role">{resumeProfile.openSource.role}</p>
              </div>
              <a
                href={resumeProfile.openSource.url}
                target="_blank"
                rel="noreferrer"
                className="matrix-btn btn-secondary oss-link"
              >
                <span>VIEW REPOSITORY</span>
                <IconExternalLink size={14} />
              </a>
            </div>

            <p className="oss-desc">{resumeProfile.openSource.contribution}</p>

            <div className="oss-tags">
              {resumeProfile.openSource.tags.map((tag, idx) => (
                <span key={idx} className="matrix-chip chip-highlight">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION, CERTIFICATION & MULTILINGUAL MATRIX */}
        <section id="education" className="section-credentials">
          <div className="section-heading-row">
            <div className="section-tag">
              <IconCertificate size={16} />
              <span>MODULE // 04</span>
            </div>
            <h2 className="section-title">CREDENTIALS & MULTILINGUAL MATRIX</h2>
            <p className="section-desc">
              Formal CS foundation, cloud architecture certification, and 4-language fluency.
            </p>
          </div>

          <div className="credentials-grid">
            {/* Academic & Cert */}
            <div className="credential-column">
              <div className="credential-card">
                <div className="credential-icon">
                  <IconCertificate size={22} />
                </div>
                <div>
                  <span className="cred-year">2026 CERTIFICATION</span>
                  <h4 className="cred-title">
                    Oracle Cloud Infrastructure (OCI) Architecture Certification
                  </h4>
                  <p className="cred-sub">Oracle Certification • Cloud Architecture</p>
                </div>
              </div>

              <div className="credential-card">
                <div className="credential-icon">
                  <IconSchool size={22} />
                </div>
                <div>
                  <span className="cred-year">2019 – 2023 // SOUTH KOREA</span>
                  <h4 className="cred-title">Chungnam National University</h4>
                  <p className="cred-sub">
                    Bachelor of Arts, Asia Business; Minor in Computer Science
                  </p>
                </div>
              </div>
            </div>

            {/* Language Matrix */}
            <div className="languages-card">
              <div className="languages-header">
                <IconLanguage size={20} />
                <h3 className="languages-title">GLOBAL COMMUNICATION MATRIX</h3>
              </div>
              <div className="languages-grid">
                {resumeProfile.languages.map((lang, lIdx) => (
                  <div key={lIdx} className="lang-box">
                    <span className="lang-code">{lang.code}</span>
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-level">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LIVE MATRIX NEURAL TERMINAL REPL */}
        <section id="terminal" className="section-terminal">
          <div className="section-heading-row">
            <div className="section-tag">
              <IconTerminal2 size={16} />
              <span>MODULE // 05</span>
            </div>
            <h2 className="section-title">NEURAL MATRIX TERMINAL // REPL</h2>
            <p className="section-desc">
              Interactive CLI environment. Run commands or click quick macro chips to inspect systems.
            </p>
          </div>

          <MatrixTerminal
            onTriggerBurst={handleTriggerBurst}
            theme={matrixTheme}
          />
        </section>

        {/* CONNECT / DIRECT HANDSHAKE */}
        <section id="contact" className="section-contact">
          <div className="contact-box">
            <div className="contact-scanner" />
            <h2 className="contact-headline">INITIATE DIRECT COMMUNICATION</h2>
            <p className="contact-sub">
              Open to senior roles in AI Engineering, Distributed Systems, High-Load .NET / Go, and technical architecture.
            </p>

            <div className="contact-channels-grid">
              <a
                href={resumeProfile.telegram}
                target="_blank"
                rel="noreferrer"
                className="contact-channel-card"
              >
                <div className="channel-icon-wrap">
                  <IconBrandTelegram size={24} />
                </div>
                <div className="channel-info">
                  <span className="channel-label">TELEGRAM</span>
                  <span className="channel-val">{resumeProfile.telegramHandle}</span>
                </div>
                <span className="channel-cta">MESSAGE &rarr;</span>
              </a>

              <a
                href={`mailto:${resumeProfile.email}`}
                className="contact-channel-card"
              >
                <div className="channel-icon-wrap">
                  <IconMail size={24} />
                </div>
                <div className="channel-info">
                  <span className="channel-label">DIRECT EMAIL</span>
                  <span className="channel-val">{resumeProfile.email}</span>
                </div>
                <span className="channel-cta">SEND MAIL &rarr;</span>
              </a>

              <a
                href={resumeProfile.github}
                target="_blank"
                rel="noreferrer"
                className="contact-channel-card"
              >
                <div className="channel-icon-wrap">
                  <IconBrandGithub size={24} />
                </div>
                <div className="channel-info">
                  <span className="channel-label">GITHUB</span>
                  <span className="channel-val">{resumeProfile.githubHandle}</span>
                </div>
                <span className="channel-cta">VIEW REPOS &rarr;</span>
              </a>

              <a
                href={resumeProfile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="contact-channel-card"
              >
                <div className="channel-icon-wrap">
                  <IconBrandLinkedin size={24} />
                </div>
                <div className="channel-info">
                  <span className="channel-label">LINKEDIN</span>
                  <span className="channel-val">{resumeProfile.linkedinHandle}</span>
                </div>
                <span className="channel-cta">CONNECT &rarr;</span>
              </a>
            </div>

            <div className="contact-footer-note">
              <span>LOCATION: UTC+5 / UTC+1</span>
              <span>•</span>
              <span>AVAILABILITY: FULL-TIME / HIGH-IMPACT CONTRACTS</span>
              <span>•</span>
              <button
                type="button"
                className="copy-email-inline"
                onClick={handleCopyEmail}
              >
                {copiedEmail ? "EMAIL COPIED TO CLIPBOARD" : "CLICK TO COPY EMAIL"}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* MATRIX FOOTER */}
      <footer className="matrix-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span>[FM-SYSTEMS] © {new Date().getFullYear()} MAJITOV FERDAVS</span>
            <span className="footer-sep">{"//"}</span>
            <span>BUILT WITH REACT & MATRIX DIGITAL ARCHITECTURE</span>
          </div>
          <div className="footer-right">
            <span className="matrix-pulse-dot" />
            <span>OPERATIONAL // ZERO DOWNTIME</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
