import React, { createContext, useState } from 'react';

export const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendorData, setVendorData] = useState({
    fullName: '',
    email : '',
    password: '',
    phone:'',
    services: [],
    city: '',
    profileImage: null,
    description: '',
    location: '',
    mapLink: '',//not in db
    minPrice: 0,
    maxPrice: 0,
    portfolio_images:[],
    portfolio_videos: [],
    socialProof: [],
  });

  return (
    <VendorContext.Provider value={{ vendorData, setVendorData }}>
      {children}
    </VendorContext.Provider>
  );
};
