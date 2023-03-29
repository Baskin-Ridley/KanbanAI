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
        navigator.clipboard.writeText(string(link));

        // Set copied state to true and reset after 2 seconds
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className=''>
            <button onClick={handleClick}>Generate Link</button>
            {link && (
                <div>
                    <input type="text" value={link} readOnly />
                    <br />
                    <button onClick={handleCopy}>Copy Link</button>
                </div>
            )}
            {copied && (
                <div style={{ color: 'green' }}>Copied to clipboard!</div>
            )}
        </div>
    );
}

export default LinkGenerator;
