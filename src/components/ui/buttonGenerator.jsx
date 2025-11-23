
export function Button({handleClick, children, disabled}) {

    return (
        <button 
            onClick={handleClick}
            disabled={disabled}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-500 disabled:hover:to-purple-600 transform hover:scale-105 active:scale-95"
        >
            {children}
        </button>
    );
}