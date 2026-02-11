import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="relative w-full overflow-hidden">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-8 py-4 md:px-12 lg:px-16">
          <Link href="/" className="font-display text-xl font-bold text-foreground">Bogatell</Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-muted-foreground hover:text-foreground font-body text-sm">Home</Link>
            <Link href="/#sample-report" className="text-muted-foreground hover:text-foreground font-body text-sm">Sample</Link>
            <Link href="/book" className="rounded-md bg-accent px-4 py-2 font-body text-sm font-semibold text-accent-foreground hover:bg-accent/90">Book a Call</Link>
          </div>
          <Link href="/book" className="rounded-md bg-accent px-4 py-2 font-body text-sm font-semibold text-accent-foreground hover:bg-accent/90 md:hidden">Book a Call</Link>
        </div>
      </nav>

      <section className="bg-background min-h-screen py-16 md:py-24">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
            <h1 className="font-display text-3xl font-bold mb-8">Privacy Policy</h1>
            <p className="font-body text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="font-display text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p className="font-body text-muted-foreground mb-4">
              Welcome to Bogatell ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or engage our Technical Due Diligence services.
            </p>

            <h2 className="font-display text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p className="font-body text-muted-foreground mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 font-body text-muted-foreground mb-4 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and company details when you book a call, use our valuation calculator, or contact us via chat.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, such as IP address, browser type, pages visited, and time spent on the site, collected via analytics tools.</li>
              <li><strong>Transaction Data:</strong> If you engage our services, we may collect billing and payment information.</li>
            </ul>

            <h2 className="font-display text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="font-body text-muted-foreground mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 font-body text-muted-foreground mb-4 space-y-2">
              <li>To provide and deliver our Technical Due Diligence consulting services.</li>
              <li>To schedule and conduct discovery calls and consultations.</li>
              <li>To communicate with you about our services, updates, and relevant industry insights.</li>
              <li>To improve our website functionality and user experience.</li>
              <li>To comply with legal obligations.</li>
            </ul>

            <p className="font-body text-muted-foreground mb-4">
              When you visit or log in to our website, cookies and similar technologies may be used by our online data partners or vendors to associate these activities with other personal information they or others have about you, including by association with your email. We (or service providers on our behalf) may then send communications and marketing to these email. You may opt out of receiving this advertising by visiting <a href="https://app.retention.com/optout" className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">https://app.retention.com/optout</a>.
            </p>

            <h2 className="font-display text-xl font-semibold mt-8 mb-4">4. Third-Party Tools and Services</h2>
            <p className="font-body text-muted-foreground mb-4">
              We use trusted third-party service providers to help us operate our business. These may include:
            </p>
            <ul className="list-disc pl-6 font-body text-muted-foreground mb-4 space-y-2">
              <li><strong>Calendly:</strong> For scheduling appointments.</li>
              <li><strong>Crisp:</strong> For customer support chat functionality.</li>
              <li><strong>Google Analytics & Hotjar:</strong> For website analytics and user behavior analysis.</li>
              <li><strong>Supabase:</strong> For database and backend services (e.g., storing valuation calculator data).</li>
              <li><strong>RB2B:</strong> For visitor identification and analytics.</li>
            </ul>
            <p className="font-body text-muted-foreground mb-4">
              These providers have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>

            <h2 className="font-display text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="font-body text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="font-display text-xl font-semibold mt-8 mb-4">6. Your Rights</h2>
            <p className="font-body text-muted-foreground mb-4">
              Depending on your location, you may have rights regarding your personal data, including the right to access, correct, delete, or restrict its processing. To exercise these rights, please contact us.
            </p>
            <p className="font-body text-muted-foreground mb-4">
              If you have enabled International Company-Level Identification on your account, best practice is to add information regarding GDPR Opt-Out in addition to the standard verbiage provided above:
            </p>
            <p className="font-body text-muted-foreground mb-4">
              When you visit or log in to our website, cookies and similar technologies may be used by our online data partners or vendors to associate these activities with other personal information they or others have about you, including by association with your email. We (or service providers on our behalf) may then send communications and marketing to these email. You may opt out of receiving this advertising by visiting <a href="https://app.retention.com/optout" className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">https://app.retention.com/optout</a>.
            </p>
            <p className="font-body text-muted-foreground mb-4">
              You also have the option to opt out of the collection of your personal data in compliance with GDPR. To exercise this option, please visit <a href="https://www.rb2b.com/rb2b-gdpr-opt-out" className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">https://www.rb2b.com/rb2b-gdpr-opt-out</a>.
            </p>

            <h2 className="font-display text-xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p className="font-body text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="font-body text-muted-foreground mb-4">
              <strong>Bogatell</strong><br />
              Carrer de Ramon Turró, 109<br />
              08005 Barcelona, Spain
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-background py-8">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="border-t border-border pt-8">
            <p className="font-body text-sm text-muted-foreground">Carrer de Ramon Turró, 109, Sant Martí, 08005 Barcelona, Spain</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
