import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Shop the Best Deals Today!</h1>
        <p>Find everything you love at unbeatable prices.</p>
        <button className="shop-btn">Start Shopping</button>
      </div>
      <img
        className="hero-img"
        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
        alt="Shopping"
      />
    </section>
  );
}

export default HeroSection;