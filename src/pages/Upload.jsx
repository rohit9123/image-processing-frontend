import React from 'react'
import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCopy, FiUploadCloud, FiTrash2, FiClock, FiAlertCircle, FiFileText } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';

export default function Upload() {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedIds, setUploadedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('uploadedIds')) || [];
    setUploadedIds(storedIds);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', {
      icon: '📋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const clearHistory = () => {
    localStorage.removeItem('uploadedIds');
    setUploadedIds([]);
    toast.success('History cleared successfully!', {
      icon: '🗑️',
    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('csv', acceptedFiles[0]);

      const response = await axios.post('https://image-processing-420g.onrender.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });

      const requestId = response.data.requestId;
      if (requestId) {
        const updatedIds = [{ id: requestId, date: new Date().toISOString() }, ...uploadedIds];
        localStorage.setItem('uploadedIds', JSON.stringify(updatedIds));
        setUploadedIds(updatedIds);
      }

      setIsUploading(false);
      setProgress(0);
      toast.success('File uploaded successfully! 🎉', {
        icon: '🚀',
        duration: 4000,
      });

    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
      setIsUploading(false);
      toast.error('Upload failed! 😢', {
        icon: '❌',
      });
    }
  }, [uploadedIds]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800">CSV Upload</h1>
          <p className="text-gray-600">Upload your CSV file for processing</p>
        </motion.div>

        <motion.div
          {...getRootProps()}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`group border-4 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
            ${isDragActive 
              ? 'border-blue-500 bg-blue-100/50' 
              : 'border-gray-300/80 hover:border-blue-400 bg-white/50'}`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <motion.div
              animate={isUploading ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                rotate: {
                  repeat: isUploading ? Infinity : 0,
                  duration: 2,
                  ease: 'linear',
                  repeatType: 'loop'
                }
              }}
              className="inline-block"
            >
              <FiFileText className="text-4xl text-blue-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-xl font-semibold">
              {isDragActive ? 'Drop to upload' : 'Drag & drop CSV file here'}
            </h2>
            <p className="text-gray-500">or click to select file</p>
            <p className="text-sm text-gray-400">Supported format: CSV (Max 10MB)</p>
          </div>
        </motion.div>

        {isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
              />
            </div>
            <p className="text-center text-gray-600 font-medium">
              Uploading... {progress}%
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center p-4 bg-red-50/80 border border-red-200 rounded-xl text-red-600"
          >
            <FiAlertCircle className="mr-3 text-xl" />
            {error}
          </motion.div>
        )}

        {uploadedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upload History</h3>
              <button
                onClick={clearHistory}
                className="flex items-center text-red-500 hover:text-red-600 transition-colors"
              >
                <FiTrash2 className="mr-2" />
                Clear History
              </button>
            </div>
            
            <div className="space-y-3">
              {uploadedIds.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-blue-600">{entry.id}</span>
                      <button
                        onClick={() => copyToClipboard(entry.id)}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <FiCopy />
                      </button>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <FiClock className="mr-2" />
                      {new Date(entry.date).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate(`/status`)}
                      className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      View Status
                    </button>
                    <button
                      onClick={() => navigate('/download')}
                      className="px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}