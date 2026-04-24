import { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";

// ─── Language Context ────────────────────────────────────────────────────────
const LangContext = createContext("en");
const useLang = () => useContext(LangContext);

// ─── Translations ────────────────────────────────────────────────────────────
const T = {
  en: {
    nav: { about:"About", education:"Education", projects:"Projects", competitions:"Competitions", seminars:"Seminars", contact:"Contact" },
    hero: {
      greeting: "// Hello, world. I'm",
      bio: "Graduated in Computer Science (UNOESC), pursuing Aerospace Engineering and a Master's in Electronic Systems Engineering with focus on Applied AI at UFSC. 4+ years as a fullstack developer, now focused on machine learning, control systems and embedded systems.",
      cta: "View Projects →", resume: "Download CV",
    },
    typewriter: ["ML Engineer", "Roboticist", "Embedded Systems", "Aerospace Enthusiast"],
    sections: {
      education:    { label: "// education",    title: "Academic Background" },
      projects:     { label: "// projects",     title: "What I've Built" },
      competitions: { label: "// competitions", title: "Challenges & Awards" },
      seminars:     { label: "// seminars",     title: "Events & Talks" },
      contact:      { label: "// contact",      title: "Let's Talk" },
    },
    categories: [
      { id:"all", label:"All" }, { id:"ml", label:"Machine Learning" }, { id:"robotics", label:"Robotics" },
      { id:"aerospace", label:"Aerospace" }, { id:"embedded", label:"Embedded" }, { id:"mobile", label:"Mobile" }, { id:"fullstack", label:"Fullstack" },
    ],
    contact: { body:"Open to opportunities in ML, robotics and embedded systems. If you have an interesting project or just want to exchange ideas, send me a message.", email:"Send Email" },
    education: { ongoing:"Ongoing", completed:"Completed", expected:"Expected", thesis:"Thesis", focus:"Focus" },
    modal: { close:"Close", prev:"Previous", next:"Next", viewCode:"View Code", liveDemo:"Live Demo", techStack:"Tech Stack", overview:"Overview", keyFeatures:"Key Features" },
    footer: "// always learning", speaker:"Speaker", attendee:"Attendee", viewProject:"view project →",
  },
  pt: {
    nav: { about:"Sobre", education:"Formação", projects:"Projetos", competitions:"Competições", seminars:"Seminários", contact:"Contato" },
    hero: {
      greeting: "// Olá, mundo. Eu sou",
      bio: "Graduado em Ciência da Computação (UNOESC), cursando Engenharia Aeroespacial e Mestrado em Engenharia Eletrônica com foco em IA Aplicada na UFSC. Mais de 4 anos como desenvolvedor fullstack, agora focado em ML, controle e sistemas embarcados.",
      cta: "Ver Projetos →", resume: "Baixar CV",
    },
    typewriter: ["Engenheiro de ML", "Roboticista", "Sistemas Embarcados", "Entusiasta Aeroespacial"],
    sections: {
      education:    { label: "// formação",     title: "Trajetória Acadêmica" },
      projects:     { label: "// projetos",     title: "O que construí" },
      competitions: { label: "// competições",  title: "Desafios & Conquistas" },
      seminars:     { label: "// seminários",   title: "Eventos & Palestras" },
      contact:      { label: "// contato",      title: "Vamos conversar" },
    },
    categories: [
      { id:"all", label:"Todos" }, { id:"ml", label:"Machine Learning" }, { id:"robotics", label:"Robótica" },
      { id:"aerospace", label:"Aeroespacial" }, { id:"embedded", label:"Embarcados" }, { id:"mobile", label:"Mobile" }, { id:"fullstack", label:"Fullstack" },
    ],
    contact: { body:"Aberto a oportunidades em ML, robótica e sistemas embarcados. Se você tem um projeto interessante ou quer trocar ideias, me manda uma mensagem.", email:"Enviar E-mail" },
    education: { ongoing:"Em andamento", completed:"Concluído", expected:"Previsão", thesis:"Dissertação", focus:"Foco" },
    modal: { close:"Fechar", prev:"Anterior", next:"Próximo", viewCode:"Ver Código", liveDemo:"Demo ao Vivo", techStack:"Tecnologias", overview:"Visão Geral", keyFeatures:"Destaques" },
    footer: "// sempre aprendendo", speaker:"Apresentador", attendee:"Participante", viewProject:"ver projeto →",
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
const CAT_ICONS = {
  robotics: (c) => (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="18" width="20" height="18" rx="3"/>
      <circle cx="19" cy="26" r="2"/><circle cx="29" cy="26" r="2"/>
      <path d="M19 34v4M29 34v4M24 18v-5M20 13h8M14 24H8M34 24h6"/>
    </svg>
  ),
  aerospace: (c) => (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 6 C24 6 30 16 34 26 L24 22 L14 26 C18 16 24 6 24 6Z"/>
      <path d="M14 26 L10 38 L24 32 L38 38 L34 26"/>
      <circle cx="24" cy="22" r="2.5"/>
    </svg>
  ),
  ml: (c) => (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="24" r="3"/><circle cx="36" cy="24" r="3"/>
      <circle cx="24" cy="12" r="3"/><circle cx="24" cy="36" r="3"/>
      <circle cx="24" cy="24" r="4"/>
      <line x1="15" y1="24" x2="20" y2="24"/><line x1="28" y1="24" x2="33" y2="24"/>
      <line x1="24" y1="15" x2="24" y2="20"/><line x1="24" y1="28" x2="24" y2="33"/>
      <line x1="16.5" y1="16.5" x2="20.5" y2="20.5"/><line x1="27.5" y1="27.5" x2="31.5" y2="31.5"/>
      <line x1="31.5" y1="16.5" x2="27.5" y2="20.5"/><line x1="20.5" y1="27.5" x2="16.5" y2="31.5"/>
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
      <rect x="15" y="5" width="18" height="38" rx="3"/>
      <path d="M21 38h6M22 9h4"/>
    </svg>
  ),
  fullstack: (c) => (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="8" width="38" height="32" rx="2"/>
      <path d="M5 15h38"/>
      <path d="M17 26l-4 4 4 4M31 26l4 4-4 4M22 36l4-14"/>
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Luiz Coppini", email: "luizcoppini@email.com",
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

  education: [
    {
      degree:      { en: "M.Sc. in Electronic Systems Engineering", pt: "Mestrado em Engenharia de Sistemas Eletrônicos" },
      institution: "UFSC — Universidade Federal de Santa Catarina",
      period: "2023 – 2025", status: "ongoing", icon: "🎓", color: "aerospace",
      focus:       { en: "Applied Artificial Intelligence & Control Systems", pt: "Inteligência Artificial Aplicada & Sistemas de Controle" },
      thesis:      { en: "Neural network-based attitude control for CubeSat nanosatellites", pt: "Controle de atitude baseado em redes neurais para nanossatélites CubeSat" },
      highlights:  { en: ["Deep Learning for control systems", "Embedded ML on ARM Cortex-M", "Kalman filtering & sensor fusion"], pt: ["Deep Learning para controle", "ML embarcado em ARM Cortex-M", "Filtro de Kalman & fusão de sensores"] },
    },
    {
      degree:      { en: "B.Sc. in Aerospace Engineering", pt: "Bacharelado em Engenharia Aeroespacial" },
      institution: "UFSC — Universidade Federal de Santa Catarina",
      period: "2022 – 2027", status: "ongoing", icon: "🚀", color: "aerospace",
      focus:       { en: "Flight Dynamics, Propulsion & Avionics", pt: "Dinâmica de Voo, Propulsão & Aviônica" },
      highlights:  { en: ["Flight mechanics & aerodynamics", "Avionics & embedded systems", "Structural analysis"], pt: ["Mecânica de voo & aerodinâmica", "Aviônica & sistemas embarcados", "Análise estrutural"] },
    },
    {
      degree:      { en: "B.Sc. in Computer Science", pt: "Bacharelado em Ciência da Computação" },
      institution: "UNOESC — Universidade do Oeste de Santa Catarina",
      period: "2019 – 2023", status: "completed", icon: "💻", color: "fullstack",
      focus:       { en: "Software Engineering & Distributed Systems", pt: "Engenharia de Software & Sistemas Distribuídos" },
      highlights:  { en: ["Algorithms & data structures", "Fullstack web development", "Database design & optimization"], pt: ["Algoritmos & estruturas de dados", "Desenvolvimento web fullstack", "Modelagem e otimização de banco de dados"] },
    },
  ],

  // ── Projects — add `media` array and `details` for the modal ─────────────
  projects: [
    {
      id: 1, title: "Autonomous Navigation Robot",
      category: "robotics", year: "2024",
      types: ["robotics", "ml"],
      description: {
        en: "Autonomous robot with SLAM and trajectory planning using ROS2 and depth camera. Navigation in dynamic environments with sensor fusion.",
        pt: "Robô autônomo com SLAM e planejamento de trajetória usando ROS2 e câmera de profundidade. Navegação em ambientes dinâmicos com fusão de sensores.",
      },
      details: {
        en: "This project implements a fully autonomous mobile robot capable of building a map of unknown environments in real-time while simultaneously localising itself within that map (SLAM). A depth camera provides rich 3-D point clouds that are fused with IMU and wheel-odometry data through an Extended Kalman Filter, achieving cm-level positioning accuracy indoors.\n\nThe ROS2 navigation stack (Nav2) drives trajectory planning with a hybrid A* + DWA controller, enabling smooth obstacle avoidance at up to 1.5 m/s. A custom lifecycle manager ensures graceful recovery behaviours when the robot gets stuck or loses sensor data.",
        pt: "Este projeto implementa um robô móvel completamente autônomo capaz de construir um mapa de ambientes desconhecidos em tempo real enquanto se localiza simultaneamente nesse mapa (SLAM). Uma câmera de profundidade fornece nuvens de pontos 3D ricas que são fundidas com dados de IMU e odometria de rodas por meio de um Filtro de Kalman Estendido, alcançando precisão de posicionamento em centímetros em ambientes internos.\n\nA pilha de navegação ROS2 (Nav2) impulsiona o planejamento de trajetória com um controlador A* híbrido + DWA, permitindo desvio suave de obstáculos a até 1,5 m/s.",
      },
      features: {
        en: ["Real-time SLAM with <5 cm drift over 50 m", "Sensor fusion: depth cam + IMU + odometry", "Dynamic obstacle avoidance at 10 Hz", "Custom recovery behaviours via ROS2 lifecycle"],
        pt: ["SLAM em tempo real com <5 cm de desvio em 50 m", "Fusão de sensores: câmera depth + IMU + odometria", "Desvio de obstáculos dinâmicos a 10 Hz", "Comportamentos de recuperação via ROS2 lifecycle"],
      },
      tags: ["ROS2", "Python", "SLAM", "Sensor Fusion"],
      // media: list of { type: "image"|"youtube"|"gif", src: "url" }
      media: [
        { type: "placeholder", category: "robotics" },
        { type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { type: "placeholder", category: "robotics" },
      ],
      link: "#", github: "#",
    },
    {
      id: 2, title: "Attitude Control System – CubeSat",
      category: "aerospace", year: "2024",
      types: ["aerospace", "embedded"],
      description: {
        en: "Attitude control system for a 1U CubeSat nanosatellite. PID controller with Kalman filter estimation and magnetic actuators.",
        pt: "Sistema de controle de atitude para nanossatélite CubeSat 1U. Controlador PID com estimação via filtro de Kalman e atuadores magnéticos.",
      },
      details: {
        en: "Designed and implemented the complete Attitude Determination and Control System (ADCS) for a 1U CubeSat. The system uses a Magnetometer + Sun Sensor fusion pipeline to determine attitude with <1° accuracy. A discrete PID controller drives three orthogonal magnetorquers to detumble the satellite and maintain nadir-pointing orientation.\n\nAll flight software runs on a bare-metal STM32F4 in a fixed 10 Hz control loop with hard real-time guarantees. A Hardware-in-the-Loop (HIL) testbench using MATLAB/Simulink validated the system before integration.",
        pt: "Projetado e implementado o Sistema Completo de Determinação e Controle de Atitude (ADCS) para um CubeSat 1U. O sistema usa um pipeline de fusão Magnetômetro + Sensor Solar para determinar a atitude com precisão <1°. Um controlador PID discreto aciona três magnetorques ortogonais para desgirar o satélite e manter orientação nadir.",
      },
      features: {
        en: ["<1° attitude accuracy with mag+sun fusion", "Discrete PID at 10 Hz, bare-metal STM32F4", "HIL testbench in MATLAB/Simulink", "Autonomous detumbling from any initial condition"],
        pt: ["<1° de precisão de atitude com fusão mag+sol", "PID discreto a 10 Hz, bare-metal STM32F4", "Testbench HIL em MATLAB/Simulink", "Desgiramento autônomo de qualquer condição inicial"],
      },
      tags: ["C", "Kalman Filter", "PID", "Embedded", "STM32"],
      media: [
        { type: "placeholder", category: "aerospace" },
        { type: "placeholder", category: "embedded" },
      ],
      link: "#", github: "#",
    },
    {
      id: 3, title: "Crop Disease Detection",
      category: "ml", year: "2023",
      types: ["ml", "aerospace"],
      description: {
        en: "Convolutional neural network for crop disease detection from drone imagery. 94% accuracy with a lightweight model for edge deployment.",
        pt: "Rede neural convolucional para detecção de doenças em plantações via imagens de drone. Acurácia de 94% com modelo leve para edge deployment.",
      },
      details: {
        en: "Trained a MobileNetV3-Small model on a custom dataset of 12,000 annotated aerial images captured by a DJI Mavic drone across 4 crop types (soybean, corn, wheat, cotton) and 8 disease classes. Data augmentation (random crop, colour jitter, mosaic) boosted generalisation significantly.\n\nThe model was quantised to INT8 using TensorFlow Lite and deployed on a Raspberry Pi 4 co-processor aboard the drone, enabling real-time inference at 12 fps without ground connectivity. A REST API streams detected bounding boxes to a web dashboard for agronomist review.",
        pt: "Treinado um modelo MobileNetV3-Small em um conjunto de dados personalizado de 12.000 imagens aéreas anotadas capturadas por um drone DJI Mavic em 4 tipos de culturas e 8 classes de doenças. A aumentação de dados melhorou significativamente a generalização.\n\nO modelo foi quantizado para INT8 usando TensorFlow Lite e implantado em um Raspberry Pi 4 a bordo do drone, permitindo inferência em tempo real a 12 fps sem conectividade.",
      },
      features: {
        en: ["94% top-1 accuracy on held-out test set", "INT8 quantisation — 4× smaller, 3× faster", "12 fps real-time inference on Raspberry Pi 4", "REST API + web dashboard for agronomists"],
        pt: ["94% de acurácia no conjunto de teste", "Quantização INT8 — 4× menor, 3× mais rápido", "12 fps de inferência em Raspberry Pi 4", "API REST + dashboard web para agrônomos"],
      },
      tags: ["PyTorch", "CNN", "Edge AI", "Computer Vision", "TFLite"],
      media: [
        { type: "placeholder", category: "ml" },
        { type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      ],
      link: "#", github: "#",
    },
    {
      id: 4, title: "Industrial IoT Gateway",
      category: "embedded", year: "2023",
      types: ["embedded", "fullstack"],
      description: {
        en: "Embedded gateway for industrial data collection and transmission. STM32 with FreeRTOS, MQTT protocol and real-time dashboard.",
        pt: "Gateway embarcado para coleta e transmissão de dados industriais. STM32 com FreeRTOS, protocolo MQTT e dashboard em tempo real.",
      },
      details: {
        en: "Built a production-grade IoT gateway using STM32H7 running FreeRTOS. The firmware samples up to 16 analog/digital sensor channels at 1 kHz, applies digital filtering (Butterworth 4th order), and buffers readings in a lock-free ring buffer before publishing to an MQTT broker over Ethernet (LwIP stack).\n\nA React + Node.js web dashboard displays live time-series charts, sends control commands, and triggers OTA firmware updates. The gateway has been deployed in 3 industrial plants monitoring temperature, vibration and pressure.",
        pt: "Gateway IoT de nível de produção usando STM32H7 com FreeRTOS. O firmware amostra até 16 canais de sensores a 1 kHz, aplica filtragem digital e publica no broker MQTT via Ethernet. Um dashboard web React + Node.js exibe gráficos em tempo real e envia comandos de controle.",
      },
      features: {
        en: ["16-ch sampling at 1 kHz with Butterworth filtering", "Lock-free ring buffer — zero data loss", "OTA firmware update over MQTT", "Deployed in 3 industrial plants"],
        pt: ["16 canais a 1 kHz com filtragem Butterworth", "Ring buffer lock-free — zero perda de dados", "Atualização OTA via MQTT", "Implantado em 3 plantas industriais"],
      },
      tags: ["STM32", "FreeRTOS", "MQTT", "IoT", "LwIP"],
      media: [
        { type: "placeholder", category: "embedded" },
        { type: "placeholder", category: "fullstack" },
      ],
      link: "#", github: "#",
    },
    {
      id: 5, title: "BI Platform for Retail",
      category: "fullstack", year: "2022",
      types: ["fullstack", "ml"],
      description: {
        en: "Business Intelligence platform for supermarket chains. Interactive dashboards, ETL pipelines and automated reports.",
        pt: "Plataforma de Business Intelligence para redes de supermercados. Dashboards interativos, ETL pipelines e relatórios automatizados.",
      },
      details: {
        en: "End-to-end BI platform serving 6 supermarket chains across Brazil. The ETL pipeline ingests daily sales, inventory and supplier data from heterogeneous ERP systems, transforms it with dbt, and loads into a PostgreSQL data warehouse. Incremental loads process ~2 M rows/day in under 4 minutes.\n\nThe React frontend offers 15+ interactive chart types built with Recharts, with drill-down from chain → store → department → SKU. Automated PDF reports are generated nightly with Puppeteer and emailed to store managers.",
        pt: "Plataforma de BI end-to-end atendendo 6 redes de supermercados no Brasil. O pipeline ETL ingere dados diários de vendas, estoque e fornecedores de sistemas ERP heterogêneos. O frontend React oferece 15+ tipos de gráficos interativos com drill-down completo.",
      },
      features: {
        en: ["ETL: ~2M rows/day in <4 minutes", "15+ interactive chart types with drill-down", "Automated nightly PDF reports via Puppeteer", "Role-based access: chain, store, manager"],
        pt: ["ETL: ~2M linhas/dia em <4 minutos", "15+ tipos de gráficos com drill-down", "Relatórios PDF automáticos noturnos", "Acesso baseado em papel: rede, loja, gerente"],
      },
      tags: ["React", "Node.js", "PostgreSQL", "Docker", "dbt"],
      media: [
        { type: "placeholder", category: "fullstack" },
        { type: "placeholder", category: "ml" },
      ],
      link: "#", github: "#",
    },
    {
      id: 6, title: "Field Robot Arm Control",
      category: "robotics", year: "2022",
      types: ["robotics", "embedded"],
      description: {
        en: "Robotic arm control for agricultural harvesting. Inverse kinematics, computer vision for fruit detection and precise actuation.",
        pt: "Controle de braço robótico para colheita agrícola. Cinemática inversa, visão computacional para detecção de frutos e atuação precisa.",
      },
      details: {
        en: "6-DOF robotic arm mounted on a mobile platform for strawberry harvesting. A YOLOv8n model detects ripe fruit in real-time (30 fps) from an Intel RealSense D435 camera, providing 3D coordinates in the robot frame. Closed-form inverse kinematics computes joint angles, while a custom impedance controller ensures gentle contact forces (<2 N) during picking.\n\nThe system achieved 87% successful pick rate in field trials, significantly better than the manual picking rate variability under fatigue.",
        pt: "Braço robótico de 6-DOF montado em plataforma móvel para colheita de morangos. Um modelo YOLOv8n detecta frutas maduras em tempo real a partir de uma câmera Intel RealSense D435. A cinemática inversa de forma fechada computa ângulos de junta, enquanto um controlador de impedância garante forças de contato suaves (<2 N).",
      },
      features: {
        en: ["YOLOv8n fruit detection at 30 fps", "87% successful pick rate in field trials", "Impedance control: <2 N contact force", "Full ROS2 integration with MoveIt2"],
        pt: ["Detecção YOLOv8n a 30 fps", "87% de taxa de colheita em testes de campo", "Controle de impedância: <2 N de força", "Integração ROS2 completa com MoveIt2"],
      },
      tags: ["ROS2", "MoveIt2", "YOLOv8", "Python", "OpenCV"],
      media: [
        { type: "placeholder", category: "robotics" },
      ],
      link: "#", github: "#",
    },
    {
      id: 7, title: "Logistics Mobile App",
      category: "mobile", year: "2022",
      types: ["mobile", "fullstack"],
      description: {
        en: "Mobile app for logistics management with real-time tracking, integrated barcode scanner and offline sync.",
        pt: "Aplicativo mobile para gestão logística com rastreamento em tempo real, leitor de código de barras integrado e sincronização offline.",
      },
      details: {
        en: "Cross-platform Flutter app (iOS + Android) for a 300-truck logistics company. Drivers use the app to scan cargo barcodes, log deliveries, capture proof-of-delivery photos, and report incidents — all with full offline support via SQLite local storage and background sync when connectivity is restored.\n\nA BLE peripheral library connects to Zebra handheld scanners without pairing. The Node.js backend uses WebSockets to push live position updates to the dispatcher dashboard.",
        pt: "App Flutter multiplataforma para empresa de logística com 300 caminhões. Motoristas escaneiam códigos de barras, registram entregas, capturam fotos de prova de entrega e reportam incidentes — tudo com suporte offline via SQLite e sincronização em segundo plano.",
      },
      features: {
        en: ["Full offline support with SQLite + background sync", "BLE integration with Zebra handheld scanners", "Real-time GPS tracking via WebSockets", "Photo proof-of-delivery with compression"],
        pt: ["Suporte offline completo com SQLite + sync", "Integração BLE com scanners Zebra", "Rastreamento GPS em tempo real via WebSockets", "Foto prova de entrega com compressão"],
      },
      tags: ["Flutter", "Dart", "Firebase", "BLE", "SQLite"],
      media: [
        { type: "placeholder", category: "mobile" },
      ],
      link: "#", github: "#",
    },
    {
      id: 8, title: "Drone Flight Controller",
      category: "aerospace", year: "2021",
      types: ["aerospace", "embedded"],
      description: {
        en: "Custom flight controller for a fixed-wing drone. Autopilot with GPS waypoint navigation and telemetry.",
        pt: "Flight controller customizado para drone de asa fixa. Implementação de autopiloto com GPS waypoint navigation e telemetria.",
      },
      details: {
        en: "Custom autopilot board (STM32F7 + ICM-42688P IMU + u-blox M9N GPS) running a custom RTOS-based flight stack for a 1.4 m wingspan FPV fixed-wing. The attitude controller uses a cascaded PID structure (rate → attitude → velocity), tuned via Ziegler-Nichols in simulation then refined in flight.\n\nMAVLink telemetry at 4 Hz streams attitude, position and battery state to a QGroundControl-compatible ground station. A geofence module triggers RTH if the aircraft leaves a configurable polygon boundary.",
        pt: "Placa de autopiloto personalizada (STM32F7 + ICM-42688P IMU + u-blox M9N GPS) para asa fixa FPV de 1,4 m. O controlador de atitude usa estrutura PID cascateada, ajustada via Ziegler-Nichols em simulação. Telemetria MAVLink a 4 Hz transmite dados para estação terrestre compatível com QGroundControl.",
      },
      features: {
        en: ["Custom autopilot: STM32F7 + ICM-42688 + M9N GPS", "Cascaded PID — rate → attitude → velocity", "MAVLink telemetry to QGroundControl", "Geofence with automatic RTH"],
        pt: ["Autopiloto customizado: STM32F7 + ICM-42688 + M9N", "PID cascateado — rate → atitude → velocidade", "Telemetria MAVLink para QGroundControl", "Geocerca com RTH automático"],
      },
      tags: ["STM32", "C++", "MAVLink", "FreeRTOS", "GPS"],
      media: [
        { type: "placeholder", category: "aerospace" },
        { type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      ],
      link: "#", github: "#",
    },
  ],

  competitions: [
    { title:"IEEE Latin American Robotics Competition", year:"2023", result:{en:"3rd Place",pt:"3º Lugar"}, category:"robotics", description:{en:"Robotics competition with an autonomous navigation and object manipulation challenge.",pt:"Competição de robótica com desafio de navegação autônoma e manipulação de objetos."} },
    { title:"Hackathon Aerospace UFSC", year:"2023", result:{en:"1st Place",pt:"1º Lugar"}, category:"aerospace", description:{en:"48-hour challenge to design a telemetry system for nanosatellites.",pt:"Desafio de projeto de sistema de telemetria para nanossatélites em 48 horas."} },
    { title:"ICMC Hackathon – ML Track", year:"2022", result:{en:"Finalist",pt:"Finalista"}, category:"ml", description:{en:"Development of a predictive model for supply chain optimization.",pt:"Desenvolvimento de modelo preditivo para otimização de supply chain."} },
  ],

  seminars: [
    { title:"Applied AI in Aerospace Systems", event:{en:"Brazilian Aerospace Symposium",pt:"Simpósio Brasileiro de Aeroespacial"}, year:"2024", role:"speaker", description:{en:"Talk on integrating neural networks into safety-critical aerospace control systems.",pt:"Apresentação sobre integração de redes neurais em sistemas críticos de controle aeroespacial."} },
    { title:"Edge AI and Embedded ML", event:{en:"Computer Science Week – UFSC",pt:"Semana da Computação – UFSC"}, year:"2023", role:"speaker", description:{en:"Workshop on optimizing deep learning models for microcontrollers with TensorFlow Lite.",pt:"Workshop sobre otimização de modelos de deep learning para microcontroladores com TensorFlow Lite."} },
    { title:"ROS2 for Industrial Robotics", event:{en:"Industrial Robotics Workshop",pt:"Workshop de Robótica Industrial"}, year:"2023", role:"attendee", description:{en:"Advanced seminar on integrating ROS2 with legacy industrial systems.",pt:"Seminário avançado sobre integração de ROS2 com sistemas industriais legados."} },
    { title:"Control Systems & Modern AI", event:{en:"Brazilian Congress on Automation",pt:"Congresso Brasileiro de Automática"}, year:"2022", role:"attendee", description:{en:"Conference on the synergy between classical control theory and reinforcement learning.",pt:"Conferência sobre sinergia entre controle clássico e abordagens de aprendizado por reforço."} },
  ],
};

// ─── Project image placeholder ────────────────────────────────────────────────
function ProjectPlaceholder({ category, size = 200 }) {
  const c = CAT_COLORS[category] || CAT_COLORS.ml;
  const Icon = CAT_ICONS[category];
  return (
    <div style={{
      width: "100%", height: size,
      background: `linear-gradient(135deg, ${c.bg} 0%, #0a0e17 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", flexShrink: 0,
    }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${c.accent}10 1px,transparent 1px),linear-gradient(90deg,${c.accent}10 1px,transparent 1px)`, backgroundSize:"22px 22px" }} />
      <div style={{ position:"absolute", width:size*0.7, height:size*0.7, background:`radial-gradient(circle,${c.accent}20 0%,transparent 70%)`, borderRadius:"50%" }} />
      <div style={{ position:"relative", width:size*0.28, height:size*0.28, color:c.accent, opacity:0.9 }}>
        {Icon && Icon(c.accent)}
      </div>
      <div style={{ position:"absolute", top:0, left:0, width:36, height:3, background:c.accent }} />
    </div>
  );
}

// ─── Type icon badge (small inline icon) ─────────────────────────────────────
function TypeBadge({ type }) {
  const c = CAT_COLORS[type];
  if (!c) return null;
  const Icon = CAT_ICONS[type];
  return (
    <div title={type} style={{
      width: 28, height: 28, borderRadius: 6,
      background: `${c.accent}18`, border: `1px solid ${c.accent}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
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

  const prev = () => setIdx(i => (i - 1 + total) % total);
  const next = () => setIdx(i => (i + 1) % total);

  useEffect(() => { setIdx(0); }, [media]);

  const item = media[idx];
  const c = CAT_COLORS[category] || CAT_COLORS.ml;

  const renderItem = () => {
    if (!item) return null;
    if (item.type === "youtube") return (
      <iframe
        src={item.src}
        style={{ width:"100%", height:"100%", border:"none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
    if (item.type === "image") return (
      <img src={item.src} alt="project screenshot" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
    );
    if (item.type === "gif") return (
      <img src={item.src} alt="project gif" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
    );
    // placeholder
    return <ProjectPlaceholder category={item.category || category} size={320} />;
  };

  return (
    <div style={{ position:"relative", width:"100%", height:320, background:"#060810", borderRadius:8, overflow:"hidden", flexShrink:0 }}>
      {renderItem()}

      {/* nav buttons */}
      {total > 1 && <>
        <button onClick={prev} style={{
          position:"absolute", left:10, top:"50%", transform:"translateY(-50%)",
          width:36, height:36, borderRadius:"50%", border:`1px solid ${c.accent}44`,
          background:"rgba(8,11,18,0.85)", color:c.accent, cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:16,
          backdropFilter:"blur(4px)", transition:"all 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = `${c.accent}22`}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(8,11,18,0.85)"}
        >‹</button>
        <button onClick={next} style={{
          position:"absolute", right:10, top:"50%", transform:"translateY(-50%)",
          width:36, height:36, borderRadius:"50%", border:`1px solid ${c.accent}44`,
          background:"rgba(8,11,18,0.85)", color:c.accent, cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:16,
          backdropFilter:"blur(4px)", transition:"all 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = `${c.accent}22`}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(8,11,18,0.85)"}
        >›</button>

        {/* dots */}
        <div style={{ position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6 }}>
          {media.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 20 : 8, height:8, borderRadius:4,
              border:"none", cursor:"pointer", padding:0,
              background: i === idx ? c.accent : `${c.accent}44`,
              transition:"all 0.25s",
            }}/>
          ))}
        </div>

        {/* counter */}
        <div style={{
          position:"absolute", top:10, right:10,
          fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#94a3b8",
          background:"rgba(8,11,18,0.75)", backdropFilter:"blur(4px)",
          padding:"2px 8px", borderRadius:4,
        }}>{idx+1} / {total}</div>
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

  // close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <>
      {/* backdrop */}
      <div onClick={onClose} style={{
        position:"fixed", inset:0, zIndex:200,
        background:"rgba(4,6,12,0.85)", backdropFilter:"blur(8px)",
      }} />

      {/* modal */}
      <div style={{
        position:"fixed", inset:0, zIndex:201,
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"1rem",
        pointerEvents:"none",
      }}>
        <div style={{
          pointerEvents:"all",
          width:"100%", maxWidth:760,
          maxHeight:"90vh",
          background:"#0d1117",
          border:`1px solid ${c.accent}33`,
          borderRadius:14,
          overflow:"hidden",
          display:"flex", flexDirection:"column",
          boxShadow:`0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${c.accent}22`,
          animation:"modalIn 0.22s ease",
        }}>
          {/* ── header ── */}
          <div style={{
            padding:"1.2rem 1.5rem 1rem",
            borderBottom:`1px solid rgba(255,255,255,0.06)`,
            display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"1rem",
            flexShrink:0,
          }}>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
              {/* type icons row */}
              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                {(project.types || [project.category]).map((tp, i) => <TypeBadge key={i} type={tp} />)}
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:c.accent, letterSpacing:"0.1em", textTransform:"uppercase", marginLeft:4 }}>
                  {project.year}
                </span>
              </div>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.1rem,3vw,1.5rem)", color:"#f1f5f9", margin:0, lineHeight:1.2 }}>
                {project.title}
              </h2>
            </div>
            <button onClick={onClose} style={{
              background:"transparent", border:"1px solid rgba(255,255,255,0.1)",
              borderRadius:8, width:34, height:34, cursor:"pointer", color:"#94a3b8",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:18, flexShrink:0, transition:"all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#ef444444"; e.currentTarget.style.color = "#ef4444"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#94a3b8"; }}
            >×</button>
          </div>

          {/* ── scrollable body ── */}
          <div style={{ overflowY:"auto", flex:1, padding:"1.5rem" }}>

            {/* carousel */}
            <Carousel media={project.media || [{ type:"placeholder", category:project.category }]} category={project.category} />

            {/* overview */}
            <div style={{ marginTop:"1.5rem" }}>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:c.accent, letterSpacing:"0.12em", textTransform:"uppercase", margin:"0 0 0.6rem" }}>
                {mt.overview}
              </p>
              {(project.details?.[lang] || project.description[lang]).split("\n\n").map((para, i) => (
                <p key={i} style={{ color:"#94a3b8", fontSize:"0.9rem", lineHeight:1.75, margin:"0 0 0.9rem" }}>{para}</p>
              ))}
            </div>

            {/* key features */}
            {project.features && (
              <div style={{ marginTop:"0.5rem" }}>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:c.accent, letterSpacing:"0.12em", textTransform:"uppercase", margin:"0 0 0.8rem" }}>
                  {mt.keyFeatures}
                </p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
                  {project.features[lang].map((f, i) => (
                    <div key={i} style={{
                      display:"flex", alignItems:"flex-start", gap:8,
                      background:`${c.accent}0a`, border:`1px solid ${c.accent}22`,
                      borderRadius:6, padding:"0.6rem 0.8rem",
                    }}>
                      <span style={{ color:c.accent, fontSize:12, marginTop:1, flexShrink:0 }}>▸</span>
                      <span style={{ color:"#cbd5e1", fontSize:"0.82rem", lineHeight:1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* tech stack */}
            <div style={{ marginTop:"1.2rem" }}>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:c.accent, letterSpacing:"0.12em", textTransform:"uppercase", margin:"0 0 0.6rem" }}>
                {mt.techStack}
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {project.tags.map((tag, i) => (
                  <span key={i} style={{
                    fontSize:12, fontFamily:"'JetBrains Mono',monospace",
                    color:c.accent, background:`${c.accent}12`,
                    border:`1px solid ${c.accent}33`, borderRadius:5, padding:"4px 10px",
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── footer buttons ── */}
          <div style={{
            padding:"1rem 1.5rem",
            borderTop:"1px solid rgba(255,255,255,0.06)",
            display:"flex", gap:"0.75rem", flexWrap:"wrap",
            flexShrink:0,
          }}>
            {project.link && project.link !== "#" && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                padding:"9px 22px", background:c.accent, color:"#080b12",
                borderRadius:6, textDecoration:"none", fontFamily:"'JetBrains Mono',monospace",
                fontSize:12, fontWeight:700, letterSpacing:"0.05em",
              }}>{mt.liveDemo}</a>
            )}
            {project.github && project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                padding:"9px 22px", background:"transparent", color:"#94a3b8",
                borderRadius:6, textDecoration:"none", fontFamily:"'JetBrains Mono',monospace",
                fontSize:12, border:"1px solid rgba(148,163,184,0.2)", letterSpacing:"0.05em",
              }}>{mt.viewCode}</a>
            )}
            <button onClick={onClose} style={{
              marginLeft:"auto", padding:"9px 18px", background:"transparent",
              color:"#475569", border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:6, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace",
              fontSize:12, letterSpacing:"0.04em",
            }}>{mt.close}</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn { from { opacity:0; transform:scale(0.96) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
      `}</style>
    </>
  );
}

// ─── Small reusables ──────────────────────────────────────────────────────────
function Tag({ text, category }) {
  const c = CAT_COLORS[category] || { accent:"#94a3b8" };
  return <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:c.accent, border:`1px solid ${c.accent}33`, borderRadius:4, padding:"2px 8px", background:`${c.accent}11`, letterSpacing:"0.03em" }}>{text}</span>;
}

function CategoryBadge({ category }) {
  const lang = useLang();
  const c = CAT_COLORS[category];
  if (!c) return null;
  const found = T[lang].categories.find(x => x.id === category);
  return <span style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"0.1em", color:c.accent, border:`1px solid ${c.accent}55`, borderRadius:3, padding:"2px 7px", background:`${c.accent}15` }}>{found ? found.label : category}</span>;
}

function LangToggle({ lang, setLang }) {
  return (
    <button onClick={() => setLang(l => l==="en"?"pt":"en")} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.12)", borderRadius:6, padding:"4px 10px", cursor:"pointer", display:"flex", alignItems:"center", gap:6, transition:"border-color 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor="rgba(56,189,248,0.45)"}
      onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"}
    >
      <span style={{ fontSize:14, lineHeight:1 }}>{lang==="en"?"🇧🇷":"🇺🇸"}</span>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#64748b", letterSpacing:"0.06em" }}>{lang==="en"?"PT":"EN"}</span>
    </button>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({ active, setActive, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];
  useEffect(() => { const fn = () => setScrolled(window.scrollY>40); window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn); }, []);
  const links = [
    {id:"about",label:t.nav.about},{id:"education",label:t.nav.education},
    {id:"projects",label:t.nav.projects},{id:"competitions",label:t.nav.competitions},
    {id:"seminars",label:t.nav.seminars},{id:"contact",label:t.nav.contact},
  ];
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 max(1.5rem,4vw)",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled?"rgba(8,11,18,0.93)":"transparent",backdropFilter:scrolled?"blur(14px)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,0.06)":"1px solid transparent",transition:"all 0.3s ease" }}>
      <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#38bdf8",fontSize:14,letterSpacing:"0.05em" }}>
        <span style={{color:"#6b7280"}}>{"<"}</span>luiz<span style={{color:"#a78bfa"}}>.</span>dev<span style={{color:"#6b7280"}}>{"/>"}</span>
      </span>
      <div style={{ display:"flex",gap:"1.4rem",alignItems:"center" }}>
        {links.map(l=>(
          <a key={l.id} href={`#${l.id}`} onClick={()=>setActive(l.id)} style={{ color:active===l.id?"#38bdf8":"#64748b",textDecoration:"none",fontSize:12,fontFamily:"'JetBrains Mono',monospace",letterSpacing:"0.04em",transition:"color 0.2s",borderBottom:active===l.id?"1px solid #38bdf8":"1px solid transparent",paddingBottom:2 }}>{l.label}</a>
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
  const phraseIdx = useRef(0), charIdx = useRef(0), timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current); phraseIdx.current=0; charIdx.current=0; setTyped("");
    function fw() {
      const p = T[lang].typewriter[phraseIdx.current];
      if (charIdx.current < p.length) { charIdx.current++; setTyped(p.slice(0,charIdx.current)); timer.current=setTimeout(fw,80); }
      else { timer.current=setTimeout(bw,1400); }
    }
    function bw() {
      const p = T[lang].typewriter[phraseIdx.current];
      if (charIdx.current>0) { charIdx.current--; setTyped(p.slice(0,charIdx.current)); timer.current=setTimeout(bw,45); }
      else { phraseIdx.current=(phraseIdx.current+1)%T[lang].typewriter.length; timer.current=setTimeout(fw,200); }
    }
    timer.current=setTimeout(fw,300);
    return ()=>clearTimeout(timer.current);
  }, [lang]);

  return (
    <section id="about" style={{ minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 max(2rem,8vw)",paddingTop:80,position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,zIndex:0,backgroundImage:"linear-gradient(rgba(56,189,248,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px",maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)",WebkitMaskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)" }} />
      <div style={{ position:"absolute",top:"20%",left:"60%",width:400,height:400,background:"radial-gradient(circle,rgba(56,189,248,0.08) 0%,transparent 70%)",zIndex:0,pointerEvents:"none" }} />
      <div style={{ position:"absolute",top:"50%",left:"10%",width:300,height:300,background:"radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 70%)",zIndex:0,pointerEvents:"none" }} />
      <div style={{ position:"relative",zIndex:1,maxWidth:780 }}>
        <p style={{ fontFamily:"'JetBrains Mono',monospace",color:"#38bdf8",fontSize:13,letterSpacing:"0.15em",marginBottom:"1.2rem" }}>{t.hero.greeting}</p>
        <h1 style={{ fontSize:"clamp(3rem,8vw,6rem)",fontFamily:"'Syne',sans-serif",fontWeight:800,color:"#f1f5f9",lineHeight:1.05,margin:"0 0 0.5rem",letterSpacing:"-0.03em" }}>Luiz<br/><span style={{color:"#38bdf8"}}>Coppini</span></h1>
        <div style={{ height:44,display:"flex",alignItems:"center",gap:10,marginBottom:"1.8rem" }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(1rem,2.5vw,1.4rem)",color:"#94a3b8" }}>~$</span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(1rem,2.5vw,1.4rem)",color:"#e2e8f0" }}>{typed}<span style={{ animation:"blink 1s step-end infinite",color:"#38bdf8" }}>|</span></span>
        </div>
        <p style={{ color:"#94a3b8",fontSize:"clamp(0.9rem,1.5vw,1.05rem)",lineHeight:1.75,maxWidth:560,marginBottom:"2.5rem" }}>{t.hero.bio}</p>
        <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
          <a href="#projects" style={{ padding:"12px 28px",background:"#38bdf8",color:"#080b12",borderRadius:6,textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,letterSpacing:"0.05em" }}>{t.hero.cta}</a>
          <a href={DATA.resume} target="_blank" rel="noopener noreferrer" style={{ padding:"12px 28px",background:"transparent",color:"#94a3b8",borderRadius:6,textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:13,letterSpacing:"0.05em",border:"1px solid rgba(148,163,184,0.25)" }}>{t.hero.resume}</a>
        </div>
        <div style={{ display:"flex",flexWrap:"wrap",gap:"0.6rem",marginTop:"3rem" }}>
          {DATA.skills.map((s,i)=><Tag key={i} text={s.label} category={s.category}/>)}
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ label, title }) {
  return (
    <div style={{ marginBottom:"0.5rem" }}>
      <p style={{ fontFamily:"'JetBrains Mono',monospace",color:"#38bdf8",fontSize:12,letterSpacing:"0.15em",margin:"0 0 0.5rem" }}>{label}</p>
      <h2 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,2.6rem)",color:"#f1f5f9",margin:0,letterSpacing:"-0.02em" }}>{title}</h2>
      <div style={{ width:40,height:3,background:"#38bdf8",borderRadius:2,marginTop:14 }}/>
    </div>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
function EducationSection() {
  const lang = useLang(); const t = T[lang]; const et = t.education;
  return (
    <section id="education" style={{ padding:"5rem max(2rem,6vw)" }}>
      <SectionHeader label={t.sections.education.label} title={t.sections.education.title}/>
      <div style={{ marginTop:"2.5rem",position:"relative" }}>
        <div style={{ position:"absolute",left:19,top:0,bottom:0,width:2,background:"linear-gradient(to bottom,#38bdf855,#a78bfa33,transparent)",borderRadius:2 }}/>
        <div style={{ display:"flex",flexDirection:"column",gap:"2rem" }}>
          {DATA.education.map((edu,i)=>{
            const c = CAT_COLORS[edu.color]||CAT_COLORS.aerospace;
            const isOngoing = edu.status==="ongoing";
            return (
              <div key={i} style={{ display:"flex",gap:"1.5rem",alignItems:"flex-start" }}>
                <div style={{ flexShrink:0,position:"relative",zIndex:1 }}>
                  <div style={{ width:40,height:40,borderRadius:"50%",background:`${c.accent}18`,border:`2px solid ${c.accent}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:`0 0 16px ${c.accent}22` }}>{edu.icon}</div>
                  {isOngoing&&<div style={{ position:"absolute",bottom:-2,right:-2,width:12,height:12,borderRadius:"50%",background:"#34d399",border:"2px solid #080b12",animation:"pulse 2s ease-in-out infinite" }}/>}
                </div>
                <div style={{ flex:1,background:"#0d1117",border:`1px solid rgba(255,255,255,0.07)`,borderLeft:`3px solid ${c.accent}`,borderRadius:"0 10px 10px 0",padding:"1.4rem 1.6rem",transition:"transform 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateX(4px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateX(0)";}}
                >
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"0.5rem",marginBottom:"0.6rem" }}>
                    <h3 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.05rem",color:"#f1f5f9",margin:0,lineHeight:1.3 }}>{edu.degree[lang]}</h3>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:isOngoing?"#34d399":"#64748b",border:`1px solid ${isOngoing?"#34d39944":"#33415544"}`,borderRadius:4,padding:"2px 8px",background:isOngoing?"#34d39911":"#33415511",letterSpacing:"0.06em",textTransform:"uppercase" }}>{isOngoing?et.ongoing:et.completed}</span>
                  </div>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:c.accent,margin:"0 0 0.8rem",letterSpacing:"0.03em" }}>{edu.institution}<span style={{color:"#334155",margin:"0 0.5rem"}}>·</span><span style={{color:"#475569"}}>{edu.period}</span></p>
                  <p style={{ fontSize:"0.875rem",color:"#94a3b8",margin:"0 0 0.8rem",lineHeight:1.5 }}><span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginRight:6 }}>{et.focus}:</span>{edu.focus[lang]}</p>
                  {edu.thesis&&<p style={{ fontSize:"0.82rem",color:"#64748b",margin:"0 0 0.8rem",lineHeight:1.55,fontStyle:"italic" }}><span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:"0.08em",marginRight:6,fontStyle:"normal" }}>{et.thesis}:</span>"{edu.thesis[lang]}"</p>}
                  <div style={{ display:"flex",flexWrap:"wrap",gap:"0.4rem" }}>{edu.highlights[lang].map((h,j)=><span key={j} style={{ fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:"#475569",background:"#161b22",border:"1px solid #21262d",borderRadius:4,padding:"2px 8px" }}>{h}</span>)}</div>
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
  const c = CAT_COLORS[project.category] || { accent:"#94a3b8" };
  return (
    <div onClick={onClick} style={{ background:"#0d1117",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,overflow:"hidden",display:"flex",flexDirection:"column",transition:"all 0.25s ease",cursor:"pointer" }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c.accent}55`;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 16px 40px ${c.accent}14`;}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
    >
      {/* thumbnail — first media item */}
      <div style={{ position:"relative" }}>
        <ProjectPlaceholder category={project.category} size={170}/>
        {/* hover overlay */}
        <div style={{ position:"absolute",inset:0,background:`${c.accent}0a`,display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0}
        >
          <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:c.accent,background:"rgba(8,11,18,0.8)",padding:"6px 14px",borderRadius:6,border:`1px solid ${c.accent}44`,backdropFilter:"blur(4px)" }}>
            {lang==="en"?"click to expand":"clique para expandir"}
          </span>
        </div>
        {/* type icons top-right */}
        <div style={{ position:"absolute",top:8,right:8,display:"flex",gap:4 }}>
          {(project.types||[project.category]).map((tp,i)=><TypeBadge key={i} type={tp}/>)}
        </div>
      </div>

      {/* content */}
      <div style={{ padding:"1.1rem 1.3rem",display:"flex",flexDirection:"column",gap:"0.65rem",flex:1 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <CategoryBadge category={project.category}/>
          <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#475569" }}>{project.year}</span>
        </div>
        <h3 style={{ color:"#e2e8f0",margin:0,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",lineHeight:1.3 }}>{project.title}</h3>
        <p style={{ color:"#64748b",fontSize:"0.85rem",margin:0,lineHeight:1.65,flex:1,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden" }}>
          {project.description[lang]}
        </p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
          {project.tags.slice(0,4).map((tag,i)=><span key={i} style={{ fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:"#475569",background:"#161b22",border:"1px solid #21262d",borderRadius:4,padding:"2px 7px" }}>{tag}</span>)}
        </div>
      </div>
    </div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
function ProjectsSection() {
  const lang = useLang(); const t = T[lang];
  const [filter, setFilter] = useState("all");
  const [openProject, setOpenProject] = useState(null);

  const filtered = filter==="all" ? DATA.projects : DATA.projects.filter(p=>p.category===filter);

  return (
    <section id="projects" style={{ padding:"6rem max(2rem,6vw)",background:"rgba(255,255,255,0.015)" }}>
      <SectionHeader label={t.sections.projects.label} title={t.sections.projects.title}/>

      <div style={{ display:"flex",flexWrap:"wrap",gap:"0.5rem",margin:"2rem 0 2.5rem" }}>
        {t.categories.map(cat=>{
          const color=CAT_COLORS[cat.id]; const isActive=filter===cat.id;
          return <button key={cat.id} onClick={()=>setFilter(cat.id)} style={{ padding:"7px 16px",borderRadius:6,cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:12,letterSpacing:"0.04em",transition:"all 0.2s",border:isActive?`1px solid ${color?color.accent:"#38bdf8"}`:"1px solid rgba(255,255,255,0.1)",background:isActive?(color?`${color.accent}18`:"rgba(56,189,248,0.12)"):"transparent",color:isActive?(color?color.accent:"#38bdf8"):"#64748b" }}>{cat.label}</button>;
        })}
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.2rem" }}>
        {filtered.map(p=><ProjectCard key={p.id} project={p} onClick={()=>setOpenProject(p)}/>)}
      </div>

      {openProject && <ProjectModal project={openProject} onClose={()=>setOpenProject(null)}/>}
    </section>
  );
}

// ─── Competitions ─────────────────────────────────────────────────────────────
function CompetitionsSection() {
  const lang = useLang(); const t = T[lang];
  return (
    <section id="competitions" style={{ padding:"5rem max(2rem,6vw)" }}>
      <SectionHeader label={t.sections.competitions.label} title={t.sections.competitions.title}/>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1.2rem",marginTop:"2.5rem" }}>
        {DATA.competitions.map((comp,i)=>{
          const color=CAT_COLORS[comp.category]||{accent:"#94a3b8"};
          const result=comp.result[lang];
          const medal=result.includes("1")||result.toLowerCase().includes("1st")?"🥇":result.includes("2")||result.toLowerCase().includes("2nd")?"🥈":result.includes("3")||result.toLowerCase().includes("3rd")?"🥉":"🏅";
          return (
            <div key={i} style={{ background:"#0d1117",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"1.5rem",borderLeft:`3px solid ${color.accent}` }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:12 }}><CategoryBadge category={comp.category}/><span style={{fontSize:18}}>{medal}</span></div>
              <h3 style={{ fontFamily:"'Syne',sans-serif",fontSize:"1rem",fontWeight:700,color:"#e2e8f0",margin:"0 0 0.4rem" }}>{comp.title}</h3>
              <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:color.accent,margin:"0 0 0.6rem",letterSpacing:"0.05em" }}>{result} · {comp.year}</p>
              <p style={{ color:"#64748b",fontSize:"0.85rem",margin:0,lineHeight:1.6 }}>{comp.description[lang]}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Seminars ─────────────────────────────────────────────────────────────────
function SeminarsSection() {
  const lang = useLang(); const t = T[lang];
  return (
    <section id="seminars" style={{ padding:"5rem max(2rem,6vw)",background:"rgba(255,255,255,0.015)" }}>
      <SectionHeader label={t.sections.seminars.label} title={t.sections.seminars.title}/>
      <div style={{ marginTop:"2.5rem",display:"flex",flexDirection:"column",gap:"1.2rem" }}>
        {DATA.seminars.map((s,i)=>{
          const isSpeaker=s.role==="speaker";
          return (
            <div key={i} style={{ background:"#0d1117",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"1.5rem 2rem",display:"grid",gridTemplateColumns:"1fr auto",gap:"1rem",alignItems:"start",transition:"border-color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(56,189,248,0.25)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}
            >
              <div>
                <h3 style={{ fontFamily:"'Syne',sans-serif",fontSize:"1rem",fontWeight:700,color:"#e2e8f0",margin:"0 0 0.3rem" }}>{s.title}</h3>
                <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:"#38bdf8",margin:"0 0 0.6rem",letterSpacing:"0.04em" }}>{s.event[lang]}</p>
                <p style={{ color:"#64748b",fontSize:"0.875rem",margin:0,lineHeight:1.65 }}>{s.description[lang]}</p>
              </div>
              <div style={{ textAlign:"right",whiteSpace:"nowrap" }}>
                <p style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#475569",margin:"0 0 6px" }}>{s.year}</p>
                <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:isSpeaker?"#34d399":"#94a3b8",border:`1px solid ${isSpeaker?"#34d39944":"#94a3b844"}`,borderRadius:4,padding:"2px 8px",background:isSpeaker?"#34d39911":"#94a3b811" }}>{isSpeaker?t.speaker:t.attendee}</span>
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
  const lang = useLang(); const t = T[lang];
  return (
    <section id="contact" style={{ padding:"5rem max(2rem,6vw) 6rem" }}>
      <SectionHeader label={t.sections.contact.label} title={t.sections.contact.title}/>
      <p style={{ color:"#64748b",fontSize:"1rem",lineHeight:1.75,maxWidth:500,margin:"1.5rem 0 3rem" }}>{t.contact.body}</p>
      <div style={{ display:"flex",flexWrap:"wrap",gap:"1rem" }}>
        <a href={`mailto:${DATA.email}`} style={{ padding:"14px 32px",background:"#38bdf8",color:"#080b12",borderRadius:6,textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,letterSpacing:"0.05em" }}>{t.contact.email}</a>
        <a href={DATA.linkedin} target="_blank" rel="noopener noreferrer" style={{ padding:"14px 28px",background:"transparent",color:"#94a3b8",borderRadius:6,textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:13,border:"1px solid rgba(148,163,184,0.2)",letterSpacing:"0.05em" }}>LinkedIn</a>
        <a href={DATA.github} target="_blank" rel="noopener noreferrer" style={{ padding:"14px 28px",background:"transparent",color:"#94a3b8",borderRadius:6,textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",fontSize:13,border:"1px solid rgba(148,163,184,0.2)",letterSpacing:"0.05em" }}>GitHub</a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const lang = useLang();
  return (
    <footer style={{ borderTop:"1px solid rgba(255,255,255,0.06)",padding:"1.5rem max(2rem,6vw)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.5rem" }}>
      <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#334155",fontSize:12 }}>© {new Date().getFullYear()} Luiz Coppini — built with React</span>
      <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#334155",fontSize:12 }}>🤖 {T[lang].footer}</span>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const ids = ["about","education","projects","competitions","seminars","contact"];
    const obs = ids.map(id => {
      const el = document.getElementById(id); if (!el) return null;
      const o = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setActiveSection(id); },{ rootMargin:"-40% 0px -40% 0px" });
      o.observe(el); return o;
    });
    return () => obs.forEach(o=>o?.disconnect());
  }, []);

  return (
    <LangContext.Provider value={lang}>
      <div style={{ background:"#080b12",minHeight:"100vh",color:"#f1f5f9" }}>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
        <NavBar active={activeSection} setActive={setActiveSection} lang={lang} setLang={setLang}/>
        <HeroSection/>
        <EducationSection/>
        <ProjectsSection/>
        <CompetitionsSection/>
        <SeminarsSection/>
        <ContactSection/>
        <Footer/>
      </div>
    </LangContext.Provider>
  );
}
