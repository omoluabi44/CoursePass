import React from 'react';
import { useLocation } from 'react-router-dom';

export const ScorePage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const score = queryParams.get('score');
    const total = queryParams.get('total');

    return (
        <div>
            <h1>Your Score</h1>
            <p>
                You scored {score} out of {total}.
            </p>
        </div>
    );
};
