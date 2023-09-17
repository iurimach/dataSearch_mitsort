const searchInput = document.getElementById("searchInput");
const dataTable = document.getElementById("dataTable");
const dataBody = document.getElementById("dataBody");
const headers = dataTable.querySelectorAll(".sortable");
let currentSortColumn = -1;
let currentSortOrder = 1;
let data = []; // Store fetched data here

// Function to fetch and display data
async function fetchData() {
  try {
    const response = await fetch('assets/js/json/data.json'); // Replace with your data source URL
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
   
    displayData();
   
  } catch (error) {
    console.log('Error fetching data:',error);
    
  }
}

// Function to display data in the table
function displayData() {
  dataBody.innerHTML = "";
  data.data.forEach(function (rowData) {
    const row = document.createElement("tr");
    
    headers.forEach((header, index) => {
    
      const cell = document.createElement(index === 0 ? "th" : "td");
      cell.textContent = rowData[index];
      row.appendChild(cell);
    });
    dataBody.appendChild(row);
  });
}

// Add event listener for search input
searchInput.addEventListener("keyup", function() {
  const filter = searchInput.value.toLowerCase();
  dataBody.innerHTML = ""; // Clear the table body
  data.data.forEach(rowData => {
    if (rowData.some(cellData => cellData.toLowerCase().includes(filter))) {
      const row = document.createElement("tr");
      headers.forEach((header, index) => {
        const cell = document.createElement(index === 0 ? "th" : "td");
        cell.textContent = rowData[index];
        row.appendChild(cell);
      });  
      dataBody.appendChild(row);
    } 
  });  
});
var bt1=document.querySelector('.bt1')
// Add event listener for column header clicks (sorting)
headers.forEach((header, index) => {
  header.addEventListener("click", function() {
    const column = parseInt(header.getAttribute("data-column"), 10);
    if (column === currentSortColumn) {
      currentSortOrder *= -1;
    } else {
      currentSortColumn = column;
      currentSortOrder = 1;
    }

    headers.forEach((h, i) => {
      h.classList.remove("sorted-asc", "sorted-desc");
    });

    data.data.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      return aValue.localeCompare(bValue) * currentSortOrder;
    });

    header.classList.add(currentSortOrder === 1 ? "sorted-asc" : "sorted-desc");

    displayData();
  });
});

// Fetch and display data when the page loads
fetchData();