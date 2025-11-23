
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);
  
  //à l'état initial le fade=true donc le texte est visible et le textIndex=0 donc on lit le premier message
  const messages = [
    {
      text: "Je vais t'expliquer les nombres premiers :",
      image: "/prof1.png"
    },
    {
      text: "Un nombre premier n'est divisible que par 1 et lui-même",
      image: "/prof1.png"
    },
    {
      text: "Par exemple : 2, 3, 5, 7, 11, 13, 17, 19...",
      image: "/prof1.png"
    },
    {
      text: "Attention : le nombre 1 n'est PAS un nombre premier !",
      image: "/prof1.png"
    },
    {
      text: "Le seul nombre premier pair est 2. Tous les autres sont impairs !",
      image: "/prof1.png"
    }
  ];

  
  //useEffect démarre le timer lors du montage du composant 
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); //quand fade = false alors texte est invisible(opacity -0)
      setTimeout(() => { //300ms
        setTextIndex((prev) => (prev + 1) % messages.length); //change de message grâce à la boucle et au modulo % (messages.length et prev évite les bugs de state batching)
        setFade(true); //quand fade = true alors texte est visible (opacity -100)
      }, 300);
    }, 4000);
    
    return () => clearInterval(interval); // effectue le nettoyage du timer pour éviter les fuites de mémoire
  }, []); // s'éxécute uniquement au montage et démontage

 return (
    
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* titre */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Les Nombres Premiers
          </h1>
        </div>

        {/* professeur dans la bulle */}
        <div className="flex items-start gap-6 mb-8">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl overflow-hidden">
              <img src={messages[textIndex].image} alt="¨Professeur" className="w-full h-full object-cover" /> 
            </div>
          </div>

          {/* bulle de dialogue */}
          <div className="flex-1 relative">
            <div className="bg-white rounded-2xl p-6 shadow-xl relative">
              <div className="absolute -left-3 top-8 w-6 h-6 bg-white rotate-45 shadow-lg"></div>
              
              {/* texte avec animation contrôlée par le fade en gérant une condition 
              le ${} permet d'insérer du js dans une chaîne
              et les backticks de mélanger du texte fixe et des variables (évite de mettre opérateur + parenthèses) */}
              <p 
                className={`text-lg text-gray-800 leading-relaxed transition-opacity duration-300 ${
                  fade ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {messages[textIndex].text}
              </p>

              {/* Indicateurs de progression avec dots*/}
              <div className="flex gap-2 mt-4 justify-center">
                {messages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === textIndex 
                        ? 'w-8 bg-indigo-500' 
                        : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}