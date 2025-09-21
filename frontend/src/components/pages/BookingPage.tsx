import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, User, Mail, Phone, Shield, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Booking page component for trip payment and confirmation
const BookingPage: React.FC = () => {
  const { tripPlan, t, setCurrentPage, setBookingDetails } = useApp();
  
  // Form state for traveler details
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    emergencyContact: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock trip plan for demo
  const mockTripPlan = {
    id: 'mock_trip',
    destination: 'Goa',
    duration: 5,
    totalBudget: 50000,
    themes: ['nightlife', 'food', 'adventure'],
    costBreakdown: {
      accommodation: 15000,
      transport: 8000,
      activities: 12000,
      food: 10000,
      total: 45000
    }
  };

  const displayPlan = tripPlan || mockTripPlan;

  // Handle payment processing (mock)
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const bookingData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        tripPlan: displayPlan
      };
      
      setBookingDetails(bookingData);
      setIsProcessing(false);
      setCurrentPage('confirmation');
    }, 3000);
  };

  // Payment methods for selection
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, popular: true },
    { id: 'upi', name: 'UPI', icon: '📱', popular: true },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', popular: false },
    { id: 'wallet', name: 'Digital Wallet', icon: '💰', popular: false }
  ];

  const [selectedPayment, setSelectedPayment] = useState('card');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Booking</h1>
          <p className="text-xl text-gray-600">
            You're just one step away from your amazing {displayPlan.destination} adventure!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <form onSubmit={handlePayment} className="space-y-6">
              
              {/* Traveler Details Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>{t('travelerDetails')}</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('fullName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('email')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('phone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Emergency contact number"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <span>Payment Method</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {typeof method.icon === 'string' ? (
                            <span className="text-lg">{method.icon}</span>
                          ) : (
                            <method.icon className="h-5 w-5 text-gray-600" />
                          )}
                          <span className="font-medium text-sm">{method.name}</span>
                        </div>
                        {method.popular && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      {selectedPayment === method.id && (
                        <Check className="absolute top-2 right-2 h-4 w-4 text-blue-600" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">
                    Secure Payment - Your data is encrypted and protected
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  `${t('payNow')} - ₹${displayPlan.costBreakdown.total.toLocaleString()}`
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Booking Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 h-fit sticky top-24"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>
            
            {/* Trip Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Destination</span>
                <span className="font-semibold">{displayPlan.destination}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold">{displayPlan.duration} Days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Travelers</span>
                <span className="font-semibold">1 Adult</span>
              </div>
            </div>

            <hr className="my-6" />

            {/* Cost Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">🏨 Accommodation</span>
                <span>₹{displayPlan.costBreakdown.accommodation.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">🚗 Transport</span>
                <span>₹{displayPlan.costBreakdown.transport.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">🎯 Activities</span>
                <span>₹{displayPlan.costBreakdown.activities.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">🍽️ Food</span>
                <span>₹{displayPlan.costBreakdown.food.toLocaleString()}</span>
              </div>
            </div>

            <hr className="my-6" />

            {/* Total */}
            <div className="flex items-center justify-between text-xl font-bold text-gray-900">
              <span>Total Amount</span>
              <span className="text-green-600">₹{displayPlan.costBreakdown.total.toLocaleString()}</span>
            </div>

            {/* Booking Benefits */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Booking Benefits</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ 24/7 Travel Support</li>
                <li>✓ Free Cancellation up to 48 hours</li>
                <li>✓ Real-time Trip Updates</li>
                <li>✓ Local Guide Assistance</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;