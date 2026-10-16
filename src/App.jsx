import { useState } from 'react';
import './App.css';

function calcularEntropia(probabilidades) {
  return -probabilidades.reduce((total, p) => {
    return p === 0 ? total : total + p * Math.log2(p);
  }, 0);
}

export default function App() {
  const [lluvia, setLluvia] = useState('0.5');
  const [noLluvia, setNoLluvia] = useState('0.5');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  function calcular(event) {
    event.preventDefault();

    if (lluvia.trim() === '' || noLluvia.trim() === '') {
      setError('Ingresa las dos probabilidades.');
      setResultado(null);
      return;
    }

    const p = Number(lluvia);
    const q = Number(noLluvia);

    if (
      !Number.isFinite(p) ||
      !Number.isFinite(q) ||
      p < 0 || p > 1 ||
      q < 0 || q > 1
    ) {
      setError('Las probabilidades deben estar entre 0 y 1.');
      setResultado(null);
      return;
    }

    if (Math.abs(p + q - 1) > 0.000001) {
      setError('Las probabilidades deben sumar 1.');
      setResultado(null);
      return;
    }

    setError('');
    setResultado(calcularEntropia([p, q]));
  }

  return (
    <main className="pagina">
      <div className="marca-agua" aria-hidden="true">
        HANSSY ROY
      </div>

      <section className="tarjeta">
        <header className="encabezado">
          <div className="logo">HR</div>
          <div>
            <h1>Entropía de Shannon</h1>
            <p>Calculadora de incertidumbre</p>
          </div>
        </header>

        <div className="formula">
          H(X) = − Σ p(x) log₂ p(x)
        </div>

        <h2>Probabilidad de lluvia</h2>

        <form onSubmit={calcular}>
          <label htmlFor="lluvia">
            Probabilidad de lluvia
          </label>
          <input
            id="lluvia"
            type="number"
            min="0"
            max="1"
            step="any"
            value={lluvia}
            onChange={(e) => setLluvia(e.target.value)}
            placeholder="Ej. 0.5"
          />

          <label htmlFor="no-lluvia">
            Probabilidad de no lluvia
          </label>
          <input
            id="no-lluvia"
            type="number"
            min="0"
            max="1"
            step="any"
            value={noLluvia}
            onChange={(e) => setNoLluvia(e.target.value)}
            placeholder="Ej. 0.5"
          />

          <button type="submit">Calcular entropía</button>
        </form>

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}

        {resultado !== null && (
          <section className="resultado" aria-live="polite">
            <p>Entropía calculada</p>
            <div className="valor">
              {resultado.toFixed(6)} <span>bits</span>
            </div>
            <p>
              {resultado < 0.000001
                ? 'No existe incertidumbre: el resultado es predecible.'
                : resultado > 0.999999
                  ? 'Máxima incertidumbre para dos eventos posibles.'
                  : 'La incertidumbre depende de las probabilidades.'}
            </p>
          </section>
        )}

        <footer>
          <span>Herramienta educativa</span>
          <strong>HANSSY ROY</strong>
        </footer>
      </section>
    </main>
  );
}