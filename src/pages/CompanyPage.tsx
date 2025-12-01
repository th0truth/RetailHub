import { SectionHeading } from '../components/ui/SectionHeading'
import { companyHighlights, serviceCenters } from '../data/catalog'

const team = [
  { name: 'Olga Petrenko', role: 'CEO', bio: '15y retail infrastructure, ex Stripe.', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80' },
  { name: 'Daniel Novak', role: 'CTO', bio: 'FastAPI evangelist, perf lead.', avatar: 'https://images.unsplash.com/photo-1544723795-432537f11815?auto=format&fit=crop&w=400&q=80' },
  { name: 'Tetiana H.', role: 'Head of Delivery', bio: 'Rollouts across 14 markets.', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80' },
]

const partners = ['Stripe', 'Microsoft', 'AWS', 'Atlassian', 'Honeywell', 'Zebra']

export const CompanyPage = () => (
  <div className="container section-padding space-y-12">
    <SectionHeading
      eyebrow="Company"
      title="Mission-driven commerce infrastructure"
      description="About, Team, Partners, Service center status, Certifications."
    />

    <section className="grid gap-6 md:grid-cols-4">
      {companyHighlights.map((item) => (
        <article key={item.label} className="glass-panel text-center p-6 space-y-2">
          <p className="text-xs uppercase text-white/40">{item.label}</p>
          <p className="text-4xl font-semibold text-white">{item.value}</p>
          <p className="text-sm text-white/60">{item.detail}</p>
        </article>
      ))}
    </section>

    <section className="grid gap-6 md:grid-cols-2">
      <article className="glass-panel p-6 space-y-3">
        <h3 className="text-2xl font-semibold text-white">Mission</h3>
        <p className="text-white/70">
          We help B2B buyers deploy certified hardware, services, and payments faster with transparent
          pricing and support.
        </p>
      </article>
      <article className="glass-panel p-6 space-y-3">
        <h3 className="text-2xl font-semibold text-white">History</h3>
        <p className="text-white/70">
          Founded in 2015, scaled to 40+ engineers and support specialists across EU with ISO-certified
          service centers.
        </p>
      </article>
    </section>

    <section className="space-y-6">
      <h3 className="text-2xl font-semibold text-white">Team</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {team.map((member) => (
          <article key={member.name} className="glass-panel space-y-3 p-6 text-center">
            <img src={member.avatar} alt={member.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
            <div>
              <p className="text-lg font-semibold text-white">{member.name}</p>
              <p className="text-sm text-white/50">{member.role}</p>
            </div>
            <p className="text-sm text-white/60">{member.bio}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="space-y-6">
      <h3 className="text-2xl font-semibold text-white">Partners</h3>
      <div className="glass-panel flex flex-wrap gap-4 p-6">
        {partners.map((partner) => (
          <span key={partner} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
            {partner}
          </span>
        ))}
      </div>
    </section>

    <section className="space-y-6">
      <h3 className="text-2xl font-semibold text-white">Service center status</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {serviceCenters.map((center) => (
          <article key={center.id} className="glass-panel space-y-2 p-4">
            <p className="text-lg font-semibold text-white">{center.city}</p>
            <p className="text-sm text-white/60">{center.hours}</p>
            <p className="text-sm text-white/60">{center.phone}</p>
            <span className={`rounded-full px-3 py-1 text-xs uppercase ${
              center.status === 'operational'
                ? 'bg-success/15 text-success'
                : center.status === 'limited'
                ? 'bg-warning/15 text-warning'
                : 'bg-danger/15 text-danger'
            }`}>
              {center.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  </div>
)

