# Prompt for Antigravity AI Coding Assistant

You are an expert frontend developer and JavaScript UI engineer.

Your task is to ADD a fully functional chatbot component to my existing portfolio website.

The project already contains:

- `index.html`
- `bg.js`
- A cyber-glassmorphism portfolio UI
- A Three.js animated background

You must enhance the website by adding:

1. A sleek floating chatbot interface
2. Intelligent frontend chatbot logic
3. Automatic scrolling behavior
4. Smart keyword/regex-based responses
5. Section auto-navigation behavior

The chatbot must visually match the existing futuristic black-and-white cyber glassmorphism aesthetic.

---

# Project Requirements

You MUST:

- Modify the existing `index.html`
- Create a NEW file:
  - `chatbot.js`

Do NOT break the current layout or Three.js background.

The chatbot must appear layered above the UI.

---

# Core Objective

Build a floating AI-style assistant chat window that:

- Accepts user questions
- Displays user messages dynamically
- Generates instant responses
- Detects intent using regex keyword matching
- Automatically scrolls to relevant website sections
- Maintains a futuristic cyber-glassmorphism appearance

The chatbot should feel:

- Modern
- Premium
- Interactive
- Minimal
- Smooth
- Intelligent

---

# Chat Window Requirements

## Positioning

The chat window MUST be:

- Fixed to the bottom-right corner
- Responsive on mobile and desktop
- Always visible above the content

Use styling similar to:

```css
position: fixed;
bottom: 20px;
right: 20px;
z-index: 9999;
```

---

# UI Design Requirements

The chatbot MUST match the website theme:

- Black-and-white gradients
- Cyber-glassmorphism styling
- Frosted glass effect
- Transparent panels
- Blur effects
- Soft glowing borders
- Smooth hover animations

Use ONLY:

- HTML
- CSS
- Vanilla JavaScript

DO NOT use:

- React
- Vue
- Tailwind
- Bootstrap
- jQuery
- External chatbot libraries

---

# Chat UI Components

The chatbot should contain:

## 1. Header

Include:

- Bot title
- Online status indicator
- Minimize button (optional)

Example titles:

- AI Assistant
- Portfolio Bot
- Cyber Assistant

---

## 2. Chat Messages Area

This section should:

- Display both user and bot messages
- Use different bubble styles
- Auto-scroll to the newest message
- Support smooth animations

Bot messages:
- Left aligned

User messages:
- Right aligned

---

## 3. Input Area

Include:

- Text input field
- Send button
- Enter key support

The input area should remain fixed inside the chatbot.

---

# HTML Integration Requirements

Inject the chatbot HTML directly into `index.html`.

Place it near the end of the `<body>` section.

Also link the new script file:

```html
<script src="chatbot.js"></script>
```

Place it before:

```html
</body>
```

---

# CSS Requirements

The chatbot styling MUST:

- Stay inside the existing `<style>` tag
OR
- Be added to the existing internal CSS system

Do NOT create external CSS files.

---

# chatbot.js Requirements

Create a new file:

```txt
chatbot.js
```

This file must contain ALL chatbot functionality.

---

# Core JavaScript Features

The chatbot logic MUST:

- Read user input
- Append user messages to chat
- Generate instant bot responses
- Append bot messages dynamically
- Auto-scroll messages container
- Detect questions using regex keyword matching

---

# Regex Matching Requirements

The chatbot MUST intelligently detect similar questions.

Do NOT only match exact phrases.

Use flexible regex and keyword detection.

The bot should understand variations like:

- "What skills do you have?"
- "Tell me about your skills"
- "What technologies do you know?"
- "What are your projects?"
- "Tell me about yourself"
- "Who are you?"
- "What have you built?"
- "Show me your work"

and many similar variants.

---

# REQUIRED RESPONSE BEHAVIORS

## Skills Questions

If the user asks about:

- Skills
- Technologies
- Tools
- Expertise
- Tech stack
- Programming languages

The chatbot MUST:

1. Respond with:
```txt
[Information about my given skills on the website]
```

2. Automatically scroll the page smoothly to:
```txt
Skills section
```

Use:
```javascript
scrollIntoView({
    behavior: 'smooth'
});
```

---

# About Me Questions

If the user asks about:

- About me
- Who are you
- Tell me about yourself
- Background
- Education
- Experience

The chatbot MUST:

1. Respond with:
```txt
[Information given about me in the 'about me' section of the website]
```

2. Smoothly scroll to:
```txt
About Me section
```

---

# Projects Questions

If the user asks about:

- Projects
- Portfolio work
- Applications built
- Work samples
- Things you've created
- What have you made

The chatbot MUST:

1. Respond with:
```txt
[Information given about the projects ive made in the 'projects' section of the website]
```

2. Smoothly scroll to:
```txt
Projects section
```

---

# IMPORTANT INTELLIGENCE REQUIREMENT

The chatbot MUST NOT rely only on exact string matches.

Implement robust regex logic.

Example:

```javascript
/about|who are you|yourself|background|experience/i
```

The chatbot should intelligently handle many similar phrasings.

---

# Default Response Requirement

If no keyword matches:

Respond with something like:

```txt
I'm not sure about that yet. Try asking about my skills, projects, or background.
```

---

# Auto-Scroll Requirements

The messages container MUST automatically scroll to the latest message whenever:

- User sends a message
- Bot sends a response

Use logic similar to:

```javascript
chatMessages.scrollTop = chatMessages.scrollHeight;
```

---

# Animation Requirements

Add smooth animations:

- Fade-in messages
- Hover transitions
- Button animations
- Smooth expand effects

Animations should feel modern and premium.

---

# Responsiveness Requirements

The chatbot MUST work perfectly on:

- Desktop
- Laptop
- Tablet
- Mobile

Ensure:

- No overflow issues
- Responsive width
- Proper spacing
- Mobile-friendly input field

---

# Accessibility Requirements

Ensure:

- Keyboard support
- Enter key submission
- Readable contrast
- Proper focus states

---

# Suggested DOM Structure

Example structure:

```html
<div class="chatbot-container">
    <div class="chatbot-header"></div>
    <div class="chatbot-messages"></div>
    <div class="chatbot-input-area"></div>
</div>
```

---

# Code Quality Requirements

Write:

- Clean code
- Modular logic
- Well-commented sections
- Production-quality structure

Use:

- Semantic variable names
- Organized functions
- Readable formatting

---

# IMPORTANT INTEGRATION RULES

DO NOT:

- Break the existing UI
- Remove Three.js functionality
- Modify existing sections unnecessarily
- Add external chatbot APIs
- Add unnecessary libraries

ONLY enhance the project.

---

# Final Expected Experience

When the website loads:

1. A futuristic chatbot appears at the bottom-right
2. User types a question
3. Message appears instantly
4. Bot responds intelligently
5. Website scrolls to relevant sections
6. Chat auto-scrolls smoothly
7. The UI feels polished and premium

---

# Output Instructions

IMPORTANT:

Output ONLY:

1. The updated `index.html`
2. The complete `chatbot.js`

Format output exactly like:

```txt
--- index.html ---
(code)

--- chatbot.js ---
(code)
```

Do NOT include explanations outside the code output.