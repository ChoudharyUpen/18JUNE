async function searchProduct() {
  const input = document.getElementById("searchInput").value.trim();
  const errorElement = document.getElementById("error");
  const resultList = document.getElementById("resultList");

  // Clear previous data
  errorElement.textContent = "";
  resultList.innerHTML = "";

  // Input validation
  if (!input) {
    errorElement.textContent = "Please enter a valid product name.";
    return;
  }

  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(input)}`);
    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      errorElement.textContent = "No matching products found.";
      return;
    }

    // Show results
    data.products.forEach(product => {
      const div = document.createElement("div");
      div.style.marginBottom = "10px";
      div.innerHTML = `
        <strong>${product.title}</strong><br/>
        Price: $${product.price}<br/>
        <img src="${product.thumbnail}" width="100" />
        <hr/>
      `;
      resultList.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    errorElement.textContent = "Something went wrong. Please try again.";
  }
}
