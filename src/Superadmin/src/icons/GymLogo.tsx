const GymLogo = ({ size = 24, className = "" }) => {
    return (
        <div
            className={`inline-flex items-center justify-center rounded-lg overflow-hidden ${className}`}
            style={{
                width: size,
                height: size,
                backgroundColor: '#2D89EF' 
            }}
        >
            <svg
                width="65%"
                height="65%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6 6L18 18M18 18V12M18 18H12M6 6V12M6 6H12"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default GymLogo;