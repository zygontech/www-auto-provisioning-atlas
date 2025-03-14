let apps = [];

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/data/apps.json");
  apps = await response.json();

  let searchResults = document.getElementById("search-results");
  let searchInput = document.getElementById("search");
  let selectedIndex = -1;

  window.filterApps = function () {
    let searchValue = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (searchValue.length === 0) {
      searchResults.classList.add("hidden");
      return;
    }

    let filteredApps = apps.filter(
      (app) =>
        app.Name.toLowerCase().includes(searchValue) ||
        app.Domain.toLowerCase().includes(searchValue)
    );

    if (filteredApps.length === 0) {
      searchResults.classList.add("hidden");
      return;
    }

    filteredApps.forEach((app, index) => {
      let li = document.createElement("li");
      li.classList.add("search-item");
      li.innerHTML = `
        <div class="search-logo-container">
          <img src="https://logo.clearbit.com/${app.Domain}" alt="${app.Name} logo" />
        </div>
        <div class="app-info">
          <strong>${app.Name}</strong>
          <span>${app.Domain}</span>
        </div>
        <span class="search-arrow">View app →</span>
      `;
      li.onclick = () => {
        window.location.href =
          "/apps/" + app.Name.toLowerCase().replace(/\s+/g, "-");
      };
      li.dataset.index = index;
      searchResults.appendChild(li);
    });

    searchResults.classList.remove("hidden");
    selectedIndex = -1;
  };

  window.navigateResults = function (event) {
    let items = document.querySelectorAll(".search-item");

    if (event.key === "ArrowDown") {
      selectedIndex = (selectedIndex + 1) % items.length;
    } else if (event.key === "ArrowUp") {
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      items[selectedIndex].click();
    }

    items.forEach((item, index) => {
      item.classList.toggle("selected", index === selectedIndex);
    });
  };
});
