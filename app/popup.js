document.getElementById('start').addEventListener('click', function() {
  chrome.runtime.sendMessage({command: "start"});
});