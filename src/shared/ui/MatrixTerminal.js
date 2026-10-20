import React, { useState, useRef, useEffect } from "react";
import { resumeProfile } from "../data/resumeProfile";
import { playKeyClick, playBeep, playWarpSound } from "../audio/matrixAudio";

export function MatrixTerminal({ onTriggerBurst, theme = "green" }) {
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "⚡ NEURAL MATRIX SYSTEM v2.6 // MAJITOV FERDAVS INITIALIZED",
    },
    {
      type: "system",
      text: 'Type "help" or click one of the quick command pills below to query system status.',
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playBeep(920, 0.05);

    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: "user", text: `$ ${rawCmd}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  • skills      - Full architectural and technical competency matrix
  • ai          - Multi-agent orchestration, RAG & LLM engineering
  • experience  - Career track (NDA, LS ELECTRIC, KOBOTS, PayPal, QIWI)
  • metrics     - Key production benchmarks (99%+ SLA, -70% Latency)
  • wolverine   - Open-source contributions to JasperFx/Wolverine (.NET)
  • certs       - Cloud Architecture Certification & Academic Background
  • languages   - Multilingual proficiency (EN C1, KO C1, RU, UZ)
  • contact     - Instant communication endpoints
  • matrix      - Warp-speed Matrix stream burst
  • clear       - Flush the terminal viewport`,
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          text: `CORE TECHNICAL STACK:
  [AI / AGENTIC]  : LangGraph, LangChain, RAG Pipelines, Multi-Agent Automation
  [LANGUAGES]     : C# (.NET 10/8/6), Go, TypeScript, Python, React, Java, Rust
  [MESSAGING/EDA] : Kafka, Wolverine, RabbitMQ, MassTransit, AWS SQS, gRPC
  [DATABASES]     : PostgreSQL (Tuning/Index), MS SQL, Oracle, Redis, S3, MinIO
  [DEVOPS/CLOUD]  : Docker, Kubernetes, AWS, OCI, Prometheus, Grafana, OpenTelemetry`,
        });
        break;

      case "ai":
        newHistory.push({
          type: "output",
          text: `AI & RAG ARCHITECTURE:
  • Multi-Agent Systems : LangGraph stateful cyclic graphs & multi-agent handoffs
  • Production RAG     : Hybrid semantic + lexical retrieval, grounding LLM answers
  • Integrations       : 4+ external LLM providers with automatic fallback & routing
  • Delivery           : FinTech AI interactive collaborative workspace`,
        });
        break;

      case "experience":
        newHistory.push({
          type: "output",
          text: `BATTLE-TESTED PRODUCTION LOG:
  1. [2026-PRES] NDA (Contract) - AI Engineer
     -> Built production RAG & multi-agent LangGraph workflows.
  2. [2024-2026] LS ELECTRIC (South Korea) - Software Engineer
     -> 99%+ Kafka/Wolverine message delivery with transactional outbox/inbox.
  3. [2022-2024] KOBOTS (South Korea) - Senior Software Engineer
     -> ASP.NET Core AI therapy platform; 40% PostgreSQL speedup; 20% AWS cost cut.
  4. [2021-2022] PayPal (Contract) - Software Engineer
     -> Reduced query/API latency by 70%; cut incident MTTR by 60% with OTel.
  5. [2020-2021] QIWI - Golang Developer
     -> High-throughput Go REST services, PostgreSQL & automated CI pipelines.`,
        });
        break;

      case "metrics":
        newHistory.push({
          type: "output",
          text: `KEY PRODUCTION TELEMETRY:
  • 99%+ Message Delivery Reliability (LS ELECTRIC Transactional Outbox)
  • -70% Latency Drop on High-Throughput Endpoints (PayPal Go/Kafka/PostgreSQL)
  • -60% Incident Detection Time via OpenTelemetry, Prometheus & Grafana
  • +40% PostgreSQL Query Performance Optimization (KOBOTS)
  • -20% Cloud Infrastructure Cost Reduction (AWS)`,
        });
        break;

      case "wolverine":
        newHistory.push({
          type: "output",
          text: `OPEN SOURCE HIGHLIGHT // WOLVERINE (.NET Messaging):
  • 7 Merged PRs to JasperFx/wolverine repository.
  • Enhanced Kafka consumer configuration inheritance & topic-level overrides.
  • Hardened Entity Framework Core transactional integration & outbox flush logic.`,
        });
        break;

      case "certs":
      case "education":
        newHistory.push({
          type: "output",
          text: `CERTIFICATIONS & EDUCATION:
  • Oracle Cloud Infrastructure (OCI) Architecture Certification (2026)
  • Chungnam National University (South Korea, 2019–2023)
    Bachelor of Arts, Asia Business; Minor in Computer Science`,
        });
        break;

      case "languages":
        newHistory.push({
          type: "output",
          text: `MULTILINGUAL CAPABILITIES:
  • English : C1 (Professional / International Engineering)
  • Korean  : C1 (Professional / 3+ Years On-Site in South Korea)
  • Russian : Native
  • Uzbek   : Native`,
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          text: `COMMUNICATION CHANNELS:
  • Email    : ${resumeProfile.email}
  • Telegram : ${resumeProfile.telegram} (${resumeProfile.telegramHandle})
  • GitHub   : ${resumeProfile.github}
  • LinkedIn : ${resumeProfile.linkedin}`,
        });
        break;

      case "matrix":
        playWarpSound();
        if (onTriggerBurst) onTriggerBurst();
        newHistory.push({
          type: "output",
          text: `>>> ENGAGING MATRIX WARP ACCELERATION... STREAM VELOCITY 4.5X <<<`,
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          type: "error",
          text: `Command not recognized: "${rawCmd}". Type "help" to view valid commands.`,
        });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    playKeyClick();
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx =
        historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    }
  };

  const commandPills = [
    "help",
    "skills",
    "ai",
    "experience",
    "metrics",
    "wolverine",
    "certs",
    "languages",
    "contact",
    "matrix",
    "clear",
  ];

  return (
    <div className={`matrix-terminal-window theme-${theme}`}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="terminal-title">
          <span className="terminal-glitch">SYS://FM-TERMINAL-NODE.01</span>
          <span className="terminal-badge">LIVE REPL</span>
        </div>
        <div className="terminal-status">
          <span className="status-pulse" />
          <span>PORT 443 CONNECTED</span>
        </div>
      </div>

      <div className="terminal-pill-bar">
        <span className="pill-bar-label">QUICK MACROS:</span>
        {commandPills.map((pill) => (
          <button
            key={pill}
            type="button"
            className="terminal-pill-btn"
            onClick={() => handleCommand(pill)}
          >
            {pill}
          </button>
        ))}
      </div>

      <div
        className="terminal-body"
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        {history.map((entry, index) => (
          <div key={index} className={`terminal-line line-${entry.type}`}>
            {entry.text}
          </div>
        ))}
        <div ref={terminalEndRef} />

        <div className="terminal-input-row">
          <span className="terminal-prompt">root@fm-node:~#</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command here..."
            autoComplete="off"
            spellCheck="false"
          />
          <span className="terminal-cursor">█</span>
        </div>
      </div>
    </div>
  );
}

export default MatrixTerminal;
