import { useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../components/common/PageHeader";
import { CONTACT_CHANNELS } from "../utils/constants";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Thanks for your message. This project demo does not send emails, but the form is working.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Reach the team behind the ClickMart experience."
        description="The assignment brief asked for a contact page, so this project includes a styled support section and customer inquiry form ready for future backend expansion."
      />

      <section className="section-shell pb-16">
        <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            {CONTACT_CHANNELS.map((channel) => (
              <div key={channel.title} className="surface-card p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">{channel.title}</p>
                <p className="mt-2 text-xl font-semibold text-[color:var(--text-primary)]">{channel.value}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{channel.description}</p>
              </div>
            ))}
          </div>

          <form className="surface-card p-6 sm:p-8" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">Name</label>
                <input
                  type="text"
                  className="field"
                  value={formData.name}
                  onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">Email</label>
                <input
                  type="email"
                  className="field"
                  value={formData.email}
                  onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">Subject</label>
                <input
                  type="text"
                  className="field"
                  value={formData.subject}
                  onChange={(event) => setFormData((current) => ({ ...current, subject: event.target.value }))}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[color:var(--text-secondary)]">Message</label>
                <textarea
                  rows="6"
                  className="field resize-none"
                  value={formData.message}
                  onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                />
              </div>
            </div>

            <button type="submit" className="primary-button mt-8">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
