// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "Research publications and conference papers, listed in reverse chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A curated showcase of my research-driven and applied AI projects spanning LLMs, computer vision, and self-supervised learning.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "A collection of my open-source projects and research code.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "View or download my latest curriculum vitae, highlighting my academic background, research experience, technical skills, and professional achievements.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-karli-final-event-led-technical-demonstrations-of-a-level-3-mercedes-benz-advanced-occupant-monitoring-system-communicating-its-machine-learning-pipeline-and-real-world-relevance-to-investors-scientists-and-public-sector-officials",
          title: 'KARLI Final Event: Led technical demonstrations of a Level 3 Mercedes-Benz Advanced Occupant...',
          description: "",
          section: "News",},{id: "news-publication-alert-my-paper-self-supervised-driver-distraction-detection-for-imbalanced-datasets-got-accepted-for-publication-and-presentation-as-full-paper-in-the-ieee-28th-international-conference-on-intelligent-transportation-systems-itsc-2025",
          title: 'Publication Alert: My paper “Self-supervised Driver Distraction Detection for Imbalanced Datasets” got accepted...',
          description: "",
          section: "News",},{id: "news-project-alert-developed-the-movie-sentiment-prediction-microservice-which-delivers-an-end-to-end-workflow-from-raw-data-to-live-inference-so-you-can-develop-deploy-version-and-monitor-sentiment-models-in-production-with-confidence",
          title: 'Project Alert: Developed the Movie Sentiment Prediction Microservice which delivers an end-to-end workflow—from...',
          description: "",
          section: "News",},{id: "projects-predicting-movie-sentiment-end-to-end-from-code-to-cloud",
          title: 'Predicting Movie Sentiment End-to-End- From Code to Cloud',
          description: "Movie Sentiment Prediction Microservice",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-hotel-reservation-cancellation-prediction",
          title: 'Hotel Reservation Cancellation Prediction',
          description: "Hotel Reservation Cancellation Prediction — From Notebook to Production on GCP",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-chat-with-your-documents",
          title: 'Chat with your documents',
          description: "Streamlit-based chatbot application that allows users to interact with their documents",
          section: "Projects",handler: () => {
              window.location.href = "/projects/rag/1_chat-pdf/";
            },},{id: "projects-code-assistant",
          title: 'Code Assistant',
          description: "Gradio-based chatbot application that allows users to generate code.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/rag/2_codeassistant/";
            },},{id: "projects-master-thesis",
          title: 'Master Thesis',
          description: "Improved Driver Distraction Detection Using Self-Supervised Learning",
          section: "Projects",handler: () => {
              window.location.href = "/projects/research/1_master-thesis/";
            },},{id: "projects-student-research-project",
          title: 'Student Research Project',
          description: "YOLO-Based Real-Time Object Detection for Autonomous Driving in CARLA",
          section: "Projects",handler: () => {
              window.location.href = "/projects/research/2_yolo-project/";
            },},{id: "projects-research-project-on-robustness",
          title: 'Research Project on Robustness',
          description: "Out-of-Distribution (OOD) Robustness with AugMix",
          section: "Projects",handler: () => {
              window.location.href = "/projects/research/3_ood-augmix/";
            },},{id: "projects-research-project-on-3d-representation-learning",
          title: 'Research Project on 3D Representation Learning',
          description: "Neural Unsigned Distance Fields for Implicit Function Learning",
          section: "Projects",handler: () => {
              window.location.href = "/projects/research/4_ndf-project/";
            },},{id: "projects-bachelor-thesis",
          title: 'Bachelor-Thesis',
          description: "Experimental Investigations on Performance Evaluation of two-stage Solar Receiver System",
          section: "Projects",handler: () => {
              window.location.href = "/projects/research/5_bachelor-thesis/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%75%72%61%6A.%75%6E%69%73%69%65%67%65%6E@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/SurajBhar", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/bhardwaj-suraj", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=eFFvcOYAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
