chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.history.deleteAll(function() {
    createFakeHistory();
  });
});

function createFakeHistory() {
  // Create an array to store the fake history items
  var fakeHistory = [];

  // Generate 50 random history items
  for (var i = 0; i < 50; i++) {
    var url = getRandomUrl();
    var title = getRandomTitle();
    var visitTime = getVisitTime(i);
    fakeHistory.push({
      "url": url,
      "title": title,
      "visitTime": visitTime,
      "visitCount": 1
    });
  }

  // Add the fake history items to the browser's history
  chrome.history.addUrl({
    "url": fakeHistory[0].url
  }, function() {
    for (var i = 0; i < fakeHistory.length; i++) {
      chrome.history.addUrl({
        "url": fakeHistory[i].url
      });
    }
  });
}

// Function to generate a random URL
function getRandomUrl() {
  var domains = ["google.com", "facebook.com", "youtube.com", "twitter.com", "instagram.com"];
  var randomDomain = domains[Math.floor(Math.random() * domains.length)];
  var randomPath = "/" + Math.random().toString(36).substr(2, 5);
  return "https://" + randomDomain + randomPath;
}

// Function to generate a random title
function getRandomTitle() {
  var titles = ["Random Search", "Social Media", "Video Watching", "News Article", "Blog Post"];
  return titles[Math.floor(Math.random() * titles.length)];
}

// Function to generate a visit time for the past 50 days
function getVisitTime(day) {
  var now = new Date();
  var visitTime = new Date(now.getTime() - (day * 24 * 60 * 60 * 1000));
  return visitTime.getTime();
}