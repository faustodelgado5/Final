import React from "react";

function Busqueda({ busqueda, setBusqueda }) {
  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar un país"
        value={busqueda}
        onChange={handleChange}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />
    </div>
  );
}

export default Busqueda;
