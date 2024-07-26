import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import ServiceDetails from './ServiceDetails'; 
import ProviderProfileForCustomer from './ProviderProfileForCustomer'; // Import the ProviderProfileForCustomer component
import { Service } from '../types/appwrite.type';
import { fetchAllServices } from './DataServiceConsumer';
import { FaSearch } from 'react-icons/fa';

const CustomerSearchServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null); // track selected provider
  const [searchBy, setSearchBy] = useState('title');
  const [filter, setFilter] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [zips, setZips] = useState<string[]>([]);


  useEffect(() => {
    const fetchServices = async () => {
      const fetchedServices = await fetchAllServices();
      setServices(fetchedServices);
      setFilteredServices(fetchedServices); // Show all services initially

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(fetchedServices.map(service => service.category)));
      setCategories(uniqueCategories.sort());
      const uniqueZips = Array.from(new Set(fetchedServices.map(service => service.zipcode)));
      setZips(uniqueZips.sort());
      const uniqueCites = Array.from(new Set(fetchedServices.map(service => service.city)));
      setCities(uniqueCites.sort());
    };

    fetchServices();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    filterServices({ city: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    filterServices({ category: e.target.value });
  };
  const handleZipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setZip(e.target.value);
    filterServices({ zip: e.target.value });
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceRange(e.target.value);
    filterServices({ priceRange: e.target.value });
  };

  const handleSearchByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchBy(e.target.value);
  };

  const handleSearch = () => {
    filterServices();
  };

  const filterServices = (newFilters: any = {}) => {
    const updatedFilters = {
      searchBy,
      filter,
      city,
      category,
      zip,
      priceRange,
      ...newFilters,
    };

    let filtered = services;
    if (updatedFilters.filter) {
      if (updatedFilters.searchBy === 'title') {
        filtered = filtered.filter(service =>
          service.name.toLowerCase().includes(updatedFilters.filter.toLowerCase())
        );
      } else if (updatedFilters.searchBy === 'provider') {
        filtered = filtered.filter(service =>
          service.providerName.toLowerCase().includes(updatedFilters.filter.toLowerCase())
        );
      }
    }

    if (updatedFilters.city) {
      filtered = filtered.filter(service => service.city === updatedFilters.city);
    }

    if (updatedFilters.category) {
      filtered = filtered.filter(service => service.category === updatedFilters.category);
    }

    if (updatedFilters.zip) {
      filtered = filtered.filter(service => service.zipcode === updatedFilters.zipcode);
    }

    if (updatedFilters.priceRange) {
      const [min, max] = updatedFilters.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(service => service.price >= min && service.price <= max);
      } else {
        filtered = filtered.filter(service => service.price >= min);
      }
    }

    setFilteredServices(filtered);
  };

  if (selectedService) {
    return <ServiceDetails service={selectedService} onBack={() => setSelectedService(null)} />;
  }

  if (selectedProvider) {
    return <ProviderProfileForCustomer provider={selectedProvider} onBack={() => setSelectedProvider(null)} />;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Services</h2>
      <div className="flex flex-wrap items-center mb-4 space-x-2">
        <div className="flex items-center border rounded w-full sm:w-auto focus-within:ring-2 focus-within:ring-blue-500">
          <select
            value={searchBy}
            onChange={handleSearchByChange}
            className="border-none font-bold text-sm focus:border-none focus:outline-none rounded-l"
          >
            <option value="title">By Title</option>
            <option value="provider">By Provider</option>
          </select>
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Search services"
              value={filter}
              onChange={handleFilterChange}
              className="flex p-1.5 border-none focus:border-none focus:outline-none w-full focus:ring-0"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 bottom-0 p-2 bg-blue-500 text-white rounded-r"
            >
              <FaSearch />
            </button>
          </div>
        </div>
        <select
          value={city}
          onChange={handleCityChange}
          className="flex items-center border rounded w-full sm:w-auto p-2"
        >
          <option value="">City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
        <select
          value={zip}
          onChange={handleZipChange}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="">ZipCode</option>
          {zips.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="">Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={priceRange}
          onChange={handlePriceRangeChange}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="">Price Range</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-150">$100 - $150</option>
          <option value="150-200">$150 - $200</option>
          <option value="200-300">$200 - $300</option>
          <option value="300-400">$300 - $400</option>
          <option value="400-500">$400 - $500</option>
          <option value="500-800">$500 - $800</option>
          <option value="800-1000">$800 - $1000</option> 
          <option value="1000-">Over $1000</option>       
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-0.5">
        {filteredServices.map(service => (
          <ServiceCard
            key={service.$id}
            title={service.name}
            summary={service.summary}
            description={service.description}
            price={service.price}
            providerName={service.providerName}
            providerID=''
            category={service.category}
            city={service.city}
            providerIcon={'../public/assets/InteriorDesignXL.jpg'}
            rating={5}
            onClick={() => setSelectedService(service)} // Set the selected service on click
            onProviderClick={() => setSelectedProvider(service)} // Set the selected provider on click
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerSearchServices;
