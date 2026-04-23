import { useContext } from 'react';
import { useBooking } from '../../hooks/useBooking.js';
import { ToastContext } from '../../hooks/useToast.js';
import styles from './BookingSection.module.css';

const DESTINATIONS = [
  { value: 'paris1889',    label: 'Paris 1889 — Belle Époque' },
  { value: 'cretace',      label: 'Crétacé — -65 millions d années' },
  { value: 'florence1504', label: 'Florence 1504 — La Renaissance' },
];

const DURATIONS = [
  { value: 'weekend', label: 'Week-end (2-3 jours)' },
  { value: 'week',    label: '1 semaine' },
  { value: '2weeks',  label: '2 semaines' },
  { value: 'month',   label: '1 mois' },
];

export default function BookingSection({ preselectedDest }) {
  const { form, updateField, submit, isSubmitting, confirmation, errors, reset } = useBooking();
  const { show } = useContext(ToastContext);

  // Apply preselected destination if passed
  if (preselectedDest && !form.destinationId) {
    updateField('destinationId', preselectedDest);
  }

  const handleSubmit = async () => {
    const ok = await submit();
    if (ok) show('Voyage temporel initié avec succès !', 'success');
    else if (errors.submit) show(errors.submit, 'error');
  };

  if (confirmation) {
    return (
      <section className={styles.section} id="booking">
        <div className={styles.container}>
          <div className={styles.confirm}>
            <span className={styles.confirmIcon}>✦</span>
            <h3>Voyage Initié !</h3>
            <p>
              Votre demande pour <strong>{confirmation.destination}</strong> a été enregistrée.<br />
              Référence : <code>{confirmation.id.slice(0, 8).toUpperCase()}</code><br />
              Notre équipe vous contactera sous <strong>48 heures temporelles</strong>.
            </p>
            <button className={styles.resetBtn} onClick={reset}>Faire une nouvelle réservation</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="booking">
      <div className={styles.header}>
        <span className="section-eyebrow">— 04 — Réservation</span>
        <h2 className="section-title">Planifiez votre Voyage</h2>
        <p className="section-desc">Remplissez ce formulaire et notre équipe vous contactera sous 48 heures temporelles.</p>
      </div>

      <div className={styles.container}>
        <div className={styles.topLine} />

        <div className={styles.grid}>
          <Field label="Prénom *" error={errors.firstName}>
            <input className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
              value={form.firstName} onChange={e => updateField('firstName', e.target.value)}
              placeholder="Votre prénom" />
          </Field>

          <Field label="Nom *" error={errors.lastName}>
            <input className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
              value={form.lastName} onChange={e => updateField('lastName', e.target.value)}
              placeholder="Votre nom" />
          </Field>

          <Field label="Email *" error={errors.email}>
            <input className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              type="email" value={form.email} onChange={e => updateField('email', e.target.value)}
              placeholder="contact@exemple.com" />
          </Field>

          <Field label="Téléphone" error={errors.phone}>
            <input className={styles.input}
              type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)}
              placeholder="+33 6 00 00 00 00" />
          </Field>

          <Field label="Destination *" error={errors.destinationId}>
            <select className={`${styles.input} ${styles.select} ${errors.destinationId ? styles.inputError : ''}`}
              value={form.destinationId} onChange={e => updateField('destinationId', e.target.value)}>
              <option value="">— Choisir une époque —</option>
              {DESTINATIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </Field>

          <Field label="Voyageurs">
            <select className={`${styles.input} ${styles.select}`}
              value={form.travelers} onChange={e => updateField('travelers', e.target.value)}>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} voyageur{n > 1 ? 's' : ''}</option>)}
            </select>
          </Field>

          <Field label="Date de départ *" error={errors.departureDate}>
            <input className={`${styles.input} ${errors.departureDate ? styles.inputError : ''}`}
              type="date" value={form.departureDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => updateField('departureDate', e.target.value)} />
          </Field>

          <Field label="Durée du séjour">
            <select className={`${styles.input} ${styles.select}`}
              value={form.duration} onChange={e => updateField('duration', e.target.value)}>
              {DURATIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </Field>

          <Field label="Demandes particulières" full>
            <textarea className={`${styles.input} ${styles.textarea}`}
              value={form.notes} onChange={e => updateField('notes', e.target.value)}
              placeholder="Allergies, préférences, occasions spéciales, centres d'intérêt…"
              rows={3} />
          </Field>
        </div>

        <button className={styles.submit} onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Initialisation…' : '⟶ Initier le voyage temporel'}
        </button>
      </div>
    </section>
  );
}

function Field({ label, error, full, children }) {
  return (
    <div className={`${styles.field} ${full ? styles.fieldFull : ''}`}>
      <label className={styles.label}>{label}</label>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
