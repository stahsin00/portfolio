import React, {useState} from 'react';
import Spinner from '../components/Spinner';
import { FaRegMessage } from "react-icons/fa6";

function Contact() {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };
    
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        
        try {
            const data = {name: formData.name, email: formData.email, message: formData.message};
            const apiUrl = `${import.meta.env.VITE_API_URL}/contact/submit`;
        
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        
            if (response.ok) {
                setSuccess("Message sent.");
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                setError("Unable to send message, try again later.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex gap-10 p-5 md:p-20 justify-around items-center w-screen h-screen'>
            <form className="space-y-2 p-5 md:px-10 md:py-7 2xl:p-20 w-full max-h-full rounded-lg border border-black shadow-md overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-track-rounded-full" onSubmit={handleSubmit}>
                <h2 className="text-black text-l font-bold mb-1 hidden lg:flex items-center"><FaRegMessage className='mr-2' /> Contact</h2>
                <hr className='hidden lg:flex p-2'></hr>
                <div className='pb-2'>
                    <label htmlFor="name" className="block text-xs 2xl:text-sm font-medium text-black">Name</label>
                    <input type="text" name="name" id="name" required
                        className="mt-1 block w-full px-2 2xl:px-3 py-1 2xl:py-2 border border-gray-300 rounded-md shadow-sm"
                        value={formData.name} onChange={handleChange} />
                </div>
                <div className='pb-2'>
                    <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                    <input type="email" name="email" id="email" required
                        className="mt-1 block w-full px-2 2xl:px-3 py-1 2xl:py-2 border border-gray-300 rounded-md shadow-sm"
                        value={formData.email} onChange={handleChange} />
                </div>
                <div className='pb-2'>
                    <label htmlFor="message" className="block text-sm font-medium text-black">Message</label>
                    <textarea name="message" id="message" required
                        className="mt-1 block w-full px-2 2xl:px-3 py-1 2xl:py-2 border border-gray-300 rounded-md shadow-sm"
                        value={formData.message} onChange={handleChange}></textarea>
                </div>
                <div className='flex justify-center'>
                    <button type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700">
                        Send
                    </button>
                </div>
                <div className={`text-xs flex justify-center h-6 ${(error || success || loading)? 'visible' : 'invisible'}`}>
                    {loading ? 
                        <Spinner size={"24px"} /> 
                        : 
                        error ? 
                            <div className={`text-red-500 italic`}>{error}</div>
                            :
                            <div className={`text-green-500`}>{success}</div>
                    }
                </div>
            </form>
            <div className='w-full h-full p-10 hidden lg:flex flex-col justify-center items-center'>
                <img src='/assets/girl-on-desk.png' alt='pixel art of a girl at a desk' className='h-auto w-full px-20' style={{ imageRendering: 'pixelated' }} />
            </div>
        </div>
    )
}

export default Contact;