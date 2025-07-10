import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ChatBot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('chatbot.welcome'),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const commonQuestions = [
    { question: t('chatbot.q1'), answer: t('chatbot.a1') },
    { question: t('chatbot.q2'), answer: t('chatbot.a2') },
    { question: t('chatbot.q3'), answer: t('chatbot.a3') },
    { question: t('chatbot.q4'), answer: t('chatbot.a4') },
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple bot response logic
    const response = getBotResponse(inputMessage);
    const botMessage = {
      id: messages.length + 2,
      text: response,
      sender: 'bot',
      timestamp: new Date()
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('visa') && lowerMessage.includes('fee')) {
      return t('chatbot.feeResponse');
    }
    if (lowerMessage.includes('document') || lowerMessage.includes('requirement')) {
      return t('chatbot.documentResponse');
    }
    if (lowerMessage.includes('time') || lowerMessage.includes('long')) {
      return t('chatbot.timeResponse');
    }
    if (lowerMessage.includes('status') || lowerMessage.includes('check')) {
      return t('chatbot.statusResponse');
    }
    
    return t('chatbot.defaultResponse');
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage = {
      id: messages.length + 1,
      text: question,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    const answer = commonQuestions.find(q => q.question === question)?.answer || t('chatbot.defaultResponse');
    const botMessage = {
      id: messages.length + 2,
      text: answer,
      sender: 'bot',
      timestamp: new Date()
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-semibold">{t('chatbot.title')}</h3>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-red-600" />
                  </div>
                )}
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick questions */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-1">
              {commonQuestions.slice(0, 2).map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(q.question)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                >
                  {q.question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;