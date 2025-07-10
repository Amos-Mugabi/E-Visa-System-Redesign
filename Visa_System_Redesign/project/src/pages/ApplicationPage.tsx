import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  FileText, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  Camera,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApplication } from '../contexts/ApplicationContext';
import ProgressBar from '../components/ProgressBar';

const ApplicationPage = () => {
  const { t } = useLanguage();
  const { applicationData, updateApplication } = useApplication();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    dateOfBirth: '',
    gender: '',
    
    // Travel Information
    visaType: '',
    purposeOfVisit: '',
    arrivalDate: '',
    departureDate: '',
    portOfEntry: '',
    
    // Documents
    passportPhoto: null,
    passportCopy: null,
    yellowFeverCert: null,
    additionalDocs: []
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: t('application.steps.personal'), icon: User },
    { id: 2, title: t('application.steps.travel'), icon: FileText },
    { id: 3, title: t('application.steps.documents'), icon: Upload },
    { id: 4, title: t('application.steps.review'), icon: CheckCircle }
  ];

  const visaTypes = [
    { value: 'tourist', label: t('application.visa.tourist') },
    { value: 'business', label: t('application.visa.business') },
    { value: 'transit', label: t('application.visa.transit') },
    { value: 'diplomatic', label: t('application.visa.diplomatic') }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = t('application.errors.required');
      if (!formData.lastName) newErrors.lastName = t('application.errors.required');
      if (!formData.email) newErrors.email = t('application.errors.required');
      if (!formData.passportNumber) newErrors.passportNumber = t('application.errors.required');
    }
    
    if (step === 2) {
      if (!formData.visaType) newErrors.visaType = t('application.errors.required');
      if (!formData.purposeOfVisit) newErrors.purposeOfVisit = t('application.errors.required');
      if (!formData.arrivalDate) newErrors.arrivalDate = t('application.errors.required');
    }
    
    if (step === 3) {
      if (!formData.passportPhoto) newErrors.passportPhoto = t('application.errors.required');
      if (!formData.passportCopy) newErrors.passportCopy = t('application.errors.required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    updateApplication(formData);
    navigate('/payment');
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.form.firstName')} *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t('application.form.firstNamePlaceholder')}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.form.lastName')} *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t('application.form.lastNamePlaceholder')}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.form.email')} *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t('application.form.emailPlaceholder')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.form.phone')}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder={t('application.form.phonePlaceholder')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.form.nationality')} *
          </label>
          <select
            value={formData.nationality}
            onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">{t('application.form.selectNationality')}</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="IT">Italy</option>
            <option value="JP">Japan</option>
            <option value="IN">India</option>
            <option value="ZA">South Africa</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.form.passportNumber')} *
          </label>
          <input
            type="text"
            value={formData.passportNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, passportNumber: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.passportNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t('application.form.passportNumberPlaceholder')}
          />
          {errors.passportNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.passportNumber}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.form.dateOfBirth')} *
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.form.gender')} *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">{t('application.form.selectGender')}</option>
            <option value="male">{t('application.form.male')}</option>
            <option value="female">{t('application.form.female')}</option>
            <option value="other">{t('application.form.other')}</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderTravelInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('application.form.visaType')} *
        </label>
        <select
          value={formData.visaType}
          onChange={(e) => setFormData(prev => ({ ...prev, visaType: e.target.value }))}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
            errors.visaType ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">{t('application.form.selectVisaType')}</option>
          {visaTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        {errors.visaType && (
          <p className="mt-1 text-sm text-red-600">{errors.visaType}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('application.form.purposeOfVisit')} *
        </label>
        <textarea
          value={formData.purposeOfVisit}
          onChange={(e) => setFormData(prev => ({ ...prev, purposeOfVisit: e.target.value }))}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
            errors.purposeOfVisit ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={t('application.form.purposePlaceholder')}
        />
        {errors.purposeOfVisit && (
          <p className="mt-1 text-sm text-red-600">{errors.purposeOfVisit}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.form.arrivalDate')} *
          </label>
          <input
            type="date"
            value={formData.arrivalDate}
            onChange={(e) => setFormData(prev => ({ ...prev, arrivalDate: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.arrivalDate ? 'border-red-500' : 'border-gray-300'
            }`}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.arrivalDate && (
            <p className="mt-1 text-sm text-red-600">{errors.arrivalDate}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.form.departureDate')}
          </label>
          <input
            type="date"
            value={formData.departureDate}
            onChange={(e) => setFormData(prev => ({ ...prev, departureDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            min={formData.arrivalDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('application.form.portOfEntry')} *
        </label>
        <select
          value={formData.portOfEntry}
          onChange={(e) => setFormData(prev => ({ ...prev, portOfEntry: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">{t('application.form.selectPort')}</option>
          <option value="entebbe">Entebbe International Airport</option>
          <option value="malaba">Malaba Border Post</option>
          <option value="busia">Busia Border Post</option>
          <option value="katuna">Katuna Border Post</option>
          <option value="mpondwe">Mpondwe Border Post</option>
        </select>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-sm font-medium text-blue-800">
            {t('application.documents.requirements')}
          </h3>
        </div>
        <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
          <li>{t('application.documents.req1')}</li>
          <li>{t('application.documents.req2')}</li>
          <li>{t('application.documents.req3')}</li>
          <li>{t('application.documents.req4')}</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.documents.passportPhoto')} *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-4">
              {t('application.documents.photoInstruction')}
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload('passportPhoto', e.target.files[0])}
              className="hidden"
              id="passportPhoto"
            />
            <label
              htmlFor="passportPhoto"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
            >
              {t('application.documents.uploadPhoto')}
            </label>
            {formData.passportPhoto && (
              <p className="mt-2 text-sm text-green-600">
                ✓ {formData.passportPhoto.name}
              </p>
            )}
          </div>
          {errors.passportPhoto && (
            <p className="mt-1 text-sm text-red-600">{errors.passportPhoto}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.documents.passportCopy')} *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-4">
              {t('application.documents.copyInstruction')}
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload('passportCopy', e.target.files[0])}
              className="hidden"
              id="passportCopy"
            />
            <label
              htmlFor="passportCopy"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
            >
              {t('application.documents.uploadCopy')}
            </label>
            {formData.passportCopy && (
              <p className="mt-2 text-sm text-green-600">
                ✓ {formData.passportCopy.name}
              </p>
            )}
          </div>
          {errors.passportCopy && (
            <p className="mt-1 text-sm text-red-600">{errors.passportCopy}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('application.documents.yellowFever')}
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 mb-4">
            {t('application.documents.yellowInstruction')}
          </p>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileUpload('yellowFeverCert', e.target.files[0])}
            className="hidden"
            id="yellowFeverCert"
          />
          <label
            htmlFor="yellowFeverCert"
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
          >
            {t('application.documents.uploadYellow')}
          </label>
          {formData.yellowFeverCert && (
            <p className="mt-2 text-sm text-green-600">
              ✓ {formData.yellowFeverCert.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">
          {t('application.review.title')}
        </h3>
        <p className="text-sm text-yellow-700">
          {t('application.review.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-3">
            {t('application.review.personal')}
          </h4>
          <div className="space-y-2 text-sm">
            <div><strong>{t('application.form.name')}:</strong> {formData.firstName} {formData.lastName}</div>
            <div><strong>{t('application.form.email')}:</strong> {formData.email}</div>
            <div><strong>{t('application.form.nationality')}:</strong> {formData.nationality}</div>
            <div><strong>{t('application.form.passportNumber')}:</strong> {formData.passportNumber}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-3">
            {t('application.review.travel')}
          </h4>
          <div className="space-y-2 text-sm">
            <div><strong>{t('application.form.visaType')}:</strong> {formData.visaType}</div>
            <div><strong>{t('application.form.purposeOfVisit')}:</strong> {formData.purposeOfVisit}</div>
            <div><strong>{t('application.form.arrivalDate')}:</strong> {formData.arrivalDate}</div>
            <div><strong>{t('application.form.portOfEntry')}:</strong> {formData.portOfEntry}</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h4 className="font-medium text-gray-900 mb-3">
          {t('application.review.documents')}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {formData.passportPhoto && (
            <div className="text-sm">
              <span className="text-green-600">✓</span> {t('application.documents.passportPhoto')}
            </div>
          )}
          {formData.passportCopy && (
            <div className="text-sm">
              <span className="text-green-600">✓</span> {t('application.documents.passportCopy')}
            </div>
          )}
          {formData.yellowFeverCert && (
            <div className="text-sm">
              <span className="text-green-600">✓</span> {t('application.documents.yellowFever')}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">
          {t('application.review.fees')}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>{t('application.fees.visa')}</span>
            <span>$50.00</span>
          </div>
          <div className="flex justify-between">
            <span>{t('application.fees.processing')}</span>
            <span>$10.00</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-medium">
              <span>{t('application.fees.total')}</span>
              <span>$60.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('application.title')}
          </h1>
          <p className="text-gray-600">
            {t('application.subtitle')}
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} steps={steps} />

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {t('application.stepInstructions')} {currentStep} {t('application.of')} {steps.length}
            </p>
          </div>

          {currentStep === 1 && renderPersonalInfo()}
          {currentStep === 2 && renderTravelInfo()}
          {currentStep === 3 && renderDocuments()}
          {currentStep === 4 && renderReview()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-2 rounded-md font-medium ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('application.back')}
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700"
              >
                {t('application.next')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
              >
                {t('application.submit')}
                <CheckCircle className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;