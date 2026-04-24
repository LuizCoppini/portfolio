import { useState, useEffect, useRef, createContext, useContext } from "react";

// ─── Language Context ────────────────────────────────────────────────────────
const LangContext = createContext("en");
const useLang = () => useContext(LangContext);

// ─── Translations ────────────────────────────────────────────────────────────
const T = {
  en: {
    nav: {
      about: "About",
      education: "Education",
      projects: "Projects",
      competitions: "Competitions",
      seminars: "Seminars",
      contact: "Contact",
    },
    hero: {
      greeting: "// Hello, world. I'm",
      bio: "Graduated in Computer Science (UNOESC), pursuing Aerospace Engineering and a Master's in Electronic Systems Engineering with focus on Applied AI at UFSC. 4+ years as a fullstack developer, now focused on machine learning, control systems and embedded systems.",
      cta: "View Projects →",
      resume: "Download CV",
    },
    typewriter: ["ML Engineer", "Roboticist", "Embedded Systems", "Aerospace Enthusiast"],
    sections: {
      education: { label: "// education", title: "Academic Background" },
      projects: { label: "// projects", title: "What I've Built" },
      competitions: { label: "// competitions", title: "Challenges & Awards" },
      seminars: { label: "// seminars", title: "Events & Talks" },
      contact: { label: "// contact", title: "Let's Talk" },
    },
    categories: [
      { id: "all", label: "All" },
      { id: "ml", label: "Machine Learning" },
      { id: "robotics", label: "Robotics" },
      { id: "aerospace", label: "Aerospace" },
      { id: "embedded", label: "Embedded" },
      { id: "mobile", label: "Mobile" },
      { id: "fullstack", label: "Fullstack" },
    ],
    contact: {
      body: "Open to opportunities in ML, robotics and embedded systems. If you have an interesting project or just want to exchange ideas, send me a message.",
      email: "Send Email",
    },
    education: {
      ongoing: "Ongoing",
      completed: "Completed",
      expected: "Expected",
      thesis: "Thesis",
      focus: "Focus",
    },
    modal: {
      close: "Close",
      viewCode: "View Code",
      liveDemo: "Live Demo",
      techStack: "Tech Stack",
      overview: "Overview",
      keyFeatures: "Key Features",
    },
    footer: "// always learning",
    speaker: "Speaker",
    attendee: "Attendee",
    viewProject: "view project →",
  },
  pt: {
    nav: {
      about: "Sobre",
      education: "Formação",
      projects: "Projetos",
      competitions: "Competições",
      seminars: "Seminários",
      contact: "Contato",
    },
    hero: {
      greeting: "// Olá, mundo. Eu sou",
      bio: "Graduado em Ciência da Computação (UNOESC), cursando Engenharia Aeroespacial e Mestrado em Engenharia Eletrônica com foco em IA Aplicada na UFSC. Mais de 4 anos como desenvolvedor fullstack, agora focado em ML, controle e sistemas embarcados.",
      cta: "Ver Projetos →",
      resume: "Baixar CV",
    },
    typewriter: ["Engenheiro de ML", "Roboticista", "Sistemas Embarcados", "Entusiasta Aeroespacial"],
    sections: {
      education: { label: "// formação", title: "Trajetória Acadêmica" },
      projects: { label: "// projetos", title: "O que construí" },
      competitions: { label: "// competições", title: "Desafios & Conquistas" },
      seminars: { label: "// seminários", title: "Eventos & Palestras" },
      contact: { label: "// contato", title: "Vamos conversar" },
    },
    categories: [
      { id: "all", label: "Todos" },
      { id: "ml", label: "Machine Learning" },
      { id: "robotics", label: "Robótica" },
      { id: "aerospace", label: "Aeroespacial" },
      { id: "embedded", label: "Embarcados" },
      { id: "mobile", label: "Mobile" },
      { id: "fullstack", label: "Fullstack" },
    ],
    contact: {
      body: "Aberto a oportunidades em ML, robótica e sistemas embarcados. Se você tem um projeto interessante ou quer trocar ideias, me manda uma mensagem.",
      email: "Enviar E-mail",
    },
    education: {
      ongoing: "Em andamento",
      completed: "Concluído",
      expected: "Previsão",
      thesis: "Dissertação",
      focus: "Foco",
    },
    modal: {
      close: "Fechar",
      viewCode: "Ver Código",
      liveDemo: "Demo ao Vivo",
      techStack: "Tecnologias",
      overview: "Visão Geral",
      keyFeatures: "Destaques",
    },
    footer: "// sempre aprendendo",
    speaker: "Apresentador",
    attendee: "Participante",
    viewProject: "ver projeto →",
  },
};

// ─── Category config ──────────────────────────────────────────────────────────
const CAT_COLORS = {
  ml:        { accent: "#38bdf8", bg: "#0e1a2b" },
  robotics:  { accent: "#34d399", bg: "#0d1f1a" },
  aerospace: { accent: "#a78bfa", bg: "#1a1020" },
  embedded:  { accent: "#fbbf24", bg: "#1f1505" },
  mobile:    { accent: "#f472b6", bg: "#1a0f1f" },
  fullstack: { accent: "#22d3ee", bg: "#0f1a1f" },
};

// ─── Category SVG icons ───────────────────────────────────────────────────────
// Two variants: static JSX (for placeholders) and function(color) (for TypeBadge/Carousel)
const CAT_ICONS_JSX = {
  robotics: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="18" width="20" height="18" rx="3" />
      <circle cx="19" cy="26" r="2" /><circle cx="29" cy="26" r="2" />
      <path d="M19 34v4M29 34v4M24 18v-5M20 13h8M14 24H8M34 24h6" />
    </svg>
  ),
  aerospace: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 6l4 14h10l-8 6 3 13-9-6-9 6 3-13-8-6h10z" />
      <circle cx="24" cy="24" r="3" />
    </svg>
  ),
  ml: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="24" r="3" /><circle cx="36" cy="24" r="3" />
      <circle cx="24" cy="12" r="3" /><circle cx="24" cy="36" r="3" />
      <circle cx="24" cy="24" r="4" />
      <path d="M15 24h5M28 24h5M24 15v5M24 28v5M16 16l5 5M27 27l5 5M32 16l-5 5M21 27l-5 5" />
    </svg>
  ),
  embedded: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="14" width="20" height="20" rx="2" />
      <path d="M14 20H8M14 28H8M34 20h6M34 28h6M20 14V8M28 14V8M20 34v6M28 34v6" />
      <rect x="19" y="19" width="10" height="10" rx="1" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="6" width="16" height="36" rx="3" />
      <path d="M21 38h6M22 10h4" />
    </svg>
  ),
  fullstack: (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="10" width="36" height="28" rx="2" />
      <path d="M6 16h36M18 26l-4 4 4 4M30 26l4 4-4 4M22 36l4-12" />
    </svg>
  ),
};

// Function variant used by TypeBadge (needs explicit stroke color)
const CAT_ICONS_FN = {
  robotics: (c) => (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="18" width="20" height="18" rx="3"/>
      <circle cx="19" cy="26" r="2"/><circle cx="29" cy="26" r="2"/>
      <path d="M19 34v4M29 34v4M24 18v-5M20 13h8M14 24H8M34 24h6"/>
    </svg>
  ),
  aerospace: (c) => (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 6l4 14h10l-8 6 3 13-9-6-9 6 3-13-8-6h10z"/>
      <circle cx="24" cy="24" r="3"/>
    </svg>
  ),
  ml: (c) => (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="24" r="3"/><circle cx="36" cy="24" r="3"/>
      <circle cx="24" cy="12" r="3"/><circle cx="24" cy="36" r="3"/>
      <circle cx="24" cy="24" r="4"/>
      <path d="M15 24h5M28 24h5M24 15v5M24 28v5M16 16l5 5M27 27l5 5M32 16l-5 5M21 27l-5 5"/>
    </svg>
  ),
  embedded: (c) => (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="14" width="20" height="20" rx="2"/>
      <rect x="19" y="19" width="10" height="10" rx="1"/>
      <path d="M14 20H8M14 28H8M34 20h6M34 28h6M20 14V8M28 14V8M20 34v6M28 34v6"/>
    </svg>
  ),
  mobile: (c) => (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="6" width="16" height="36" rx="3"/>
      <path d="M21 38h6M22 10h4"/>
    </svg>
  ),
  fullstack: (c) => (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="10" width="36" height="28" rx="2"/>
      <path d="M6 16h36M18 26l-4 4 4 4M30 26l4 4-4 4M22 36l4-12"/>
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Luiz Coppini",
  email: "luizcoppini@email.com",
  linkedin: "https://www.linkedin.com/in/luiz-coppini/",
  github: "https://github.com/LuizCoppini",
  resume: "https://drive.google.com/file/d/1c7_H3eGdaDqHC9xocejEb1LwRu2wieOQ/view",

  skills: [
    { label: "Python / TensorFlow / PyTorch", category: "ml" },
    { label: "ROS / ROS2",                    category: "robotics" },
    { label: "C / C++ Embedded",              category: "embedded" },
    { label: "RTOS / FreeRTOS",               category: "embedded" },
    { label: "Control Systems",               category: "robotics" },
    { label: "React / Node.js",               category: "fullstack" },
    { label: "Flutter / Dart",                category: "mobile" },
    { label: "Docker / CI/CD",                category: "fullstack" },
    { label: "MATLAB / Simulink",             category: "aerospace" },
    { label: "Computer Vision",               category: "ml" },
  ],

  // ── Education ──────────────────────────────────────────────────────────────
  education: [
    {
      degree: {
        en: "M.Sc. in Electronic Systems Engineering",
        pt: "Mestrado em Engenharia de Sistemas Eletrônicos",
      },
      institution: "UFSC — Universidade Federal de Santa Catarina",
      period: "2024 – 2026",
      status: "ongoing",
      icon: "🎓",
      color: "aerospace",
      focus: {
        en: "Applied Artificial Intelligence & Control Systems",
        pt: "Inteligência Artificial Aplicada & Sistemas de Controle",
      },
      thesis: {
        en: "Guided recovery of stratospheric platforms using embedded Neural network for paraglider control",
        pt: "Recuperação guiada de plataformas estratosféricas usando rede neural embarcada para controle de paraglider",
      },
      highlights: {
        en: ["Deep Learning for control systems", "Embedded ML on ARM Cortex-M", "Kalman filtering & sensor fusion"],
        pt: ["Deep Learning para controle", "ML embarcado em ARM Cortex-M", "Filtro de Kalman & fusão de sensores"],
      },
    },
    {
      degree: {
        en: "B.Sc. in Aerospace Engineering",
        pt: "Bacharelado em Engenharia Aeroespacial",
      },
      institution: "UFSC — Universidade Federal de Santa Catarina",
      period: "2022 – 2027",
      status: "ongoing",
      icon: "🚀",
      color: "aerospace",
      focus: {
        en: "Flight control, Avionics & Flight Dynamics",
        pt: "Controle de voo, Aviônica e Dinâmica de Voo",
      },
      highlights: {
        en: ["Flight mechanics & aerodynamics", "Avionics & embedded systems", "Structural analysis"],
        pt: ["Mecânica de voo & aerodinâmica", "Aviônica & sistemas embarcados", "Análise estrutural"],
      },
    },
    {
      degree: {
        en: "B.Sc. in Computer Science",
        pt: "Bacharelado em Ciência da Computação",
      },
      institution: "UNOESC — Universidade do Oeste de Santa Catarina",
      period: "2019 – 2022",
      status: "completed",
      icon: "💻",
      color: "fullstack",
      focus: {
        en: "Software Engineering & Distributed Systems",
        pt: "Engenharia de Software & Sistemas Distribuídos",
      },
      highlights: {
        en: ["Algorithms & data structures", "Fullstack web development", "Database design & optimization"],
        pt: ["Algoritmos & estruturas de dados", "Desenvolvimento web fullstack", "Modelagem e otimização de banco de dados"],
      },
    },
  ],

  // ── Projects ───────────────────────────────────────────────────────────────
  // media: array of { type: "image"|"youtube"|"gif"|"placeholder", src?: "url", category?: "..." }
  // To add real media later just replace placeholder entries with:
  //   { type: "image", src: "/img/my-screenshot.png" }
  //   { type: "youtube", src: "https://www.youtube.com/embed/VIDEO_ID" }
  //   { type: "gif", src: "/img/demo.gif" }
  projects: [
    {
      id: 1,
      title: "Autonomous Paraglider Guidance System",
      category: "aerospace",
      year: "2024",
      types: ["aerospace", "embedded"],
      description: {
        en: "Autonomous guidance system for a paraglider using ESP32. Real-time navigation to GPS coordinates with sensor fusion (IMU + GPS) and control via servos.",
        pt: "Sistema de guiagem autônoma para parapente usando ESP32. Navegação em tempo real até coordenadas GPS com fusão de sensores (IMU + GPS) e controle via servos.",
      },
      details: {
        en: "This project is the core of my Master's thesis. It implements a fully autonomous guidance system for a paraglider (flexible-wing aircraft) using an ESP32 microcontroller. The goal is the guided recovery of stratospheric balloon payloads.\n\nA complementary filter fuses data from an IMU (MPU-6050) and GPS module to estimate attitude and position in real time. A PID controller computes control commands that drive two servos connected to the paraglider's brake toggles, allowing left/right turns and speed modulation to navigate toward a target GPS coordinate.\n\nA neural network trained offline is being integrated to handle wind disturbances and improve tracking performance beyond what classical PID can achieve in turbulent conditions.",
        pt: "Este projeto é o núcleo da minha dissertação de mestrado. Implementa um sistema de guiagem autônoma para um parapente usando um microcontrolador ESP32, com o objetivo de recuperar cargas de balões estratosféricos.\n\nUm filtro complementar fusiona dados de IMU (MPU-6050) e GPS para estimar atitude e posição em tempo real. Um controlador PID computa comandos que acionam dois servos conectados aos freios do parapente, permitindo curvas e modulação de velocidade para navegar até uma coordenada GPS alvo.\n\nUma rede neural treinada offline está sendo integrada para lidar com perturbações de vento e melhorar o desempenho em condições turbulentas.",
      },
      features: {
        en: [
          "ESP32 running real-time guidance loop at 50 Hz",
          "Complementary filter: IMU + GPS sensor fusion",
          "PID controller for left/right brake actuation",
          "Neural network integration for wind disturbance rejection",
        ],
        pt: [
          "ESP32 com loop de guiagem em tempo real a 50 Hz",
          "Filtro complementar: fusão IMU + GPS",
          "Controlador PID para acionamento dos freios",
          "Integração de rede neural para rejeição de perturbações de vento",
        ],
      },
      tags: ["ESP32", "C/C++", "GPS", "IMU", "Control Systems"],
      media: [
        { type: "placeholder", category: "aerospace" },
        { type: "placeholder", category: "embedded" },
      ],
      link: "#",
      github: "#",
    },
    {
      id: 2,
      title: "Rocket Telemetry System (10 km Apogee)",
      category: "aerospace",
      year: "2024",
      types: ["aerospace", "embedded"],
      description: {
        en: "Telemetry system for high-power rockets with up to 10 km apogee. Real-time data transmission (altitude, IMU, GPS) with ground station integration.",
        pt: "Sistema de telemetria para foguetes de alta potência com apogeu de até 10 km. Transmissão em tempo real de dados (altitude, IMU, GPS) com integração com estação em solo.",
      },
      details: {
        en: "Designed and built a compact avionics board for high-power amateur rockets capable of reaching 10 km altitude. The system logs and transmits altitude (BMP390 barometer), 9-axis IMU data, and GPS coordinates in real time over a LoRa 915 MHz link with 15 km range.\n\nThe embedded firmware runs on an STM32 with FreeRTOS, using a priority-based task scheduler: one task handles sensor acquisition at 100 Hz, another manages radio transmission at 10 Hz, and a third manages SD card logging as a black-box backup. A Python-based ground station decodes packets and plots live telemetry on a map.",
        pt: "Projetada e construída uma placa de aviônica compacta para foguetes amadores de alta potência capazes de atingir 10 km de altitude. O sistema registra e transmite altitude (barômetro BMP390), dados de IMU de 9 eixos e coordenadas GPS em tempo real via link LoRa 915 MHz com alcance de 15 km.\n\nO firmware embarcado roda em STM32 com FreeRTOS usando escalonador de tarefas por prioridade. Uma estação terrestre em Python decodifica pacotes e plota telemetria ao vivo em mapa.",
      },
      features: {
        en: [
          "LoRa 915 MHz link with 15 km range",
          "100 Hz IMU + barometer acquisition on STM32/FreeRTOS",
          "SD card black-box logging as backup",
          "Python ground station with live map plotting",
        ],
        pt: [
          "Link LoRa 915 MHz com alcance de 15 km",
          "Aquisição IMU + barômetro a 100 Hz no STM32/FreeRTOS",
          "Registro black-box em cartão SD como backup",
          "Estação terrestre Python com plotagem ao vivo no mapa",
        ],
      },
      tags: ["Embedded", "Telemetry", "LoRa/RF", "C/C++", "FreeRTOS", "STM32"],
      media: [
        { type: "placeholder", category: "aerospace" },
        { type: "placeholder", category: "embedded" },
      ],
      link: "#",
      github: "#",
    },
    {
      id: 3,
      title: "On-Device Speaker Recognition AI",
      category: "ml",
      year: "2024",
      types: ["ml", "embedded"],
      description: {
        en: "Machine learning model for speaker identification using audio features (MFCC, ZCR, energy). Designed for real-time inference and edge deployment.",
        pt: "Modelo de machine learning para identificação de locutor usando features de áudio (MFCC, ZCR, energia). Projetado para inferência em tempo real e edge.",
      },
      details: {
        en: "Built a speaker recognition pipeline that runs entirely on-device, without any cloud dependency. Audio is captured, pre-processed (noise gate, normalization), and 39-dimensional MFCC feature vectors are extracted per 25 ms frame with 10 ms hop.\n\nA lightweight CNN classifier (< 200 KB) trained on a custom dataset of 10 speakers achieves 96% identification accuracy. The model was quantized to INT8 with TensorFlow Lite Micro and deployed on an ESP32-S3 with PSRAM, achieving inference in under 8 ms per frame — suitable for real-time use cases.",
        pt: "Pipeline de reconhecimento de locutor que roda inteiramente no dispositivo, sem dependência de nuvem. Áudio é capturado, pré-processado e vetores de features MFCC de 39 dimensões são extraídos por frame de 25 ms.\n\nUm classificador CNN leve (< 200 KB) treinado em dataset customizado de 10 locutores alcança 96% de acurácia. O modelo foi quantizado para INT8 com TensorFlow Lite Micro e implantado em ESP32-S3, alcançando inferência em menos de 8 ms por frame.",
      },
      features: {
        en: [
          "39-dim MFCC features at 25 ms / 10 ms hop",
          "96% identification accuracy on 10-speaker dataset",
          "< 200 KB INT8 model — TensorFlow Lite Micro",
          "< 8 ms inference on ESP32-S3 with PSRAM",
        ],
        pt: [
          "Features MFCC 39-dim a 25 ms / hop 10 ms",
          "96% de acurácia em dataset de 10 locutores",
          "Modelo INT8 < 200 KB — TensorFlow Lite Micro",
          "< 8 ms de inferência em ESP32-S3 com PSRAM",
        ],
      },
      tags: ["Python", "ML", "Audio Processing", "MFCC", "Edge AI", "TFLite"],
      media: [
        { type: "placeholder", category: "ml" },
        { type: "placeholder", category: "embedded" },
      ],
      link: "#",
      github: "#",
    },
    {
      id: 4,
      title: "Real-Time YouTube Audio Transcription Pipeline",
      category: "ml",
      year: "2024",
      types: ["ml", "fullstack"],
      description: {
        en: "Pipeline for real-time transcription of YouTube live streams with concurrent audio capture and processing. Optimized for low latency.",
        pt: "Pipeline para transcrição em tempo real de lives do YouTube com captura e processamento simultâneos. Otimizado para baixa latência.",
      },
      details: {
        en: "A Python pipeline that captures audio from a live YouTube stream in real time and transcribes it with sub-3-second latency. FFmpeg captures the HLS audio stream into a ring buffer of 2-second chunks. A worker thread passes each chunk to OpenAI Whisper (medium model, int8-quantized with faster-whisper) for transcription.\n\nTranscripts are streamed via WebSocket to a React dashboard that displays them with speaker timestamps and confidence scores. The whole system runs on a single RTX 3060 GPU and processes up to 5 concurrent streams.",
        pt: "Pipeline Python que captura áudio de uma live do YouTube em tempo real e transcreve com latência abaixo de 3 segundos. FFmpeg captura o stream HLS de áudio em um ring buffer de chunks de 2 segundos. Uma thread worker passa cada chunk para o Whisper (modelo medium, int8 com faster-whisper).\n\nAs transcrições são transmitidas via WebSocket para um dashboard React que as exibe com timestamps por locutor e scores de confiança.",
      },
      features: {
        en: [
          "< 3 s end-to-end transcription latency",
          "FFmpeg HLS capture + ring buffer architecture",
          "faster-whisper INT8 — 4× faster than base Whisper",
          "React dashboard with live WebSocket streaming",
        ],
        pt: [
          "< 3 s de latência ponta a ponta",
          "Captura HLS com FFmpeg + arquitetura ring buffer",
          "faster-whisper INT8 — 4× mais rápido que o Whisper base",
          "Dashboard React com streaming WebSocket ao vivo",
        ],
      },
      tags: ["Python", "Whisper", "FFmpeg", "WebSocket", "React", "Speech-to-Text"],
      media: [
        { type: "placeholder", category: "ml" },
        { type: "placeholder", category: "fullstack" },
      ],
      link: "#",
      github: "#",
    },
    {
      id: 5,
      title: "Computer Vision for Agricultural Drones",
      category: "ml",
      year: "2023",
      types: ["ml", "aerospace"],
      description: {
        en: "Computer vision system for agricultural drones focused on field monitoring and spraying optimization. Developed in a startup environment.",
        pt: "Sistema de visão computacional para drones agrícolas focado em monitoramento e otimização de pulverização. Desenvolvido em ambiente de startup.",
      },
      details: {
        en: "Developed at an agtech startup, this system processes orthomosaic images from agricultural drones to automatically detect pest and disease outbreaks and generate variable-rate application maps for precision spraying.\n\nA YOLOv8 model was fine-tuned on 8,000 annotated drone images across 5 crop types. The inference pipeline runs on a Jetson Orin Nano co-processor aboard the drone, providing detections at 15 fps. An integration with the flight controller triggers variable-rate spray nozzles in real time based on detected zones.",
        pt: "Desenvolvido em startup agtech, este sistema processa imagens de ortomosaico de drones agrícolas para detectar automaticamente pragas e doenças e gerar mapas de aplicação variável para pulverização de precisão.\n\nUm modelo YOLOv8 foi fine-tuned em 8.000 imagens anotadas de drones em 5 tipos de cultura. O pipeline de inferência roda em um Jetson Orin Nano a bordo do drone, fornecendo detecções a 15 fps.",
      },
      features: {
        en: [
          "YOLOv8 fine-tuned on 8,000 annotated drone images",
          "15 fps inference on Jetson Orin Nano",
          "Variable-rate spray map generation",
          "Real-time nozzle control via flight controller integration",
        ],
        pt: [
          "YOLOv8 fine-tuned em 8.000 imagens anotadas",
          "15 fps de inferência em Jetson Orin Nano",
          "Geração de mapa de pulverização variável",
          "Controle de bico em tempo real via integração com controlador de voo",
        ],
      },
      tags: ["Computer Vision", "YOLOv8", "Python", "OpenCV", "Jetson", "Drones"],
      media: [
        { type: "placeholder", category: "ml" },
        { type: "placeholder", category: "aerospace" },
      ],
      link: "#",
      github: "#",
    },
    {
      id: 6,
      title: "BI & Data Platform for Retail Chains",
      category: "fullstack",
      year: "2023",
      types: ["fullstack", "ml"],
      description: {
        en: "Business Intelligence platform with ETL pipelines and dashboards for supermarket chains. Focus on decision support and operational analytics.",
        pt: "Plataforma de Business Intelligence com pipelines ETL e dashboards para redes de supermercados. Foco em suporte à decisão e analytics operacional.",
      },
      details: {
        en: "End-to-end BI platform built for a group of supermarket chains across Brazil. The ETL pipeline ingests daily sales, inventory and supplier data from heterogeneous ERP systems, transforms it using dbt, and loads it into a PostgreSQL data warehouse. Incremental loads process ~2 M rows/day in under 4 minutes.\n\nThe React frontend offers 15+ interactive chart types with drill-down from chain → store → department → SKU. Automated PDF reports are generated nightly with Puppeteer and emailed to store managers. A predictive module uses a LightGBM model to forecast weekly demand per SKU, reducing stockouts by 18%.",
        pt: "Plataforma de BI end-to-end construída para um grupo de redes de supermercados no Brasil. O pipeline ETL ingere dados diários de vendas, estoque e fornecedores de sistemas ERP heterogêneos. O frontend React oferece 15+ tipos de gráficos com drill-down completo. Um módulo preditivo usa LightGBM para prever demanda semanal por SKU, reduzindo rupturas em 18%.",
      },
      features: {
        en: [
          "ETL: ~2 M rows/day processed in < 4 minutes",
          "15+ interactive chart types with full drill-down",
          "Automated nightly PDF reports via Puppeteer",
          "LightGBM demand forecasting — 18% fewer stockouts",
        ],
        pt: [
          "ETL: ~2 M linhas/dia processadas em < 4 minutos",
          "15+ tipos de gráficos com drill-down completo",
          "Relatórios PDF automáticos noturnos com Puppeteer",
          "Previsão de demanda LightGBM — 18% menos rupturas",
        ],
      },
      tags: ["Python", "SQL", "ETL", "React", "dbt", "LightGBM", "PostgreSQL"],
      media: [
        { type: "placeholder", category: "fullstack" },
        { type: "placeholder", category: "ml" },
      ],
      link: "#",
      github: "#",
    },
    {
      id: 7,
      title: "Embedded ML with TensorFlow Lite on ESP32",
      category: "embedded",
      year: "2024",
      types: ["embedded", "ml"],
      description: {
        en: "Deployment of machine learning models on ESP32 using TensorFlow Lite Micro for on-device inference in constrained environments.",
        pt: "Deploy de modelos de machine learning em ESP32 usando TensorFlow Lite Micro para inferência embarcada em ambientes restritos.",
      },
      details: {
        en: "A framework and set of reference implementations for deploying trained ML models on ESP32 microcontrollers using TensorFlow Lite Micro (TFLM). The project covers the full pipeline: model training in Python, post-training INT8 quantization, conversion to a C byte array, and integration into an ESP-IDF firmware project.\n\nReference models included: gesture recognition from IMU data (97% accuracy, 12 KB model), keyword spotting from audio (95% accuracy, 45 KB), and anomaly detection for vibration signals. A custom memory allocator was written to work within the 320 KB SRAM limit of the ESP32.",
        pt: "Framework e implementações de referência para implantar modelos ML treinados em microcontroladores ESP32 usando TensorFlow Lite Micro. O projeto cobre o pipeline completo: treinamento em Python, quantização INT8, conversão para array C e integração no firmware ESP-IDF.\n\nModelos de referência: reconhecimento de gestos via IMU (97% de acurácia, 12 KB), keyword spotting de áudio (95%, 45 KB) e detecção de anomalias em sinais de vibração. Um alocador de memória customizado foi escrito para operar dentro do limite de 320 KB SRAM.",
      },
      features: {
        en: [
          "Full pipeline: training → INT8 quant → ESP32 deploy",
          "Gesture recognition: 97% accuracy, 12 KB model",
          "Keyword spotting: 95% accuracy, 45 KB model",
          "Custom memory allocator for 320 KB SRAM constraint",
        ],
        pt: [
          "Pipeline completo: treino → quant INT8 → deploy ESP32",
          "Reconhecimento de gestos: 97% acurácia, modelo 12 KB",
          "Keyword spotting: 95% acurácia, modelo 45 KB",
          "Alocador de memória para restrição de 320 KB SRAM",
        ],
      },
      tags: ["ESP32", "TinyML", "TensorFlow Lite", "C/C++", "ESP-IDF", "Embedded AI"],
      media: [
        { type: "placeholder", category: "embedded" },
        { type: "placeholder", category: "ml" },
      ],
      link: "#",
      github: "#",
    },
    {
      id: 8,
      title: "Autonomous Drone Navigation & Control",
      category: "robotics",
      year: "2023",
      types: ["robotics", "embedded"],
      description: {
        en: "Development of autonomous navigation and control algorithms for drones, including waypoint navigation and stabilization systems.",
        pt: "Desenvolvimento de algoritmos de navegação e controle autônomo para drones, incluindo navegação por waypoints e sistemas de estabilização.",
      },
      details: {
        en: "Developed a custom flight stack for a quadrotor UAV, implementing attitude estimation, stabilization, and waypoint navigation from scratch. The attitude estimator uses a Mahony complementary filter fusing accelerometer, gyroscope and magnetometer data at 500 Hz.\n\nThe control architecture is a cascaded PID: inner rate loop at 500 Hz, outer attitude loop at 100 Hz, and position loop at 50 Hz. A waypoint sequencer parses mission files and feeds position setpoints. The stack runs on a STM32F7 and communicates with a Raspberry Pi 4 companion computer via UART for high-level mission management and MAVLink telemetry.",
        pt: "Desenvolvida uma flight stack customizada para um quadrotor UAV, implementando estimação de atitude, estabilização e navegação por waypoints do zero. O estimador de atitude usa um filtro complementar de Mahony fundindo acelerômetro, giroscópio e magnetômetro a 500 Hz.\n\nA arquitetura de controle é um PID cascateado: loop interno de rate a 500 Hz, loop de atitude a 100 Hz e loop de posição a 50 Hz. A stack roda em STM32F7 e se comunica com um Raspberry Pi 4 via UART para gerenciamento de missão e telemetria MAVLink.",
      },
      features: {
        en: [
          "Mahony complementary filter at 500 Hz",
          "Cascaded PID: rate (500 Hz) → attitude (100 Hz) → position (50 Hz)",
          "Waypoint sequencer with mission file parser",
          "MAVLink telemetry via Raspberry Pi 4 companion",
        ],
        pt: [
          "Filtro complementar Mahony a 500 Hz",
          "PID cascateado: rate (500 Hz) → atitude (100 Hz) → posição (50 Hz)",
          "Sequenciador de waypoints com parser de missão",
          "Telemetria MAVLink via Raspberry Pi 4 companion",
        ],
      },
      tags: ["Control Systems", "STM32", "C++", "MAVLink", "ROS2", "FreeRTOS"],
      media: [
        { type: "placeholder", category: "robotics" },
        { type: "placeholder", category: "embedded" },
      ],
      link: "#",
      github: "#",
    },
  ],

  competitions: [
    {
      title: "IEEE Latin American Robotics Competition",
      year: "2023",
      result: { en: "3rd Place", pt: "3º Lugar" },
      category: "robotics",
      description: {
        en: "Robotics competition with an autonomous navigation and object manipulation challenge.",
        pt: "Competição de robótica com desafio de navegação autônoma e manipulação de objetos.",
      },
    },
    {
      title: "Hackathon Aerospace UFSC",
      year: "2023",
      result: { en: "1st Place", pt: "1º Lugar" },
      category: "aerospace",
      description: {
        en: "48-hour challenge to design a telemetry system for nanosatellites.",
        pt: "Desafio de projeto de sistema de telemetria para nanossatélites em 48 horas.",
      },
    },
    {
      title: "ICMC Hackathon – ML Track",
      year: "2022",
      result: { en: "Finalist", pt: "Finalista" },
      category: "ml",
      description: {
        en: "Development of a predictive model for supply chain optimization.",
        pt: "Desenvolvimento de modelo preditivo para otimização de supply chain.",
      },
    },
  ],

  seminars: [
    {
      title: "Applied AI in Aerospace Systems",
      event: { en: "Brazilian Aerospace Symposium", pt: "Simpósio Brasileiro de Aeroespacial" },
      year: "2024", role: "speaker",
      description: {
        en: "Talk on integrating neural networks into safety-critical aerospace control systems.",
        pt: "Apresentação sobre integração de redes neurais em sistemas críticos de controle aeroespacial.",
      },
    },
    {
      title: "Edge AI and Embedded ML",
      event: { en: "Computer Science Week – UFSC", pt: "Semana da Computação – UFSC" },
      year: "2023", role: "speaker",
      description: {
        en: "Workshop on optimizing deep learning models for microcontrollers with TensorFlow Lite.",
        pt: "Workshop sobre otimização de modelos de deep learning para microcontroladores com TensorFlow Lite.",
      },
    },
    {
      title: "ROS2 for Industrial Robotics",
      event: { en: "Industrial Robotics Workshop", pt: "Workshop de Robótica Industrial" },
      year: "2023", role: "attendee",
      description: {
        en: "Advanced seminar on integrating ROS2 with legacy industrial systems.",
        pt: "Seminário avançado sobre integração de ROS2 com sistemas industriais legados.",
      },
    },
    {
      title: "Control Systems & Modern AI",
      event: { en: "Brazilian Congress on Automation", pt: "Congresso Brasileiro de Automática" },
      year: "2022", role: "attendee",
      description: {
        en: "Conference on the synergy between classical control theory and reinforcement learning.",
        pt: "Conferência sobre sinergia entre controle clássico e abordagens de aprendizado por reforço.",
      },
    },
  ],
};

// ─── Project image placeholder ────────────────────────────────────────────────
function ProjectPlaceholder({ category, size = 170 }) {
  const c = CAT_COLORS[category] || { accent: "#94a3b8", bg: "#111" };
  const icon = CAT_ICONS_JSX[category];
  return (
    <div style={{
      width: "100%", height: size,
      background: `linear-gradient(135deg, ${c.bg} 0%, #0d1117 100%)`,
      borderBottom: `1px solid ${c.accent}22`,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", flexShrink: 0,
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${c.accent}12 1px, transparent 1px), linear-gradient(90deg, ${c.accent}12 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
      <div style={{ position: "absolute", width: size * 0.7, height: size * 0.7, background: `radial-gradient(circle, ${c.accent}22 0%, transparent 70%)`, borderRadius: "50%" }} />
      <div style={{ position: "relative", color: c.accent, opacity: 0.85 }}>{icon}</div>
      <div style={{ position: "absolute", top: 0, left: 0, width: 40, height: 3, background: c.accent, borderRadius: "0 0 2px 0" }} />
    </div>
  );
}

// ─── Type icon badge ──────────────────────────────────────────────────────────
function TypeBadge({ type }) {
  const c = CAT_COLORS[type];
  if (!c) return null;
  const Icon = CAT_ICONS_FN[type];
  return (
    <div title={type} style={{ width: 28, height: 28, borderRadius: 6, background: `${c.accent}18`, border: `1px solid ${c.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: 16, height: 16, color: c.accent }}>
        {Icon && Icon(c.accent)}
      </div>
    </div>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
function Carousel({ media, category }) {
  const [idx, setIdx] = useState(0);
  const total = media.length;
  const c = CAT_COLORS[category] || CAT_COLORS.ml;

  useEffect(() => { setIdx(0); }, [media]);

  const prev = () => setIdx(i => (i - 1 + total) % total);
  const next = () => setIdx(i => (i + 1) % total);

  const item = media[idx];

  const renderItem = () => {
    if (!item) return null;
    if (item.type === "youtube") return (
      <iframe src={item.src} style={{ width: "100%", height: "100%", border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen />
    );
    if (item.type === "image" || item.type === "gif") return (
      <img src={item.src} alt="project media" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    );
    return <ProjectPlaceholder category={item.category || category} size={320} />;
  };

  return (
    <div style={{ position: "relative", width: "100%", height: 320, background: "#060810", borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
      {renderItem()}

      {total > 1 && <>
        <button onClick={prev} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", border: `1px solid ${c.accent}44`, background: "rgba(8,11,18,0.85)", color: c.accent, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, backdropFilter: "blur(4px)", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = `${c.accent}22`}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(8,11,18,0.85)"}
        >‹</button>
        <button onClick={next} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", border: `1px solid ${c.accent}44`, background: "rgba(8,11,18,0.85)", color: c.accent, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, backdropFilter: "blur(4px)", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = `${c.accent}22`}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(8,11,18,0.85)"}
        >›</button>

        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
          {media.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", padding: 0, background: i === idx ? c.accent : `${c.accent}44`, transition: "all 0.25s" }} />
          ))}
        </div>

        <div style={{ position: "absolute", top: 10, right: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#94a3b8", background: "rgba(8,11,18,0.75)", backdropFilter: "blur(4px)", padding: "2px 8px", borderRadius: 4 }}>
          {idx + 1} / {total}
        </div>
      </>}
    </div>
  );
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const lang = useLang();
  const t = T[lang];
  const mt = t.modal;
  const c = CAT_COLORS[project.category] || CAT_COLORS.ml;

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <>
      {/* backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(4,6,12,0.85)", backdropFilter: "blur(8px)" }} />

      {/* panel */}
      <div style={{ position: "fixed", inset: 0, zIndex: 201, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", pointerEvents: "none" }}>
        <div style={{
          pointerEvents: "all", width: "100%", maxWidth: 760, maxHeight: "90vh",
          background: "#0d1117", border: `1px solid ${c.accent}33`, borderRadius: 14,
          overflow: "hidden", display: "flex", flexDirection: "column",
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${c.accent}22`,
          animation: "modalIn 0.22s ease",
        }}>
          {/* header */}
          <div style={{ padding: "1.2rem 1.5rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {(project.types || [project.category]).map((tp, i) => <TypeBadge key={i} type={tp} />)}
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: c.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginLeft: 4 }}>{project.year}</span>
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.1rem,3vw,1.5rem)", color: "#f1f5f9", margin: 0, lineHeight: 1.2 }}>{project.title}</h2>
            </div>
            <button onClick={onClose} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 34, height: 34, cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#ef444444"; e.currentTarget.style.color = "#ef4444"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#94a3b8"; }}
            >×</button>
          </div>

          {/* scrollable body */}
          <div style={{ overflowY: "auto", flex: 1, padding: "1.5rem" }}>
            <Carousel media={project.media || [{ type: "placeholder", category: project.category }]} category={project.category} />

            {/* overview */}
            <div style={{ marginTop: "1.5rem" }}>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: c.accent, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 0.6rem" }}>{mt.overview}</p>
              {(project.details?.[lang] || project.description[lang]).split("\n\n").map((para, i) => (
                <p key={i} style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.75, margin: "0 0 0.9rem" }}>{para}</p>
              ))}
            </div>

            {/* key features */}
            {project.features && (
              <div style={{ marginTop: "0.5rem" }}>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: c.accent, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 0.8rem" }}>{mt.keyFeatures}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {project.features[lang].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, background: `${c.accent}0a`, border: `1px solid ${c.accent}22`, borderRadius: 6, padding: "0.6rem 0.8rem" }}>
                      <span style={{ color: c.accent, fontSize: 12, marginTop: 1, flexShrink: 0 }}>▸</span>
                      <span style={{ color: "#cbd5e1", fontSize: "0.82rem", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* tech stack */}
            <div style={{ marginTop: "1.2rem" }}>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: c.accent, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 0.6rem" }}>{mt.techStack}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {project.tags.map((tag, i) => (
                  <span key={i} style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: c.accent, background: `${c.accent}12`, border: `1px solid ${c.accent}33`, borderRadius: 5, padding: "4px 10px" }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* footer */}
          <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "0.75rem", flexWrap: "wrap", flexShrink: 0 }}>
            {project.link && project.link !== "#" && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ padding: "9px 22px", background: c.accent, color: "#080b12", borderRadius: 6, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.05em" }}>{mt.liveDemo}</a>
            )}
            {project.github && project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ padding: "9px 22px", background: "transparent", color: "#94a3b8", borderRadius: 6, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, border: "1px solid rgba(148,163,184,0.2)", letterSpacing: "0.05em" }}>{mt.viewCode}</a>
            )}
            <button onClick={onClose} style={{ marginLeft: "auto", padding: "9px 18px", background: "transparent", color: "#475569", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.04em" }}>{mt.close}</button>
          </div>
        </div>
      </div>

      <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.96) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
    </>
  );
}

// ─── Small reusable pieces ────────────────────────────────────────────────────
function Tag({ text, category }) {
  const c = CAT_COLORS[category] || { accent: "#94a3b8" };
  return (
    <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: c.accent, border: `1px solid ${c.accent}33`, borderRadius: 4, padding: "2px 8px", background: `${c.accent}11`, letterSpacing: "0.03em" }}>{text}</span>
  );
}

function CategoryBadge({ category }) {
  const lang = useLang();
  const c = CAT_COLORS[category];
  if (!c) return null;
  const found = T[lang].categories.find(x => x.id === category);
  return (
    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: c.accent, border: `1px solid ${c.accent}55`, borderRadius: 3, padding: "2px 7px", background: `${c.accent}15` }}>{found ? found.label : category}</span>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <button onClick={() => setLang(l => l === "en" ? "pt" : "en")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "4px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "border-color 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(56,189,248,0.45)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"}
    >
      <span style={{ fontSize: 14, lineHeight: 1 }}>{lang === "en" ? "🇧🇷" : "🇺🇸"}</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#64748b", letterSpacing: "0.06em" }}>{lang === "en" ? "PT" : "EN"}</span>
    </button>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({ active, setActive, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { id: "about", label: t.nav.about },
    { id: "education", label: t.nav.education },
    { id: "projects", label: t.nav.projects },
    { id: "competitions", label: t.nav.competitions },
    { id: "seminars", label: t.nav.seminars },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 max(1.5rem, 4vw)", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(8,11,18,0.93)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent", transition: "all 0.3s ease" }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#38bdf8", fontSize: 14, letterSpacing: "0.05em" }}>
        <span style={{ color: "#6b7280" }}>{"<"}</span>luiz<span style={{ color: "#a78bfa" }}>.</span>dev<span style={{ color: "#6b7280" }}>{"/>"}</span>
      </span>
      <div style={{ display: "flex", gap: "1.4rem", alignItems: "center" }}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setActive(l.id)} style={{ color: active === l.id ? "#38bdf8" : "#64748b", textDecoration: "none", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em", transition: "color 0.2s", borderBottom: active === l.id ? "1px solid #38bdf8" : "1px solid transparent", paddingBottom: 2 }}>{l.label}</a>
        ))}
        <LangToggle lang={lang} setLang={setLang} />
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const lang = useLang();
  const t = T[lang];
  const [typed, setTyped] = useState("");
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    phraseIdx.current = 0;
    charIdx.current = 0;
    setTyped("");

    function forward() {
      const phrase = T[lang].typewriter[phraseIdx.current];
      if (charIdx.current < phrase.length) {
        charIdx.current++;
        setTyped(phrase.slice(0, charIdx.current));
        timer.current = setTimeout(forward, 80);
      } else {
        timer.current = setTimeout(backward, 1400);
      }
    }
    function backward() {
      const phrase = T[lang].typewriter[phraseIdx.current];
      if (charIdx.current > 0) {
        charIdx.current--;
        setTyped(phrase.slice(0, charIdx.current));
        timer.current = setTimeout(backward, 45);
      } else {
        phraseIdx.current = (phraseIdx.current + 1) % T[lang].typewriter.length;
        timer.current = setTimeout(forward, 200);
      }
    }
    timer.current = setTimeout(forward, 300);
    return () => clearTimeout(timer.current);
  }, [lang]);

  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 max(2rem, 8vw)", paddingTop: 80, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "linear-gradient(rgba(56,189,248,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)" }} />
      <div style={{ position: "absolute", top: "20%", left: "60%", width: 400, height: 400, background: "radial-gradient(circle,rgba(56,189,248,0.08) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "10%", width: 300, height: 300, background: "radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 780 }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#38bdf8", fontSize: 13, letterSpacing: "0.15em", marginBottom: "1.2rem" }}>{t.hero.greeting}</p>
        <h1 style={{ fontSize: "clamp(3rem,8vw,6rem)", fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.05, margin: "0 0 0.5rem", letterSpacing: "-0.03em" }}>
          Luiz<br /><span style={{ color: "#38bdf8" }}>Coppini</span>
        </h1>
        <div style={{ height: 44, display: "flex", alignItems: "center", gap: 10, marginBottom: "1.8rem" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(1rem,2.5vw,1.4rem)", color: "#94a3b8" }}>~$</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(1rem,2.5vw,1.4rem)", color: "#e2e8f0" }}>
            {typed}<span style={{ animation: "blink 1s step-end infinite", color: "#38bdf8" }}>|</span>
          </span>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "clamp(0.9rem,1.5vw,1.05rem)", lineHeight: 1.75, maxWidth: 560, marginBottom: "2.5rem" }}>{t.hero.bio}</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="#projects" style={{ padding: "12px 28px", background: "#38bdf8", color: "#080b12", borderRadius: 6, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em" }}>{t.hero.cta}</a>
          <a href={DATA.resume} target="_blank" rel="noopener noreferrer" style={{ padding: "12px 28px", background: "transparent", color: "#94a3b8", borderRadius: 6, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, letterSpacing: "0.05em", border: "1px solid rgba(148,163,184,0.25)" }}>{t.hero.resume}</a>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "3rem" }}>
          {DATA.skills.map((s, i) => <Tag key={i} text={s.label} category={s.category} />)}
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ label, title }) {
  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", color: "#38bdf8", fontSize: 12, letterSpacing: "0.15em", margin: "0 0 0.5rem" }}>{label}</p>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#f1f5f9", margin: 0, letterSpacing: "-0.02em" }}>{title}</h2>
      <div style={{ width: 40, height: 3, background: "#38bdf8", borderRadius: 2, marginTop: 14 }} />
    </div>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
function EducationSection() {
  const lang = useLang();
  const t = T[lang];
  const et = t.education;

  return (
    <section id="education" style={{ padding: "5rem max(2rem,6vw)" }}>
      <SectionHeader label={t.sections.education.label} title={t.sections.education.title} />
      <div style={{ marginTop: "2.5rem", position: "relative" }}>
        <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #38bdf855, #a78bfa33, transparent)", borderRadius: 2 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {DATA.education.map((edu, i) => {
            const c = CAT_COLORS[edu.color] || CAT_COLORS.aerospace;
            const isOngoing = edu.status === "ongoing";
            return (
              <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${c.accent}18`, border: `2px solid ${c.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: `0 0 16px ${c.accent}22` }}>{edu.icon}</div>
                  {isOngoing && <div style={{ position: "absolute", bottom: -2, right: -2, width: 12, height: 12, borderRadius: "50%", background: "#34d399", border: "2px solid #080b12", animation: "pulse 2s ease-in-out infinite" }} />}
                </div>
                <div style={{ flex: 1, background: "#0d1117", border: `1px solid rgba(255,255,255,0.07)`, borderLeft: `3px solid ${c.accent}`, borderRadius: "0 10px 10px 0", padding: "1.4rem 1.6rem", transition: "border-color 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.accent}66`; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderLeftColor = c.accent; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.6rem" }}>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "#f1f5f9", margin: 0, lineHeight: 1.3 }}>{edu.degree[lang]}</h3>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: isOngoing ? "#34d399" : "#64748b", border: `1px solid ${isOngoing ? "#34d39944" : "#33415544"}`, borderRadius: 4, padding: "2px 8px", background: isOngoing ? "#34d39911" : "#33415511", letterSpacing: "0.06em", textTransform: "uppercase" }}>{isOngoing ? et.ongoing : et.completed}</span>
                  </div>
                  <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: c.accent, margin: "0 0 0.8rem", letterSpacing: "0.03em" }}>
                    {edu.institution}<span style={{ color: "#334155", margin: "0 0.5rem" }}>·</span><span style={{ color: "#475569" }}>{edu.period}</span>
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#94a3b8", margin: "0 0 0.8rem", lineHeight: 1.5 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 6 }}>{et.focus}:</span>
                    {edu.focus[lang]}
                  </p>
                  {edu.thesis && (
                    <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 0.8rem", lineHeight: 1.55, fontStyle: "italic" }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 6, fontStyle: "normal" }}>{et.thesis}:</span>
                      "{edu.thesis[lang]}"
                    </p>
                  )}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {edu.highlights[lang].map((h, j) => (
                      <span key={j} style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "#475569", background: "#161b22", border: "1px solid #21262d", borderRadius: 4, padding: "2px 8px" }}>{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.2)}}`}</style>
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onClick }) {
  const lang = useLang();
  const c = CAT_COLORS[project.category] || { accent: "#94a3b8" };

  return (
    <div onClick={onClick} style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", transition: "all 0.25s ease", cursor: "pointer" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.accent}55`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${c.accent}14`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* thumbnail */}
      <div style={{ position: "relative" }}>
        <ProjectPlaceholder category={project.category} size={170} />
        {/* type icon badges */}
        <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 4 }}>
          {(project.types || [project.category]).map((tp, i) => <TypeBadge key={i} type={tp} />)}
        </div>
        {/* click hint overlay */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s", background: `${c.accent}08` }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0}
        >
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: c.accent, background: "rgba(8,11,18,0.8)", padding: "6px 14px", borderRadius: 6, border: `1px solid ${c.accent}44`, backdropFilter: "blur(4px)" }}>
            {lang === "en" ? "click to expand" : "clique para expandir"}
          </span>
        </div>
      </div>

      {/* content */}
      <div style={{ padding: "1.1rem 1.3rem", display: "flex", flexDirection: "column", gap: "0.65rem", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <CategoryBadge category={project.category} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#475569" }}>{project.year}</span>
        </div>
        <h3 style={{ color: "#e2e8f0", margin: 0, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", lineHeight: 1.3 }}>{project.title}</h3>
        <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0, lineHeight: 1.65, flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {project.description[lang]}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.tags.slice(0, 4).map((tag, i) => (
            <span key={i} style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#475569", background: "#161b22", border: "1px solid #21262d", borderRadius: 4, padding: "2px 7px" }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
function ProjectsSection() {
  const lang = useLang();
  const t = T[lang];
  const [filter, setFilter] = useState("all");
  const [openProject, setOpenProject] = useState(null);

  const filtered = filter === "all" ? DATA.projects : DATA.projects.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ padding: "6rem max(2rem,6vw)", background: "rgba(255,255,255,0.015)" }}>
      <SectionHeader label={t.sections.projects.label} title={t.sections.projects.title} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "2rem 0 2.5rem" }}>
        {t.categories.map(cat => {
          const color = CAT_COLORS[cat.id];
          const isActive = filter === cat.id;
          return (
            <button key={cat.id} onClick={() => setFilter(cat.id)} style={{ padding: "7px 16px", borderRadius: 6, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.04em", transition: "all 0.2s", border: isActive ? `1px solid ${color ? color.accent : "#38bdf8"}` : "1px solid rgba(255,255,255,0.1)", background: isActive ? (color ? `${color.accent}18` : "rgba(56,189,248,0.12)") : "transparent", color: isActive ? (color ? color.accent : "#38bdf8") : "#64748b" }}>{cat.label}</button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.2rem" }}>
        {filtered.map(p => <ProjectCard key={p.id} project={p} onClick={() => setOpenProject(p)} />)}
      </div>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </section>
  );
}

// ─── Competitions ─────────────────────────────────────────────────────────────
function CompetitionsSection() {
  const lang = useLang();
  const t = T[lang];
  return (
    <section id="competitions" style={{ padding: "5rem max(2rem,6vw)" }}>
      <SectionHeader label={t.sections.competitions.label} title={t.sections.competitions.title} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.2rem", marginTop: "2.5rem" }}>
        {DATA.competitions.map((comp, i) => {
          const color = CAT_COLORS[comp.category] || { accent: "#94a3b8" };
          const result = comp.result[lang];
          const medal = result.includes("1") || result.toLowerCase().includes("1st") ? "🥇"
            : result.includes("2") || result.toLowerCase().includes("2nd") ? "🥈"
            : result.includes("3") || result.toLowerCase().includes("3rd") ? "🥉" : "🏅";
          return (
            <div key={i} style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "1.5rem", borderLeft: `3px solid ${color.accent}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <CategoryBadge category={comp.category} />
                <span style={{ fontSize: 18 }}>{medal}</span>
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#e2e8f0", margin: "0 0 0.4rem" }}>{comp.title}</h3>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: color.accent, margin: "0 0 0.6rem", letterSpacing: "0.05em" }}>{result} · {comp.year}</p>
              <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0, lineHeight: 1.6 }}>{comp.description[lang]}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Seminars ─────────────────────────────────────────────────────────────────
function SeminarsSection() {
  const lang = useLang();
  const t = T[lang];
  return (
    <section id="seminars" style={{ padding: "5rem max(2rem,6vw)", background: "rgba(255,255,255,0.015)" }}>
      <SectionHeader label={t.sections.seminars.label} title={t.sections.seminars.title} />
      <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        {DATA.seminars.map((s, i) => {
          const isSpeaker = s.role === "speaker";
          return (
            <div key={i} style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "1.5rem 2rem", display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "start", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(56,189,248,0.25)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
            >
              <div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#e2e8f0", margin: "0 0 0.3rem" }}>{s.title}</h3>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#38bdf8", margin: "0 0 0.6rem", letterSpacing: "0.04em" }}>{s.event[lang]}</p>
                <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0, lineHeight: 1.65 }}>{s.description[lang]}</p>
              </div>
              <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#475569", margin: "0 0 6px" }}>{s.year}</p>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: isSpeaker ? "#34d399" : "#94a3b8", border: `1px solid ${isSpeaker ? "#34d39944" : "#94a3b844"}`, borderRadius: 4, padding: "2px 8px", background: isSpeaker ? "#34d39911" : "#94a3b811" }}>{isSpeaker ? t.speaker : t.attendee}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const lang = useLang();
  const t = T[lang];
  return (
    <section id="contact" style={{ padding: "5rem max(2rem,6vw) 6rem" }}>
      <SectionHeader label={t.sections.contact.label} title={t.sections.contact.title} />
      <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: 1.75, maxWidth: 500, margin: "1.5rem 0 3rem" }}>{t.contact.body}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <a href={`mailto:${DATA.email}`} style={{ padding: "14px 32px", background: "#38bdf8", color: "#080b12", borderRadius: 6, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em" }}>{t.contact.email}</a>
        <a href={DATA.linkedin} target="_blank" rel="noopener noreferrer" style={{ padding: "14px 28px", background: "transparent", color: "#94a3b8", borderRadius: 6, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, border: "1px solid rgba(148,163,184,0.2)", letterSpacing: "0.05em" }}>LinkedIn</a>
        <a href={DATA.github} target="_blank" rel="noopener noreferrer" style={{ padding: "14px 28px", background: "transparent", color: "#94a3b8", borderRadius: 6, textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, border: "1px solid rgba(148,163,184,0.2)", letterSpacing: "0.05em" }}>GitHub</a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const lang = useLang();
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem max(2rem,6vw)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#334155", fontSize: 12 }}>© {new Date().getFullYear()} Luiz Coppini — built with React</span>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#334155", fontSize: 12 }}>🤖 {T[lang].footer}</span>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const ids = ["about", "education", "projects", "competitions", "seminars", "contact"];
    const obs = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, []);

  return (
    <LangContext.Provider value={lang}>
      <div style={{ background: "#080b12", minHeight: "100vh", color: "#f1f5f9" }}>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <NavBar active={activeSection} setActive={setActiveSection} lang={lang} setLang={setLang} />
        <HeroSection />
        <EducationSection />
        <ProjectsSection />
        <CompetitionsSection />
        <SeminarsSection />
        <ContactSection />
        <Footer />
      </div>
    </LangContext.Provider>
  );
}