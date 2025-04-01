import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiDownload, FiSearch, FiAlertCircle, FiClipboard, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function Download() {
  const [requestId, setRequestId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDownload = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await axios.get(`/api/download/${id}`, {
        responseType: 'blob',
      });

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `request_${id}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      setSuccess(true);
      toast.success('Download started!');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError('Request not found');
        } else if (err.response.status === 400) {
          setError('Processing not completed yet');
        } else {
          setError('Failed to download file');
        }
      } else {
        setError('Network error. Please try again.');
      }
      toast.error('Download failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requestId.trim()) {
      handleDownload(requestId);
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Download Processed Data
          </h1>
          <p className="text-gray-600">Retrieve your processed CSV using the request ID</p>
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
              className="w-full pl-12 pr-16 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-800 bg-white"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FiClipboard className="text-xl" />
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? 'Preparing Download...' : 'Download CSV'}
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

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center p-4 mb-6 bg-green-50 border border-green-200 rounded-xl text-green-600"
          >
            <FiCheckCircle className="mr-3 text-xl" />
            CSV downloaded successfully! Check your downloads folder.
          </motion.div>
        )}

        {loading && (
          <div className="text-center p-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Generating CSV file...</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}