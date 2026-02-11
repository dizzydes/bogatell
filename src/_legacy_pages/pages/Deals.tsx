import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const copyEmail = () => {
  // navigator.clipboard.writeText("contact@bogatell.io");
  // toast.success("Email copied to clipboard");
};

const valuationData = [
  { vertical: "E-Commerce", avgMultiple: 1.7, topMultiple: 2.8 },
  { vertical: "Amazon FBA", avgMultiple: 2.0, topMultiple: 3.6 },
  { vertical: "Mobile App", avgMultiple: 3.6, topMultiple: 5.4 },
  { vertical: "Content", avgMultiple: 2.5, topMultiple: 4.2 },
  { vertical: "Amazon KDP", avgMultiple: 1.6, topMultiple: 2.0 },
  { vertical: "SaaS", avgMultiple: 2.4, topMultiple: 3.8 },
  { vertical: "Service", avgMultiple: 1.0, topMultiple: 1.6 },
  { vertical: "YouTube", avgMultiple: 2.3, topMultiple: 3.7 },
  { vertical: "Overall", avgMultiple: 1.9, topMultiple: 3.3 },
];

const industryData = [
  { category: "AI & Data Intelligence", count: 17, niches: "AI, Analytics, Machine Learning, Big Data, Generative AI" },
  { category: "Enterprise Operations", count: 16, niches: "ERP, SaaS, CRM, Sales Tools, Business Development, CMS" },
  { category: "Marketing & AdTech", count: 8, niches: "Digital Marketing, Advertising, SEO, Lead Gen" },
  { category: "Web Development & Services", count: 8, niches: "Web Design, Web Apps, Hosting, Developer Tools" },
  { category: "Media, Content & Entertainment", count: 8, niches: "Video, Publishing, Music, Digital Media" },
  { category: "Cloud & Infrastructure", count: 6, niches: "Cloud Computing, Data Centers, Network Hardware" },
  { category: "E-Commerce & Retail", count: 6, niches: "E-Commerce Platforms, Retail Tech, Shopping" },
  { category: "FinTech & Accounting", count: 5, niches: "Accounting, Payments, Financial Services" },
  { category: "Robotics & Industrial", count: 5, niches: "Robotics, Manufacturing, Industrial Automation" },
  { category: "Hardware & Semiconductors", count: 5, niches: "Electronics, Semiconductors, Computer Hardware" },
  { category: "Health & MedTech", count: 4, niches: "Health Care, Medical Devices, EHR" },
  { category: "Mobile Ecosystem", count: 4, niches: "Mobile Apps, Mobile Tech" },
  { category: "Security & Risk Management", count: 4, niches: "Cyber Security, Compliance, Public Safety" },
  { category: "Consumer & Lifestyle", count: 3, niches: "Parenting, Family, Consumer Software" },
  { category: "HR & Workforce", count: 3, niches: "Human Resources, Skill Assessment" },
  { category: "Blockchain", count: 2, niches: "Blockchain Technology" },
  { category: "Education & EdTech", count: 2, niches: "E-Learning, Education" },
  { category: "AR / VR", count: 2, niches: "Virtual Reality, Augmented Reality" },
  { category: "Location & Mapping", count: 2, niches: "Mapping Services, Location Based Services" },
  { category: "Transportation", count: 1, niches: "Air Transportation" },
];

const Deals = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-8 py-6 md:px-12 lg:px-16">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-body text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-8 py-12 md:px-12 md:py-16 lg:px-16">
        <h1 className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl">
          Market Data Report (2025)
        </h1>
        <p className="mb-12 font-body text-muted-foreground">
          All tech acquisitions in the <span className="font-semibold text-foreground">lower middle market bracket</span> this year that disclosed value. Keep in mind these numbers can vary wildly depending on who the buyer is and what an acquisition brings them.
        </p>

        <section className="mb-12">
          <h2 className="mb-6 font-display text-xl font-semibold text-foreground md:text-2xl">
            Valuation Multiple by Theme (2025)
          </h2>
          
          <div className="max-w-2xl rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Industry Category</TableHead>
                  <TableHead className="text-right font-semibold">Profit Multiple (Avg)</TableHead>
                  <TableHead className="text-right font-semibold">Profit Multiple (Top 10%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {valuationData.map((row) => (
                  <TableRow key={row.vertical} className={row.vertical === "Overall" ? "font-semibold bg-muted/50" : ""}>
                    <TableCell>{row.vertical}</TableCell>
                    <TableCell className="text-right">{row.avgMultiple.toFixed(1)}x</TableCell>
                    <TableCell className="text-right">{row.topMultiple.toFixed(1)}x</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-display text-xl font-semibold text-foreground md:text-2xl">
            Closed Deals by Theme (2025)
          </h2>
          
          <div className="max-w-4xl rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Industry Category</TableHead>
                  <TableHead className="text-right font-semibold">Verified Count</TableHead>
                  <TableHead className="font-semibold">Key Niches Included</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {industryData.map((row) => (
                  <TableRow key={row.category}>
                    <TableCell>{row.category}</TableCell>
                    <TableCell className="text-right">{row.count}</TableCell>
                    <TableCell className="text-muted-foreground">{row.niches}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 rounded-lg border border-border bg-muted/30 p-8 text-center space-y-2">
          <p className="font-body text-muted-foreground">
            Want to find out what your business is worth?{" "}
            <Link 
              to="/valuation"
              className="font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
              Get a valuation
            </Link>
          </p>
          <p className="font-body text-muted-foreground">
            Or perhaps you're interested in buying an asset in this space?{" "}
            <button 
              onClick={copyEmail}
              className="font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
              Get in touch
            </button>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-8 py-6 md:px-12 lg:px-16">
          <p className="font-body text-sm text-muted-foreground">
            Carrer de Ramon Turró, 109, Sant Martí, 08005 Barcelona, Spain
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Deals;
