import { createContext, useContext, useState } from "react";

const Context = createContext();

export const PlayProvider = ({ children }) => {
    const [play, setPlay] = useState(false);
    const [end, setEnd] = useState(false);
    const [hasScroll, setHasScroll] = useState(false);
    const [toggle, setToggled] = useState(false);

    return(
        <Context.Provider
            value={{
                play,
                setPlay,
                end,
                setEnd,
                hasScroll,
                setHasScroll,
                toggle,
                setToggled,
            }}
        >
            {children}
        </Context.Provider>
    );
};
export const usePlay = () => {
    const context = useContext(Context);

    if(context === undefined)
        throw new Error("usePlay must be used");
    
        return context;
};