import React, { useState } from 'react';

const ButtonTest = () => {
    const [text, setText] = useState('Initial Text');

    return (
        <div>
            <p>{text}</p>
            <button onClick={() => setText('Text After Click')}>Click me</button>
        </div>
    );
};

export default ButtonTest;
