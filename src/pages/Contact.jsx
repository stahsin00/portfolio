import React, {useState} from 'react';
import Spinner from '../components/Spinner';

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
            console.log(apiUrl);
        
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
        <div className='flex gap-10 p-20 justify-center items-center w-screen h-screen'>
            <form className="space-y-4 p-20 w-full max-h-full rounded-lg border border-black shadow-md overflow-x-auto overflow-y-auto" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
                    <input type="text" name="name" id="name" required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                    <input type="email" name="email" id="email" required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                    <label htmlFor="message" className="block text-sm font-medium text-black">Message</label>
                    <textarea name="message" id="message" required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            <div className='w-full h-full p-10 flex flex-col justify-center items-center'>
                <img src='/portfolio/assets/girl-on-desk.png' alt='pixel art of a girl at a desk' className='h-auto w-full px-20' style={{ imageRendering: 'pixelated' }} />
            </div>
        </div>
    )
}

export default Contact;