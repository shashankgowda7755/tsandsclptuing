import React, { useState } from 'react';

interface GroupRegistrationFormProps {
  onBack: () => void;
}

export const GroupRegistrationForm: React.FC<GroupRegistrationFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeyPot, setHoneyPot] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Bot check
    if (honeyPot) {
      console.log('Bot detected');
      return;
    }

    // In a real app, send data to backend here
    console.log('Group Registration:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#001B48] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-icons-round text-green-600 text-4xl">check_circle</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-[#001B48] mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for filling the form. We will contact you soon regarding your group registration.
          </p>
          <button
            onClick={onBack}
            className="w-full py-3 bg-[#FF7F50] hover:bg-[#E56A3F] text-white font-bold rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001B48] flex items-center justify-center p-4">
      <div className="bg-white rounded-[20px] p-8 max-w-[480px] w-full shadow-2xl animate-slide-up relative">
         <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-[#001B48] mb-6 transition-colors text-sm font-medium"
        >
          <span className="material-icons-round text-lg mr-1">arrow_back</span>
          Back
        </button>

        <h2 className="text-[28px] font-bold text-[#001B48] mb-2">Register Your Group</h2>
        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
          Bring your team/school for a turtle walk. Please fill in the details below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Honeypot Field */}
          <div className="hidden">
             <input type="text" value={honeyPot} onChange={(e) => setHoneyPot(e.target.value)} tabIndex={-1} autoComplete="off"/>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Group / Contact Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF7F50] focus:border-transparent outline-none transition-all placeholder-gray-400"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF7F50] focus:border-transparent outline-none transition-all placeholder-gray-400"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF7F50] focus:border-transparent outline-none transition-all placeholder-gray-400"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#FF7F50] hover:bg-[#E56A3F] text-white font-bold rounded-[10px] transition-all shadow-md transform active:scale-[0.98] text-base"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};
