export default function Card({ jedi, onClick }) {
    return (
        <div
            className="card"
            onClick={() => onClick(jedi.id)}
            style={{
                cursor: 'pointer',
                border: '2px solid #ffe81f', // Borde amarillo retro
                backgroundColor: '#111',     // Fondo oscuro para la carta
                padding: '10px',
                borderRadius: '8px',
                width: '180px',
                transition: 'transform 0.2s' // Pequeño efecto al pasar el mouse
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <img
                src={jedi.image}
                alt={jedi.name}
                style={{
                    width: '100%',
                    height: '260px', // Carta más alta
                    objectFit: 'contain', // Cambiado a contain para no cortar nada
                    borderRadius: '4px'
                }}
            />
            <p style={{ textAlign: 'center', fontSize: '20px', lineHeight: '1.5', marginTop: '15px', color:"white"}}>
                {jedi.name}
            </p>
        </div>
    );
}