import React, { useState } from 'react';
import { Search, Clock, CheckCircle, XCircle, AlertCircle, FileText, CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const StatusPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock application data
  const mockApplication = {
    id: 'APP-UG-2024-001234',
    applicantName: 'John Doe',
    visaType: 'Tourist Visa',
    submittedDate: '2024-01-15',
    status: 'processing',
    estimatedCompletion: '2024-01-17',
    timeline: [
      { step: 'Application Submitted', completed: true, date: '2024-01-15 10:30 AM' },
      { step: 'Documents Verified', completed: true, date: '2024-01-15 2:15 PM' },
      { step: 'Payment Confirmed', completed: true, date: '2024-01-15 2:45 PM' },
      { step: 'Under Review', completed: false, current: true, date: 'In Progress' },
      { step: 'Visa Approved', completed: false, date: 'Pending' },
      { step: 'Visa Issued', completed: false, date: 'Pending' }
    ],
    documents: [
      { name: 'Passport Photo', status: 'approved', uploadedDate: '2024-01-15' },
      { name: 'Passport Copy', status: 'approved', uploadedDate: '2024-01-15' },
      { name: 'Yellow Fever Certificate', status: 'approved', uploadedDate: '2024-01-15' }
    ],
    fees: {
      visaFee: 50,
      processingFee: 10,
      total: 60,
      paid: true,
      paymentDate: '2024-01-15'
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      if (searchQuery.includes('APP-UG-2024-001234') || searchQuery.includes('john.doe@email.com')) {
        setApplicationStatus(mockApplication);
      } else {
        setApplicationStatus(null);
      }
      setIsSearching(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5" />;
      case 'processing':
        return <Clock className="w-5 h-5" />;
      case 'rejected':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Check Application Status
          </h1>
          <p className="text-gray-600">
            Enter your application ID or email address to check your visa status
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Application ID or Email Address
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="APP-UG-2024-001234 or john.doe@email.com"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="flex items-center justify-center px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed sm:mt-7"
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {applicationStatus && (
          <div className="space-y-6">
            {/* Application Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Application Overview
                </h2>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(applicationStatus.status)}`}>
                  {getStatusIcon(applicationStatus.status)}
                  <span className="ml-2 capitalize">{applicationStatus.status}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Application Details</h3>
                  <div className="space-y-1 text-sm">
                    <div><strong>ID:</strong> {applicationStatus.id}</div>
                    <div><strong>Applicant:</strong> {applicationStatus.applicantName}</div>
                    <div><strong>Visa Type:</strong> {applicationStatus.visaType}</div>
                    <div><strong>Submitted:</strong> {applicationStatus.submittedDate}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Processing Information</h3>
                  <div className="space-y-1 text-sm">
                    <div><strong>Current Status:</strong> {applicationStatus.status}</div>
                    <div><strong>Estimated Completion:</strong> {applicationStatus.estimatedCompletion}</div>
                    <div><strong>Processing Time:</strong> 24-48 hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Application Timeline
              </h2>
              
              <div className="space-y-4">
                {applicationStatus.timeline.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      step.completed 
                        ? 'bg-green-600 border-green-600 text-white' 
                        : step.current 
                        ? 'bg-yellow-600 border-yellow-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : step.current ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${
                          step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.step}
                        </h3>
                        <span className={`text-sm ${
                          step.completed || step.current ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {step.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Documents Status
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applicationStatus.documents.map((doc, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <FileText className="w-5 h-5 text-gray-400 mr-2" />
                      <h3 className="font-medium text-gray-900">{doc.name}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm px-2 py-1 rounded ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {doc.uploadedDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payment Information
              </h2>
              
              <div className="flex items-center mb-4">
                <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  applicationStatus.fees.paid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {applicationStatus.fees.paid ? 'Payment Confirmed' : 'Payment Pending'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Fee Breakdown</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Visa Fee:</span>
                      <span>${applicationStatus.fees.visaFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee:</span>
                      <span>${applicationStatus.fees.processingFee}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total:</span>
                      <span>${applicationStatus.fees.total}</span>
                    </div>
                  </div>
                </div>
                
                {applicationStatus.fees.paid && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Details</h3>
                    <div className="space-y-1 text-sm">
                      <div><strong>Payment Date:</strong> {applicationStatus.fees.paymentDate}</div>
                      <div><strong>Status:</strong> Confirmed</div>
                      <div><strong>Method:</strong> Credit Card</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Actions
              </h2>
              
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Download Receipt
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                  Contact Support
                </button>
                {applicationStatus.status === 'approved' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Download Visa
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery && !applicationStatus && !isSearching && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Application Found
            </h3>
            <p className="text-gray-600 mb-4">
              We couldn't find an application with the provided ID or email address.
            </p>
            <div className="text-sm text-gray-500">
              <p>Please check that you've entered the correct information, or</p>
              <p>contact our support team if you need assistance.</p>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            Need Help?
          </h3>
          <p className="text-blue-700 mb-4">
            If you're having trouble finding your application or have questions about the process, we're here to help.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Contact Support
            </button>
            <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
              View FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;