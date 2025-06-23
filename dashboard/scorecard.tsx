// Minimal Resilience Scorecard UI using React + Recharts
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const API_BASE_URL = "http://localhost:8000"; // Assuming your backend runs on port 8000

interface Metric {
  time: string;
  uptime: number;
  latency: number;
  drift: number;
}

const Scorecard = () => {
  const [data, setData] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/metrics`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const result = await response.json(); // API now returns { status: 'success', data: [...] }
        setData(result.data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading scorecard...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        Error loading data: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Resilience Scorecard</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="uptime" stroke="#8884d8" name="Uptime (%)" />
        <Line type="monotone" dataKey="latency" stroke="#82ca9d" name="Latency (ms)" />
        <Line type="monotone" dataKey="drift" stroke="#ff7300" name="Drift" />
      </LineChart>
    </div>
  );
};

export default Scorecard;
