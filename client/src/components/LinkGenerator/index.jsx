import { useState } from 'react';
import { useView } from '../../context/UserContext';

function LinkGenerator() {
    const [link, setLink] = useState('');
    const [copied, setCopied] = useState(false);
    const { user } = useView()

    const handleClick = () => {
        // Generate your link here, e.g.:
        const generatedLink = `http://localhost:5173/register/${user.username}`;

        // Set the link in state
        setLink(generatedLink);
    };

    const handleCopy = () => {
        // Copy the link to the clipboard
        navigator.clipboard.writeText(link);

        console.log(link)

        // Set copied state to true and reset after 2 seconds
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className='outerbox min-h-20 rounded-lg border-dashed border-transparent bg-blue-100 p-2 transition-colors duration-150 hover:border-gray-400 hover:bg-blue-200 w-full'>
            <button className='send-button bg-blue-500 hover:color-bg-4 focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none hover:bg-blue-200 hover:text-black undefined w-full' onClick={handleClick}>Generate Registration Link</button>
            {link && (
                <div>
                    <input className='wrap border flex  justify-center mx-auto m-2 rounded-lg border-gray-400 bg-blue-50 mb-2 rounded-md bg-blue-50 py-2 px-4 text-sm text-center shadow-md border-gray-400 transition-colors duration-150 hover:bg-blue-300 hover:text-white false w-full' type="text" value={link} readOnly />
                    <br />
                    <button className='send-button bg-blue-500 hover:color-bg-4 focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none hover:bg-blue-200 hover:text-black undefined w-full' onClick={handleCopy}>Copy Link</button>
                </div>
            )}
            {copied && (
                <div className='clipboard-copy-message' style={{ color: 'blue' }}>Copied to clipboard!</div>
            )}
        </div>
    );
}

export default LinkGenerator;
