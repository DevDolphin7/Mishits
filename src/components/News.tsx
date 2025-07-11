import "../styles/News.scss";

export default function News({ news }: { news: News }) {
  return (
    <section id="news">
      <header>{news.title}</header>
      <article>
        {"info\ninfo".split("\n").map((paragraph) => (
          <p>{paragraph}</p>
        ))}
      </article>
      <footer>
        <p>See you there!</p>
      </footer>
    </section>
  );
}
