import InputPanel from "./InputPanel";
import ResultPanel from "./ResultPanel";

const Workspace = () => {
  return (
    <section id="workspace" className="px-6 py-12 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[35fr_65fr]">
        <InputPanel />
        <ResultPanel />
      </div>
    </section>
  );
};

export default Workspace;
