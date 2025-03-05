import React, { useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import Loader from "./Loader";

/*
  Todo: 
  1. Error handling
  2. Loading effect after sending the req
  3. auto scrolling effect
  .
  .
  .
*/

const ChatBotUI = () => {
  const [response, setResponse] = useState("");
  const [activeChatBot, setActiveChatBot] = useState(false);
  const [chatbotHistory, setChatbotHistory] = useState([]);
  const [userPrompt, setUserPrompt] = useState('');
  const [responseLoading, setResponseLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const chatbotRef = useRef();

  const toggleChatBotFloatingContainer = () => {
    setActiveChatBot(!activeChatBot);
  }

  useEffect(()=> {
    const handleClickOutside = (e) => {
      if(chatbotRef.current && !chatbotRef.current.contains(event.target)){
        setActiveChatBot(false);
      }
    }

    if(activeChatBot) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [activeChatBot]);

  const sendPrompt = async (prompt) => {
    setResponse(""); 

    const res = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"prompt": prompt}),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let botResponse = "";
    setResponseLoading(!responseLoading);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      botResponse += chunk;
      setChatbotHistory(prev => {
        const lastMsg = prev[prev.length - 1];
        
        if(lastMsg?.role == 'Bot') {
          return [...prev.slice(0, -1), { role: "Bot", text: botResponse }];
        }

        return [...prev, { role: "Bot", text: botResponse }];
      })
      // setResponse((prev) => prev + decoder.decode(value));
    }
    // setChatbotHistory(prev => [...prev, { "role": "Bot", "text": response }])
  };

  useEffect(() => {
    setChatbotHistory([{
      "role": "User",
      "text": "HI!"
    }]);
    sendPrompt("HI");
  }, []);

  const onSendingPrompt = (e) => {
    e.preventDefault();
    if(userPrompt !== ''){
      // setResponseLoading(true);
      sendPrompt(userPrompt);
      setChatbotHistory(prev => [...prev, { "role": "User", "text": userPrompt }]);
      setUserPrompt('');
    } else {
      // todo: error message
    }
  }

  return (
    <div className={`chatbot-floating-btn-container ${activeChatBot ? 'chatbot-opened' : 'chatbot-closed'}`}>
        {
          activeChatBot ? (
            <div ref={chatbotRef} className="chatbot-container">
              <div className="chatbot-response-container">
                <div>
                  {
                    chatbotHistory.map((item, index) => (
                      (item.role == "Bot") ? (
                        <div className="bot-history" key={index}>
                          <p>
                            <span>
                                {item?.text}
                            </span>  
                          </p>
                        </div>
                      ) : (
                        <div className="user-history" key={index}>
                          <p>
                            <span>
                              {item.text}
                            </span>
                          </p>
                        </div>
                      )
                    ))
                  }
                </div>
              </div>
              <div className="chatbot-input-container">
                <form onSubmit={onSendingPrompt}>
                  <input
                    type="text"
                    placeholder=""
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                  <button type="submit">
                    <VscSend/>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="chatbot-btn">
              <div onClick={toggleChatBotFloatingContainer}>
                  <IoChatbubbleEllipsesOutline/>
              </div>
            </div>
          )
        }
    </div>
  );
};

export default ChatBotUI;