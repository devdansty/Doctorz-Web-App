import React, { useState, useEffect } from 'react';
import '../styles/doctor_dash.css';
import { apiClient } from '../utils/apiClient';

const DoctorAvailability = () => {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState(['09:00', '10:00']);
  const [existingSlots, setExistingSlots] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  // ✅ Confirm component mounted
  useEffect(() => {
    console.log('✅ DoctorAvailability (DYNAMIC VERSION) mounted');
  }, []);

  // ✅ Fetch doctor profile and set doctorId
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      console.log('➡️ Fetching doctor profile...');
      try {
        const profile = await apiClient('/doctors/profile');
        console.log('✅ Profile response:', profile);

        if (profile && profile._id) {
          setDoctorId(profile._id);
        } else {
          console.error('❌ Doctor ID not found in profile:', profile);
        }
      } catch (err) {
        console.error('❌ Error fetching doctor profile:', err);
      }
    };
    fetchDoctorProfile();
  }, []);

  // ✅ Fetch availability whenever doctorId or date changes
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!doctorId || !date) return;

      try {
        const response = await apiClient(`/doctors/${doctorId}/availability?date=${date}`);
        console.log('📅 Fetched availability:', response);
        setExistingSlots(response.slots || []);
      } catch (err) {
        console.error('❌ Error fetching availability:', err);
      }
    };
    fetchAvailability();
  }, [doctorId, date]);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) {
      alert('Please select a date before submitting.');
      return;
    }

    try {
      await apiClient('/doctors/availability', 'POST', { date, slots });
      alert(`✅ Availability saved for ${date}:\n${slots.join(', ')}`);

      const response = await apiClient(`/doctors/${doctorId}/availability?date=${date}`);
      setExistingSlots(response.slots || []);
      setDate('');
    } catch (err) {
      console.error('❌ Error saving availability:', err);
      alert('Failed to save availability.');
    }
  };

  // ✅ Add new slot field
  const addSlot = () => setSlots([...slots, '']);

  // ✅ Handle slot input change
  const updateSlot = (value, index) => {
    const updated = [...slots];
    updated[index] = value;
    setSlots(updated);
  };

  return (
    <div className="page-content">
      <h2>🗓️ Set Your Availability</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <div className="time-slots">
          <label>Time Slots:</label>
          {slots.map((slot, index) => (
            <input
              key={index}
              type="time"
              value={slot}
              onChange={(e) => updateSlot(e.target.value, index)}
              required
            />
          ))}
          <button type="button" onClick={addSlot}>➕ Add Slot</button>
        </div>

        <button type="submit">💾 Save Availability</button>
      </form>

      <div className="existing-slots">
        <h3>📋 Existing Slots</h3>
        {existingSlots.length > 0 ? (
          <ul>
            {existingSlots.map((slot, idx) => (
              <li key={idx}>{slot}</li>
            ))}
          </ul>
        ) : (
          <p>No availability set for this date.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAvailability;
