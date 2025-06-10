import "../styling/Offers.css";

const Offers = ({ title, price, features, buttonText }) => {
  return (
    // The .pricing-card itself remains a flex-direction: column; for its internal layout
    <div className="pricing-card">
      <h2 className="pricing-title">{title}</h2>
      <p className="pricing-price">
        ${price}<span className="per-month">/mo</span>
      </p>
      <ul className="pricing-features">
        {features.map((feature, index) => (
          <li key={index} className="feature-item">
            ✓ {feature}
          </li>
        ))}
      </ul>
      <button className="pricing-button">{buttonText}</button>
    </div>
  );
};

export default Offers;