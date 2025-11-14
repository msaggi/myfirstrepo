// Initialize marked with options
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value;
            } catch (err) {
                console.error('Highlight error:', err);
            }
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true,
    gfm: true
});

// State
let conversationHistory = [];
let isProcessing = false;

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearChat');
const loadingTemplate = document.getElementById('loadingTemplate');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Auto-resize textarea
    userInput.addEventListener('input', autoResizeTextarea);

    // Handle form submission
    chatForm.addEventListener('submit', handleSubmit);

    // Clear chat
    clearBtn.addEventListener('click', clearChat);

    // Handle Ctrl+Enter to send
    userInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    });

    // Focus input
    userInput.focus();
});

// Auto-resize textarea
function autoResizeTextarea() {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 200) + 'px';
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message || isProcessing) return;

    // Disable input
    setProcessing(true);

    // Clear input
    userInput.value = '';
    autoResizeTextarea();

    // Remove welcome message if present
    const welcomeMessage = chatContainer.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    // Add user message
    addMessage(message, 'user');

    // Add to history
    conversationHistory.push({
        role: 'user',
        content: message
    });

    // Show loading indicator
    const loadingElement = addLoadingIndicator();

    try {
        // Send to API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                history: conversationHistory.slice(0, -1) // Don't include the current message
            })
        });

        // Remove loading indicator
        loadingElement.remove();

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to get response');
        }

        const data = await response.json();

        // Add assistant message
        addMessage(data.response, 'assistant');

        // Add to history
        conversationHistory.push({
            role: 'assistant',
            content: data.response
        });

    } catch (error) {
        // Remove loading indicator
        loadingElement.remove();

        // Show error message
        addErrorMessage(error.message);
        console.error('Chat error:', error);
    } finally {
        setProcessing(false);
        userInput.focus();
    }
}

// Add message to chat
function addMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? 'You' : 'AI';

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    if (role === 'assistant') {
        // Parse markdown for assistant messages
        messageContent.innerHTML = marked.parse(content);
    } else {
        // Plain text for user messages
        messageContent.textContent = content;
    }

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    chatContainer.appendChild(messageDiv);

    // Scroll to bottom
    scrollToBottom();
}

// Add loading indicator
function addLoadingIndicator() {
    const loadingElement = loadingTemplate.content.cloneNode(true).firstElementChild;
    chatContainer.appendChild(loadingElement);
    scrollToBottom();
    return chatContainer.lastElementChild;
}

// Add error message
function addErrorMessage(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = `Error: ${error}`;
    chatContainer.appendChild(errorDiv);
    scrollToBottom();
}

// Clear chat
function clearChat() {
    if (!confirm('Are you sure you want to clear the conversation?')) {
        return;
    }

    conversationHistory = [];
    chatContainer.innerHTML = `
        <div class="welcome-message">
            <div class="welcome-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
            </div>
            <h2>Welcome to AI Assistant</h2>
            <p>I'm here to help you with questions, writing, analysis, coding, and more. How can I assist you today?</p>
        </div>
    `;
    userInput.focus();
}

// Scroll to bottom
function scrollToBottom() {
    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
}

// Set processing state
function setProcessing(processing) {
    isProcessing = processing;
    sendBtn.disabled = processing;
    userInput.disabled = processing;

    if (!processing) {
        userInput.focus();
    }
}
