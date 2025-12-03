const API_KEY = "ecc3cf187emsh4899dd89527c927p1b2b22jsn5be1decc1453";
const API_HOST = "mma-api1.p.rapidapi.com";

async function searchFighter() {
  let name = document.getElementById("nameInput").value;

  if (name == "") {
    document.getElementById("output").innerHTML = "Please enter a name.";
    return;
  }

  document.getElementById("output").innerHTML = "Loading...";

  const url = "https://mma-api1.p.rapidapi.com/search?query=" + name;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-host": API_HOST,
      "x-rapidapi-key": API_KEY
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);

    if (data.players && data.players.length > 0) {
      const fighter = data.players[0];
      let html = "";
      html += "<h3>" + fighter.displayName + "</h3>";
      html += '<img src="' + fighter.image + '" width="200"><br><br>';
      html += "<p><strong>Fighter ID:</strong> " + fighter.fighterId + "</p>";
      html += "<p><strong>Sport:</strong> " + fighter.sport + "</p>";
      html += '<p><strong>More info:</strong> ';
      html += '<a href="' + fighter.link + '" target="_blank">View fighter page</a>';
      html += "</p>";

      document.getElementById("output").innerHTML = html;
    } else {
      document.getElementById("output").innerHTML = "No fighter found.";
    }

  } catch (error) {
    document.getElementById("output").innerHTML = "Error.";
  }
}

async function loadLeagues() {
  const output = document.getElementById("leaguesOutput");
  if (!output) {
    return;
  }

  output.innerHTML = "Loading...";

  const url = "https://mma-api1.p.rapidapi.com/available-leagues";

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-host": API_HOST,
      "x-rapidapi-key": API_KEY
    }
  };

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    const data = JSON.parse(text);
    let html = "<ul>";
    if (Array.isArray(data)) {
      data.forEach(function (item) {
        if (typeof item === "string") {
          html += "<li>" + item + "</li>";
        } else if (item.name) {
          html += "<li>" + item.name + "</li>";
        } else if (item.league) {
          html += "<li>" + item.league + "</li>";
        } else {
          html += "<li>" + JSON.stringify(item) + "</li>";
        }
      });
    }
    else if (data.leagues && Array.isArray(data.leagues)) {
      data.leagues.forEach(function (league) {
        if (typeof league === "string") {
          html += "<li>" + league + "</li>";
        } else if (league.name) {
          html += "<li>" + league.name + "</li>";
        } else if (league.league) {
          html += "<li>" + league.league + "</li>";
        } else {
          html += "<li>" + JSON.stringify(league) + "</li>";
        }
      });
    } else {
      html += "<li>No leagues found.</li>";
    }

    html += "</ul>";
    output.innerHTML = html;

  } catch (error) {
    output.innerHTML = "Error loading leagues.";
  }
}
