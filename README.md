# EcoEcho

Inspired by the Strava App, EcoEcho is a social environmental platform designed to document sustainable practices, track  missions, and foster community engagement through gamified tier progressions and localized leaderboards.

---

## Tech Stack Overview
* **Frontend:** Flutter (State Management: BLoC)
* **Backend:** Node.js / Express
* **Database:** PostgreSQL
* **Caching:** Redis
* **Infrastructure:** Docker Compose

---

## Repository Structure
Since this is a monorepo, please ensure you are working within the correct directory for your tasks:
* `/frontend` - Contains all Flutter and Dart UI code.
* `/backend` - Contains the Node.js server, API routes, and PostgreSQL/Redis configurations.

---

## Prerequisites
Before contributing, ensure you have the following installed on your laptop/computer :) :
1. **[Git](https://git-scm.com/downloads)**
2. **[Docker Desktop](https://www.docker.com/products/docker-desktop)** (Must be running in the background, open it when u contribute, u will see a green dot next to it)
3. **[Node.js](https://nodejs.org/)** (v18 or higher recommended)
4. **[Flutter SDK](https://docs.flutter.dev/get-started/install)** (Stable channel, e.g., v3.44.0+)
5. **[Android Studio](https://developer.android.com/studio)** (For the Android toolchain and emulator)

---

## Local Setup Instructions
Follow these exact steps to get the full application running on your laptop/computer.

### 1. Clone the Repository
```bash
git clone [https://github.com/EcoEcho-DAA/EcoEcho.git](https://github.com/EcoEcho-DAA/EcoEcho.git)
cd EcoEcho
```

### 2. Start the Database & Cache
Ensure Docker Desktop is open, then spin up PostgreSQL and Redis:
```bash
docker-compose up -d
```

### 3. Initialize the Database Schema
You need to create the tables locally. Run the following command from the root folder depending on your terminal:

#### For Windows (PowerShell/Cursor Terminal):

```PowerShell
Get-Content backend\database\init.sql -Raw | docker exec -i ecoecho-postgres psql -U eco_admin -d ecoecho_db
```

#### For Mac/Linux (Git Bash):
```Bash
docker exec -i ecoecho-postgres psql -U eco_admin -d ecoecho_db < backend/database/init.sql
```

### 4. Start the Backend Server
Install the dependencies and start the Express API:
```Bash
cd backend
npm install
npm start
The API will run on http://localhost:3000. You can verify it by checking http://localhost:3000/api/leaderboard.
```

### 5. Start the Flutter Frontend
Open a new terminal window, fetch the Dart packages, and run the app:
```Bash
cd frontend
flutter pub get
flutter run
```

---
## Contribution Guidelines

Please follow this workflow for all contributions to maintain a clean codebase and ensure seamless integration of our core algorithms :)

### 1. Branching 
Never push directly to the `main` branch. Create a new branch for your work using the following naming conventions:
* `feature/short-description` (e.g., `feature/bloc-state-setup`)
* `algo/short-description` (e.g., `algo/heap-sort-leaderboard`)
* `bugfix/short-description` (e.g., `bugfix/redis-cache-latency`)

### 2. Commit Messages
Write clear, descriptive commit messages. 
* **Good:** `feat(backend): implement DFS validation for tier progression`
* **Bad:** `fixed stuff`

### 3. Pull Requests 
When your feature or algorithm is complete, push your branch and open a Pull Request against `main`. 
* **Description:** Clearly detail what the PR does. If it relates to the DAA requirements, specify time/space complexity notes in the description.
* **Review Process:** Before any code is merged, the PR **must** be reviewed and approved by at least one other core team member.

## Project Updates (Can be changed :))
Completed:
[x] Monorepo workspace initialization
[x] Docker-compose integration (PostgreSQL + Redis)
[x] Express Server scaffolding & Database Schema implementation
[x] DAA: Max-Heap Sort algorithm (Leaderboard implementation)
[x] DAA: Depth-First Search (DFS) algorithm (Tier Progression validation)

In Progress:
[ ] DAA: Binary Search (EcoWrap percentile calculation & XP mapping)
[ ] DAA: String Matching (Find-a-Buddy UID search)
[ ] DAA: Sorting by Counting (Contribution analytics/tag tallying)
[ ] Flutter BLoC integration with backend endpoints
[ ] Final UI styling 

#### This is the final project requirement to the DAA course
