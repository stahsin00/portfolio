import React, { useState, useEffect, useRef } from 'react';
import { FaCommentDots, FaShare } from 'react-icons/fa';
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
    }, [messages]);

    const handleSend = () => {
        if (sending) return;
        setSending(true);

        const messageObject = { sender: 'user', message: curMessage };
        setMessages(prevMessages => [...prevMessages, messageObject]);
        sendMessage(curMessage);
        setCurMessage("");
    }

    const sendMessage = async (msg) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/chat`,
                {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ message: msg })
                }
              );

              if (!response.ok) {
                throw new Error('Could not chat.');
              }

            const result = await response.json();
            const messageObject = { sender: 'bot', message: result.message };
            setMessages(prevMessages => [...prevMessages, messageObject]);
        } catch (e) {
            console.error(e.message);
        } finally {
            setSending(false);
        }
    }

    const renderChat = () => {
        const messagesDivs = messages.map((msg, index) => (
            <div key={index} className={`p-2 m-2 rounded-lg w-fit max-w-[80%] ${msg.sender == 'user' ? 'ml-auto bg-gray-200' : 'bg-teal-100'}`}>
                {msg.message}
            </div>
        ));
        
        if (sending) {
            messagesDivs.push(
                <div key="sending" className="p-2 m-2 rounded-lg w-8 bg-teal-100">
                    <Dots />
                </div>
            );
        }

        return messagesDivs;
    }

    return (
        <>
            <div className='fixed bottom-0 right-0 p-5 space-y-5'>
                <button className={`${isOpen ? 'bg-teal-700' : 'bg-black'} hover:bg-teal-700 text-white p-2 rounded-full border-2 border-white border-solid`} onClick={() => setIsOPen(!isOpen)}><FaCommentDots size={32} /></button>
            </div>
            {
                isOpen ?
                <div className='bg-white fixed bottom-5 right-20 space-y-5 rounded-lg border border-black shadow-md md:w-120 md:h-4/6'>
                    <div ref={chatRef} className='w-full h-[85%] overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-track-rounded-full'>
                        {renderChat()}
                    </div>
                    <div className='absolute bottom-5 flex w-full'>
                        <input 
                            className='p-1 rounded-lg border border-gray-300 focus:outline-none w-5/6 ml-5 shadow-inner' 
                            type='text' 
                            placeholder='Type your message...'
                            value={curMessage}
                            onChange={(e) => setCurMessage(e.target.value)}
                            onKeyDown={(e) => {if (e.key === 'Enter') handleSend()}}
                        >

                        </input>
                        <button className="flex items-center justify-center w-1/6 text-teal-700" onClick={handleSend}><FaShare size={28} /></button>
                    </div>
                </div>
                :
                <></>
            }
        </>
    );
}

export default Chat;