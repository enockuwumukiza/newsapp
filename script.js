
const getCurrentDate = () =>{
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  month = String(month).padStart(2,"0");
  day = String(day).padStart(2,"0");

  let newDate = `${year}-${month}-${day}`;

  return newDate;
}

const apiKey = 'b8ec0b1926db4530bcc77c459a7afab1';

const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=${getCurrentDate}&sortBy=publishedAt&apiKey=${apiKey}`;

// Selecting elements by class name, make sure your HTML has these classes assigned correctly.
const cardContainer = document.querySelector('.js-container');
const cardRow = document.querySelector('.js-row');

async function fetchNews() {
  try {
    const response = await fetch(apiUrl);
    
    const data = await response.json();

    const articles = data.articles;
    
    // Clear previous content if any
    cardRow.innerHTML = '';

    articles.slice(0, articles.length).forEach((article) => {
      const imageUrl = article.urlToImage || 'placeholder_image_url.jpg'; // Use a placeholder image if image URL is not available
      const newsTitle = article.title || 'Untitled'; // Use a default title if title is not available
      const content = article.content || 'No content available'; // Use a default content if content is not available
      const date = article.publishedAt;
      const newsUrl = article.url;
      const author = article.author || 'Unknown'; // Use 'Unknown' if author is not available

      const formattedDate = formatDate(date);

      const cardHtml = `
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 news-container fade-in scroll-reveal">         
          <div class="card">
            <img src="${imageUrl}" class="card-img-top" alt="Image">
            <div class="card-body">
              <h5 class="card-title">${newsTitle}</h5>
              <p class="card-text">${content}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Date: ${formattedDate}</li>
              <li class="list-group-item">Author: <b>${author}</b></li>
            </ul>
            <div class="card-body">
              <a href="${newsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary js-button hover-effect"><i class="fas fa-spinner fa-spin"></i>Read More</a>
            </div>
            <div class="progress">
          <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 75%"></div>
        </div>

          </div>
        </div>`;

      cardRow.insertAdjacentHTML('beforeend', cardHtml);
    });
  } catch (error) {
    console.error('Error fetching news:', error)
  }
}

// Function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  return date.toLocaleDateString('en-US', options);
}

// Call the fetchNews function to load news when the page is loaded
window.addEventListener('load', fetchNews);
