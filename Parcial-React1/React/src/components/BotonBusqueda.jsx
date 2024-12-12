import React from "react";

function BotonBusqueda({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Buscar País
    </button>
  );
}

export default BotonBusqueda;
