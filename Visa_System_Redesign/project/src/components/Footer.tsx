import React from 'react';
import { Shield, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-red-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('footer.title')}</h3>
                <p className="text-gray-400">{t('footer.subtitle')}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                {t('footer.hours')}
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><a href="/apply" className="text-gray-400 hover:text-white transition-colors">{t('footer.applyNow')}</a></li>
              <li><a href="/status" className="text-gray-400 hover:text-white transition-colors">{t('footer.checkStatus')}</a></li>
              <li><a href="/documents" className="text-gray-400 hover:text-white transition-colors">{t('footer.documents')}</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors">{t('footer.faq')}</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-gray-400">+256-414-123-456</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-gray-400">visas@immigration.go.ug</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-1" />
                <span className="text-gray-400">
                  Ministry of Internal Affairs<br />
                  Plot 1, Kabalega Crescent<br />
                  Kampala, Uganda
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Republic of Uganda. {t('footer.rights')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('footer.terms')}
            </a>
            <a href="/accessibility" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('footer.accessibility')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;