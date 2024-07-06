import { useState } from 'react';
import axios from 'axios';
import AvailabilityCalendar from '../components/AvailabilityCalendar'; // Import the component
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  provider: {
    username: string;
  };
}

const SearchPage = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.get(`/api/search`, { params: { term } });
      setResults(response.data);
    } catch (error) {
      setError('Failed to fetch results');
    }
  };

  return (
    <div>
      <Header />
      <h1>Search for Services</h1>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Enter service provider, category, or keyword"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <ul>
        {results.map((service) => (
          <li key={service.id}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <p>Category: {service.category}</p>
            <p>Provider: {service.provider.username}</p>
          </li>
        ))}
      </ul>

      <AvailabilityCalendar /> {/* Include the AvailabilityCalendar component */}
      <Footer />
    </div>
  );
};

export default SearchPage;
