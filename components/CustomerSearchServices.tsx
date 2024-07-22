import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { Service } from '../types/appwrite.type';
import { fetchAllServices } from './DataServiceConsumer';
import { FaSearch } from 'react-icons/fa';

const CustomerSearchServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchBy, setSearchBy] = useState('title');
  const [filter, setFilter] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const fetchedServices = await fetchAllServices();
      setServices(fetchedServices);
      setFilteredServices(fetchedServices); // Show all services initially

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(fetchedServices.map(service => service.category)));
      setCategories(uniqueCategories);
    };

    fetchServices();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
    filterServices({ location: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    filterServices({ category: e.target.value });
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
      location,
      category,
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

    if (updatedFilters.location) {
      filtered = filtered.filter(service => service.address === updatedFilters.location);
    }

    if (updatedFilters.category) {
      filtered = filtered.filter(service => service.category === updatedFilters.category);
    }

    if (updatedFilters.priceRange) {
      const [min, max] = updatedFilters.priceRange.split('-').map(Number);
      filtered = filtered.filter(service => service.price >= min && service.price <= max);
    }

    setFilteredServices(filtered);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Services</h2>
      <div className="flex flex-wrap items-center mb-4 space-x-2">
        <div className="flex items-center border rounded w-full sm:w-auto focus-within:ring-2 focus-within:ring-blue-500">
          <select
            value={searchBy}
            onChange={handleSearchByChange}
            className="p-2 border-none focus:border-none focus:outline-none rounded-l"
          >
            <option value="title">By Title</option>
            <option value="provider">By Provider</option>
          </select>
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="🔍 Search services"
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
          value={location}
          onChange={handleLocationChange}
          className="flex items-center border rounded w-full sm:w-auto p-2"
        >
          <option value="">Location</option>
          <option value="Location">Location 1 temp</option>
          {/* Add more locations as needed */}
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
          {/* Add more price ranges as needed */}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredServices.map(service => (
          <ServiceCard
            key={service.$id}
            name={service.name}
            description={service.description}
            price={service.price}
            providerName={service.providerName}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerSearchServices;
