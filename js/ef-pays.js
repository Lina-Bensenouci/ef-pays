(function () {
  console.log("REST API script loaded");

  // Function to fetch data based on country
  function fetchData(country) {
      console.log(`Fetching data for country: ${country}`);
      let url = `https://gftnth00.mywhc.ca/tim10/wp-json/wp/v2/posts?country=${country}&orderby=title&order=asc`;
      console.log(`Fetch URL: ${url}`);
      fetch(url)
          .then(function (response) {
              console.log(`Response status: ${response.status}`);
              if (!response.ok) {
                  throw new Error(
                      "La requête a échoué avec le statut " + response.status
                  );
              }
              return response.json();
          })
          .then(function (data) {
              console.log("Data fetched:", data);
              let restapi = document.querySelector(".contenu__restapi");
              restapi.innerHTML = '';
              if (data.length === 0) {
                  restapi.innerHTML = '<p>No cities found for this country.</p>';
              } else {
                  data.forEach(function (city) {
                      let titre = city.title.rendered;
                      let contenu = city.content.rendered;
                      let image = extractImageFromContent(contenu);
                      contenu = truncateContent(contenu, 50); // Assuming we want to show the first 50 words
                      let carte = document.createElement("div");
                      carte.classList.add("restapi__carte");
                      carte.innerHTML = `
                          <h2>${titre}</h2>
                          ${image}
                          <p>${contenu}</p>                
                      `;
                      restapi.appendChild(carte);
                  });
              }
          })
          .catch(function (error) {
              console.error("Erreur lors de la récupération des données :", error);
              let restapi = document.querySelector(".contenu__restapi");
              restapi.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
          });
  }

  // Function to extract image from content
  function extractImageFromContent(content) {
      let div = document.createElement('div');
      div.innerHTML = content;
      let imgElement = div.querySelector('img');
      if (imgElement) {
          imgElement.classList.add('uniform-image-size'); // Add class for uniform image size
          return imgElement.outerHTML;
      }
      return '';
  }

  // Function to truncate content
  function truncateContent(content, words) {
      return content.split(/\s+/).slice(0, words).join(" ");
  }

  // Add event listeners for country buttons
  let countryButtons = document.querySelectorAll(".country-button");
  countryButtons.forEach(function (button) {
      button.addEventListener('click', function () {
          let country = button.getAttribute('data-country');
          console.log(`Button clicked: ${country}`);
          fetchData(country);
      });
  });

  // Fetch data by default for the country when the page loads
  let defaultCountryButton = document.querySelector(".country-button[data-default='true']");
  if (defaultCountryButton) {
      let defaultCountry = defaultCountryButton.getAttribute('data-country');
      console.log(`Default country: ${defaultCountry}`);
      fetchData(defaultCountry);
  }
})();
