import pandas as pd
from ollama import Client
import time

# Initialize Ollama client
ollama = Client(host='http://localhost:11434')

# Select disaster type
disaster_type = input("🌍 Which disaster do you want to analyze? (flood / landslide): ").strip().lower()
print()

if disaster_type == "flood":
    df = pd.read_csv("datasets/flood_risk_dataset_with_locations.csv")  # Must have State & Region
    df_sample = df.head(5)

    user_prompt = input("🧠 Enter your question:\n")

    rows_text = ""
    for _, row in df_sample.iterrows():
        rows_text += f"""
Location: {row['State']}, {row['Region']}
Rainfall: {row['Rainfall (mm)']} mm
Temperature: {row['Temperature (°C)']} °C
Humidity: {row['Humidity (%)']}%
River Discharge: {row['River Discharge (m³/s)']} m³/s
Water Level: {row['Water Level (m)']} m
Elevation: {row['Elevation (m)']} m
Land Cover: {row['Land Cover']}
Soil Type: {row['Soil Type']}
Population Density: {row['Population Density']}
Infrastructure: {row['Infrastructure']}
Historical Floods: {row['Historical Floods']}
---
"""

    prompt = f"""
You are a disaster prediction assistant.

Below is data for 5 regions in India.

📌 Question: "{user_prompt}"

Respond strictly in the following format for the **Top 3 regions**:

---
Predicted Disaster: Flood
Location: [State, Region]
Probability: [Estimated XX%]
Analysis: [2–3 lines using rainfall, river discharge, elevation, etc.]
---

📊 Data:
{rows_text}
"""

elif disaster_type == "landslide":
    df = pd.read_csv("datasets/landslide_risk_dataset_india.csv")
    df_sample = df.head(5)

    user_prompt = input("🧠 Enter your question:\n")

    rows_text = ""
    for _, row in df_sample.iterrows():
        rows_text += f"""
Location: {row['State']}, {row['Region']}
Rainfall: {row['Rainfall_mm']} mm
Slope Angle: {row['Slope_Angle']}°
Soil Saturation: {row['Soil_Saturation']}
Vegetation Cover: {row['Vegetation_Cover']}
Earthquake Activity: {row['Earthquake_Activity']}
Proximity to Water: {row['Proximity_to_Water']}
Soil Types - Gravel: {row['Soil_Type_Gravel']}, Sand: {row['Soil_Type_Sand']}, Silt: {row['Soil_Type_Silt']}
---
"""

    prompt = f"""
You are a disaster prediction assistant.

Below is data for 5 landslide-prone regions in India.

📌 Question: "{user_prompt}"

Respond strictly in the following format for the **Top 3 regions**:

---
Predicted Disaster: Landslide
Location: [State, Region]
Probability: [Estimated XX%]
Analysis: [2–3 lines using rainfall, slope, vegetation, proximity to water, etc.]
---

📊 Data:
{rows_text}
"""

else:
    print("❌ Invalid input. Please type 'flood' or 'landslide'.")
    exit()

# Inference
print("\n⏳ Processing your request...\n(This may take 30–60 seconds)\n")
start = time.time()

response = ollama.chat(model='phi', messages=[
    {'role': 'user', 'content': prompt}
])

end = time.time()
print(f"✅ LLM Response (in {round(end - start, 2)} seconds):\n")
print(response['message']['content'])
