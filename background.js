chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "query") {
        const apiKey = process.env.OPENAI_API_KEY;
        const endpoint = "https://api.openai.com/v1/chat/completions";
  
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: request.data }],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          sendResponse({ type: "response", data: data.choices[0]?.message?.content });
        })
        .catch((error) => {
          console.error("API Error:", error);
          sendResponse({ type: "error", error: error.message });
        });
  
      return true; 
    }
  });
  
  