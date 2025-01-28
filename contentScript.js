function injectSidebar() {
    const iframe = document.createElement("iframe");
    iframe.id = "chatgpt-sidebar";
    iframe.src = chrome.runtime.getURL("sidebar.html");
    iframe.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      height: 100vh;
      border: none;
      z-index: 10000;
    `;
    document.body.appendChild(iframe);
  
    window.addEventListener("message", (event) => {
      if (event.source === iframe.contentWindow) {
        chrome.runtime.sendMessage({ type: "query", data: event.data.data }, (response) => {
          iframe.contentWindow.postMessage(response, "*"); 
        });
      }
    });
  }
  
  injectSidebar();
  