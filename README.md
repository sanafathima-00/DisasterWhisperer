# **Disaster Whisperer**



## 🌐 Project Overview

**Disaster Whisperer** is an AI-powered web assistant designed to predict and visualize disaster risks (Floods and Landslides) across India. It combines geospatial data analysis, natural language understanding, and interactive visualizations to deliver localized disaster intelligence, empowering communities and responders with timely insights.

---

## ✨ Features

- 🌊 Predicts flood and 🏔️ landslide risks using historical and current datasets
- 🧠 LLM-powered reasoning for natural language disaster queries
- 🗺️ Interactive map-based UI to highlight high-risk zones dynamically
- ⚡ FastAPI backend with Ollama for local, secure inference
- 🎨 Modern animated React frontend with Tailwind CSS
- 🔒 Runs completely offline — no cloud processing or data leaks

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: FastAPI
- **Model**: Ollama `phi` 
- **Datasets**: NDMA, ISRO, Bhuvan geospatial data (CSV)

---

## 🚀 Installation and Setup

### Prerequisites

- Node.js and npm
- Python 3.10+
- Ollama installed and running locally
- Phi model pulled via Ollama: `ollama run phi`

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/DisasterWhisperer.git
cd DisasterWhisperer
```

---

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
npm start
```

> Or if the project has no separate folders:
> `npm install && npm start`

---

### 3. Set Up Python Backend

```bash
pip install fastapi uvicorn ollama
uvicorn api:app --reload
```

> Ensure Ollama is active at `http://localhost:11434` and the `phi` model is available.

---

## 💡 Example Prompt

> “Which areas in Himachal Pradesh are most vulnerable to landslides this month?”

Sample Output:
```
---
Predicted Disaster: Landslide
Location: Himachal Pradesh, Kullu
Probability: 81%
Analysis: Steep terrain, recent rainfall, and soil erosion increase landslide likelihood.
---
```

---

## 📁 Project Structure

```
DisasterWhisperer/
├── api.py                 # FastAPI backend for LLM and data processing
├── main.py                # CLI version (optional)
├── src/
│   ├── components/
│   │   └── DisasterWhispererUI.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css
├── datasets/
│   ├── flood_risk_dataset_with_locations.csv
│   └── landslide_risk_dataset_india.csv
├── .gitignore
└── README.md
```

---

## 📦 Dependencies

- `react`, `tailwindcss`, `framer-motion`
- `fastapi`, `uvicorn`
- `ollama` (local LLM runtime)
- `pandas`, `json`, `csv` for backend data processing

---

## 🔧 Customization

- Modify backend rules in `api.py` for different risk types
- Extend frontend UI in `components/DisasterWhispererUI.jsx`
- Add new datasets to the `datasets/` folder (ensure CSV format)
- Tune prompts inside backend to adjust LLM behavior

---

## 🐞 Known Issues

- Currently supports only Flood and Landslide risks
- Accuracy depends on the quality of uploaded datasets
- Map visualization may lag on very large datasets

---

## 🚧 Future Improvements

- Add support for earthquakes, cyclones, and wildfires
- Implement historical disaster trends and timeline visualization
- Offline-first PWA support
- Role-based dashboard for relief agencies

---

## 📄 License

Licensed under the **MIT License**.

---

## 🙌 Acknowledgments

- [NDMA](https://ndma.gov.in/), [ISRO Bhuvan](https://bhuvan.nrsc.gov.in/) for public disaster datasets
- [Ollama](https://ollama.com/) for secure local LLM hosting
- [Phi](https://huggingface.co/microsoft/phi-2) for the lightweight model
- Open-source contributors across React and FastAPI ecosystem
