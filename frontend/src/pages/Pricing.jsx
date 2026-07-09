const plans = [
  { name: "Starter", price: "₹15,000", features: ["1-5 page website", "Basic SEO", "1 revision round", "2 weeks delivery"] },
  { name: "Business", price: "₹50,000", features: ["Full website + admin panel", "Custom design", "3 revision rounds", "4 weeks delivery"], highlight: true },
  { name: "Enterprise", price: "₹1,50,000+", features: ["Full-stack platform", "Dedicated team", "Unlimited revisions", "Priority support"] },
  { name: "Custom", price: "Let's talk", features: ["Scoped to your needs", "Flexible timeline", "Custom integrations"] },
];

export default function Pricing() {
  return (
    <div className="section pt-32">
      <h1 className="text-4xl font-bold text-center mb-2">Pricing</h1>
      <p className="text-white/60 text-center mb-12">Transparent plans for every stage of growth.</p>
      <div className="grid md:grid-cols-4 gap-6">
        {plans.map((p) => (
          <div key={p.name} className={`glass p-8 flex flex-col ${p.highlight ? "border-cyan-400/60" : ""}`}>
            <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
            <div className="text-2xl font-bold gradient-text mb-4">{p.price}</div>
            <ul className="text-white/60 text-sm space-y-2 flex-1">
              {p.features.map((f) => <li key={f}>✓ {f}</li>)}
            </ul>
            <button className="btn-primary mt-6 text-sm">Choose Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
