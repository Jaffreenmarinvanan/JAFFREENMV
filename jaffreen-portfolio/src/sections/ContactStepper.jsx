import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import Stepper, { Step } from '../components/Stepper';
import SpecularButton from '../components/SpecularButton';
import './ContactStepper.css';

const projectTypes = [
  'Website',
  'Web App',
  'Full Stack Project',
  'API / Backend',
  'UI/UX Design',
  'Mobile App',
  'Other',
];

const budgetOptions = [
  'Under $1K',
  '$1K – $5K',
  '$5K – $15K',
  '$15K – $50K',
  '$50K+',
  'Not sure yet',
];

const timelineOptions = [
  'Less than 1 month',
  '1 – 3 months',
  '3 – 6 months',
  '6+ months',
  'Flexible',
];

const ContactStepper = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    _gotcha: '', // invisible honeypot field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) setSubmitError('');
  };

  const validateStep2 = useCallback(() => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.name, formData.email]);

  const validateStep3 = useCallback(() => {
    const newErrors = {};
    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Please describe your project';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.projectType, formData.description]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Connect to custom backend API (supports same-origin /api/contact or external VITE_API_URL)
      const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '') + '/api/contact';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline,
          description: formData.description,
          _gotcha: formData._gotcha || '',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to deliver message to inbox. Please try again.');
      }

      if (data.inquiryId) {
        setInquiryId(data.inquiryId);
      }
      setIsSuccess(true);
    } catch (err) {
      console.error('Contact API submit error:', err);
      setSubmitError(
        err.message || 'Failed to send message. Please try again or reach out directly via social links.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Custom stepper with internal validation ────── */
  const [stepperKey, setStepperKey] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleNextClick = (e) => {
    if (currentStep === 2 && !validateStep2()) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    if (currentStep === 3 && !validateStep3()) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return true;
  };

  const handleFinalStep = () => {
    handleSubmit();
  };

  /* ── Success State ────────────────────────────────── */
  if (isSuccess) {
    return (
      <div className="cs-success-wrapper">
        <motion.div
          className="cs-success-state"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
          <motion.div
            className="cs-success-circle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.15, damping: 15, stiffness: 200 }}
          >
            <motion.svg
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              width="36"
              height="36"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </motion.div>

          <motion.h3
            className="cs-success-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Delivered to Inbox!
          </motion.h3>
          <motion.p
            className="cs-success-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            Thank you, {formData.name}! Your message was processed and delivered directly to Jaffreen's inbox.
          </motion.p>

          {inquiryId && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{
                marginTop: 14,
                marginBottom: 6,
                fontSize: '12px',
                color: '#94a3b8',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                padding: '6px 16px',
                borderRadius: '9999px',
                display: 'inline-block',
              }}
            >
              Tracking ID: <code style={{ color: '#a78bfa', fontWeight: 600 }}>{inquiryId}</code>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ marginTop: 20 }}
          >
            <SpecularButton
              size="sm"
              radius={14}
              lineColor="#7c3aed"
              onClick={() => {
                setFormData({
                  name: '', email: '', company: '',
                  projectType: '', budget: '', timeline: '', description: '',
                  _gotcha: '',
                });
                setIsSuccess(false);
                setIsSubmitting(false);
                setInquiryId('');
                setErrors({});
                setSubmitError('');
                setCurrentStep(1);
                setStepperKey(k => k + 1);
              }}
            >
              Send Another
            </SpecularButton>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cs-wrapper">
      <Stepper
        key={stepperKey}
        initialStep={1}
        onStepChange={handleStepChange}
        onFinalStepCompleted={handleFinalStep}
        backButtonText="← Back"
        nextButtonText="Continue →"
        nextButtonProps={{
          onClick: handleNextClick,
          disabled: isSubmitting,
          className: `stepper-next-button ${isSubmitting ? 'stepper-next-submitting' : ''}`,
        }}
      >
        {/* ──── Step 1: Welcome ──── */}
        <Step>
          <div className="cs-step cs-welcome">
            <div className="cs-welcome-icon">🚀</div>
            <h3 className="cs-step-title">Let's build something amazing together.</h3>
            <p className="cs-step-subtitle">
              Tell me about your project and I'll bring your vision to life.
            </p>
          </div>
        </Step>

        {/* ──── Step 2: Personal Information ──── */}
        <Step>
          <div className="cs-step">
            <h3 className="cs-step-title">Personal Information</h3>
            <p className="cs-step-subtitle">How can I reach you?</p>

            <div className="cs-form-grid">
              {/* Invisible Bot Honeypot */}
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="cs-field-group">
                <label htmlFor="cs-name" className="cs-label">Full Name *</label>
                <input
                  id="cs-name"
                  name="name"
                  type="text"
                  className={`cs-input ${errors.name ? 'cs-has-error' : ''}`}
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {errors.name && <span className="cs-error-text">{errors.name}</span>}
              </div>

              <div className="cs-field-group">
                <label htmlFor="cs-email" className="cs-label">Email Address *</label>
                <input
                  id="cs-email"
                  name="email"
                  type="email"
                  className={`cs-input ${errors.email ? 'cs-has-error' : ''}`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && <span className="cs-error-text">{errors.email}</span>}
              </div>

              <div className="cs-field-group">
                <label htmlFor="cs-company" className="cs-label">Company <span className="cs-optional">(Optional)</span></label>
                <input
                  id="cs-company"
                  name="company"
                  type="text"
                  className="cs-input"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                />
              </div>
            </div>
          </div>
        </Step>

        {/* ──── Step 3: Project Details ──── */}
        <Step>
          <div className="cs-step">
            <h3 className="cs-step-title">Project Details</h3>
            <p className="cs-step-subtitle">Tell me about your project.</p>

            <div className="cs-form-grid">
              <div className="cs-field-group">
                <label htmlFor="cs-project-type" className="cs-label">Project Type *</label>
                <select
                  id="cs-project-type"
                  name="projectType"
                  className={`cs-select ${errors.projectType ? 'cs-has-error' : ''}`}
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select project type...</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.projectType && <span className="cs-error-text">{errors.projectType}</span>}
              </div>

              <div className="cs-field-row">
                <div className="cs-field-group cs-field-half">
                  <label htmlFor="cs-budget" className="cs-label">Budget <span className="cs-optional">(Optional)</span></label>
                  <select
                    id="cs-budget"
                    name="budget"
                    className="cs-select"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select budget...</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="cs-field-group cs-field-half">
                  <label htmlFor="cs-timeline" className="cs-label">Timeline <span className="cs-optional">(Optional)</span></label>
                  <select
                    id="cs-timeline"
                    name="timeline"
                    className="cs-select"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">Select timeline...</option>
                    {timelineOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="cs-field-group">
                <label htmlFor="cs-description" className="cs-label">Project Description *</label>
                <textarea
                  id="cs-description"
                  name="description"
                  rows={4}
                  className={`cs-textarea ${errors.description ? 'cs-has-error' : ''}`}
                  placeholder="Describe your project, goals, and any specific requirements..."
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && <span className="cs-error-text">{errors.description}</span>}
              </div>
            </div>
          </div>
        </Step>

        {/* ──── Step 4: Review & Submit ──── */}
        <Step>
          <div className="cs-step">
            <h3 className="cs-step-title">Review & Submit</h3>
            <p className="cs-step-subtitle">Double-check your information before sending.</p>

            <div className="cs-review-card">
              <div className="cs-review-section">
                <div className="cs-review-header">
                  <span className="cs-review-label">Personal Info</span>
                </div>
                <div className="cs-review-grid">
                  <div className="cs-review-item">
                    <span className="cs-review-key">Name</span>
                    <span className="cs-review-value">{formData.name || '—'}</span>
                  </div>
                  <div className="cs-review-item">
                    <span className="cs-review-key">Email</span>
                    <span className="cs-review-value">{formData.email || '—'}</span>
                  </div>
                  {formData.company && (
                    <div className="cs-review-item">
                      <span className="cs-review-key">Company</span>
                      <span className="cs-review-value">{formData.company}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="cs-review-divider" />

              <div className="cs-review-section">
                <div className="cs-review-header">
                  <span className="cs-review-label">Project Details</span>
                </div>
                <div className="cs-review-grid">
                  <div className="cs-review-item">
                    <span className="cs-review-key">Type</span>
                    <span className="cs-review-value">{formData.projectType || '—'}</span>
                  </div>
                  {formData.budget && (
                    <div className="cs-review-item">
                      <span className="cs-review-key">Budget</span>
                      <span className="cs-review-value">{formData.budget}</span>
                    </div>
                  )}
                  {formData.timeline && (
                    <div className="cs-review-item">
                      <span className="cs-review-key">Timeline</span>
                      <span className="cs-review-value">{formData.timeline}</span>
                    </div>
                  )}
                  <div className="cs-review-item cs-review-full">
                    <span className="cs-review-key">Description</span>
                    <span className="cs-review-value cs-review-description">{formData.description || '—'}</span>
                  </div>
                </div>
              </div>
            </div>

            {submitError && (
              <div className="cs-submit-error" role="alert">
                <span>⚠️</span>
                <span>{submitError}</span>
              </div>
            )}

            {isSubmitting && (
              <div className="cs-submitting-overlay">
                <div className="cs-spinner" />
                <span>Sending your message...</span>
              </div>
            )}
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default ContactStepper;
