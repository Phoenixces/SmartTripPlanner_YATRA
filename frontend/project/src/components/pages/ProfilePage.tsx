import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Calendar, MapPin, Camera, Edit3, Save, X, Heart, Plane, Trophy } from 'lucide-react';
import { useApp } from '../../context/AppContext';


const ProfilePage: React.FC = () => {
  const { user, setUser, t } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  // Handle profile editing
  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name: editData.name,
        bio: editData.bio,
        avatar: editData.avatar
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      bio: user?.bio || '',
      avatar: user?.avatar || ''
    });
    setIsEditing(false);
  };

  // Mock avatar upload
  const handleAvatarUpload = () => {
    const avatars = [
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setEditData(prev => ({ ...prev, avatar: randomAvatar }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
          <p className="text-gray-600">You need to be authenticated to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-xl text-gray-600">Manage your travel preferences and account settings</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              
              {/* Avatar Section */}
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block"
                >
                  <img
                    src={isEditing ? editData.avatar : user.avatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gradient-to-r from-blue-500 to-emerald-500 shadow-lg"
                  />
                  {isEditing && (
                    <motion.button
                      onClick={handleAvatarUpload}
                      className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Camera className="h-4 w-4" />
                    </motion.button>
                  )}
                </motion.div>
              </div>

              {/* User Info */}
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-semibold"
                      placeholder="Your name"
                    />
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={handleSave}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Save className="h-4 w-4" />
                        <span>{t('saveChanges')}</span>
                      </motion.button>
                      <motion.button
                        onClick={handleCancel}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <X className="h-4 w-4" />
                        <span>{t('cancel')}</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="viewing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
                    <p className="text-gray-600 mb-6">{user.bio}</p>
                    
                    <motion.button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>{t('editProfile')}</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{t('joinDate')}: {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats and Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Travel Statistics */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
                <span>Travel Statistics</span>
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl"
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">{user.bookedTrips}</div>
                  <div className="text-gray-700 font-medium">{t('bookedTrips')}</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl"
                >
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{user.upcomingTrips}</div>
                  <div className="text-gray-700 font-medium">{t('upcomingTrips')}</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl"
                >
                  <div className="text-3xl font-bold text-purple-600 mb-2">{user.favoriteDestinations.length}</div>
                  <div className="text-gray-700 font-medium">Favorites</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Favorite Destinations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Heart className="h-6 w-6 text-red-600" />
                <span>{t('favoriteDestinations')}</span>
              </h3>
              
              {user.favoriteDestinations.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.favoriteDestinations.map((destination, index) => (
                    <motion.div
                      key={destination}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl text-center cursor-pointer hover:shadow-lg transition-all duration-300"
                    >
                      <MapPin className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900">{destination}</h4>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No favorite destinations yet</p>
                  <p className="text-sm text-gray-400 mt-2">Start planning trips to add favorites!</p>
                </div>
              )}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Plane className="h-6 w-6 text-blue-600" />
                <span>Recent Activity</span>
              </h3>
              
              <div className="space-y-4">
                {[
                  { action: 'Planned a trip to Goa', date: '2 days ago', icon: '🏖️' },
                  { action: 'Added Kerala to favorites', date: '1 week ago', icon: '❤️' },
                  { action: 'Completed trip to Rajasthan', date: '2 weeks ago', icon: '✅' },
                  { action: 'Joined Smart Travellers', date: new Date(user.joinDate).toLocaleDateString(), icon: '🎉' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;