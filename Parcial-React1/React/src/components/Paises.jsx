import React from "react";

function ListaPaises({ paises, error }) {
  // Si hay un error, mostramos el mensaje de error
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  // Si no hay resultados, mostramos un mensaje de "No hay resultados"
  if (paises.length === 0) {
    return <p>No hay resultados para mostrar.</p>;
  }

  return (
    <ul>
      {paises.map((pais) => (
        <li
          key={pais.name.common}
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{pais.name.common}</h3>
          <p>
            <strong>Capital:</strong>{" "}
            {pais.capital ? pais.capital[0] : "No disponible"}
          </p>
          <p>
            <strong>Población:</strong> {pais.population.toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default ListaPaises;
