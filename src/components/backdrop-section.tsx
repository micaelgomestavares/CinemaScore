const BackdropSection: React.FC<{ backdropPath: string }> = ({ backdropPath }) => (
  <section className="h-[30dvh] w-full overflow-hidden bg-muted shadow md:rounded-lg lg:h-[55dvh] lg:border">
    <div
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${backdropPath}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-full w-full brightness-50"
    ></div>
  </section>
);

export default BackdropSection;