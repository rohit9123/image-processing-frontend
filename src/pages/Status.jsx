import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiSearch, FiAlertCircle, FiClock, FiCheckCircle, FiLoader, FiClipboard } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const statusColors = {
  pending: 'bg-yellow-500',
  processing: 'bg-blue-500',
  completed: 'bg-green-500'
};

export default function Status() {
  const [requestId, setRequestId] = useState('');
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatus = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`https://image-processing-420g.onrender.com/api/status/${id}`);
      setStatusData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requestId.trim()) {
      fetchStatus(requestId);
    } else {
      setError('Please enter a valid request ID.');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRequestId(text.trim());
      toast.success('Pasted from clipboard!');
    } catch (err) {
      toast.error('Failed to access clipboard');
    }
  };

  const progress = statusData 
    ? (statusData.processedProducts / statusData.totalProducts) * 100
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Check Processing Status
          </h1>
          <p className="text-gray-600">Track your request progress in real-time</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6 mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Request ID"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              className="w-full pl-12 pr-16 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 bg-white"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
            >
              <FiClipboard className="text-xl" />
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? 'Searching...' : 'Check Status'}
          </motion.button>
        </motion.form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-600"
          >
            <FiAlertCircle className="mr-3 text-xl" />
            {error}
          </motion.div>
        )}

        {loading ? (
          <div className="text-center p-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Fetching status...</p>
          </div>
        ) : statusData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Processing Details</h2>
              <span className={`${statusColors[statusData.status.toLowerCase()]} text-white px-3 py-1 rounded-full text-sm`}>
                {statusData.status.toLowerCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FiLoader className="text-purple-600" />
                  <span className="text-gray-700">Progress</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {statusData.processedProducts}/{statusData.totalProducts}
                </span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <FiClock className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Started</p>
                  <p className="font-medium text-gray-900">
                    {new Date(statusData.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FiCheckCircle className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-medium text-gray-900">
                    {new Date(statusData.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 bg-white rounded-xl shadow-sm"
          >
            <p className="text-gray-500">Enter your request ID to view status</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}