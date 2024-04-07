<div align='center'>

<img src="https://i.imgur.com/mAt8Y9v.png" alt="logo" />

<h1>Wazzali</h1>
<p>Teamwork Made Easy</p>

<h4> <span> · </span> <a href="https://github.com/ibrahimhabibeg/wazzali/blob/main/README.md"> Documentation </a> <span> · </span> <a href="https://github.com/ibrahimhabibeg/wazzali/issues"> Report Bug </a> <span> · </span> <a href="https://github.com/ibrahimhabibeg/wazzali/issues"> Request Feature </a> </h4>

</div>

## 📙 Table of Contents

- [About the Project](#🔭-about-the-project)
- [Technology Stack](#🧑‍💻-technology-stack)
- [Local Installation](#🧰-local-installation)
- [Contact](#🤝-contact)
- [Acknowledgements](#💎-acknowledgements)

## 🔭 About the Project

Wazzali is a mobile app that helps university student working on group projects distribute roles efficiently and avoid arguments during project assignments.

Forming a team and assigning roles can be a hassle, often leading to arguments and wasted time.


Wazzali eliminates the stress and friction associated with role allocation.  With a user-friendly interface and a powerful algorithm, Wazzali allows teams to:

- Create teams quickly: No account creation required, just launch the app and get started.
- Define roles: Team leaders can easily define the roles needed for the project.
- Rank preferences: Team members rank their preferred roles, ensuring everyone has a say.
- Rate proficiency: Team members anonymously rate each other's skills for each role, promoting transparency and fair allocation.
- Optimized distribution: The built-in algorithm analyzes preferences and ratings to assign roles that maximize team potential.

## 🧑‍💻 Technology Stack:

**Mobile App**:
- React Native & Expo
- Zustand
- Socket.io 
- React Navigation
- React Native Paper
- Typescript

**Server**:
- Node.js 
- Typescript
- Socket.io
- Redis
- Docker

## 🧰 Local Installation:

### Prerequisites:
- Node.js
- npm
- pnpm
- Docker

### Installation Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/ibrahimhabibeg/wazzali
    ```

2. Navigate to the mobile app project directory:
    ```bash
    cd wazzali/mobile
    ```

3. Install dependencies:
    ```bash
    npm install
    ```
### Running the app:
1. Start server in development mode
    ```bash
    cd wazzali/server
    docker compose build
    docker compose up
    ```
2. Start mobile app
    ```bash
    cd wazzali/mobile
    npm run start
    ```

## 🤝 Contact

Ibrahim Habib - - ibrahimhabib.eg@gmail.com - - [LinkedIn](https://www.linkedin.com/in/ibrahim-habib-a2948b286/)

Project Link: [Github](https://github.com/ibrahimhabibeg/wazzali)

## 💎 Acknowledgements

- https://hotpot.ai/
- https://www.flaticon.com/
