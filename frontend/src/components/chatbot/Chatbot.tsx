import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatbotState } from '../../types';
import { responses } from './responses';
import { v4 as uuidv4 } from 'uuid';
import chatbotIcon from './chatbot.png';

const Chatbot: React.FC = () => {
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    messages: [],
  });

  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const getBotResponse = (message: string): string => {
    for (const { pattern, responses: botResponses } of responses) {
      if (pattern.test(message.toLowerCase())) {
        const randomIndex = Math.floor(Math.random() * botResponses.length);
        return botResponses[randomIndex];
      }
    }
    return "I'm not sure how to help with that. Could you please rephrase your question ?";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: inputRef.current.value,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: uuidv4(),
        text: getBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }, 1000);

    inputRef.current.value = '';
  };

  const toggleChat = () => {
    setState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  return (
    <div className="fixed bottom-20 right-20 z-20">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110 flex items-center space-x-2 group"
      >
        {state.isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            {/* Friendly companion avatar icon */}
            <img src={chatbotIcon} alt="Chatbot Icon" className="h-10 w-10" />
            <span className="hidden group-hover:inline text-sm font-medium whitespace-nowrap pl-1">Chat with Sathi</span>
          </>
        )}
      </button>

      {/* Chat window */}
      {state.isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl">
          {/* Chat header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center">
            <div className="w-8 h-8  rounded-full flex items-center justify-center mr-3">
              <img 
                src={chatbotIcon} 
                alt="Sathi" 
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold">Sathi</h3>
              <p className="text-sm text-blue-100">Your Travel Companion</p>
            </div>
          </div>

          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {state.messages.length === 0 && (
              <div className="text-center text-gray-500">
                <p>👋 Hi! I'm Sathi, your travel companion.</p>
                <p className="text-sm mt-2">Ask me anything about travel</p>
              </div>
            )}
            {state.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="border-t p-4">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything about travel..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
