import os
from typing import List, Dict
import anthropic
import openai

class ChatHandler:
    """Handles chat interactions with AI providers"""

    def __init__(self):
        self.provider = os.getenv('AI_PROVIDER', 'anthropic').lower()

        if self.provider == 'anthropic':
            self.anthropic_client = anthropic.Anthropic(
                api_key=os.getenv('ANTHROPIC_API_KEY')
            )
            self.model = os.getenv('ANTHROPIC_MODEL', 'claude-3-5-sonnet-20241022')
        elif self.provider == 'openai':
            openai.api_key = os.getenv('OPENAI_API_KEY')
            self.model = os.getenv('OPENAI_MODEL', 'gpt-4-turbo-preview')
        else:
            raise ValueError(f"Unsupported AI provider: {self.provider}")

    def get_response(self, message: str, history: List[Dict] = None) -> str:
        """
        Get a response from the AI provider

        Args:
            message: The user's message
            history: Conversation history in format [{"role": "user/assistant", "content": "..."}]

        Returns:
            The AI's response as a string
        """
        if history is None:
            history = []

        if self.provider == 'anthropic':
            return self._get_anthropic_response(message, history)
        elif self.provider == 'openai':
            return self._get_openai_response(message, history)

    def _get_anthropic_response(self, message: str, history: List[Dict]) -> str:
        """Get response from Anthropic's Claude"""
        # Build messages list
        messages = history.copy()
        messages.append({
            "role": "user",
            "content": message
        })

        # Call Anthropic API
        response = self.anthropic_client.messages.create(
            model=self.model,
            max_tokens=4096,
            messages=messages,
            system="You are a helpful AI assistant similar to Claude. You provide clear, thoughtful, and detailed responses. You can help with a wide variety of tasks including answering questions, writing, analysis, math, coding, and creative projects."
        )

        return response.content[0].text

    def _get_openai_response(self, message: str, history: List[Dict]) -> str:
        """Get response from OpenAI's GPT"""
        # Build messages list
        messages = [{
            "role": "system",
            "content": "You are a helpful AI assistant similar to Claude. You provide clear, thoughtful, and detailed responses. You can help with a wide variety of tasks including answering questions, writing, analysis, math, coding, and creative projects."
        }]
        messages.extend(history)
        messages.append({
            "role": "user",
            "content": message
        })

        # Call OpenAI API
        response = openai.chat.completions.create(
            model=self.model,
            messages=messages,
            max_tokens=4096
        )

        return response.choices[0].message.content
