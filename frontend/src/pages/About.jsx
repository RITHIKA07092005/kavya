export default function About() {
  return (
    <div className="section pt-32">
      <h1 className="text-4xl font-bold text-center mb-12">About Genoid Tech</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="glass p-8">
          <h3 className="font-semibold text-lg mb-2 gradient-text">Our Mission</h3>
          <p className="text-white/60 text-sm">To help ambitious businesses launch premium digital products without the enterprise price tag.</p>
        </div>
        <div className="glass p-8">
          <h3 className="font-semibold text-lg mb-2 gradient-text">Our Vision</h3>
          <p className="text-white/60 text-sm">To be the go-to software partner for startups scaling from idea to industry leader.</p>
        </div>
      </div>
      <div className="glass p-8 mb-12">
        <h3 className="font-semibold text-lg mb-2 gradient-text">Our Story</h3>
        <p className="text-white/60 text-sm">
          Genoid Tech started as a small team of engineers and designers obsessed with craft. Today we
          partner with founders across industries to ship products that feel world-class from day one.
        </p>
      </div>
      <h3 className="text-2xl font-bold text-center mb-6">Development Process</h3>
      <div className="grid md:grid-cols-4 gap-4">
        {["Discover", "Design", "Develop", "Deliver"].map((step, i) => (
          <div key={step} className="glass p-6 text-center">
            <div className="text-2xl font-bold gradient-text mb-2">{i + 1}</div>
            <div className="font-medium">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
