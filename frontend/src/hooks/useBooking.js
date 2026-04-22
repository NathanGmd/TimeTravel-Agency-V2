import { useState, useCallback } from 'react';
import { bookingsApi } from '../services/api.js';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  destinationId: '',
  travelers: 1,
  departureDate: '',
  duration: 'week',
  notes: '',
};

export function useBooking() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [errors, setErrors] = useState({});

  const updateField = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: null }));
  }, []);

  const setDestination = useCallback((destinationId) => {
    setForm(prev => ({ ...prev, destinationId }));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!form.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email invalide';
    if (!form.destinationId) newErrors.destinationId = 'Choisissez une destination';
    if (!form.departureDate) newErrors.departureDate = 'Date requise';
    return newErrors;
  };

  const submit = useCallback(async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setIsSubmitting(true);
    try {
      const result = await bookingsApi.create({ ...form, travelers: parseInt(form.travelers) });
      setConfirmation(result.data);
      return true;
    } catch (err) {
      setErrors({ submit: err.message });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [form]);

  const reset = useCallback(() => {
    setForm(INITIAL_FORM);
    setConfirmation(null);
    setErrors({});
  }, []);

  return { form, updateField, setDestination, submit, isSubmitting, confirmation, errors, reset };
}
