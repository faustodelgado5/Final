import React, { useState } from "react";
import Busqueda from "./components/Busqueda";
import BotonBusqueda from "./components/BotonBusqueda";
import Historial from "./components/Historial";
import Cargador from "./components/Cargador";
import ListaPaises from "./components/Paises";

const App = () => {
  const [busqueda, setBusqueda] = useState(""); 
  const [paises, setPaises] = useState([]); 
  const [error, setError] = useState(""); 
  const [historial, setHistorial] = useState([]); 
  const [loading, setLoading] = useState(false); 

  
  const buscarPais = async () => {
    if (busqueda.trim() === "") {
      setError("Por favor ingresa un nombre de país.");
      setPaises([]);
      return;
    }

    setLoading(true);
    setError(""); 

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${busqueda}`
      );

      
      if (!response.ok) {
        throw new Error("No se encontraron países con ese nombre.");
      }

      const data = await response.json();

      setPaises(data); 

      
      if (!historial.includes(busqueda)) {
        setHistorial((prevHistorial) => {
          const nuevoHistorial = [busqueda, ...prevHistorial];
          if (nuevoHistorial.length > 5) nuevoHistorial.pop(); 
          return nuevoHistorial;
        });
      }
    } catch (err) {
      setError(err.message); 
      setPaises([]); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        width: "400px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Buscador de Países
      </h1>

      {/* Barra de búsqueda */}
      <Busqueda busqueda={busqueda} setBusqueda={setBusqueda} />

      {/* Botón para hacer la búsqueda */}
      <BotonBusqueda onClick={buscarPais} />

      {/* Indicador de carga */}
      {loading && <Cargador />}

      {/* Resultados de la búsqueda */}
      <ListaPaises paises={paises} error={error} />

      {/* Historial de búsquedas */}
      <Historial historial={historial} />
    </div>
  );
};

export default App;
