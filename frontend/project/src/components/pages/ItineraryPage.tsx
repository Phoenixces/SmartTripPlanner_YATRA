import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  IndianRupee,
  Share2,
  CreditCard,
  AlertCircle,
  Sparkles,
  Download,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { mockTripPlan } from "../../data/mockData";

// Itinerary display page showing generated trip plan
const ItineraryPage: React.FC = () => {
  const { tripPlan, t, setCurrentPage } = useApp();
  const [openSmartAdjustments, setOpenSmartAdjustments] = useState<
    string | null
  >(null);
  const [selectedAdjustments, setSelectedAdjustments] = useState({});
  // Track replacements by activity id
  const [replacements, setReplacements] = useState<Record<string, any>>({});

  const handleReplace = (dayId: number, activityId: string, smart: any) => {
    setReplacements((prev) => ({
      ...prev,
      [activityId]: smart,
    }));
    setOpenSmartAdjustments(null);
  };

  // Mock trip plan if none exists (for demo purposes)
  const mockTripPlan = {
    id: "mock_trip",
    destination: "Goa",
    startingPlace: "Mumbai",
    startDate: "2025-09-25",
    duration: 5,
    totalBudget: 50000,
    themes: ["nightlife", "food", "adventure"],
    itinerary: [
      {
        day: 1,
        date: "2024-03-15",
        activities: [
          {
            id: "act1",
            name: "Arrival & Beach Relaxation",
            type: "leisure",
            duration: "4 hours",
            cost: 0,
            description: "Check-in and unwind at Baga Beach",
            image:
              "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
            location: "Baga Beach",
          },
          {
            id: "act2",
            name: "Sunset Dinner Cruise",
            type: "food",
            duration: "3 hours",
            cost: 2500,
            description: "Romantic dinner with ocean views",
            image:
              "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400",
            location: "Mandovi River",
          },
        ],
        totalCost: 2500,
      },
      {
        day: 2,
        date: "2024-03-16",
        activities: [
          {
            id: "act3",
            name: "Water Sports Adventure",
            type: "adventure",
            duration: "5 hours",
            cost: 3500,
            description: "Jet ski, parasailing, and banana boat",
            image:
              "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=400",
            location: "Calangute Beach",
          },
          {
            id: "act4",
            name: "Beach Shack Hopping",
            type: "food",
            duration: "4 hours",
            cost: 1800,
            description: "Local seafood and drinks",
            image:
              "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400",
            location: "Anjuna Beach",
          },
        ],
        totalCost: 5300,
      },
    ],
    costBreakdown: {
      accommodation: 15000,
      transport: 8000,
      activities: 12000,
      food: 10000,
      total: 45000,
    },
    smartAdjustments: [
      "🌧️ Rain expected on Day 3 - Indoor cultural activities recommended",
      "🎉 Local festival on Day 4 - Special carnival events added",
      "💡 Peak season rates - Early morning bookings suggested",
    ],
  };

  const displayPlan = tripPlan || mockTripPlan;

  // Handle share trip functionality
  const handleShareTrip = async () => {
    const shareText = `Check out my amazing ${
      displayPlan.destination
    } trip planned with AI Travel Planner! 🌟\n\n${
      displayPlan.duration
    } days of adventure for ₹${displayPlan.costBreakdown.total.toLocaleString()}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My AI Planned Trip",
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Share cancelled:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert("Trip details copied to clipboard!");
    }
  };

  const handleDownloadTrip = () => {
    console.log("Starting PDF download...");
    try {
      // Create a new document
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(20);
      doc.setTextColor(0, 51, 153);
      doc.text(`${displayPlan.destination} Trip Itinerary`, 105, 15, {
        align: "center",
      });

      // Add trip summary
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Starting From: ${displayPlan.startingPlace}`, 20, 30);
      doc.text(`Trip Start Date: ${new Date(displayPlan.startDate).toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })}`, 20, 37);
      doc.text(`Duration: ${displayPlan.duration} days`, 20, 44);
      doc.text(
        `Total Budget: ₹${displayPlan.costBreakdown.total.toLocaleString()}`,
        20,
        51
      );

      // Add smart adjustments
      doc.setFontSize(14);
      doc.setTextColor(204, 102, 0);
      doc.text("Smart Adjustments", 20, 61);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      displayPlan.smartAdjustments.forEach((adjustment, index) => {
        doc.text(adjustment, 20, 69 + index * 7);
      });

      let yPosition = 69 + displayPlan.smartAdjustments.length * 7 + 10;

      // Add itinerary details day by day
      displayPlan.itinerary.forEach((day) => {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(0, 102, 204);
        doc.text(`Day ${day.day} (${day.date})`, 20, yPosition);
        yPosition += 7;

        day.activities.forEach((activity) => {
          // Check if we need a new page
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }

          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(activity.name, 25, yPosition);
          yPosition += 6;

          doc.setFontSize(10);
          doc.setTextColor(102, 102, 102);
          doc.text(`Location: ${activity.location}`, 30, yPosition);
          yPosition += 5;
          doc.text(`Duration: ${activity.duration}`, 30, yPosition);
          yPosition += 5;
          doc.text(`Cost: ₹${activity.cost.toLocaleString()}`, 30, yPosition);
          yPosition += 5;
          doc.text(`${activity.description}`, 30, yPosition);
          yPosition += 10;
        });

        doc.setFontSize(11);
        doc.setTextColor(0, 153, 0);
        doc.text(
          `Day ${day.day} Total: ₹${day.totalCost.toLocaleString()}`,
          25,
          yPosition
        );
        yPosition += 15;
      });

      // Add cost breakdown table on a new page
      doc.addPage();
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Cost Breakdown", 105, 20, { align: "center" });

      const tableData = [
        [
          "Accommodation",
          `₹${displayPlan.costBreakdown.accommodation.toLocaleString()}`,
        ],
        [
          "Transport",
          `₹${displayPlan.costBreakdown.transport.toLocaleString()}`,
        ],
        [
          "Activities",
          `₹${displayPlan.costBreakdown.activities.toLocaleString()}`,
        ],
        ["Food", `₹${displayPlan.costBreakdown.food.toLocaleString()}`],
        ["Total", `₹${displayPlan.costBreakdown.total.toLocaleString()}`],
      ];

      autoTable(doc, {
      startY: 30,
      head: [["Category", "Amount"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [0, 102, 204], textColor: 255 },
      footStyles: { fillColor: [0, 153, 0], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          "Generated by AI Travel Planner",
          105,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width - 20,
          doc.internal.pageSize.height - 10
        );
      }
      // Save the PDF
      doc.save(`trip-itinerary-${displayPlan.destination}.pdf`);
      console.log("PDF downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an issue generating the PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your AI-Generated Itinerary
          </h1>
          <div className="flex items-center justify-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <span className="font-semibold">{displayPlan.destination}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span>{displayPlan.duration} Days</span>
            </div>
            <div className="flex items-center space-x-2">
              <IndianRupee className="h-5 w-5 text-green-500" />
              <span>₹{displayPlan.costBreakdown.total.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Trip Origin and Start Date Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-start space-x-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
              <div className="flex items-center space-x-3 mb-2 md:mb-0">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-800">
                  Starting From: <span className="font-semibold text-purple-700">{displayPlan.startingPlace}</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-gray-800">
                  Trip Start Date: <span className="font-semibold text-orange-700">
                    {new Date(displayPlan.startDate).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Smart Adjustments Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-8"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-amber-600 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">
                {t("smartAdjustments")}
              </h3>
              <ul className="space-y-1">
                {displayPlan.smartAdjustments.map((adjustment, index) => (
                  <li key={index} className="text-sm text-amber-700">
                    {adjustment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Day-by-Day Itinerary */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t("dayByDay")}
            </h2>

            <AnimatePresence>
              {displayPlan.itinerary.map((day) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: day.day * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {/* Day Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Day {day.day}</h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm opacity-90">{day.date}</span>
                        <div className="flex items-center space-x-1">
                          <IndianRupee className="h-4 w-4" />
                          <span className="font-semibold">
                            ₹{day.totalCost.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="p-6 space-y-4">
                    {day.activities.map((activity, index) => {
                      // If replacement exists → use that instead
                      const effectiveActivity =
                        replacements[activity.id] || activity;
                      const hasWarning =
                        !replacements[activity.id] && activity.reason;

                      return (
                        <motion.div
                          key={effectiveActivity.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex flex-col space-y-4 p-4 rounded-lg transition-colors ${
                            hasWarning
                              ? "bg-orange-50 border border-orange-200"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          {/* 🔶 Warning Message (if reason exists) */}
                          {hasWarning && (
                            <div className="flex items-center space-x-2 bg-orange-100 text-orange-800 px-3 py-2 rounded-md text-sm font-medium mb-2">
                              <AlertCircle className="h-4 w-4" />
                              <span>
                                {activity.reason} — Consider Alternatives
                              </span>
                              <button
                                onClick={() =>
                                  setOpenSmartAdjustments(
                                    openSmartAdjustments === activity.id
                                      ? null
                                      : activity.id
                                  )
                                }
                                className="ml-auto text-xs underline text-orange-700 hover:text-orange-900"
                              >
                                View Options
                              </button>
                            </div>
                          )}

                          {/* Normal Activity Layout */}
                          <div className="flex space-x-4">
                            <img
                              src={effectiveActivity.image}
                              alt={effectiveActivity.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1 flex items-center justify-between">
                                {effectiveActivity.name}
                              </h4>
                              <p className="text-gray-600 text-sm mb-2">
                                {effectiveActivity.description}
                              </p>
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{effectiveActivity.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{effectiveActivity.duration}</span>
                                  </div>
                                </div>
                                {effectiveActivity.cost > 0 && (
                                  <div className="flex items-center space-x-1 text-green-600 font-medium">
                                    <IndianRupee className="h-4 w-4" />
                                    <span>
                                      ₹{effectiveActivity.cost.toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Smart Adjustments Grid */}
                          <AnimatePresence>
                            {openSmartAdjustments === activity.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="mt-4"
                              >
                                <h5 className="font-semibold text-gray-800 mb-3">
                                  Things you might look out for
                                </h5>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {activity.smartAdjustments.map((smart) => (
                                    <button
                                      key={smart.id}
                                      onClick={() =>
                                        handleReplace(
                                          day.day,
                                          activity.id,
                                          smart
                                        )
                                      }
                                      className="flex space-x-3 p-3 bg-white rounded-lg shadow border hover:shadow-md transition"
                                    >
                                      <img
                                        src={smart.image}
                                        alt={smart.name}
                                        className="w-16 h-16 object-cover rounded"
                                      />
                                      <div className="text-left">
                                        <h5 className="font-medium">
                                          {smart.name}
                                        </h5>
                                        <p className="text-xs text-gray-600">
                                          {smart.description}
                                        </p>
                                        <div className="flex items-center justify-between text-xs mt-1 text-gray-500">
                                          <span>{smart.location}</span>
                                          <span>{smart.duration}</span>
                                        </div>
                                        {smart.cost > 0 && (
                                          <div className="text-green-600 text-sm font-medium">
                                            ₹{smart.cost.toLocaleString()}
                                          </div>
                                        )}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Cost Breakdown Sidebar */}
          <div className="space-y-6">
            {/* Cost Breakdown Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t("costBreakdown")}
              </h3>

              <div className="space-y-4">
                {[
                  {
                    key: "accommodation",
                    icon: "🏨",
                    label: t("accommodation"),
                  },
                  { key: "transport", icon: "🚗", label: t("transport") },
                  { key: "activities", icon: "🎯", label: t("activities") },
                  { key: "food", icon: "🍽️", label: t("food") },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹
                      {displayPlan.costBreakdown[
                        item.key as keyof typeof displayPlan.costBreakdown
                      ].toLocaleString()}
                    </span>
                  </div>
                ))}

                <hr className="my-4" />

                <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                  <span>{t("total")}</span>
                  <span className="text-green-600">
                    ₹{displayPlan.costBreakdown.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <motion.button
                  onClick={() => setCurrentPage("booking")}
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>{t("bookInOneClick")}</span>
                </motion.button>

                {/* Action Buttons: Share and Download Buttons */}
                <div className="grid grid-cols-3 gap-5">
                  <motion.button
                    onClick={handleShareTrip}
                    className="w-full col-span-2 border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-100 transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Share2 className="h-5 w-5" />
                    <span>{t("shareTrip")}</span>
                  </motion.button>

                  <motion.button
                    onClick={handleDownloadTrip}
                    className="w-full border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-100 transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="h-5 w-5" />
                    <span>PDF</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* AI Features Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 text-center"
            >
              <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">AI-Optimized</h4>
              <p className="text-sm text-gray-600">
                This itinerary was intelligently crafted based on your
                preferences, budget, and real-time conditions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
