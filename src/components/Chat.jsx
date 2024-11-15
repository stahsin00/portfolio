import React, { useState, useEffect, useRef } from 'react';
import { FaCommentDots, FaShare, FaTimes } from 'react-icons/fa';
import Dots from './Dots';

function Chat() {
    const [isOpen, setIsOPen] = useState(false);
    const [curMessage, setCurMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [sending, setSending] = useState(false);
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (sending) return;
        setSending(true);

        const messageObject = { role: 'user', content: curMessage };

        setMessages(prevMessages => [...prevMessages, messageObject]);
        sendMessage(messageObject);

        setCurMessage("");
    }

    const sendMessage = async (messageObject) => {
        try {
            const newMessages = [...messages, messageObject];

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/chat`,
                {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ messages: newMessages })  // TODO: backend session management
                }
              );

              if (!response.ok) {
                throw new Error('Could not chat.');
              }

            const result = await response.json();
            const assistantMessage = { role: 'assistant', content: result.message };
            setMessages(prevMessages => [...prevMessages, assistantMessage]);
        } catch (e) {
            console.error(e.message);
        } finally {
            setSending(false);
        }
    }

    const renderChat = () => {
        if (!messages.length) {
            return (
                <div className='w-full h-full flex justify-center items-center text-center text-teal-800 p-20'>
                    Hi! Ask me anything about Shushama’s projects, skills, or experience.
                </div>
            );
        }
        const messagesDivs = messages.map((msg, index) => (
            <div key={index} className={`p-2 m-2 rounded-lg w-fit max-w-[80%] ${msg.role == 'user' ? 'ml-auto bg-gray-200' : 'bg-gray-100 text-teal-800'}`}>
                {msg.content}
            </div>
        ));
        
        if (sending) {
            messagesDivs.push(
                <div key="sending" className="p-2 m-2 rounded-lg w-8 bg-gray-100 text-teal-800">
                    <Dots />
                </div>
            );
        }

        return messagesDivs;
    }

    return (
        <div className='flex'>
            <div className='fixed bottom-0 right-0 p-5 space-y-5'>
                <button className={`${isOpen ? 'bg-teal-700' : 'bg-black'} hover:bg-teal-700 text-white p-2 rounded-full border-2 border-white border-solid`} onClick={() => setIsOPen(!isOpen)}>
                    <FaCommentDots size={32} />
                </button>
            </div>
            {
                isOpen ?
                <div className='bg-white fixed top-0 left-0 md:top-auto md:left-auto md:bottom-5 md:right-20 space-y-5 md:rounded-lg border border-black shadow-md w-full h-full md:w-120 md:h-4/6 flex flex-col'>
                    <div className='m-0 p-0 pb-2'>
                        <button className="absolute right-0 flex items-center justify-center text-teal-700 p-1 m-1 rounded-full" onClick={() => setIsOPen(!isOpen)}>
                            <FaTimes size={18} />
                        </button>
                    </div>
                    <div ref={chatRef} className='w-full flex-grow overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-track-rounded-full'>
                        {renderChat()}
                    </div>
                    <div className='pb-5 flex w-full'>
                        <input 
                            className='p-1 rounded-lg border border-gray-300 focus:outline-none w-5/6 ml-5 shadow-inner' 
                            type='text' 
                            placeholder='Type your message...'
                            value={curMessage}
                            onChange={(e) => setCurMessage(e.target.value)}
                            onKeyDown={(e) => {if (e.key === 'Enter') handleSend()}}
                        >

                        </input>
                        <button className="flex items-center justify-center w-1/6 text-teal-700" onClick={handleSend}>
                            <FaShare size={28} />
                        </button>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    );
}

export default Chat;