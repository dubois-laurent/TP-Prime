export function Button({handleClick, children, disabled, className = ""}) {
    return (
        <button 
            onClick={handleClick}
            disabled={disabled}
            className={className}
        >
            {children}
        </button>
    );
}