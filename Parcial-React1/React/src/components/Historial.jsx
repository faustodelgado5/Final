import React from "react";

const Historial = ({ historial }) => {
  return (
    <div>
      <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
        Historial de Búsquedas:
      </h2>
      {historial.length === 0 ? (
        <p>No hay búsquedas recientes.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: "0", textAlign: "left" }}>
          {historial.map((pais, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {pais}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Historial;
