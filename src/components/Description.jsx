import { useState } from 'react';

const Description = ({ description = "" }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const MAX_LENGTH = 300;
    const shouldTruncate = description.length > MAX_LENGTH;
    const displayedText = isExpanded ? description : description.slice(0, MAX_LENGTH);

    return (
        <div className="text-xs font-medium mb-1 capitalize">
            {displayedText}
            {shouldTruncate && !isExpanded && '...'}
            {shouldTruncate && (
                <button
                    className="ml-1 text-blue-600 hover:underline"
                    onClick={toggleExpand}
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                </button>
            )}
        </div>
    );
};

export default Description;
