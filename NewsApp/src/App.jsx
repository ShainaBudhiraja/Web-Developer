import './App.css'
import assets from './assets/assets'
import { useEffect, useState } from 'react';

const App = () => {
  const [Place, setPlace] = useState("");
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (Place === "") return;

    const getNews = async () => {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${Place}&from=2026-01-27&sortBy=publishedAt&apiKey=e2571d6693a14fc3a6165635a4e5ec25`
      );

      const data = await response.json();
      console.log(data);


      setResult(data.articles.slice(0, 10));
    };

    getNews();
  }, [Place]);

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="heading">
            <img src={assets.logo1} alt="" />
            <h1>News</h1>
          </div>
          <div className="search">
            <img src={assets.image} alt="" />
            <input
              type="text"
              placeholder="Search Place"
              value={Place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
        </div>

        {result.map((news, index) => (
          <div className="News" key={index}>
            <div className="image-container">
              {news.urlToImage && <img src={news.urlToImage} alt="" />}
            </div>
            <div className="News-content">
              <div className="title">{news.title}</div>
              <div className="content">{news.content}</div>
              <div className="url" onClick={() => openLink(news.url)}>
                {news.url}
              </div>
              <div className="author">
                Author: {news.author}
              </div>
              <div className="publishedAt">
                Publish: {news.publishedAt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;

