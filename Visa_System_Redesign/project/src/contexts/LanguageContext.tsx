import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.apply': 'Apply Now',
    'nav.status': 'Check Status',
    'nav.documents': 'Documents',
    
    // Header
    'header.title': 'Republic of Uganda',
    'header.subtitle': 'Electronic Visa System',
    'header.emergency': 'Emergency',
    'header.secure': 'Secure Platform',
    
    // Footer
    'footer.title': 'Republic of Uganda',
    'footer.subtitle': 'Electronic Visa System',
    'footer.description': 'The official online visa application system for the Republic of Uganda. Apply for your visa safely and securely.',
    'footer.hours': '24/7 Service Available',
    'footer.quickLinks': 'Quick Links',
    'footer.applyNow': 'Apply Now',
    'footer.checkStatus': 'Check Status',
    'footer.documents': 'Documents',
    'footer.faq': 'FAQ',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.accessibility': 'Accessibility',
    
    // Home page
    'home.hero.title': 'Welcome to Uganda',
    'home.hero.subtitle': 'Apply for your visa online in minutes with our secure and efficient system',
    'home.hero.applyNow': 'Apply Now',
    'home.hero.checkStatus': 'Check Status',
    
    'home.stats.processed': 'Visas Processed',
    'home.stats.countries': 'Countries Served',
    'home.stats.satisfaction': 'Satisfaction Rate',
    'home.stats.time': 'Average Processing',
    
    'home.features.title': 'Why Choose Our System?',
    'home.features.subtitle': 'Experience the fastest and most secure way to apply for your Uganda visa',
    'home.features.quick.title': 'Quick Processing',
    'home.features.quick.description': 'Get your visa approved in as little as 24 hours',
    'home.features.secure.title': 'Secure & Safe',
    'home.features.secure.description': 'Your data is protected with bank-level security',
    'home.features.online.title': '100% Online',
    'home.features.online.description': 'No need to visit embassies or consulates',
    'home.features.documents.title': 'Digital Documents',
    'home.features.documents.description': 'Upload and manage all documents digitally',
    
    'home.steps.title': 'How It Works',
    'home.steps.subtitle': 'Get your Uganda visa in three simple steps',
    'home.steps.step1.title': 'Fill Application',
    'home.steps.step1.description': 'Complete the online application form with your details',
    'home.steps.step2.title': 'Make Payment',
    'home.steps.step2.description': 'Pay securely using credit card or mobile money',
    'home.steps.step3.title': 'Get Visa',
    'home.steps.step3.description': 'Receive your approved visa via email',
    
    'home.cta.title': 'Ready to Visit Uganda?',
    'home.cta.subtitle': 'Start your visa application now and experience the Pearl of Africa',
    'home.cta.button': 'Start Application',
    
    // Application form
    'application.title': 'Visa Application',
    'application.subtitle': 'Complete the form below to apply for your Uganda visa',
    'application.stepInstructions': 'Step',
    'application.of': 'of',
    'application.back': 'Back',
    'application.next': 'Next',
    'application.submit': 'Submit Application',
    
    'application.steps.personal': 'Personal Information',
    'application.steps.travel': 'Travel Details',
    'application.steps.documents': 'Documents',
    'application.steps.review': 'Review & Submit',
    
    'application.form.firstName': 'First Name',
    'application.form.lastName': 'Last Name',
    'application.form.email': 'Email Address',
    'application.form.phone': 'Phone Number',
    'application.form.nationality': 'Nationality',
    'application.form.passportNumber': 'Passport Number',
    'application.form.dateOfBirth': 'Date of Birth',
    'application.form.gender': 'Gender',
    'application.form.visaType': 'Visa Type',
    'application.form.purposeOfVisit': 'Purpose of Visit',
    'application.form.arrivalDate': 'Arrival Date',
    'application.form.departureDate': 'Departure Date',
    'application.form.portOfEntry': 'Port of Entry',
    
    'application.form.firstNamePlaceholder': 'Enter your first name',
    'application.form.lastNamePlaceholder': 'Enter your last name',
    'application.form.emailPlaceholder': 'Enter your email address',
    'application.form.phonePlaceholder': 'Enter your phone number',
    'application.form.passportNumberPlaceholder': 'Enter your passport number',
    'application.form.selectNationality': 'Select your nationality',
    'application.form.selectGender': 'Select your gender',
    'application.form.selectVisaType': 'Select visa type',
    'application.form.selectPort': 'Select port of entry',
    'application.form.purposePlaceholder': 'Describe the purpose of your visit',
    'application.form.male': 'Male',
    'application.form.female': 'Female',
    'application.form.other': 'Other',
    'application.form.name': 'Name',
    
    'application.visa.tourist': 'Tourist Visa',
    'application.visa.business': 'Business Visa',
    'application.visa.transit': 'Transit Visa',
    'application.visa.diplomatic': 'Diplomatic Visa',
    
    'application.documents.requirements': 'Document Requirements',
    'application.documents.req1': 'Passport photo (recent, white background)',
    'application.documents.req2': 'Passport copy (biographical page)',
    'application.documents.req3': 'Yellow fever certificate (if applicable)',
    'application.documents.req4': 'All documents must be clear and legible',
    
    'application.documents.passportPhoto': 'Passport Photo',
    'application.documents.passportCopy': 'Passport Copy',
    'application.documents.yellowFever': 'Yellow Fever Certificate',
    'application.documents.photoInstruction': 'Upload a recent passport-sized photo',
    'application.documents.copyInstruction': 'Upload a clear copy of your passport',
    'application.documents.yellowInstruction': 'Upload your yellow fever certificate',
    'application.documents.uploadPhoto': 'Upload Photo',
    'application.documents.uploadCopy': 'Upload Copy',
    'application.documents.uploadYellow': 'Upload Certificate',
    
    'application.review.title': 'Review Your Application',
    'application.review.subtitle': 'Please review all information before submitting',
    'application.review.personal': 'Personal Information',
    'application.review.travel': 'Travel Details',
    'application.review.documents': 'Documents',
    'application.review.fees': 'Fees',
    
    'application.fees.visa': 'Visa Fee',
    'application.fees.processing': 'Processing Fee',
    'application.fees.total': 'Total Amount',
    
    'application.errors.required': 'This field is required',
    
    // System status
    'system.operational': 'All Systems Operational',
    'system.issues': 'System Issues Detected',
    'system.fallback': 'Fallback Mode Active',
    'system.fallbackMessage': 'Limited online services. Visit our offices for assistance.',
    'system.lastUpdated': 'Last updated',
    
    // Chatbot
    'chatbot.title': 'Visa Assistant',
    'chatbot.welcome': 'Hello! How can I help you with your visa application?',
    'chatbot.placeholder': 'Type your question...',
    'chatbot.q1': 'What documents do I need?',
    'chatbot.q2': 'How much does it cost?',
    'chatbot.q3': 'How long does it take?',
    'chatbot.q4': 'How do I check my status?',
    'chatbot.a1': 'You need a passport photo, passport copy, and yellow fever certificate (if applicable).',
    'chatbot.a2': 'Tourist visa costs $50 plus $10 processing fee.',
    'chatbot.a3': 'Processing typically takes 24-48 hours.',
    'chatbot.a4': 'You can check your status using your application reference number.',
    'chatbot.feeResponse': 'Visa fees vary by type: Tourist $50, Business $100, Transit $30. Processing fee is $10.',
    'chatbot.documentResponse': 'Required documents: passport photo, passport copy, yellow fever certificate (if applicable).',
    'chatbot.timeResponse': 'Processing time is typically 24-48 hours for most applications.',
    'chatbot.statusResponse': 'Check your application status using your reference number on the status page.',
    'chatbot.defaultResponse': 'I\'m here to help! Ask me about visa requirements, fees, or processing times.',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.apply': 'Postuler',
    'nav.status': 'Vérifier le statut',
    'nav.documents': 'Documents',
    
    // Header
    'header.title': 'République d\'Ouganda',
    'header.subtitle': 'Système de visa électronique',
    'header.emergency': 'Urgence',
    'header.secure': 'Plateforme sécurisée',
    
    // Footer
    'footer.title': 'République d\'Ouganda',
    'footer.subtitle': 'Système de visa électronique',
    'footer.description': 'Le système officiel de demande de visa en ligne pour la République d\'Ouganda.',
    'footer.hours': 'Service 24/7 disponible',
    'footer.quickLinks': 'Liens rapides',
    'footer.applyNow': 'Postuler maintenant',
    'footer.checkStatus': 'Vérifier le statut',
    'footer.documents': 'Documents',
    'footer.faq': 'FAQ',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': 'Conditions d\'utilisation',
    'footer.accessibility': 'Accessibilité',
    
    // Home page
    'home.hero.title': 'Bienvenue en Ouganda',
    'home.hero.subtitle': 'Demandez votre visa en ligne en quelques minutes avec notre système sécurisé',
    'home.hero.applyNow': 'Postuler maintenant',
    'home.hero.checkStatus': 'Vérifier le statut',
    
    'home.stats.processed': 'Visas traités',
    'home.stats.countries': 'Pays desservis',
    'home.stats.satisfaction': 'Taux de satisfaction',
    'home.stats.time': 'Traitement moyen',
    
    'home.features.title': 'Pourquoi choisir notre système?',
    'home.features.subtitle': 'Découvrez le moyen le plus rapide et le plus sûr de demander votre visa ougandais',
    'home.features.quick.title': 'Traitement rapide',
    'home.features.quick.description': 'Obtenez votre visa approuvé en aussi peu que 24 heures',
    'home.features.secure.title': 'Sécurisé',
    'home.features.secure.description': 'Vos données sont protégées avec une sécurité bancaire',
    'home.features.online.title': '100% en ligne',
    'home.features.online.description': 'Pas besoin de visiter les ambassades ou consulats',
    'home.features.documents.title': 'Documents numériques',
    'home.features.documents.description': 'Téléchargez et gérez tous les documents numériquement',
    
    'home.steps.title': 'Comment ça marche',
    'home.steps.subtitle': 'Obtenez votre visa ougandais en trois étapes simples',
    'home.steps.step1.title': 'Remplir la demande',
    'home.steps.step1.description': 'Complétez le formulaire de demande en ligne avec vos détails',
    'home.steps.step2.title': 'Effectuer le paiement',
    'home.steps.step2.description': 'Payez en toute sécurité par carte de crédit ou argent mobile',
    'home.steps.step3.title': 'Obtenir le visa',
    'home.steps.step3.description': 'Recevez votre visa approuvé par email',
    
    'home.cta.title': 'Prêt à visiter l\'Ouganda?',
    'home.cta.subtitle': 'Commencez votre demande de visa maintenant et découvrez la Perle de l\'Afrique',
    'home.cta.button': 'Commencer la demande',
    
    // Application form
    'application.title': 'Demande de visa',
    'application.subtitle': 'Complétez le formulaire ci-dessous pour demander votre visa ougandais',
    'application.stepInstructions': 'Étape',
    'application.of': 'de',
    'application.back': 'Retour',
    'application.next': 'Suivant',
    'application.submit': 'Soumettre la demande',
    
    'application.steps.personal': 'Informations personnelles',
    'application.steps.travel': 'Détails du voyage',
    'application.steps.documents': 'Documents',
    'application.steps.review': 'Révision et soumission',
    
    'application.form.firstName': 'Prénom',
    'application.form.lastName': 'Nom de famille',
    'application.form.email': 'Adresse e-mail',
    'application.form.phone': 'Numéro de téléphone',
    'application.form.nationality': 'Nationalité',
    'application.form.passportNumber': 'Numéro de passeport',
    'application.form.dateOfBirth': 'Date de naissance',
    'application.form.gender': 'Genre',
    'application.form.visaType': 'Type de visa',
    'application.form.purposeOfVisit': 'Objet de la visite',
    'application.form.arrivalDate': 'Date d\'arrivée',
    'application.form.departureDate': 'Date de départ',
    'application.form.portOfEntry': 'Port d\'entrée',
    
    'application.form.firstNamePlaceholder': 'Entrez votre prénom',
    'application.form.lastNamePlaceholder': 'Entrez votre nom de famille',
    'application.form.emailPlaceholder': 'Entrez votre adresse e-mail',
    'application.form.phonePlaceholder': 'Entrez votre numéro de téléphone',
    'application.form.passportNumberPlaceholder': 'Entrez votre numéro de passeport',
    'application.form.selectNationality': 'Sélectionnez votre nationalité',
    'application.form.selectGender': 'Sélectionnez votre genre',
    'application.form.selectVisaType': 'Sélectionnez le type de visa',
    'application.form.selectPort': 'Sélectionnez le port d\'entrée',
    'application.form.purposePlaceholder': 'Décrivez l\'objet de votre visite',
    'application.form.male': 'Masculin',
    'application.form.female': 'Féminin',
    'application.form.other': 'Autre',
    'application.form.name': 'Nom',
    
    'application.visa.tourist': 'Visa touristique',
    'application.visa.business': 'Visa d\'affaires',
    'application.visa.transit': 'Visa de transit',
    'application.visa.diplomatic': 'Visa diplomatique',
    
    'application.documents.requirements': 'Exigences documentaires',
    'application.documents.req1': 'Photo de passeport (récente, fond blanc)',
    'application.documents.req2': 'Copie du passeport (page biographique)',
    'application.documents.req3': 'Certificat de fièvre jaune (si applicable)',
    'application.documents.req4': 'Tous les documents doivent être clairs et lisibles',
    
    'application.documents.passportPhoto': 'Photo de passeport',
    'application.documents.passportCopy': 'Copie du passeport',
    'application.documents.yellowFever': 'Certificat de fièvre jaune',
    'application.documents.photoInstruction': 'Téléchargez une photo récente de format passeport',
    'application.documents.copyInstruction': 'Téléchargez une copie claire de votre passeport',
    'application.documents.yellowInstruction': 'Téléchargez votre certificat de fièvre jaune',
    'application.documents.uploadPhoto': 'Télécharger la photo',
    'application.documents.uploadCopy': 'Télécharger la copie',
    'application.documents.uploadYellow': 'Télécharger le certificat',
    
    'application.review.title': 'Révision de votre demande',
    'application.review.subtitle': 'Veuillez réviser toutes les informations avant de soumettre',
    'application.review.personal': 'Informations personnelles',
    'application.review.travel': 'Détails du voyage',
    'application.review.documents': 'Documents',
    'application.review.fees': 'Frais',
    
    'application.fees.visa': 'Frais de visa',
    'application.fees.processing': 'Frais de traitement',
    'application.fees.total': 'Montant total',
    
    'application.errors.required': 'Ce champ est requis',
    
    // System status
    'system.operational': 'Tous les systèmes opérationnels',
    'system.issues': 'Problèmes système détectés',
    'system.fallback': 'Mode de secours actif',
    'system.fallbackMessage': 'Services en ligne limités. Visitez nos bureaux pour assistance.',
    'system.lastUpdated': 'Dernière mise à jour',
    
    // Chatbot
    'chatbot.title': 'Assistant Visa',
    'chatbot.welcome': 'Bonjour! Comment puis-je vous aider avec votre demande de visa?',
    'chatbot.placeholder': 'Tapez votre question...',
    'chatbot.q1': 'Quels documents me faut-il?',
    'chatbot.q2': 'Combien ça coûte?',
    'chatbot.q3': 'Combien de temps ça prend?',
    'chatbot.q4': 'Comment vérifier mon statut?',
    'chatbot.a1': 'Vous avez besoin d\'une photo de passeport, copie du passeport, et certificat de fièvre jaune (si applicable).',
    'chatbot.a2': 'Le visa touristique coûte $50 plus $10 de frais de traitement.',
    'chatbot.a3': 'Le traitement prend généralement 24-48 heures.',
    'chatbot.a4': 'Vous pouvez vérifier votre statut en utilisant votre numéro de référence.',
    'chatbot.feeResponse': 'Les frais de visa varient par type: Touriste $50, Affaires $100, Transit $30. Frais de traitement $10.',
    'chatbot.documentResponse': 'Documents requis: photo de passeport, copie du passeport, certificat de fièvre jaune (si applicable).',
    'chatbot.timeResponse': 'Le temps de traitement est généralement de 24-48 heures pour la plupart des demandes.',
    'chatbot.statusResponse': 'Vérifiez le statut de votre demande en utilisant votre numéro de référence sur la page de statut.',
    'chatbot.defaultResponse': 'Je suis là pour vous aider! Demandez-moi à propos des exigences de visa, frais, ou temps de traitement.',
  },
  
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.apply': 'Omba Sasa',
    'nav.status': 'Angalia Hali',
    'nav.documents': 'Nyaraka',
    
    // Header
    'header.title': 'Jamhuri ya Uganda',
    'header.subtitle': 'Mfumo wa Visa wa Kielektroniki',
    'header.emergency': 'Dharura',
    'header.secure': 'Jukwaa Salama',
    
    // Footer
    'footer.title': 'Jamhuri ya Uganda',
    'footer.subtitle': 'Mfumo wa Visa wa Kielektroniki',
    'footer.description': 'Mfumo rasmi wa maombi ya visa mtandaoni kwa Jamhuri ya Uganda.',
    'footer.hours': 'Huduma ya Masaa 24/7 Inapatikana',
    'footer.quickLinks': 'Viungo vya Haraka',
    'footer.applyNow': 'Omba Sasa',
    'footer.checkStatus': 'Angalia Hali',
    'footer.documents': 'Nyaraka',
    'footer.faq': 'Maswali Yanayoulizwa Mara kwa Mara',
    'footer.contact': 'Wasiliana',
    'footer.rights': 'Haki zote zimehifadhiwa.',
    'footer.privacy': 'Sera ya Faragha',
    'footer.terms': 'Masharti ya Huduma',
    'footer.accessibility': 'Upatikanaji',
    
    // Home page
    'home.hero.title': 'Karibu Uganda',
    'home.hero.subtitle': 'Omba visa yako mtandaoni kwa dakika chache kwa kutumia mfumo wetu salama na wa ufanisi',
    'home.hero.applyNow': 'Omba Sasa',
    'home.hero.checkStatus': 'Angalia Hali',
    
    'home.stats.processed': 'Visa Zilizochakatwa',
    'home.stats.countries': 'Nchi Zinazohudumika',
    'home.stats.satisfaction': 'Kiwango cha Kuridhika',
    'home.stats.time': 'Kuchakata kwa Wastani',
    
    'home.features.title': 'Kwa Nini Uchague Mfumo Wetu?',
    'home.features.subtitle': 'Jaribu njia ya haraka na salama zaidi ya kuomba visa yako ya Uganda',
    'home.features.quick.title': 'Kuchakata Haraka',
    'home.features.quick.description': 'Pata visa yako ikaidhinishwa kwa masaa 24 tu',
    'home.features.secure.title': 'Salama',
    'home.features.secure.description': 'Data yako inalindwa kwa usalama wa kiwango cha benki',
    'home.features.online.title': '100% Mtandaoni',
    'home.features.online.description': 'Hakuna haja ya kutembelea balozi au mabalozi',
    'home.features.documents.title': 'Nyaraka za Kidijitali',
    'home.features.documents.description': 'Pakia na usimamie nyaraka zote kidijitali',
    
    'home.steps.title': 'Jinsi Inavyofanya Kazi',
    'home.steps.subtitle': 'Pata visa yako ya Uganda kwa hatua tatu rahisi',
    'home.steps.step1.title': 'Jaza Maombi',
    'home.steps.step1.description': 'Kamilisha fomu ya maombi mtandaoni kwa maelezo yako',
    'home.steps.step2.title': 'Fanya Malipo',
    'home.steps.step2.description': 'Lipa kwa usalama kwa kutumia kadi ya mkopo au pesa za simu',
    'home.steps.step3.title': 'Pata Visa',
    'home.steps.step3.description': 'Pokea visa yako iliyoidhinishwa kupitia barua pepe',
    
    'home.cta.title': 'Uko Tayari Kutembelea Uganda?',
    'home.cta.subtitle': 'Anza maombi yako ya visa sasa na ujionee Lulu la Afrika',
    'home.cta.button': 'Anza Maombi',
    
    // Application form
    'application.title': 'Maombi ya Visa',
    'application.subtitle': 'Kamilisha fomu iliyo hapa chini kuomba visa yako ya Uganda',
    'application.stepInstructions': 'Hatua',
    'application.of': 'ya',
    'application.back': 'Rudi',
    'application.next': 'Ifuatayo',
    'application.submit': 'Wasilisha Maombi',
    
    'application.steps.personal': 'Maelezo ya Kibinafsi',
    'application.steps.travel': 'Maelezo ya Safari',
    'application.steps.documents': 'Nyaraka',
    'application.steps.review': 'Kagua na Wasilisha',
    
    'application.form.firstName': 'Jina la Kwanza',
    'application.form.lastName': 'Jina la Ukoo',
    'application.form.email': 'Anwani ya Barua Pepe',
    'application.form.phone': 'Nambari ya Simu',
    'application.form.nationality': 'Uraia',
    'application.form.passportNumber': 'Nambari ya Pasipoti',
    'application.form.dateOfBirth': 'Tarehe ya Kuzaliwa',
    'application.form.gender': 'Jinsia',
    'application.form.visaType': 'Aina ya Visa',
    'application.form.purposeOfVisit': 'Kusudi la Ziara',
    'application.form.arrivalDate': 'Tarehe ya Kuwasili',
    'application.form.departureDate': 'Tarehe ya Kuondoka',
    'application.form.portOfEntry': 'Mahali pa Kuingia',
    
    'application.form.firstNamePlaceholder': 'Ingiza jina lako la kwanza',
    'application.form.lastNamePlaceholder': 'Ingiza jina lako la ukoo',
    'application.form.emailPlaceholder': 'Ingiza anwani yako ya barua pepe',
    'application.form.phonePlaceholder': 'Ingiza nambari yako ya simu',
    'application.form.passportNumberPlaceholder': 'Ingiza nambari ya pasipoti yako',
    'application.form.selectNationality': 'Chagua uraia wako',
    'application.form.selectGender': 'Chagua jinsia yako',
    'application.form.selectVisaType': 'Chagua aina ya visa',
    'application.form.selectPort': 'Chagua mahali pa kuingia',
    'application.form.purposePlaceholder': 'Eleza kusudi la ziara yako',
    'application.form.male': 'Mwanaume',
    'application.form.female': 'Mwanamke',
    'application.form.other': 'Nyingine',
    'application.form.name': 'Jina',
    
    'application.visa.tourist': 'Visa ya Utalii',
    'application.visa.business': 'Visa ya Biashara',
    'application.visa.transit': 'Visa ya Kupitia',
    'application.visa.diplomatic': 'Visa ya Kidiplomasia',
    
    'application.documents.requirements': 'Mahitaji ya Nyaraka',
    'application.documents.req1': 'Picha ya pasipoti (ya karibuni, mandhari nyeupe)',
    'application.documents.req2': 'Nakala ya pasipoti (ukurasa wa kibiolojia)',
    'application.documents.req3': 'Cheti cha homa ya manjano (ikiwa inahitajika)',
    'application.documents.req4': 'Nyaraka zote lazima ziwe wazi na zinasomeka',
    
    'application.documents.passportPhoto': 'Picha ya Pasipoti',
    'application.documents.passportCopy': 'Nakala ya Pasipoti',
    'application.documents.yellowFever': 'Cheti cha Homa ya Manjano',
    'application.documents.photoInstruction': 'Pakia picha ya karibuni ya ukubwa wa pasipoti',
    'application.documents.copyInstruction': 'Pakia nakala wazi ya pasipoti yako',
    'application.documents.yellowInstruction': 'Pakia cheti chako cha homa ya manjano',
    'application.documents.uploadPhoto': 'Pakia Picha',
    'application.documents.uploadCopy': 'Pakia Nakala',
    'application.documents.uploadYellow': 'Pakia Cheti',
    
    'application.review.title': 'Kagua Maombi Yako',
    'application.review.subtitle': 'Tafadhali kagua maelezo yote kabla ya kuwasilisha',
    'application.review.personal': 'Maelezo ya Kibinafsi',
    'application.review.travel': 'Maelezo ya Safari',
    'application.review.documents': 'Nyaraka',
    'application.review.fees': 'Ada',
    
    'application.fees.visa': 'Ada ya Visa',
    'application.fees.processing': 'Ada ya Kuchakata',
    'application.fees.total': 'Jumla ya Kiasi',
    
    'application.errors.required': 'Uga huu unahitajika',
    
    // System status
    'system.operational': 'Mifumo Yote Inafanya Kazi',
    'system.issues': 'Matatizo ya Mfumo Yamegundulika',
    'system.fallback': 'Hali ya Mbadala Imewashwa',
    'system.fallbackMessage': 'Huduma za mtandaoni zimepunguzwa. Tembelea ofisi zetu kwa msaada.',
    'system.lastUpdated': 'Imesasishwa mwisho',
    
    // Chatbot
    'chatbot.title': 'Msaidizi wa Visa',
    'chatbot.welcome': 'Hujambo! Ninawezaje kukusaidia na maombi yako ya visa?',
    'chatbot.placeholder': 'Andika swali lako...',
    'chatbot.q1': 'Ninahitaji nyaraka gani?',
    'chatbot.q2': 'Bei ni kiasi gani?',
    'chatbot.q3': 'Inachukua muda gani?',
    'chatbot.q4': 'Ninawezaje kuangalia hali yangu?',
    'chatbot.a1': 'Unahitaji picha ya pasipoti, nakala ya pasipoti, na cheti cha homa ya manjano (ikiwa inahitajika).',
    'chatbot.a2': 'Visa ya utalii ni $50 pamoja na ada ya kuchakata $10.',
    'chatbot.a3': 'Kuchakata kwa kawaida kunachukua masaa 24-48.',
    'chatbot.a4': 'Unaweza kuangalia hali yako kwa kutumia nambari ya kumbukumbu ya maombi yako.',
    'chatbot.feeResponse': 'Ada za visa ni tofauti kulingana na aina: Utalii $50, Biashara $100, Kupitia $30. Ada ya kuchakata $10.',
    'chatbot.documentResponse': 'Nyaraka zinazohitajika: picha ya pasipoti, nakala ya pasipoti, cheti cha homa ya manjano (ikiwa inahitajika).',
    'chatbot.timeResponse': 'Muda wa kuchakata ni kwa kawaida masaa 24-48 kwa maombi mengi.',
    'chatbot.statusResponse': 'Angalia hali ya maombi yako kwa kutumia nambari ya kumbukumbu kwenye ukurasa wa hali.',
    'chatbot.defaultResponse': 'Niko hapa kukusaidia! Niulize kuhusu mahitaji ya visa, ada, au nyakati za kuchakata.',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};