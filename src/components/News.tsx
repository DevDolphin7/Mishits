import "../styles/News.scss";

export default function News({ news }: { news: News }) {
  return (
    <section id="news">
      <h1>{news.title}</h1>
      <article>
        {news.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>
      <img src={news.image} alt={news.imageAltText} />
      <h2>{news.footer}</h2>
    </section>
  );
}
