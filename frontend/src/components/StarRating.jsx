import React, { useState } from 'react';

const StarRating = ({ rating, setRating, readOnly = false }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                    <button
                        type="button"
                        key={index}
                        className={`text-2xl focus:outline-none ${readOnly ? 'cursor-default' : 'cursor-pointer transform hover:scale-110'
                            } ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                        onClick={() => !readOnly && setRating(ratingValue)}
                        onMouseEnter={() => !readOnly && setHover(ratingValue)}
                        onMouseLeave={() => !readOnly && setHover(0)}
                        disabled={readOnly}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
