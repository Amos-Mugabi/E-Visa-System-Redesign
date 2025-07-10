import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, Wifi, WifiOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SystemStatus = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState({
    online: true,
    services: {
      application: 'operational',
      payment: 'operational',
      documents: 'operational',
      verification: 'operational'
    },
    fallbackMode: false
  });

  useEffect(() => {
    // Simulate system status checks
    const checkSystemStatus = () => {
      // This would be replaced with actual API calls
      const isOnline = navigator.onLine;
      setStatus(prev => ({
        ...prev,
        online: isOnline,
        fallbackMode: !isOnline
      }));
    };

    checkSystemStatus();
    const interval = setInterval(checkSystemStatus, 30000); // Check every 30 seconds

    window.addEventListener('online', checkSystemStatus);
    window.addEventListener('offline', checkSystemStatus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', checkSystemStatus);
      window.removeEventListener('offline', checkSystemStatus);
    };
  }, []);

  if (status.fallbackMode) {
    return (
      <div className="bg-amber-600 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <WifiOff className="w-5 h-5" />
            <span className="font-medium">{t('system.fallback')}</span>
          </div>
          <div className="text-sm">
            {t('system.fallbackMessage')}
          </div>
        </div>
      </div>
    );
  }

  const hasIssues = Object.values(status.services).some(service => service !== 'operational');

  if (!hasIssues && status.online) {
    return null; // Don't show anything when everything is operational
  }

  return (
    <div className={`px-4 py-2 ${hasIssues ? 'bg-red-600' : 'bg-green-600'} text-white`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {status.online ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{t('system.operational')}</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">{t('system.issues')}</span>
            </>
          )}
        </div>
        <div className="text-sm">
          {t('system.lastUpdated')}: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;