import { useState } from 'react'

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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"; // Enter your API key

const systemMessage = { 
  "role": "system", "content": "restrict your service to the above options, even if I ask other things say \"sorry! I am a AI language model programmed to perform specific tasks as listed above.\", Only when I say okay you can answer my other questions."
}

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      message: "Clara | Personal AI Assistant\n>>>>>>>>><<<<<<<<<\n\nAsk me to:\n\n1. Draft an email.\n2. Draft an essay.\n3. Translate Text.\n4. Summarize text.\n5. Brainstorm Ideas.\n6. Fix Spelling & Grammar.\n7. Create a text-based schedule.",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div className="App">
      <div style={{ position: 'fixed', height:"500px",width:"500px",top: '95px', right: '1000px', backgroundColor: '#fff', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', borderRadius: '5px' }}>
      
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Clara is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>

      </div>
    </div>
  )
}

export default Chatbot;