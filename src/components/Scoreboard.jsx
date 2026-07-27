export default function Scoreboard({ score, bestScore, mode, onModeChange }) {
    return (
        <div className="scoreboard" style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src="Star_Wars_Logo.png" style={{ height: "300px", width: "450px" }}></img>
            {/* Botones de Dificultad */}
            <div style={{ marginBottom: '15px', marginTop: "10px", display: "flex", flex: "row", alignItems: "center", justifyContent: "space-evenly" }}>

                <div style={{ gap:"6px", display: "flex", flex: "row", alignItems: "center"}}>
                    <h2>Power Level: </h2>
                    <button
                        onClick={() => onModeChange('Padawan')}
                        style={{
                            marginRight: '10px',
                            padding: '5px 15px',
                            backgroundColor: mode === 'Padawan' ? '#4CAF50' : '#333',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        Padawan (8 Cartas)
                    </button>
                    <button
                        onClick={() => onModeChange('Jedi')}
                        style={{
                            padding: '5px 15px',
                            backgroundColor: mode === 'Jedi' ? '#f44336' : '#333',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        Jedi (16 Cartas)
                    </button></div>
                <h2>Puntaje: {score} | Mejor Puntaje: {bestScore}</h2>
            </div>
        </div>
    );
}