import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Share2, Calendar, MapPin, Mail, Phone, Gift } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Booking confirmation page
const ConfirmationPage: React.FC = () => {
  const { bookingDetails, tripPlan, t, setCurrentPage } = useApp();
  const [confetti, setConfetti] = useState(true);

  // Remove confetti after animation
  useEffect(() => {
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Mock booking details if none exist
  const mockBooking = {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    tripPlan: {
      id: 'mock_trip',
      destination: 'Goa',
      duration: 5,
      costBreakdown: { total: 45000 }
    }
  };

  const booking = bookingDetails || mockBooking;
  const bookingId = `AI-${Date.now().toString().slice(-8)}`;
  const bookingDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Handle sharing booking confirmation
  const handleShare = async () => {
    const shareText = `🎉 My trip to ${booking.tripPlan.destination} is confirmed!\n\nBooking ID: ${bookingId}\nDuration: ${booking.tripPlan.duration} days\nPlanned with AI Travel Planner ✈️`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Trip Booking Confirmed!',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Booking details copied to clipboard!');
    }
  };

  // Download booking confirmation (mock)
  const handleDownload = () => {
    const content = `
BOOKING CONFIRMATION
Smart Travellers
==================

Booking ID: ${bookingId}
Date: ${bookingDate}

Traveler Details:
Name: ${booking.fullName}
Email: ${booking.email}
Phone: ${booking.phone}

Trip Details:
Destination: ${booking.tripPlan.destination}
Duration: ${booking.tripPlan.duration} days
Total Amount: ₹${booking.tripPlan.costBreakdown.total.toLocaleString()}

Thank you for choosing Smart Travellers!
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-confirmation-${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 relative overflow-hidden">
      
      {/* Confetti Animation */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360 * (Math.random() * 2 - 1),
                x: Math.random() * window.innerWidth
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: 'easeOut',
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="h-16 w-16 text-green-600" />
          </motion.div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('bookingConfirmed')}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your amazing {booking.tripPlan.destination} adventure is all set!
          </p>
          <p className="text-lg text-gray-500">
            Booking ID: <span className="font-mono font-bold text-blue-600">{bookingId}</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>
            
            <div className="space-y-6">
              {/* Trip Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Trip Information</span>
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destination</span>
                    <span className="font-semibold">{booking.tripPlan.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{booking.tripPlan.duration} Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-semibold text-green-600">₹{booking.tripPlan.costBreakdown.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Date</span>
                    <span className="font-semibold">{bookingDate}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  <span>Contact Information</span>
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name</span>
                    <span className="font-semibold">{booking.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="font-semibold">{booking.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-semibold">{booking.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={handleDownload}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="h-5 w-5" />
                  <span>Download</span>
                </motion.button>
                
                <motion.button
                  onClick={handleShare}
                  className="flex items-center justify-center space-x-2 border-2 border-green-600 text-green-600 py-3 px-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            {/* Next Steps Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-purple-600" />
                <span>What's Next?</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Check Your Email</h4>
                    <p className="text-gray-600 text-sm">Detailed itinerary and booking vouchers sent to {booking.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full text-green-600 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Download Travel App</h4>
                    <p className="text-gray-600 text-sm">Get real-time updates and local recommendations</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full text-purple-600 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pack & Prepare</h4>
                    <p className="text-gray-600 text-sm">Packing list and travel tips will be shared soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Offer Card */}
            <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Gift className="h-8 w-8 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900">Special Bonus!</h3>
              </div>
              <p className="text-gray-700 mb-4">
                As a thank you for choosing AI Travel Planner, enjoy these exclusive benefits:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>20% off on your next booking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Access to exclusive travel deals</span>
                </li>
              </ul>
            </div>

            {/* Return Home Button */}
            <motion.button
              onClick={() => setCurrentPage('landing')}
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Plan Another Trip
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;