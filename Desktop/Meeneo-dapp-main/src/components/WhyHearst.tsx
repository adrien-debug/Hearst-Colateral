'use client'

export function WhyHearst() {
  const benefits = [
    {
      title: "Independence",
      description: "Hearst isn't a distributor — we operate exclusively as a Bitcoin mining infrastructure provider.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Expertise",
      description: "A seasoned team from Bitcoin mining, digital finance, and blockchain infrastructure industries.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      title: "Performance",
      description: "Next-gen Bitcoin mining fleet: S21 miners, immersion cooling, and green energy optimization.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Transparency",
      description: "Clear contractual architecture, regular reporting, and SLAs that guarantee technical performance.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Regulation",
      description: "Fully structured within the ADGM framework, ensuring auditability, compliance, and institutional trust.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ]

  return (
    <section id="why-hearst" className="py-20 lg:py-32 bg-[#F7F2E9]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1E2023] mb-6 font-title">
              Why Hearst ?
            </h2>
            <p className="text-xl text-[#1E2023] max-w-3xl mx-auto font-text">
              RWA-backed yield from institutional-grade Bitcoin mining farms—sustainable, compliant, and built for performance.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-white border border-black/10 rounded-2xl flex items-center justify-center text-[#1E2023] mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1E2023] mb-4 font-title">
                  {benefit.title}
                </h3>
                <p className="text-[#1E2023] leading-relaxed font-text">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button className="px-8 py-4 bg-[#FF8555] hover:bg-[#e55a2a] text-white font-semibold rounded-full transition-colors shadow-lg hover:shadow-xl">
              Start Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
