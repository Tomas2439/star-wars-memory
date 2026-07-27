import { useState, useEffect, useRef } from 'react';
import Scoreboard from './components/Scoreboard';
import CardGrid from './components/CardGrid';

function App() {
  const [cards, setCards] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [mode, setMode] = useState('Padawan');

  // ESTADOS PARA LOS MODALES Y MÚSICA
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false); //Estado de victoria
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4); //Estado para el volumen (0.0 a 1.0)

  const audioRef = useRef(new Audio('TPOTF.mp3'));

  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    if (isPlaying) {
      audioRef.current.play().catch(e => console.log("El navegador bloqueó el autoplay", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, volume]);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const pickCardsToDisplay = (allCards, currentClicked) => {
    const unclicked = allCards.filter(card => !currentClicked.includes(card.id));
    if (unclicked.length === 0) return shuffleArray(allCards).slice(0, 5);

    const guaranteedNew = shuffleArray(unclicked)[0];
    const remainingPool = allCards.filter(card => card.id !== guaranteedNew.id);
    const otherFour = shuffleArray(remainingPool).slice(0, 4);

    return shuffleArray([guaranteedNew, ...otherFour]);
  };

  useEffect(() => {
    const fetchJedis = async () => {
      try {
        const response = await fetch('https://akabab.github.io/starwars-api/api/all.json');
        const data = await response.json();

        const padawanList = ['Luke Skywalker', 'Yoda', 'Obi-Wan Kenobi', 'Palpatine', 'Darth Maul', 'Qui-Gon Jinn', 'Dooku', 'Rey'];
        const jediList = [...padawanList, 'Darth Vader', 'Leia Organa', 'Han Solo', 'Chewbacca', 'Boba Fett', 'Lando Calrissian', 'C-3PO', 'R2-D2'];

        const currentList = mode === 'Padawan' ? padawanList : jediList;

        const jediCharacters = data
          .filter(char => currentList.includes(char.name))
          .map(jedi => ({
            id: jedi.id,
            name: jedi.name,
            image: jedi.image
          }));

        setCards(jediCharacters);
        setDisplayedCards(pickCardsToDisplay(jediCharacters, []));
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchJedis();
  }, [mode]);

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      // PERDIÓ
      if (score > bestScore) setBestScore(score);
      setGameOver(true);
    } else {
      const newScore = score + 1;
      const newClicked = [...clickedCards, id];

      setScore(newScore);
      setClickedCards(newClicked);

      if (newScore === cards.length) {
        // ¡GANÓ!
        if (newScore > bestScore) setBestScore(newScore);
        setVictory(true); // En lugar del alert, activamos el modal de victoria
      } else {
        setDisplayedCards(pickCardsToDisplay(cards, newClicked));
      }
    }
  };

  // Función para reiniciar el tablero (se usa en ambos modales)
  const resetGame = () => {
    setScore(0);
    setClickedCards([]);
    setDisplayedCards(pickCardsToDisplay(cards, []));
    setGameOver(false);
    setVictory(false); // Nos aseguramos de apagar el modal de victoria al reiniciar
  };

  const handleModeChange = (newMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    resetGame();
  };

  return (
    <div>
      {/* CONTROLES DE MÚSICA */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px'
      }}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            padding: '10px',
            fontFamily: 'inherit',
            cursor: 'pointer',
            backgroundColor: '#ffe81f',
            border: 'none',
            color: '#000',
            width: '100%'
          }}
        >
          {isPlaying ? '🔇 Mute' : '🔊 Play Música'}
        </button>

        {/* Solo mostramos la barra de volumen si la música está sonando */}
        {isPlaying && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>

      <Scoreboard
        score={score}
        bestScore={bestScore}
        mode={mode}
        onModeChange={handleModeChange}
      />
      <CardGrid cards={displayedCards} handleCardClick={handleCardClick} />

      {/* MODAL DE DERROTA */}
      {gameOver && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}>
          <h1 style={{ color: '#f44336', fontSize: '40px', textAlign: 'center' }}>GAME OVER</h1>
          <p>Caíste al Lado Oscuro.</p>
          <p>Puntaje final: {score}</p>
          <button
            onClick={resetGame}
            style={{
              marginTop: '30px', padding: '15px 30px', fontSize: '15px', fontFamily: 'inherit',
              backgroundColor: '#ffe81f', border: 'none', cursor: 'pointer', color: '#000'
            }}
          >
            INTENTAR DE NUEVO
          </button>
        </div>
      )}

      {/* MODAL DE VICTORIA */}
      {victory && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}>
          <h1 style={{ color: '#4CAF50', fontSize: '40px', textAlign: 'center' }}>¡VICTORIA!</h1>
          <p style={{ color: '#ffe81f', marginTop: '20px' }}>La Fuerza es intensa en ti.</p>
          <p>Completaste el modo {mode}.</p>
          <button
            onClick={resetGame}
            style={{
              marginTop: '30px', padding: '15px 30px', fontSize: '15px', fontFamily: 'inherit',
              backgroundColor: '#ffe81f', border: 'none', cursor: 'pointer', color: '#000'
            }}
          >
            JUGAR OTRA VEZ
          </button>
        </div>
      )}
    </div>
  );
}

export default App;