import React, { useState } from "react";
import Busqueda from "./components/Busqueda";
import BotonBusqueda from "./components/BotonBusqueda";
import Historial from "./components/Historial";
import Cargador from "./components/Cargador";
import ListaPaises from "./components/Paises";

const App = () => {
  const [busqueda, setBusqueda] = useState(""); // Valor del input de búsqueda
  const [paises, setPaises] = useState([]); // Resultado de los países encontrados
  const [error, setError] = useState(""); // Mensaje de error
  const [historial, setHistorial] = useState([]); // Historial de países buscados
  const [loading, setLoading] = useState(false); // Indicador de carga

  // Función que maneja la búsqueda cuando el botón es presionado
  const buscarPais = async () => {
    if (busqueda.trim() === "") {
      setError("Por favor ingresa un nombre de país.");
      setPaises([]);
      return;
    }

    setLoading(true);
    setError(""); // Limpiar cualquier error previo

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${busqueda}`
      );

      // Si la respuesta no es exitosa, lanzar un error
      if (!response.ok) {
        throw new Error("No se encontraron países con ese nombre.");
      }

      const data = await response.json();

      setPaises(data); // Establecer los países en el estado

      // Actualizamos el historial solo si el país no está ya en el historial
      if (!historial.includes(busqueda)) {
        setHistorial((prevHistorial) => {
          const nuevoHistorial = [busqueda, ...prevHistorial];
          if (nuevoHistorial.length > 5) nuevoHistorial.pop(); // Limitar a 5 países en el historial
          return nuevoHistorial;
        });
      }
    } catch (err) {
      setError(err.message); // Establecer el mensaje de error
      setPaises([]); // Vaciar la lista de países si hay un error
    } finally {
      setLoading(false); // Finalizar el estado de carga
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
