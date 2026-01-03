import { ContentChunk } from "./vectorService";

/**
 * Static resume information for the chatbot to reference
 * This includes details not stored in Sanity CMS
 */
export const resumeChunks: ContentChunk[] = [
    {
        id: "resume-summary",
        text: `
      P.L. Lahiru Kanishka Cooray - Professional Summary:
      Final-year Electronic & Telecommunication Engineering undergraduate at the University of Moratuwa with academic focus on Robotics & AI (Computer Vision, Machine Learning, Reinforcement Learning).
      Hands-on experience in Software Engineering (backend development with FastAPI, Flask, Spring Boot; REST APIs; PostgreSQL) and DevOps (Docker, Kubernetes, Helm, Oracle Cloud Infrastructure).
      Completed industry internship at Information Systems Associates, contributing to an R&D analytics platform with LLM-powered natural language query capabilities, backend services, and Kubernetes-based cloud deployments on Oracle Cloud.
    `.trim(),
        metadata: {
            type: "resume",
            title: "Professional Summary",
            category: "summary",
        },
    },

    {
        id: "resume-education",
        text: `
      Education:
      University of Moratuwa - B.Sc. Engineering (Hons.) in Electronic and Telecommunication Engineering
      Duration: March 2022 – Present (graduation in 2026)
      Location: Moratuwa, Sri Lanka
      CGPA (up to 6th semester): 3.33/4.00
      
      Relevant coursework: Data Structures and Algorithms, Programming Fundamentals, Software Design and Competition, Robotics, Autonomous Systems, Deep Learning for Vision, Pattern Recognition, Image Processing and Machine Vision, Electronic Control Systems, Embedded Systems and Applications.
      
      Holy Cross College - G.C.E. Advanced Level – Physical Science Stream (Nov 2018 – Aug 2019)
      Location: Kalutara, Sri Lanka
      2020 G.C.E. A/L: Z-score 2.2242; Result: 3 A's (Combined Mathematics, Physics, Chemistry)
    `.trim(),
        metadata: {
            type: "resume",
            title: "Education Background",
            category: "education",
        },
    },

    {
        id: "resume-internship",
        text: `
      Industry Experience:
      Information Systems Associates (Pvt) Ltd - Trainee Software Engineer - DevOps
      Duration: December 2024 - May 2025
      Location: Colombo 03, Sri Lanka
      
      Responsibilities and achievements:
      - Worked in the DevOps team on an R&D project to build an AWR Insights platform for analysing Oracle Automatic Workload Repository (AWR) performance reports.
      - Developed the AWR Natural Language Query (NLQ) interface using LangChain, LLM APIs, FastAPI and PostgreSQL.
      - Designed a generalized Helm chart and Kubernetes deployment for the platform on Oracle Kubernetes Engine (OKE).
      - Applied modern DevOps practices (Docker, Kubernetes, Helm, OCI, Git) across the project lifecycle from local prototyping to production-like cloud deployment.
    `.trim(),
        metadata: {
            type: "resume",
            title: "Industry Experience - Information Systems Associates",
            category: "experience",
        },
    },

    {
        id: "resume-fyp-details",
        text: `
      Final Year Project:
      Reinforcement Learning for an Aerial Manipulator
      Department of Electronic and Telecommunication Engineering, University of Moratuwa
      Duration: July 2025 – Present
      Supervisor: Prof. Rohan Munasinghe
      Location: Moratuwa, Sri Lanka
      
      Project Details:
      - Ongoing final-year engineering project with a research component, using reinforcement learning for dynamic compensation of a hexacopter with a robotic manipulator under manipulator-induced disturbances.
      - Modelling and simulating the hexacopter in the Gazebo Harmonic simulation environment and integrating it with a robotic arm model to form a complete aerial manipulator system.
      - Implementing and evaluating reinforcement learning controllers against classical baselines (e.g., PID) for stability and disturbance rejection.
      - Conducting a literature review on aerial manipulation and learning-based control to position the work within current research.
      - Monthly progress updates available at: lahirucooray.dev/fyp/updates
    `.trim(),
        metadata: {
            type: "resume",
            title: "Final Year Project - Aerial Manipulator RL",
            category: "fyp",
        },
    },

    {
        id: "resume-projects-robotics",
        text: `
      Robotics & AI Projects:
      
      1. Multimodal UAV Detection and Tracking (IEEE VIP Cup 2025) - May 2025 – July 2025
      Tools: Python, PyTorch, YOLOv8/YOLOv10, Computer Vision, Multimodal Fusion
      - Led a 10-member team in developing training and evaluation pipelines for RGB and IR object detectors.
      - Integrated a published RGB–IR fusion module with YOLO-based detectors; evaluated using precision, recall, F1-score, and mAP metrics.
      
      2. Extended Kalman Filter for 2D Localization - December 2025
      Tools: ROS 2, Python, Gazebo Sim, TurtleBot3
      - Implemented an EKF for planar pose estimation by fusing velocity predictions with GPS and IMU measurements; validated with trajectory plots and RMSE analysis.
      
      3. Kinematic Analysis of a 5-DOF Robot Arm - October 2024 – November 2024
      Tools: MATLAB, Arduino, C/C++
      - Worked in a 3-member team to derive DH parameters and forward/inverse kinematics equations for a 5-DOF manipulator.
      - Implemented end-to-end joint control on Arduino for pick-and-place operations.
      
      4. Machine Learning Mini-Projects - December 2023, December 2024
      Tools: Python, pandas, NumPy, matplotlib, TensorFlow/Keras, scikit-learn
      - Developed supervised learning models (logistic regression, random forest) for classification tasks using scikit-learn.
      - Implemented CNN-based image classifiers in TensorFlow/Keras for multi-class image classification.
    `.trim(),
        metadata: {
            type: "resume",
            title: "Robotics & AI Projects",
            category: "projects",
        },
    },

    {
        id: "resume-projects-software",
        text: `
      Software Engineering & DevOps Projects:
      
      1. GridWatch – Power Plant Transformer Inspection Tool - August 2025 – December 2025
      Team: VAULt (V=Viyathma, A=Anushka, U=Udula, L=Lahiru, T for completion with a meaningful team name (not a team member))
      Tools: Java, Spring Boot, PostgreSQL, Maven, REST APIs, YOLOv8
      - GridWatch is a web platform for managing transformer inspections and thermal images, with YOLOv8-based anomaly detection.
      - Developed backend services in Spring Boot, including database schema design and REST API endpoints for managing transformers, inspections, and thermal images.
      - Implemented support for editing and storing anomaly bounding-box annotations used in the YOLOv8-based object detection pipeline.
      - Built interactive bounding-box editing features for the anomaly detection interface.
      
      2. Inventory Management System (Flask + DevOps) - January 2025
      Tools: Python, Flask, PostgreSQL, Docker, Kubernetes, Helm, Minikube
      - Built a Flask-based inventory web application with PostgreSQL backend implementing CRUD operations.
      - Containerised with Docker and deployed on a local Minikube cluster using Kubernetes and Helm for repeatable deployments.
      
      3. Doctor Appointment Web Application - September 2024 – October 2024
      Tools: Ballerina, REST APIs, Web Backend Development
      - Collaborated in a 4-member team to develop a doctor appointment management web application, leading backend development in Ballerina.
      - Implemented API integration, data handling, and authentication logic in the backend services.
    `.trim(),
        metadata: {
            type: "resume",
            title: "Software Engineering Projects",
            category: "projects",
        },
    },

    {
        id: "resume-projects-embedded",
        text: `
      Embedded Systems Projects:
      
      1. Variable Frequency Drive for AC Motors (VFD) - February 2024 – August 2024
      Tools: C/C++, AVR (ATmega328), Power Electronics, SolidWorks
      - Developed a VFD for 3-phase AC motors (up to 2.2 kW) in a two-person team; adapted Arduino code to bare-metal AVR C/C++.
      - Designed the VFD enclosure in SolidWorks and contributed to component selection, assembly, and testing.
      
      2. MediBox – Medication Reminder and Monitoring System - February 2024 – May 2024
      Tools: ESP32, Arduino, Wokwi, Node-RED, Sensors
      - Developed an ESP32-based system that automates medication reminders and monitors environmental parameters using Wokwi simulation and Node-RED integration.
      
      3. TrashMonitor – Smart Waste Bin Monitoring System - March 2023 – June 2023
      Tools: Microcontroller, PCB Design, Cloud Database, MIT App Inventor
      - Co-designed an IoT-based smart waste-bin system in a 4-member team, leading circuit, schematic, and PCB design.
      - Implemented the initial mobile app prototype using MIT App Inventor connected to a cloud backend.
    `.trim(),
        metadata: {
            type: "resume",
            title: "Embedded Systems Projects",
            category: "projects",
        },
    },

    {
        id: "resume-skills-programming",
        text: `
      Programming Languages and Technical Skills:
      
      Programming Languages:
      - Primary: Python, C/C++
      - Working knowledge: Java, MATLAB, JavaScript, Ballerina
      
      Robotics, Control & Simulation:
      - Gazebo Harmonic, PX4-SITL, basic ROS2
      - PID/feedback control
      - Robot kinematics (forward/inverse)
      - State estimation (Kalman, Extended Kalman, particle filters)
      - SLAM (Simultaneous Localization and Mapping)
      
      Machine Learning & Data:
      - Python ML stack: NumPy, pandas, matplotlib, TensorFlow, PyTorch
      - Pattern recognition, deep learning, computer vision
      - Reinforcement learning with Gymnasium and Stable-Baselines3
      - LLM-based applications with LangChain, LLM APIs
      - Retrieval-augmented generation (RAG), vector databases
      - Text-to-SQL pipelines
      
      Web & Backend Development:
      - Primary: Flask, FastAPI
      - Secondary: Spring Boot
      - HTML/CSS, RESTful APIs, WebSockets
      - PostgreSQL database
      
      Embedded Systems & Hardware:
      - ESP32, ATmega328, Arduino ecosystem
      - Sensors & actuators
      - PCB design in Altium Designer
      - SolidWorks for enclosures
      
      DevOps, Tools & Platforms:
      - Docker, Docker Compose, Kubernetes, Helm
      - Oracle Cloud Infrastructure (OCI)
      - Git/GitHub, Linux, VS Code
    `.trim(),
        metadata: {
            type: "resume",
            title: "Technical Skills",
            category: "skills",
        },
    },

    {
        id: "resume-awards",
        text: `
      Honors and Awards:
      
      1. Bosch Tech Day 2025 – Student Presentation Competition Finalist (Team Nexora) - October 2025
      Robert Bosch Lanka (Pvt) Limited
      - Selected as a finalist in a 2-member team for the Bosch Tech Day 2025 student presentation competition.
      
      2. ENIGMA'24 Inter-University Hackathon – 22nd Place (Team TronicCoders) - March 2024
      MoraMaths Society, University of Moratuwa
      - Achieved 22nd place among 200+ teams in the ENIGMA'24 inter-university hackathon.
      
      3. Innovate with Ballerina – Most Popular Team (codeBallerinas) - October 2024
      IEEE Student Branch & IEEE CS Student Branch Chapter, University of Moratuwa
      - Recognised as the "Most Popular Team" at the Innovate with Ballerina hackathon powered by WSO2.
    `.trim(),
        metadata: {
            type: "resume",
            title: "Awards and Honors",
            category: "awards",
        },
    },

    {
        id: "resume-leadership",
        text: `
      Leadership & Volunteer Experience:
      
      1. Leo Club of Royal Achievers - Member & Director (December 2020 – July 2022)
      Location: Kalutara, Sri Lanka
      - Led "The Winner" and "The Winner Project-2" free online G.C.E. O/L seminar series
      - Participated in community projects such as the "Green Paradise" tree-planting campaign.
      
      2. NextGen 1.0 Resource Panel - Resource Panel Member (February 2024 – March 2024)
      IEEE Robotics and Automation Society, University of Moratuwa
      - Served as a resource panel member for "NextGen 1.0", an IEEE RAS outreach programme introducing robotics to school students.
      
      3. Electronic Club - External Relations Coordinator (2023)
      Department of Electronic & Telecommunication Engineering, University of Moratuwa
      
      4. EXMO 2023 – University Engineering Exhibition - Analog Laboratory Demonstrator (July 2023)
      Department of Electronic & Telecommunication Engineering, University of Moratuwa
      - Demonstrated analog laboratory projects and explained concepts to visitors at EXMO 2023.
    `.trim(),
        metadata: {
            type: "resume",
            title: "Leadership Experience",
            category: "leadership",
        },
    },

    {
        id: "resume-certifications",
        text: `
      Professional Memberships:
      - IEEE Student Member (Member No. 99711736), Sri Lanka Section, 2024 – Present
      - Member, IEEE Signal Processing Society (SPS), 2025 – Present
      
      Certifications & Online Courses:
      - Oracle Cloud Infrastructure 2024 Certified Foundations Associate
      - Certified Kubernetes Administrator (CKA) with Practice Tests
      - Helm Kubernetes Packaging Manager for Developers and DevOps
      - Advanced Learning Algorithms
      - ROS 2 for Beginners (ROS Jazzy – 2025)
      - Reinforcement Learning Beginner to Master – AI in Python
      - Linux – The Complete Linux Guide
      
      Languages:
      - English (professional proficiency)
      - Sinhala (native proficiency)
    `.trim(),
        metadata: {
            type: "resume",
            title: "Certifications and Memberships",
            category: "certifications",
        },
    },
];
