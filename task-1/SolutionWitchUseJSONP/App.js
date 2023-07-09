import { useEffect, useState } from 'react';
import JSONPRequest from './JSONPRequest';

function App() {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [reloadJSONP, setReloadJSONP] = useState(false);

    const getQuote = async () => {
        try {
            setIsLoading(true);
            window.parseQuote = (response) => {
                if (response) {
                    setQuote({
                        text: response['quoteText'],
                        author: response['quoteAuthor'],
                    });
                }
            };
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReloadJSONP = () => {
        setReloadJSONP((prevState) => !prevState);
    };

    useEffect(() => {
        getQuote();
    }, [reloadJSONP]);

    return (
        <>
            <JSONPRequest key={reloadJSONP.toString()}/>
            <div className='title fs-1 text-center'>Random Quotes</div>
            <div className='content text-center'>
                {isLoading ? (
                    <div
                        className='spinner-border m-4'
                        style={{ width: '3em', height: '3em' }}
                        role='status'
                    >
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                ) : (
                    <>
                        <div className='quote text-center m-4'>{quote.text}</div>
                        <div className='author fs-4 text-center mb-4'>
                            {quote.author === '' ? 'Неизвестно' : quote.author}
                        </div>
                    </>
                )}
            </div>
            <div className='text-center'>
                <div className='btn btn-success fs-5' onClick={handleReloadJSONP}>
                    new quote
                </div>
            </div>
        </>
    );
}

export default App;
