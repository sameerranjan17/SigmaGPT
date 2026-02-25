import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    // Define all the states you are trying to use in Sidebar
    const [allThreads, setAllThreads] = useState([]);
    const [currThreadId, setCurrThreadId] = useState(null);
    const [newChat, setNewChat] = useState(true);
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState(null);
    const [prevChats, setPrevChats] = useState([]);

    return (
        <MyContext.Provider value={{ 
            allThreads, setAllThreads, 
            currThreadId, setCurrThreadId, 
            newChat, setNewChat, 
            prompt, setPrompt, 
            reply, setReply, 
            prevChats, setPrevChats 
        }}>
            {children}
        </MyContext.Provider>
    );
};