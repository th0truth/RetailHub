import { services } from '../data/catalog'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'

export const ServicesPage = () => (
  <div className="container section-padding space-y-12">
    <SectionHeading
      eyebrow="Services"
      title="On-site and remote services"
      description="Consultations, technical support, warranty, calibration, installation, and software integration."
    />

    <div className="grid gap-6 md:grid-cols-2">
      {services.map((service) => (
        <article key={service.id} className="glass-panel space-y-4 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-white/40">{service.leadTime}</p>
              <h3 className="text-xl font-semibold text-white">{service.name}</h3>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
              {service.priceModel}
            </span>
          </div>
          <p className="text-sm text-white/70">{service.summary}</p>
          <ul className="space-y-2 text-sm text-white/60">
            {service.deliverables.map((deliverable) => (
              <li key={deliverable} className="rounded-2xl border border-white/5 px-3 py-2">
                {deliverable}
              </li>
            ))}
          </ul>
          <Button variant="secondary" className="w-full">
            Request service
          </Button>
        </article>
      ))}
    </div>

    <section className="rounded-[32px] border border-white/5 bg-base-800/70 p-8">
      <SectionHeading
        eyebrow="Service request"
        title="Book a service call"
        description="Form captures essential info for dispatch teams (name, phone, email, service, date, comment)."
        align="center"
      />
      <form className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="text-sm text-white/80">
          Name
          <input className="input mt-2" required />
        </label>
        <label className="text-sm text-white/80">
          Phone
          <input className="input mt-2" required />
        </label>
        <label className="text-sm text-white/80">
          Email
          <input className="input mt-2" type="email" required />
        </label>
        <label className="text-sm text-white/80">
          Preferred date
          <input className="input mt-2" type="date" />
        </label>
        <label className="text-sm text-white/80 md:col-span-2">
          Service
          <select className="input mt-2">
            {services.map((service) => (
              <option key={service.id}>{service.name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm text-white/80 md:col-span-2">
          Comments
          <textarea className="input mt-2" rows={4} />
        </label>
        <Button type="submit" className="md:col-span-2">
          Submit request
        </Button>
      </form>
    </section>
  </div>
)

