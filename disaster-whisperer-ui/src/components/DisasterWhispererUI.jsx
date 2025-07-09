import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DisasterWhispererUI() {
  const [query, setQuery] = useState("");
  const [disasterType, setDisasterType] = useState("flood");
  const [submitted, setSubmitted] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [result, setResult] = useState(null);

  const handleSend = async () => {
    setSubmitted(true);
    setAnalysisDone(false);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disaster_type: disasterType, question: query }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setResult("⚠️ Error contacting the AI backend.");
    } finally {
      setTimeout(() => setAnalysisDone(true), 2000);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white font-sans"
      style={{ backgroundImage: "url('/earth-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Title */}
      <div className="relative z-10 text-center pt-10">
        <h1 className="text-5xl font-extrabold text-orange-400 drop-shadow-xl">Disaster Whisperer</h1>
        <p className="text-white text-xl mt-2">Predicting the next spatial risk before it strikes</p>
      </div>

      {/* Initial screen */}
      {!submitted && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center h-[70vh] z-10 relative"
        >
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-xl flex flex-col items-center gap-4 w-full max-w-xl">
            <select
              value={disasterType}
              onChange={(e) => setDisasterType(e.target.value)}
              className="bg-black/40 border border-white/30 p-2 rounded text-white w-full"
            >
              <option value="flood">🌊 Flood</option>
              <option value="landslide">🏔️ Landslide</option>
            </select>
            <input
              type="text"
              placeholder="Type your question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border border-white/30 p-2 rounded text-white w-full"
            />
            <button
              onClick={handleSend}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow w-full"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}

      {/* Result screen */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row px-4 md:px-8 pt-20 gap-6 z-10 relative"
        >
          {/* Floating query box */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-20"
          >
            <div className="bg-white/10 p-4 rounded-xl shadow-lg flex items-center gap-4">
              <input
                type="text"
                placeholder="Type your query..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border border-white/30 p-2 rounded text-white"
              />
              <button
                onClick={handleSend}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow"
              >
                Send
              </button>
            </div>
          </motion.div>

          {/* Left panel: Result */}
          <div className="w-full md:w-1/2 space-y-4">
            {!analysisDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black/50 p-6 rounded-xl"
              >
                <p className="text-orange-300 text-lg animate-pulse">Running terrain and rainfall analysis…</p>
              </motion.div>
            )}

            {analysisDone && result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-black/50 p-6 rounded-xl space-y-4 whitespace-pre-wrap"
              >
                <h3 className="text-xl font-bold text-orange-400">📊 Risk Analysis Result</h3>
                <p className="text-white">{result}</p>
              </motion.div>
            )}
          </div>

          {/* Right panel: Map Placeholder */}
          <div className="w-full md:w-1/2">
            <div className="bg-black/50 p-4 rounded-xl relative h-[400px] flex flex-col items-center justify-center">
              <div className="text-sm text-white text-center mb-4">
                [Interactive Map Placeholder]
              </div>
              {analysisDone && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <div className="w-10 h-10 bg-red-600 rounded-full animate-bounce mx-auto" />
                  <p className="text-orange-300 mt-1">High Risk Zone</p>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-orange-500/30 rounded-full blur-2xl" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
