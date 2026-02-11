interface LogoBarProps {
  logos: { src: string; alt: string }[];
}

const LogoBar = ({ logos }: LogoBarProps) => {
  return (
    <section className="bg-card py-6 border-y border-border">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 flex-wrap">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-6 md:h-8 lg:h-10 w-auto grayscale opacity-50 hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoBar;
