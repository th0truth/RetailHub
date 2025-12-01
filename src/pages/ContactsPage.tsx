import { contactInfo, serviceCenters } from '../data/catalog'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'

export const ContactsPage = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MintCommerce',
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: contactInfo.address,
    openingHours: contactInfo.hours,
  }

  return (
    <div className="container section-padding space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SectionHeading
        eyebrow="Contacts"
        title="Talk to sales or support"
        description="Map, contact form, fallback phones/emails, working hours, captcha, request callback."
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <iframe
          title="Locations map"
          src="https://maps.google.com/maps?q=Warsaw&t=&z=10&ie=UTF8&iwloc=&output=embed"
          className="h-[420px] w-full rounded-[32px]"
        />
        <div className="glass-panel space-y-4 p-6 text-sm text-white/70">
          <p className="text-lg font-semibold text-white">MintCommerce HQ</p>
          <p>{contactInfo.address}</p>
          <p>
            Phone: <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
          </p>
          <p>
            Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </p>
          <p>Working hours: {contactInfo.hours}</p>
          <Button variant="secondary" size="sm">
            Request callback
          </Button>
        </div>
      </div>

      <form className="glass-panel grid gap-4 p-8 md:grid-cols-2">
        <div className="md:col-span-2">
          <SectionHeading
            eyebrow="Contact form"
            title="Send a message"
            description="Name, phone, email, department, message, captcha on submit."
          />
        </div>
        <div className="space-y-4">
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
            <input className="input mt-2" type="email" />
          </label>
          <label className="text-sm text-white/80">
            Department
            <select className="input mt-2">
              <option>Sales</option>
              <option>Support</option>
              <option>Finance</option>
            </select>
          </label>
          <label className="text-sm text-white/80">
            Message
            <textarea className="input mt-2" rows={4} />
          </label>
          <div className="rounded-2xl border border-white/10 p-4 text-xs text-white/60">
            CAPTCHA placeholder (reCAPTCHA v3 token).
          </div>
          <Button type="submit">Send message</Button>
        </div>
      </form>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-white">Service centers</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {serviceCenters.map((center) => (
            <div key={center.id} className="glass-panel space-y-2 p-4">
              <p className="text-lg font-semibold text-white">{center.city}</p>
              <p className="text-sm text-white/60">{center.hours}</p>
              <p className="text-sm text-white/60">{center.phone}</p>
              <span className="text-xs uppercase text-white/40">Status: {center.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

