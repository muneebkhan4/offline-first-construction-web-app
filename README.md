## ⏱ Time Spent (Per Feature)

| Feature/Task                                     | Time Spent |
|--------------------------------------------------|------------|
| Project Setup                                    | 0.5 hrs    |
| RxDB setup + schema definition                   | 1.5 hrs    |
| Zustand user store                               | 0.5 hrs    |
| Task adding logic (click on image)               | 3.5 hrs    |
| Checklist editing & panel UI                     | 2.5 hrs    |
| RxDB integration & local persistence             | 2.5 hrs    |
| Component refactor and splitting                 | 2   hrs    |
| Tailwind styling                                 | 1.5 hrs    |
| Mock Backend using Joson-Server (sync logic)     | 1   hrs    |
| Sync banner logic + testing                      | 1.5 hrs    |

⏳ **Total: ~17 hrs**

---

## 🧪 Running the App Locally

### 1. Clone the Github Repository:

```bash
git clone https://github.com/muneebkhan4/offline-first-construction-web-app.git
````

### 2. Get into the project folder:

```bash
cd offline-first-construction-web-app
````

### 3. Install dependencies:

```bash
npm install
````

### 4. Start development server:

```bash
npm run dev
```

### 5. Start json server on the same project folder, in different terminal:

```bash
json-server --watch db.json --port 3001
```

This uses Vite for fast development. The app runs at:

📍 Frontend: `http://localhost:5173`

📍 Json-Server Mock Backend: `http://localhost:3001/`

---

## 🛠 Things to Improve or Refactor

> Due to limited time, here are a few things I'd like to revisit:

- 🖼️ **Make Floorplan Image Uploadable**  
  Allow users to upload a custom floor plan image instead of relying on a static one bundled with the app. This makes the tool usable across multiple projects/sites with different layouts.

- 📤 **Add optional sync server**  
  Integrate a two-way sync mechanism (e.g., CouchDB or custom API) to support real-time collaboration, enabling multiple users to work on the same floor plan with automatic updates across devices.

- 📦 **Persist user state in localStorage**  
  Save the logged-in user’s session locally so the app restores the user state after a refresh or reopening, improving UX by avoiding repeated logins.

- 🧪 **Add unit tests for core logic (task creation, editing)**  
  Add automated tests to verify task creation, checklist updates, and editing logic to ensure correctness and prevent regressions as the app evolves.

- 📱 **Responsive mobile layout still needs polishing**  
  Improve styling and layout behavior on small screens (e.g., stacked panels, resizable task list) to make the app fully functional and visually consistent on mobile devices.

---

## 🎥 Code Walkthrough Video

👉 [Click here to watch the short video walkthrough (2 min)](https://your-video-link.com)
