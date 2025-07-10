import React, { useState } from 'react';
import { FileText, Download, Eye, Upload, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const DocumentsPage = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('required');

  const documentCategories = [
    { id: 'required', name: 'Required Documents', icon: FileText },
    { id: 'optional', name: 'Optional Documents', icon: FileText },
    { id: 'samples', name: 'Sample Documents', icon: Eye }
  ];

  const requiredDocuments = [
    {
      id: 1,
      title: 'Passport Photo',
      description: 'Recent passport-sized photograph with white background',
      requirements: [
        'Size: 2x2 inches (51x51mm)',
        'White or off-white background',
        'Face must be clearly visible',
        'No glasses or headwear (unless religious)',
        'Taken within the last 6 months'
      ],
      fileFormats: ['JPEG', 'PNG'],
      maxSize: '2MB',
      status: 'required'
    },
    {
      id: 2,
      title: 'Passport Copy',
      description: 'Clear copy of your passport biographical page',
      requirements: [
        'Full biographical page visible',
        'All text must be clearly readable',
        'Must be valid for at least 6 months',
        'No damage or alterations',
        'Color scan preferred'
      ],
      fileFormats: ['PDF', 'JPEG', 'PNG'],
      maxSize: '5MB',
      status: 'required'
    },
    {
      id: 3,
      title: 'Yellow Fever Certificate',
      description: 'International vaccination certificate for yellow fever',
      requirements: [
        'Valid WHO yellow fever certificate',
        'Must be taken at least 10 days before travel',
        'Certificate must be in English or French',
        'Official stamp and signature required',
        'Valid for 10 years from date of vaccination'
      ],
      fileFormats: ['PDF', 'JPEG', 'PNG'],
      maxSize: '3MB',
      status: 'required'
    }
  ];

  const optionalDocuments = [
    {
      id: 4,
      title: 'Flight Itinerary',
      description: 'Confirmed flight booking or travel itinerary',
      requirements: [
        'Round-trip flight confirmation',
        'Must show entry and exit dates',
        'Booking reference number visible',
        'Passenger name must match passport'
      ],
      fileFormats: ['PDF', 'JPEG', 'PNG'],
      maxSize: '3MB',
      status: 'optional'
    },
    {
      id: 5,
      title: 'Hotel Reservation',
      description: 'Accommodation booking confirmation',
      requirements: [
        'Hotel or accommodation booking',
        'Check-in and check-out dates',
        'Guest name must match passport',
        'Contact information of hotel'
      ],
      fileFormats: ['PDF', 'JPEG', 'PNG'],
      maxSize: '3MB',
      status: 'optional'
    },
    {
      id: 6,
      title: 'Bank Statement',
      description: 'Proof of financial means for your stay',
      requirements: [
        'Recent bank statement (last 3 months)',
        'Minimum balance of $1,000',
        'Official bank letterhead',
        'Account holder name must match passport'
      ],
      fileFormats: ['PDF'],
      maxSize: '5MB',
      status: 'optional'
    }
  ];

  const sampleDocuments = [
    {
      id: 7,
      title: 'Sample Passport Photo',
      description: 'Example of a correctly formatted passport photo',
      downloadUrl: '#',
      previewUrl: '#'
    },
    {
      id: 8,
      title: 'Sample Yellow Fever Certificate',
      description: 'Example of a valid yellow fever vaccination certificate',
      downloadUrl: '#',
      previewUrl: '#'
    },
    {
      id: 9,
      title: 'Sample Application Form',
      description: 'Completed sample application form for reference',
      downloadUrl: '#',
      previewUrl: '#'
    }
  ];

  const getDocuments = () => {
    switch (selectedCategory) {
      case 'required':
        return requiredDocuments;
      case 'optional':
        return optionalDocuments;
      case 'samples':
        return sampleDocuments;
      default:
        return requiredDocuments;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'required':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'optional':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'uploaded':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'required':
        return 'bg-red-100 text-red-800';
      case 'optional':
        return 'bg-yellow-100 text-yellow-800';
      case 'uploaded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Document Requirements
          </h1>
          <p className="text-gray-600">
            Complete guide to visa application documents and requirements
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Important Information
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                All documents must be clear, legible, and in color. Documents in languages other than English must be translated and notarized.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Document Categories
              </h2>
              <nav className="space-y-2">
                {documentCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-red-100 text-red-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <category.icon className="w-4 h-4 mr-3" />
                    {category.name}
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Quick Stats
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Required:</span>
                    <span className="font-medium">3 docs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Optional:</span>
                    <span className="font-medium">3 docs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samples:</span>
                    <span className="font-medium">3 docs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {getDocuments().map((doc) => (
                <div key={doc.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {doc.title}
                        </h3>
                        <p className="text-gray-600">{doc.description}</p>
                      </div>
                    </div>
                    
                    {doc.status && (
                      <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doc.status)}`}>
                        {getStatusIcon(doc.status)}
                        <span className="ml-2 capitalize">{doc.status}</span>
                      </div>
                    )}
                  </div>

                  {/* Requirements */}
                  {doc.requirements && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Requirements:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {doc.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* File Info */}
                  {doc.fileFormats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Accepted Formats:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {doc.fileFormats.map((format, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                            >
                              {format}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Maximum Size:
                        </h4>
                        <span className="text-sm text-gray-600">{doc.maxSize}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    {selectedCategory === 'samples' ? (
                      <>
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </button>
                        <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Document
                        </button>
                        <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Guidelines
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Need Help with Documents?
              </h3>
              <p className="text-blue-700 mb-4">
                Our support team is available 24/7 to help you with document requirements and submission.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Contact Support
                </button>
                <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                  Document FAQ
                </button>
                <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                  Video Tutorials
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;