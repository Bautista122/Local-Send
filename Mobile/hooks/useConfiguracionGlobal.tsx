// hooks/useConfiguracionGlobal.tsx
import React, { createContext, useContext, useState } from 'react';

interface Configuracion {
  nombreDispositivo: string;
  puerto: number;
}

const ContextoConfig = createContext<any>(null);

export const ProveedorDeConfiguracion = ({ children }: any) => {
  const [config, setConfig] = useState<Configuracion>({
    nombreDispositivo: "Mi Celular Android",
    puerto: 53317
  });

  return (
    <ContextoConfig.Provider value={{ config, setConfig }}>
      {children}
    </ContextoConfig.Provider>
  );
};

// Hook personalizado (Regla 3) para acceder a la config
export const useConfiguracionGlobal = () => useContext(ContextoConfig);