"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useConversation } from '@elevenlabs/react';
import { Mic, MicOff } from 'lucide-react';
// done
const ChatWidget = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const [conversationState, setConversationState] = useState({
    status: 'disconnected',
    isSpeaking: false,
    hasPermission: false,
    isMuted: false,
    errorMessage: '',
    isListening: false,
    aiResponse: ''
  });

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs');
      setConversationState(prev => ({ ...prev, status: 'connected', errorMessage: '' }));
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs');
      setConversationState(prev => ({ ...prev, status: 'disconnected' }));
    },
    onMessage: (message) => {
      if (message.role === 'assistant') {
        setConversationState(prev => ({ ...prev, aiResponse: message.content }));
      }
    },
    onError: (error) => {
      console.error('ElevenLabs Error:', error);
      setConversationState(prev => ({ ...prev, errorMessage: error?.message || 'An error occurred with the voice service' }));
    },
  });


  // ✅ Automatically start conversation when second modal opens
  useEffect(() => {
    if (isSecondModalOpen) {
      toggleConversation();
    }
  }, [isSecondModalOpen]);

  const toggleConversation = async () => {
    try {
      if (conversationState.status === 'connected' && conversationState.isListening) {
        setConversationState(prev => ({ ...prev, isListening: false }));
      } else if (conversationState.status === 'connected') {
        setConversationState(prev => ({ ...prev, isListening: true }));
      } else {
        await conversation.startSession({
          agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
        });
        setConversationState(prev => ({ ...prev, isListening: true }));
      }
    } catch (error) {
      console.error('Error toggling conversation:', error);
      setConversationState(prev => ({ ...prev, errorMessage: error?.message || 'Failed to toggle conversation' }));
    }
  };

  const cleanupConversation = () => {
    if (conversationState.status === 'connected') {
      conversation.endSession().catch(console.error);
      setConversationState(prev => ({
        ...prev,
        status: 'disconnected',
        isListening: false,
        aiResponse: ''
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d+$/.test(formData.phone)) {
      errors.phone = 'Phone number should contain only numbers';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

// ❌ remove the useEffect with requestMicPermission

const handleFirstModalSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setConversationState(prev => ({ ...prev, hasPermission: true }));
      setIsFirstModalOpen(false);
      setIsSecondModalOpen(true); // triggers useEffect to start conversation
    } catch (error) {
      console.error('Error accessing microphone:', error);

      if (error.name === "NotAllowedError") {
        // Mic blocked in browser settings
        setConversationState(prev => ({
          ...prev,
          hasPermission: false,
          errorMessage: 'Microphone is blocked. Please enable it in your browser settings.'
        }));
      } else {
        setConversationState(prev => ({
          ...prev,
          hasPermission: false,
          errorMessage: 'Unable to access microphone.'
        }));
      }
    }
  }
};



  const handleImageClick = (e) => {
    e.stopPropagation();
    toggleConversation();
  };

  return (
    <>
      {/* Floating Button */}
      <div className="chat-widget " onClick={() => setIsFirstModalOpen(true)}>
        <div className="chat-widget-icon">
          <Image src="/assets/bot.png" alt="AI Assistant"
          className="ai-logo object-cover" 
          width={80}
          height={80}
          />
        </div>
        <div>
          <div className="chat-widget-image">
            <Image src="/assets/bot.png" alt="AI Assistant" width={20} height={20} />
          </div>
          <div className='flex items-center'>
            <div>
                {/* <Image src={'/assets/bot.png'} alt="bot"
                width={80} height={80} /> */}
                </div>
            <span className="font-bold text-[#5686DA]">Let's Talk</span>
          </div>
        </div>
      </div>

      {/* First Modal */}
      {isFirstModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => {
              cleanupConversation();
              setIsFirstModalOpen(false);
            }}>×</button>
            <div className="modal-logo">
              <Image src="/assets/bot.png" alt="AI Assistant"
         width={120}
         height={120}
className="w-full h-auto"               
              />
            </div>
            {conversationState.aiResponse && (
              <p className="text-white mt-4 mb-4 max-h-40 overflow-y-auto">
                {conversationState.aiResponse}
              </p>
            )}
            <h2>Hi, Ready To Talk to Me</h2>
            <form onSubmit={handleFirstModalSubmit} className='flex flex-col gap-6'>
              <div className="form-group">
                <input type="text" name="name" className='min-w-full bg-[#FFFFFF33] text-white border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent' placeholder="Your name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" className='min-w-full bg-[#FFFFFF33] text-white border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent' placeholder="Email address" value={formData.email} onChange={handleInputChange} required />
              </div>
               <div className="form-group">
                <div className="flex gap-1 w-full">
                  <select 
                    className="country-code country min-w-[80px] bg-[#FFFFFF33] text-white border border-[rgba(255,255,255,0.1)] rounded-lg px-1 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent"
                    style={{ WebkitAppearance: 'none' }}
                  >
                  <option value="+971" className="text-black"> +971</option>
<option value="+92" className="text-black">  +92 </option>
<option value="+91" className="text-black">  +91 </option>
<option value="+966" className="text-black"> +966 </option>
<option value="+965" className="text-black"> +965 </option>
<option value="+974" className="text-black"> +974 </option>
<option value="+968" className="text-black"> +968 </option>
<option value="+973" className="text-black"> +973 </option>
<option value="+880" className="text-black"> +880 </option>
<option value="+20" className="text-black">  +20 </option>
<option value="+60" className="text-black">  +60 </option>
<option value="+63" className="text-black">  +63 </option>
<option value="+62" className="text-black">  +62 </option>
<option value="+65" className="text-black">  +65 </option>

                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="flex-1 bg-[#FFFFFF33] border border-[rgba(255,255,255,0.1)] rounded-lg px-2 py-2 text-white placeholder-[rgba(255,255,255,0.6)] focus:outline-none focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent"
                  />
                </div>
              </div>
        <button type="submit" 

        className="w-full text-black py-2 rounded-3xl submit-button bg-(--color-primary)  hover:bg-(--color-primary)/60 cursor-pointer"
      
      >              <div className="flex items-center justify-center gap-2">
                        {/* <img
                          src="/assets/ai-bot.png"
                          alt=""
                          className="w-5 h-5"
                        /> */}
                        <span className='text-white '>Connect to AI Assistant</span>
                      </div>
                    </button>
            </form>
            {conversationState.errorMessage && (
  <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
    {conversationState.errorMessage}
  </div>
)}
          </div>
        </div>
      )}


      {/* Second Modal */}
      {isSecondModalOpen && (
        <div className="modal-overlay" onClick={() => {
          cleanupConversation();
          setIsSecondModalOpen(false);
        }}>
          <div className="modal-content chat-modal" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <div className={`modal-logo cursor-pointer ${conversationState.isListening ? 'animate-pulse' : ''}`} onClick={handleImageClick}>
                <img src="/assets/ai-bot.png" alt="AI Assistant" className={`w-12 h-12 ${conversationState.isListening ? 'ring-2 ring-purple-500 rounded-full' : ''}`} />
              </div>
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${conversationState.isListening ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                  {conversationState.isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </div>
                <button onClick={() => {
                  cleanupConversation();
                  setIsSecondModalOpen(false);
                }} className="close-button ml-2">
                  ×
                </button>
              </div>
            </div>

            {!conversationState.hasPermission && (
              <div className="text-yellow-600 text-sm mb-4 p-2 bg-yellow-50 rounded">
                Please allow microphone access to use voice chat
              </div>
            )}
            {conversationState.errorMessage && (
              <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
                {conversationState.errorMessage}
              </div>
            )}
            {conversationState.aiResponse && (
              <p className="text-white mt-4 mb-4 max-h-40 overflow-y-auto">
                {conversationState.aiResponse}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
