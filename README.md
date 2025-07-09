# 🌐 Disaster Whisperer

**Disaster Whisperer** is an AI-powered assistant designed to predict and explain spatial disaster risks (Floods and Landslides) across India. Built with React (Frontend), FastAPI (Backend), and Ollama (LLM), it provides real-time, human-friendly analysis for risk-prone regions.

---

## 🚀 Features

- 🌊 Flood and 🏔️ Landslide risk predictions
- 🔍 Natural language queries (e.g., "Which areas are at highest flood risk today?")
- 🧠 LLM-based reasoning using local geospatial datasets
- ⚡ FastAPI + Ollama backend integration
- 🎨 Intuitive and animated React UI with live feedback
- 🔐 Secure local processing (no cloud dependency)

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React + Tailwind CSS + Framer Motion |
| Backend    | FastAPI |
| AI Model   | Ollama (`phi`) |
| Datasets   | NDMA, ISRO, Bhuvan (CSV format) |

---

## 📦 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/DisasterWhisperer.git
cd DisasterWhisperer
````

### 2. Install Frontend Dependencies

```bash
cd frontend  # if you've separated frontend folder
npm install
npm start
```

> Or simply run from root if all in one folder:
> `npm install && npm start`

### 3. Set Up Python Backend

```bash
pip install fastapi uvicorn ollama
uvicorn api:app --reload
```

> Make sure Ollama is running locally at `http://localhost:11434` and has `phi` model installed.

---

## 💡 Example Prompt

> “Which areas in Assam are most at risk of flooding this week?”

The model responds with structured predictions like:

```
---
Predicted Disaster: Flood
Location: Assam, Barpeta
Probability: 78%
Analysis: Heavy rainfall, low elevation, and high river discharge increase risk.
---
```

---

## 📂 Project Structure

```
DisasterWhisperer/
├── api.py                 # FastAPI backend
├── main.py                # CLI prototype
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
