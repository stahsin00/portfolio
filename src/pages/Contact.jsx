import React, {useState} from 'react';

function Contact() {
    const [error, setError] = useState('');
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
    
    function handleSubmit(e) {
        e.preventDefault();
        setError("havent set up backend yet lol");
    };

    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            <form className="space-y-4 px-10 py-20 w-4/5 rounded-lg border border-black shadow-md" onSubmit={handleSubmit}>
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
                <div className={`text-xs text-red-500 flex justify-center ${error? 'visible' : 'invisible'}`}>{error}</div>
                <div className='flex justify-center'>
                    <button type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700">
                        Send
                    </button>
                </div>
                <div className='text-xs italic flex justify-center'>A form with better styling coming to a contact page near you eventually ;-;</div>
            </form>
        </div>
    )
}

export default Contact;