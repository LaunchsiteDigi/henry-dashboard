// Tab Navigation and Icon Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    const navItems = document.querySelectorAll('.nav-item:not(.project-item)');
    const tabContents = document.querySelectorAll('.tab-content');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
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
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    // Send message functionality
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            messageInput.value = '';

            // Show typing indicator
            showTypingIndicator();

            // Simulate Henry's response with context-aware replies
            setTimeout(() => {
                hideTypingIndicator();
                const contextualResponse = generateContextualResponse(message);
                addMessage(contextualResponse, 'henry');
            }, 1000 + Math.random() * 2000);
        }
    }

    sendMessageBtn.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Context-aware response generation
    function generateContextualResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('schedule') || lowerMessage.includes('shift')) {
            return "I see you're asking about your schedule. Tomorrow you have a 5 AM - 4 PM shift at Lowe's. Would you like me to update your task priorities around that?";
        } else if (lowerMessage.includes('goal') || lowerMessage.includes('progress')) {
            return "You're currently at 8.3% of your $1M goal. The Trinity automation project will be a key driver. Should we prioritize that next?";
        } else if (lowerMessage.includes('trinity') || lowerMessage.includes('omar')) {
            return "The Trinity review automation is 85% complete. I can finish the n8n flow and test it with Omar's customer list. Want me to proceed?";
        } else if (lowerMessage.includes('renew') || lowerMessage.includes('clinic')) {
            return "For Renew Weight Loss, the Pearland opening needs coordination with Kate and Arelys. Should I schedule a planning call?";
        } else if (lowerMessage.includes('task') || lowerMessage.includes('todo')) {
            return "I'll add that to your task list. Which project should I categorize it under: Lowe's, Renew, Trinity, Launchsite, or Personal?";
        } else {
            const responses = [
                "I'll help you with that right away. Which business area does this relate to?",
                "Good point! Let me check your current priorities and suggest the best approach.",
                "I can handle that. Should I add it to today's focus list or schedule for later?",
                "Working on it now. I'll integrate this with your existing projects.",
                "That's a great question. Let me analyze your current workload and provide recommendations.",
                "I've noted that for follow-up. Want me to set a reminder or create a task?",
                "Perfect timing! That aligns with your $1M goal strategy. Let's prioritize it.",
                "I can automate that process. Should I build it into the existing workflows?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }

    // Typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message henry typing';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">H</div>
            <div class="message-content">
                <div class="message-text">
                    <div class="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${sender === 'henry' ? 'H' : 'C'}</div>
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Task management
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const label = e.target.nextElementSibling;
            if (e.target.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = '#9ca3af';
                
                // Simulate Henry acknowledging task completion
                setTimeout(() => {
                    addMessage(`Excellent work completing "${label.textContent}"! I've updated your progress tracking.`, 'henry');
                }, 500);
            } else {
                label.style.textDecoration = 'none';
                label.style.color = '#374151';
            }
        });
    });

    // Progress bar animations
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
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

    // Interactive card effects
    const cards = document.querySelectorAll('.section-card, .project-card, .task-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('input, button, select')) {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Simulate real-time updates
    setInterval(() => {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            if (Math.random() > 0.9) { // 10% chance of small progress update
                let currentWidth = parseFloat(bar.style.width) || 8;
                currentWidth += Math.random() * 0.5;
                bar.style.width = Math.min(currentWidth, 100) + '%';
            }
        });
    }, 30000); // Update every 30 seconds

    // Add welcome message after icons load
    setTimeout(() => {
        addMessage("Welcome to your updated dashboard! I love the new icon system. How can I help you achieve your goals today?", 'henry');
    }, 2000);

    // Re-initialize icons after DOM changes
    function reinitializeIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Call reinitializeIcons whenever new content is added
    window.reinitializeIcons = reinitializeIcons;
});

// CSS for typing indicator
const typingCSS = `
.typing-dots {
    display: flex;
    gap: 2px;
    align-items: center;
}

.typing-dots span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #94a3b8;
    animation: typing 1.4s infinite;
}

.typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.5;
    }
    30% {
        transform: translateY(-6px);
        opacity: 1;
    }
}
`;

// Add typing CSS to document
const style = document.createElement('style');
style.textContent = typingCSS;
document.head.appendChild(style);