import React, { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  message, 
  checkOn = false, 
  checkMess = '', 
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { isDark } = useThemeStore();

  const handleConfirm = () => {
    onConfirm(isChecked);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50">
      <div className={`relative w-auto max-w-md mx-auto my-6 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
        <div className="relative flex flex-col w-full">
          {/* Header */}
          <div className={`flex items-start justify-between p-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-t`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Confirm Action
            </h3>
            <button
              className={`p-1 ml-auto border-0 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} float-right text-2xl leading-none font-semibold outline-none focus:outline-none`}
              onClick={onClose}
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="relative p-6 flex-auto">
            <p className={`my-4 text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {message}
            </p>
            {checkOn && (
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {checkMess}
                </label>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-end p-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} rounded-b`}>
            <button
              className={`px-4 py-2 mr-2 text-sm font-medium rounded-md ${
                isDark ? 'text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600' 
                : 'text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={onClose}
            >
              No
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                checkOn && !isChecked
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={handleConfirm}
              disabled={checkOn && !isChecked}
            >
              {checkOn ? 'Submit' : 'Yes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;