import { FEATURE_HIGHLIGHTS } from "../../utils/constants";
import SectionHeading from "../common/SectionHeading";

function FeaturePanel() {
  return (
    <section className="section-shell pb-10">
      <div className="surface-card p-6 sm:p-8">
        <SectionHeading
          eyebrow="Platform Strengths"
          title="Built like a real-world e-commerce project, styled for players."
          description="This project combines React, Express, and MySQL into a clean full-stack experience with authentication, filtering, cart logic, and polished presentation."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {FEATURE_HIGHLIGHTS.map((feature, index) => (
            <div key={feature.title} className="surface-muted p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
                0{index + 1}
              </p>
              <h3 className="text-xl font-semibold text-[color:var(--text-primary)]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturePanel;
