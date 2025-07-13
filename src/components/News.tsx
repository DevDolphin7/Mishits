import "../styles/News.scss";

export default function News({ news }: { news: News }) {
  return (
    <section id="news">
      <h1>{news.title}</h1>
      <article>
        {"info\ninfo\ninfo".split("\n").map((paragraph) => (
          <p>{paragraph}</p>
        ))}
      </article>
      <img src={news.image} alt={news.imageAltText} />
      <h2>See you there!</h2>
    </section>
  );
}
