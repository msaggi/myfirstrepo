# AI Chatbot - Claude-like Assistant

A modern, full-featured chatbot application similar to Claude, built with Python Flask and vanilla JavaScript. This chatbot supports multiple AI providers (Anthropic Claude and OpenAI GPT) and features a clean, responsive user interface.

## Features

- **Modern UI**: Clean, responsive interface inspired by Claude
- **Multiple AI Providers**: Support for both Anthropic Claude and OpenAI GPT models
- **Conversation History**: Maintains context throughout the conversation
- **Markdown Support**: Rich text formatting including code highlighting
- **Code Syntax Highlighting**: Automatic syntax highlighting for code blocks
- **Real-time Responses**: Streaming-like experience with loading indicators
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## Project Structure

```
myfirstrepo/
├── app.py                 # Flask application and API endpoints
├── chat_handler.py        # AI provider integration logic
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── static/               # Frontend assets
│   ├── index.html        # Main HTML page
│   ├── style.css         # Styling
│   └── script.js         # Frontend JavaScript
└── README.md             # This file
```

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- API key from either Anthropic or OpenAI

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd myfirstrepo
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv

   # On Windows
   venv\Scripts\activate

   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env and add your API key
   # For Anthropic Claude:
   AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=your_api_key_here

   # OR for OpenAI:
   AI_PROVIDER=openai
   OPENAI_API_KEY=your_api_key_here
   ```

## Getting API Keys

### Anthropic Claude
1. Visit https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

### OpenAI
1. Visit https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

## Usage

1. **Start the application**
   ```bash
   python app.py
   ```

2. **Open your browser**
   Navigate to `http://localhost:5000`

3. **Start chatting!**
   - Type your message in the input box
   - Press Enter or click the send button
   - Use Ctrl+Enter for quick sending
   - Click the trash icon to clear conversation

## Configuration

Edit the `.env` file to customize your chatbot:

```env
# Choose AI provider: anthropic or openai
AI_PROVIDER=anthropic

# API Keys
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here

# Model selection
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
OPENAI_MODEL=gpt-4-turbo-preview

# Server settings
FLASK_PORT=5000
FLASK_DEBUG=True
```

## API Endpoints

### POST /api/chat
Send a message to the chatbot

**Request:**
```json
{
  "message": "Hello, how are you?",
  "history": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```

**Response:**
```json
{
  "response": "I'm doing well, thank you! How can I help you today?",
  "success": true
}
```

### GET /api/health
Check the health of the API

**Response:**
```json
{
  "status": "healthy",
  "provider": "anthropic"
}
```

## Features in Detail

### Markdown Support
The chatbot supports full markdown formatting:
- **Bold** and *italic* text
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Tables
- Blockquotes
- Links and images

### Code Highlighting
Code blocks are automatically highlighted based on the language:

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

### Conversation Memory
The chatbot maintains conversation context, allowing for natural, flowing conversations where it remembers previous messages.

## Customization

### Changing the System Prompt
Edit `chat_handler.py` and modify the system message in either `_get_anthropic_response()` or `_get_openai_response()`:

```python
system="Your custom system prompt here"
```

### Styling
Modify `static/style.css` to customize the appearance. CSS variables are defined at the top for easy theme customization:

```css
:root {
    --primary-color: #2f5d8a;
    --accent-color: #4a90d9;
    /* ... more variables */
}
```

### Adding Features
The modular structure makes it easy to add new features:
- **Backend**: Modify `app.py` and `chat_handler.py`
- **Frontend**: Modify `static/script.js` and `static/index.html`

## Troubleshooting

### "No API key found"
- Ensure your `.env` file exists and contains the correct API key
- Check that the `AI_PROVIDER` matches your API key (anthropic or openai)

### "Module not found" errors
- Make sure you've activated your virtual environment
- Run `pip install -r requirements.txt` again

### Port already in use
- Change the `FLASK_PORT` in your `.env` file
- Or stop the application using that port

### API rate limits
- Both Anthropic and OpenAI have rate limits
- Check your account usage and limits
- Consider adding rate limiting to the application

## Security Notes

- Never commit your `.env` file to version control
- Keep your API keys secret
- The `.gitignore` file is configured to exclude `.env`
- Consider adding authentication for production use
- Implement rate limiting for public deployments

## Development

To run in development mode with auto-reload:

```bash
# Already enabled if FLASK_DEBUG=True in .env
python app.py
```

## Production Deployment

For production, consider:

1. **Use a production WSGI server** (like Gunicorn):
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. **Set up a reverse proxy** (nginx or Apache)

3. **Enable HTTPS** with SSL certificates

4. **Add authentication** to protect your chatbot

5. **Implement rate limiting** to prevent abuse

6. **Set `FLASK_DEBUG=False`** in production

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with Flask, a lightweight Python web framework
- UI inspired by Anthropic's Claude
- Uses Marked.js for markdown parsing
- Syntax highlighting by Highlight.js

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
