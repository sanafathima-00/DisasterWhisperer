from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ollama import Client
import time

app = FastAPI()

# ✅ Allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ollama = Client(host='http://localhost:11434')

# ✅ Input structure
class QueryRequest(BaseModel):
    disaster_type: str
    question: str

@app.post("/predict")
async def predict(request: QueryRequest):
    # 🧠 Prompt for LLM
    prompt = f"""
You are a disaster risk analyst.

Based on the question below, return the top 3 regions at risk.

📌 Question: "{request.question}"

⚠️ RESPOND IN THIS EXACT FORMAT:
---
Predicted Disaster: {request.disaster_type.title()}
Location: [State, Region]
Probability: [XX%]
Analysis: [Short explanation]
---
"""
    start = time.time()
    response = ollama.chat(model='phi', messages=[
        {'role': 'user', 'content': prompt}
    ])
    end = time.time()

    return {
        "result": response['message']['content'],  # ✅ This is now 'result'
        "time_taken": round(end - start, 2)
    }
