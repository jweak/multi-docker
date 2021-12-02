import React from 'react';
import { Link } from 'react-router-dom';

const Page =  () => {
    return (
        <div>
            I'm some other page!
            <Link to="/">Back to home</Link>
        </div>
    )
}

export default Page;