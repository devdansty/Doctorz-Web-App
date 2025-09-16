import React, { useState, useEffect } from 'react';
import { apiClient } from '../utils/apiClient';
import '../styles/managment.css';

const DoctorSchedule = () => {
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState(['09:00']);
  const [existingSlots, setExistingSlots] = useState([]);

  // Fetch existing availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const data = await apiClient('/doctors/availability');
        setExistingSlots(data);
      } catch (err) {
        console.error('Error fetching availability:', err);
      }
    };
    fetchAvailability();
  }, []);

  const handleAddSlot = () => {
    setSlots([...slots, '']);
  };

  const handleSlotChange = (index, value) => {
    const newSlots = [...slots];
    newSlots[index] = value;
    setSlots(newSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient('/doctors/availability', 'POST', { date, slots });
      alert('Availability updated successfully!');
      setDate('');
      setSlots(['09:00']);
      // Refresh existing slots
      const updated = await apiClient('/doctors/availability');
      setExistingSlots(updated);
    } catch (err) {
      console.error('Error updating availability:', err);
    }
  };

  return (
    <div className="doctor-schedule">
      <h2>Manage Availability</h2>
      
      <div className="schedule-container">
        <form onSubmit={handleSubmit} className="availability-form">
          <div className="form-group">
            <label>Select Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="time-slots">
            <label>Available Time Slots:</label>
            {slots.map((slot, index) => (
              <div key={index} className="time-input">
                <input
                  type="time"
                  value={slot}
                  onChange={(e) => handleSlotChange(index, e.target.value)}
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-slot"
                    onClick={() => setSlots(slots.filter((_, i) => i !== index))}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-slot"
              onClick={handleAddSlot}
            >
              + Add Time Slot
            </button>
          </div>

          <button type="submit" className="save-button">
            Save Availability
          </button>
        </form>

        <div className="existing-slots">
          <h3>Current Availability</h3>
          {existingSlots.length > 0 ? (
            existingSlots.map((slot) => (
              <div key={slot._id} className="slot-card">
                <div className="slot-date">
                  {new Date(slot.date).toLocaleDateString()}
                </div>
                <div className="slot-times">
                  {slot.slots.join(', ')}
                </div>
              </div>
            ))
          ) : (
            <p>No availability set yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;