# EcoEcho

EcoEcho is a gamified sustainability application. This repository is a monorepo containing both the Flutter mobile application and the Node.js backend infrastructure. 

## Tech Stack Overview
* **Frontend:** Flutter (State Management: BLoC)
* **Backend:** Node.js 
* **Database:** PostgreSQL
* **Caching:** Redis
* **Core Algorithms:** Depth-First Search (DFS) for tier progression, Heap Sort for leaderboard rankings.

## Repository Structure
Since this is a monorepo, please ensure you are working within the correct directory for your tasks:
* `/frontend` - Contains all Flutter and Dart UI code.
* `/backend` - Contains the Node.js server, API routes, and PostgreSQL/Redis configurations.

---

## Contribution Guidelines

Please follow this workflow for all contributions to maintain a clean codebase and ensure seamless integration of our core algorithms :)

### 1. Branching Strategy
Never push directly to the `main` branch. Create a new branch for your work using the following naming conventions:
* `feature/short-description` (e.g., `feature/bloc-state-setup`)
* `algo/short-description` (e.g., `algo/heap-sort-leaderboard`)
* `bugfix/short-description` (e.g., `bugfix/redis-cache-latency`)

### 2. Commit Messages
Write clear, descriptive commit messages. 
* **Good:** `feat(backend): implement DFS validation for tier progression`
* **Bad:** `fixed stuff`

### 3. Pull Requests (PRs)
When your feature or algorithm is complete, push your branch and open a Pull Request against `main`. 
* **Description:** Clearly detail what the PR does. If it relates to the DAA requirements, specify time/space complexity notes in the description.
* **Review Process:** Before any code is merged, the PR **must** be reviewed and approved by at least one other core team member (Aviles, Artates, Acob, or Alapag). 

#### This is the final project requirement to the DAA course
