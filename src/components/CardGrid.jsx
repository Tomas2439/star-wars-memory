import Card from './Card';

export default function CardGrid({ cards, handleCardClick }) {
    return (
        <div className="card-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Aquí recorremos el arreglo y por cada uno renderizamos un componente Card */}
            {cards.map((jedi) => (
                <Card
                    key={jedi.id}
                    jedi={jedi}
                    onClick={handleCardClick}
                />
            ))}
        </div>
    );
}