import FeatureContent from "../components/home/FeatureContent";
import FeatureVisual from "../components/home/FeatureVisual";
import Hero from "../components/layout/Hero";
import Navigation from "../components/layout/Navigation";
import concretePreview from "../assets/concrete.png";
import structuralPreview from "../assets/structural.png";
const Home = () => {
  return (
    <>
      <div className="px-12 py-16">
      <section className="grid lg:grid-cols-2 gap-16 items-center">
               <FeatureVisual
    image={concretePreview}
    alt="Concrete Mix Optimization"
/>
        <FeatureContent
         badge="CORE RESEARCH MODULE"
  title="Concrete Mix Optimization"
  subtitle="AI-Assisted Particle Packing & Mix Design"
  description="Design optimized Ultra High Performance Fibre Reinforced Concrete (UHPFRC) mixtures using the Modified Andreasen & Andersen (MAA) particle packing model. Define material constraints, configure particle packing parameters, and allow the optimization engine to generate the best candidate mixes based on minimum RMS error."
  features={[
    "Configure MAA parameters (q, Dmin & Dmax)",
    "Specify material ranges for all constituents",
    "Generate Top 5–10 optimized concrete mixes",
    "Visualize PSD curves and compare RMS values",
    "Analyze mix proportions before laboratory validation",
  ]}
  buttonText="Open Workspace"
  buttonLink="/concrete-mix"
        />
</section>

<section className="grid lg:grid-cols-2 gap-16 items-center mt-32">
    <FeatureVisual
    image={structuralPreview}
    alt="Structural Health Monitoring"
/>
<FeatureContent
  badge="UPCOMING RESEARCH MODULE"
  title="Structural Health Monitoring"
  subtitle="AI-Based Crack Detection & Failure Assessment"
  description="Assess the structural condition of bridges using computer vision and deep learning. Upload crack images captured during inspections, and the system will analyze crack patterns, estimate severity, identify potential structural risks, and assist engineers in prioritizing maintenance decisions."
  features={[
    "Upload bridge crack images for AI analysis",
    "Automatic crack detection and segmentation",
    "Estimate crack severity and damage level",
    "Predict potential structural failure risk",
    "Generate inspection reports for maintenance planning",
  ]}
  buttonText="Explore Module"
  buttonLink="/structural-design"
/>
  </section>

</div>
    </>
  );
};

export default Home;