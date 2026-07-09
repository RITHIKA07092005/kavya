import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

const projectTypes = ["Website", "Mobile App", "AI Solution", "CRM", "ERP", "Dashboard", "Other"];

const initial = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  businessType: "",
  projectType: "",
  budget: "",
  timeline: "",
  requirements: "",
  additionalNotes: "",
};

export default function RequestProject() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initial);
  const [referenceImage, setReferenceImage] = useState(null);
  const [referenceDocument, setReferenceDocument] = useState(null);
  const [requestId, setRequestId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (referenceImage) data.append("referenceImage", referenceImage);
      if (referenceDocument) data.append("referenceDocument", referenceDocument);

      const res = await api.post("/project", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setRequestId(res.data.requestId);
      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section pt-32 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-2">Request a Project</h1>
      <p className="text-white/60 text-center mb-10">Step {step} of 4</p>

      <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-brand-gradient"
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="glass p-8">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg mb-2">Personal Details</h2>
            <input name="fullName" value={form.fullName} onChange={update} placeholder="Full Name" className="input" />
            <input name="email" value={form.email} onChange={update} placeholder="Email" className="input" />
            <input name="phone" value={form.phone} onChange={update} placeholder="Phone Number" className="input" />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg mb-2">Business Details</h2>
            <input name="companyName" value={form.companyName} onChange={update} placeholder="Company Name" className="input" />
            <input name="businessType" value={form.businessType} onChange={update} placeholder="Business Type" className="input" />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg mb-2">Project Details</h2>
            <div className="grid grid-cols-2 gap-3">
              {projectTypes.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setForm({ ...form, projectType: t })}
                  className={`py-2 rounded-lg border text-sm transition-colors ${
                    form.projectType === t ? "border-cyan-400 bg-cyan-400/10" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg mb-2">Budget, Timeline & Files</h2>
            <input name="budget" value={form.budget} onChange={update} placeholder="Budget" className="input" />
            <input name="timeline" value={form.timeline} onChange={update} placeholder="Timeline (e.g. 4 weeks)" className="input" />
            <textarea name="requirements" value={form.requirements} onChange={update} placeholder="Requirements" rows={3} className="input" />
            <div>
              <label className="text-sm text-white/60 block mb-1">Reference Image</label>
              <input type="file" accept="image/*" onChange={(e) => setReferenceImage(e.target.files[0])} className="text-sm" />
            </div>
            <div>
              <label className="text-sm text-white/60 block mb-1">Reference PDF</label>
              <input type="file" accept="application/pdf" onChange={(e) => setReferenceDocument(e.target.files[0])} className="text-sm" />
            </div>
            <textarea name="additionalNotes" value={form.additionalNotes} onChange={update} placeholder="Additional Notes" rows={2} className="input" />
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button onClick={back} disabled={step === 1} className="px-5 py-2 rounded-full border border-white/20 disabled:opacity-30">
            Back
          </button>
          {step < 4 ? (
            <button onClick={next} className="btn-primary">Next</button>
          ) : (
            <button onClick={handleSubmit} disabled={loading} className="btn-primary disabled:opacity-50">
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="glass p-10 text-center max-w-sm">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold mb-1">Request Submitted!</h3>
              <p className="text-white/60 text-sm mb-3">Your reference ID:</p>
              <div className="text-2xl font-bold gradient-text mb-6">{requestId}</div>
              <button onClick={() => { setSubmitted(false); setStep(1); setForm(initial); }} className="btn-primary">
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
