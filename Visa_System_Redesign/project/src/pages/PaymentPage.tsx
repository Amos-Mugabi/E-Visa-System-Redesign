import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApplication } from '../contexts/ApplicationContext';

const PaymentPage = () => {
  const { t } = useLanguage();
  const { applicationData } = useApplication();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    phoneNumber: '',
    mobileProvider: 'mtn'
  });

  const fees = {
    visaFee: 50,
    processingFee: 10,
    total: 60
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      
      // Redirect to status page after successful payment
      setTimeout(() => {
        navigate('/status');
      }, 3000);
    }, 3000);
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Your payment has been processed successfully. You will receive a confirmation email shortly.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600">
                <p><strong>Application ID:</strong> APP-UG-2024-001234</p>
                <p><strong>Amount Paid:</strong> ${fees.total}</p>
                <p><strong>Payment Method:</strong> {paymentMethod === 'card' ? 'Credit Card' : 'Mobile Money'}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              Redirecting to status page in 3 seconds...
            </p>
            
            <button
              onClick={() => navigate('/status')}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
            >
              Go to Status Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Payment
          </h1>
          <p className="text-gray-600">
            Secure payment processing for your Uganda visa application
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Payment Method
              </h2>

              {/* Payment Method Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    paymentMethod === 'card' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <CreditCard className="w-6 h-6 text-gray-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('mobile')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    paymentMethod === 'mobile' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <Smartphone className="w-6 h-6 text-gray-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Mobile Money</h3>
                      <p className="text-sm text-gray-500">MTN, Airtel, Vodafone</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value }))}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={formData.cardHolder}
                      onChange={(e) => setFormData(prev => ({ ...prev, cardHolder: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              )}

              {/* Mobile Money Form */}
              {paymentMethod === 'mobile' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Provider
                    </label>
                    <select
                      value={formData.mobileProvider}
                      onChange={(e) => setFormData(prev => ({ ...prev, mobileProvider: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="mtn">MTN Mobile Money</option>
                      <option value="airtel">Airtel Money</option>
                      <option value="vodafone">Vodafone Cash</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      placeholder="+256 700 123 456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                      <p className="text-sm text-blue-800">
                        You will receive a payment prompt on your phone to complete the transaction.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-green-50 p-4 rounded-lg mt-6">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  <div>
                    <p className="text-sm text-green-800">
                      <strong>Secure Payment:</strong> Your payment information is encrypted and secure.
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      We use bank-level security to protect your financial information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Application Details */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Application Details
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Tourist Visa - Single Entry</div>
                  <div>Applicant: {applicationData.firstName} {applicationData.lastName}</div>
                  <div>Passport: {applicationData.passportNumber}</div>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="border-t pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Visa Fee</span>
                    <span>${fees.visaFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span>${fees.processingFee}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${fees.total}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 bg-red-600 text-white py-3 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay $${fees.total}`
                )}
              </button>

              {/* Payment Options */}
              <div className="mt-4 text-center text-xs text-gray-500">
                <p>By clicking "Pay", you agree to our</p>
                <p>
                  <a href="#" className="text-red-600 hover:text-red-700">Terms of Service</a>
                  {' and '}
                  <a href="#" className="text-red-600 hover:text-red-700">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;