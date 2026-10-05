# Mainframe® — Creative Agency Experience
A cinematic, interactive creative agency landing page built with React, TypeScript, and Vite.

The project explores how motion, video interaction, typography, and minimal UI can be combined to create an immersive agency-style web experience without sacrificing usability or responsiveness.

## About the Project

Mainframe® is a concept website for a modern creative agency.

Rather than building a traditional static landing page, I focused on creating an interactive experience where the background video becomes part of the interface itself.

Users can interact with the video through mouse and touch movement, while custom playback controls, animated typography, responsive navigation, and modal-based content keep the interface minimal.

## Features

- Interactive full-screen background video
- Mouse-controlled video scrubbing
- Touch-based scrubbing for mobile devices
- Custom play/pause controls
- Custom mute/unmute controls
- Video progress and timestamp tracking
- Typewriter text animation
- Responsive desktop and mobile navigation
- Interactive information modals
- Contact/inquiry interaction
- Responsive layout across screen sizes
- Cinematic overlays for improved text readability

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- HTML5 Video API

## Technical Highlights

### Interactive Video Scrubbing

One of the main technical challenges was turning the background video into an interactive element.

Mouse and touch movement are converted into changes in the video's playback position. The implementation also controls seeking to avoid repeatedly flooding the browser with video seek operations.

### Custom Video State

The interface tracks and synchronizes:

- Current playback position
- Video duration
- Playback progress
- Play/pause state
- Mute state

This allowed me to build custom controls instead of relying on the browser's default video UI.

### Reusable Typewriter Hook

The animated introduction is implemented using a custom `useTypewriter` React hook, keeping the animation logic separate from the main UI component.

### Responsive Interaction

Desktop mouse interaction and mobile touch interaction are handled separately while controlling the same video experience.

## Project Structure

```text
src/
├── components/
│   └── InfoModal.tsx
├── hooks/
│   └── useTypewriter.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Getting Started

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## What I Practiced

This project gave me practical experience with:

- React state and lifecycle management
- TypeScript in React applications
- Custom React hooks
- `useRef` for DOM and mutable state management
- `useCallback` and event handling
- HTML5 Video API
- Mouse and touch events
- Responsive interface design
- Component organization
- Interactive UI development

## Future Improvements

- Improve accessibility and keyboard navigation
- Add automated component tests
- Optimize video loading and performance
- Further improve mobile interactions
- Extract additional UI logic into reusable components
- Add reduced-motion support


Built as a frontend portfolio project focused on interaction, motion, and modern web experiences.