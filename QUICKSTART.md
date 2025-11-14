# Quick Start Guide

Get your chatbot running in 5 minutes!

## Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

## Step 2: Set Up Your API Key

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and add your API key. Choose ONE of these options:

### Option A: Use Anthropic Claude (Recommended)
```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Option B: Use OpenAI GPT
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-key-here
```

## Step 3: Run the Application

```bash
python app.py
```

## Step 4: Open Your Browser

Navigate to: **http://localhost:5000**

## That's it!

Start chatting with your AI assistant!

---

## Need Help?

- **No API key?** Check the README.md for instructions on getting one
- **Errors?** See the Troubleshooting section in README.md
- **Want to customize?** See the Customization section in README.md

## Example Conversation Starters

Try asking:
- "Explain how machine learning works"
- "Write a Python function to reverse a string"
- "What are the best practices for writing clean code?"
- "Help me debug this code: [paste your code]"
- "Summarize the main points of [topic]"
