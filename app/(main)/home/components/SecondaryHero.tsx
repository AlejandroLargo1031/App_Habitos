export function SecondaryHero({ title, description }: { 
    title: string; 
    description: string 
  }) {
    return (
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl opacity-90">{description}</p>
        </div>
      </section>
    );
  }