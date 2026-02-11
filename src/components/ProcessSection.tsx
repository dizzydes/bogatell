'use client';

import { useState } from "react";
import { Monitor, Search, Users, TrendingUp, FileText } from "lucide-react";
const phase1Image = "/assets/phase-1.webp";
const phase2Image = "/assets/phase-2.png";
const phase3Image = "/assets/phase-3.png";
const phase4Image = "/assets/phase-4.png";
const phase5Image = "/assets/phase-5.png";

const phases = [
  {
    id: 1,
    title: "Access & Infrastructure",
    goal: "Secure a connection to begin assessment.",
    description:
      "We start by establishing a secure connection to the estate in question. This gives us an initial picture of the stack, infrastructure and architecture. This allows for the remote analysis that follows and gives us a view of the IT OpEx. At this point we also send out a data request document to the team to get ahead of other information.",
    mode: "Remote Analysis",
    icon: Monitor,
    image: phase1Image,
  },
  {
    id: 2,
    title: "Security & Code Liability",
    goal: "Identify technical deal breakers early in process.",
    description:
      "We run forensic scans to catch risks missed by financial audits. We check the code, infrastructure and public assets for things like bad open source licenses, coding practices and security vulnerabilities. You receive a liability score alongside projected costs on fixes of any issues.",
    mode: "Remote Analysis",
    icon: Search,
    image: phase2Image,
  },
  {
    id: 3,
    title: "Team & Culture",
    goal: "Discover how their dev team works.",
    description:
      "A team that does not test is a team that breaks things. We audit code commits, test coverage, support tickets and roadmap. We then validate the data by interviewing technical leadership. We determine if the team is a high performance asset, lacking velocity or if there’s a potential black hole of undocumented information.",
    mode: "Remote Analysis & Interviews",
    icon: Users,
    image: phase3Image,
  },
  {
    id: 4,
    title: "Data & Scale",
    goal: "Validate scaling potential and commercial intelligence.",
    description:
      "We stress test the architecture to ensure it will not crash under your growth expectations. We find potential bottlenecks that need to be unblocked. We also audit the commercial data stack via assets like Google Analytics, CRM etc. We confirm these assets are active, transferable and accurate so you do not lose historical tracking data post-close.",
    mode: "Remote Analysis",
    icon: TrendingUp,
    image: phase4Image,
  },
  {
    id: 5,
    title: "Review",
    goal: "A decision framework rather than a log file.",
    description:
      "We surface key findings into a plain English executive summary. You receive a traffic light assessment for every risk category. No product is perfect - it’s rare to see all green. Every red or amber item comes with a specific remediation budget which is a dollar figure estimating the cost to fix it. This gives you the leverage to decide the bid based on the actual cost of the tech.",
    mode: "Remote Analysis & Interviews",
    icon: FileText,
    image: phase5Image,
  },
];

const ProcessSection = () => {
  const [activePhase, setActivePhase] = useState(phases[0]);

  return (
    <section id="checklist" className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">Process</h2>
        <p className="mb-12 max-w-2xl font-body text-muted-foreground">
          A structured technical assessment that gives you the intel to close with confidence.
        </p>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Phase selector - left side */}
          <div className="flex flex-row gap-2 overflow-x-auto pb-4 lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase)}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all duration-200 whitespace-nowrap lg:whitespace-normal ${
                  activePhase.id === phase.id
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-foreground hover:border-accent/50"
                }`}
              >
                <phase.icon
                  className={`h-5 w-5 shrink-0 ${activePhase.id === phase.id ? "text-accent-foreground" : "text-accent"}`}
                />
                <span className="font-body font-medium">Phase {phase.id}</span>
              </button>
            ))}
          </div>

          {/* Content - right side */}
          <div className="flex-1 rounded-lg border border-border bg-card p-8">
            {/* Mobile: Illustration first */}
            <div className="mb-6 lg:hidden">
              <img
                src={activePhase.image}
                alt={activePhase.title}
                className="w-full rounded-lg bg-background object-contain"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {/* Summary content */}
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                    <activePhase.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">{activePhase.title}</h3>
                  </div>
                </div>

                <p className="mb-4 font-body italic text-muted-foreground">{activePhase.goal}</p>

                <p className="mb-4 font-body leading-relaxed text-foreground">{activePhase.description}</p>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-accent/20 px-3 py-1 font-body text-sm text-accent">
                    {activePhase.mode}
                  </span>
                </div>
              </div>

              {/* Desktop: Illustration on right */}
              <div className="hidden lg:flex h-full min-h-48 items-center justify-center rounded-lg bg-background overflow-hidden">
                <img src={activePhase.image} alt={activePhase.title} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="#pricing"
            className="rounded-md bg-primary px-6 py-3 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Pricing
          </a>
          <a
            href="/book"
            className="rounded-md bg-accent px-6 py-3 font-body font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Book a Call
          </a>
          <a
            href="#sample-report"
            className="rounded-md border border-input bg-background px-6 py-3 font-body font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Sample Report
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
