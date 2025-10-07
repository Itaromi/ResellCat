import React, { createContext, useContext, useState } from 'react';

const PanierContext = createContext();

export function PanierProvider({ children }) {
    const [panier, setPanier] = useState([]);

    const ajouterAuPanier = (chat) => {
        if (!panier.find(item => item.id === chat.id)) {
            setPanier([...panier, { ...chat, duree: 1 }]);
        }
    };

    const changerDuree = (id, duree) => {
        setPanier(panier.map(item => item.id === id ? { ...item, duree } : item));
    };

    const supprimerDuPanier = (id) => {
        setPanier(panier.filter(item => item.id !== id));
    };

    const total = panier.reduce((acc, item) => {
        const prixNum = parseFloat(item.price) || 0;
        return acc + prixNum * item.duree;
    }, 0);

    return (
        <PanierContext.Provider value={{ panier, ajouterAuPanier, changerDuree, supprimerDuPanier, total }}>
            {children}
        </PanierContext.Provider>
    );
}

export const usePanier = () => useContext(PanierContext);