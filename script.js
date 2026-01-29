// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const chatOverlay = document.getElementById('chat');
    const openChatBtn = document.getElementById('open-chat');
    const closeChatBtn = document.getElementById('close-chat');
    const messageInput = document.getElementById('message-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    // Tab switching
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items and tab contents
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked nav item
            item.classList.add('active');

            // Show corresponding tab content
            const tabId = item.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Chat functionality
    openChatBtn.addEventListener('click', () => {
        chatOverlay.classList.remove('hidden');
        messageInput.focus();
    });

    closeChatBtn.addEventListener('click', () => {
        chatOverlay.classList.add('hidden');
    });

    // Send message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            messageInput.value = '';

            // Simulate Henry's response
            setTimeout(() => {
                const responses = [
                    "I'll help you with that right away.",
                    "Let me check on that for you.",
                    "Good point! I'll add that to your task list.",
                    "Working on it now - I'll update you shortly.",
                    "That's a great question. Let me research that.",
                    "I've noted that for your daily brief tomorrow.",
                    "Perfect timing! I was just working on that project.",
                    "Let me prioritize that in your current goals."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'henry');
            }, 1000 + Math.random() * 2000);
        }
    }

    sendMessageBtn.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${time}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Task completion
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const label = e.target.nextElementSibling;
            if (e.target.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = '#9ca3af';
                
                // Simulate Henry acknowledging task completion
                setTimeout(() => {
                    addMessage(`Great job completing "${label.textContent}"! 🎯`, 'henry');
                }, 500);
            } else {
                label.style.textDecoration = 'none';
                label.style.color = '#374151';
            }
        });
    });

    // Progress bar animations
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill, .mini-progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Animate progress bars on load
    setTimeout(animateProgressBars, 500);

    // Add some interactive features
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL' && e.target.tagName !== 'BUTTON') {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Simulate real-time updates
    setInterval(() => {
        const progressBar = document.querySelector('.header .progress-fill');
        if (progressBar) {
            let currentWidth = parseFloat(progressBar.style.width) || 8;
            if (Math.random() > 0.7) { // 30% chance of small progress
                currentWidth += Math.random() * 0.5;
                progressBar.style.width = Math.min(currentWidth, 100) + '%';
            }
        }
    }, 30000); // Update every 30 seconds

    // Add welcome message after a short delay
    setTimeout(() => {
        addMessage("Welcome to your dashboard! I'm here to help you track your progress toward the $1M goal. How can I assist you today?", 'henry');
    }, 2000);
});

// Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}