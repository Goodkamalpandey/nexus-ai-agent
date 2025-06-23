# AUm AI : Nexus Agent MVP

A multi-model agent orchestration MVP using OpenAI, Gemini, and synthetic data.
This project is structured as a monorepo with separate components for the backend API, the frontend application, and a monitoring dashboard.

## ✨ Features

-   **Multi-Model Backend**: Orchestrates calls between different AI models like Gemini and OpenAI.
-   **Next.js Frontend**: A modern, responsive user interface built with Next.js and Tailwind CSS.
-   **Resilience Dashboard**: A real-time scorecard to monitor agent metrics like uptime, latency, and drift.

## 📂 Project Structure

-   `./backend`: Contains the Node.js API responsible for agent logic and communication with models.
-   `./frontend/nextjs-app`: The main user-facing application.
-   `./dashboard`: A React-based dashboard for visualizing resilience metrics.

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd sainexus-agent-mvp
```

### 2. Configure Environment Variables

The backend requires an API key to connect to the Google Gemini service.

1.  Navigate to the backend directory: `cd backend`
2.  Create a `.env` file: `touch .env`
3.  Add your API key to this file:

    ```env
    # /backend/.env
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```

### 3. Install Dependencies and Run

You will need to run each service (backend, frontend, dashboard) in a **separate terminal**.

**Terminal 1: Run the Backend API**
This will start the Express server on `http://localhost:8000` with hot-reloading.
```bash
cd backend
npm install
npm run dev
```

**Terminal 2: Run the Frontend Application**
```bash
cd frontend/nextjs-app
npm install
npm run dev
```
> The frontend will be available at `http://localhost:3000`.

**Terminal 3: Run the Dashboard**
```bash
cd dashboard
npm install
npm run dev
```
> The dashboard will likely be available at another port, e.g., `http://localhost:5173`.
