'use client'

export function PartnersSection() {
  const partners = [
    {
      name: "Vancelian",
      description: "A European alternative digital savings platform and the exclusive distributor of Hearst's Bitcoin Mining RWA solutions.",
      website: "https://vancelian.com",
      logo: (
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">V</span>
        </div>
      )
    },
    {
      name: "Hearst Corporation",
      description: "A global media group operating a \"connect wallet\" interface for crypto-native users seeking direct access to hashrate.",
      website: "https://hearst.com",
      logo: (
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">H</span>
        </div>
      )
    }
  ]

  return (
    <section id="partners" className="py-20 lg:py-32 bg-[#F7F2E9]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1E2023] mb-6 font-title">
              Our partners
            </h2>
            <h3 className="text-2xl lg:text-3xl font-semibold text-[#1E2023] font-title">
              Hearst works with two established distribution partners
            </h3>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    {partner.logo}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-[#1E2023] mb-4 font-title">
                      {partner.name}
                    </h4>
                    <p className="text-[#1E2023] leading-relaxed mb-6 font-text">
                      {partner.description}
                    </p>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#FF8555] hover:text-[#e55a2a] font-medium transition-colors"
                    >
                      Check website
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
