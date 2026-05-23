document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chatbot-messages');
    const minimizeBtn = document.getElementById('minimize-bot');
    const chatbot = document.getElementById('chatbot');
    const avatarContainer = document.getElementById('assistant-avatar-container');

    // Minimize toggle
    minimizeBtn.addEventListener('click', () => {
        chatbot.classList.toggle('minimized');
        if (avatarContainer) {
            avatarContainer.classList.toggle('minimized');
        }
        if (chatbot.classList.contains('minimized')) {
            minimizeBtn.textContent = '+';
        } else {
            minimizeBtn.textContent = '−';
        }
    });

    function appendMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processInput(input) {
        appendMessage(input, true);
        chatInput.value = '';

        // Add a small delay for realism
        setTimeout(() => {
            generateResponse(input);
        }, 600); 
    }

    function generateResponse(input) {
        const lowerInput = input.toLowerCase();

        // Regex patterns for intelligent keyword detection
        const skillsRegex = /skill|technolog|tool|expert|tech stack|program|language/i;
        const aboutRegex = /about|who are you|yourself|background|education|experience/i;
        const projectsRegex = /project|portfolio|work|application|built|made|created/i;

        let response = "I'm not sure about that yet. Try asking about my skills, projects, or background.";

        if (skillsRegex.test(lowerInput)) {
            response = "I have expertise in ReactJS, Java, JavaScript, MongoDB, ExpressJS, Node.js, HTML, CSS, Solidity, and basic blockchain development.";
            appendMessage(response, false);
            document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
        } else if (aboutRegex.test(lowerInput)) {
            response = "I am a curious and hardworking developer. My goal is to build innovative software solutions and grow into a skilled full-stack or blockchain developer.";
            appendMessage(response, false);
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        } else if (projectsRegex.test(lowerInput)) {
            response = "I have built several projects, including a Blockchain-Based Voting System, a Modern Portfolio Website, and a MERN Stack Application. You can see them in my projects section!";
            appendMessage(response, false);
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        } else {
            appendMessage(response, false);
        }
    }

    chatSend.addEventListener('click', () => {
        const input = chatInput.value.trim();
        if (input) processInput(input);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const input = chatInput.value.trim();
            if (input) processInput(input);
        }
    });
});
