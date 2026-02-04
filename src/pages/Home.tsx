// Event Discovery App - Built with React, TypeScript, GraphQL, Apollo Client
import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useFavorites } from '../hooks/useFavorites';

// Type definitions
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
  category: string;
  venue: string;
  image: string;
  status: string;
}

interface ProjectsData {
  projects: Event[];
}

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
      date
      price
      category
      venue
      image
      status
    }
  }
`;

// Custom hook for data fetching
const useProjects = () => {
  const { data, loading, error } = useQuery<ProjectsData>(GET_PROJECTS);
  return { events: data?.projects || [], loading, error };
};

const EventCard: React.FC<{ event: Event; isFavorite: boolean; onToggleFavorite: () => void }> = ({ event, isFavorite, onToggleFavorite }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <article 
      className="event-card"
      style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        border: '1px solid #e5e7eb',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(255,255,255,0.95)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          zIndex: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      {/* Image Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '48px 24px',
        textAlign: 'center',
        fontSize: '48px'
      }}>
        {event.image}
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category Badge */}
        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          background: '#eff6ff',
          color: '#2563eb',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600',
          marginBottom: '12px',
          width: 'fit-content'
        }}>
          {event.category}
        </span>

        {/* Title */}
        <h3 style={{ 
          margin: '0 0 8px 0', 
          color: '#111827',
          fontSize: '18px',
          fontWeight: '700',
          lineHeight: '1.4'
        }}>
          {event.title}
        </h3>

        {/* Description */}
        <p style={{ 
          color: '#6b7280', 
          fontSize: '14px',
          margin: '0 0 16px 0',
          lineHeight: '1.5'
        }}>
          {event.description}
        </p>

        {/* Venue */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
          color: '#4b5563',
          fontSize: '13px'
        }}>
          <span>📍</span>
          <span>{event.venue}</span>
        </div>

        {/* Date */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          color: '#4b5563',
          fontSize: '13px',
          fontWeight: '500'
        }}>
          <span>📅</span>
          <span>{formatDate(event.date)}</span>
        </div>

        {/* Price & Status */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '16px',
          borderTop: '1px solid #f3f4f6'
        }}>
          <div>
            <span style={{ color: '#9ca3af', fontSize: '12px', display: 'block' }}>From</span>
            <span style={{ 
              color: '#111827', 
              fontSize: '20px', 
              fontWeight: '700' 
            }}>
              ${event.price}
            </span>
          </div>
          <button style={{
            background: event.status === 'Few Left' ? '#ef4444' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = event.status === 'Few Left' ? '#dc2626' : '#1d4ed8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = event.status === 'Few Left' ? '#ef4444' : '#2563eb';
          }}
          >
            Get Tickets
          </button>
        </div>

        {/* Status Badge */}
        {event.status && event.status !== 'On Sale' && (
          <div style={{
            marginTop: '12px',
            padding: '6px 12px',
            background: '#fef3c7',
            color: '#92400e',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            ⚡ {event.status}
          </div>
        )}
      </div>
    </article>
  );
};

const ErrorBoundary: React.FC<{ error: Error }> = ({ error }) => (
  <div 
    role="alert" 
    style={{ 
      padding: '20px', 
      background: '#fee', 
      border: '1px solid #fcc', 
      borderRadius: '4px',
      color: '#c00'
    }}
  >
    <h3>⚠️ Something went wrong</h3>
    <p>{error.message}</p>
    <button 
      onClick={() => window.location.reload()}
      style={{
        padding: '8px 16px',
        background: '#c00',
        color: 'white',
        { isFavorite, toggleFavorite, favorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'name'>('date');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [maxPrice] = useState(200);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false
    >
      Retry
    </button>
  </div>
);

const LoadingSpinner: React.FC = () => (
  <div style={{ textAlign: 'center', padding: '40px' }}>
    <div 
      style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        margin: '0 auto'
      }}
    />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    <p style={{ marginTop: '16px', color: '#666' }}>Loading events...</p>
  </div>
);

const Home: React.FC = () => {
  const { events, loading, error } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'name'>('date');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [maxPrice] = useState(200);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(events.map(e => e.category)))];

  // Filter and sort events
  const filteredEvents = events
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.venue.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFavorites = !showFavoritesOnly || isFavorite(event.id);
      return matchesSearch && matchesCategory && matchesPrice && matchesFavoritesvent.category === selectedCategory;
      const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBoundary error={error} />;

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '48px 24px',
        marginBottom: '32px',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: '800', 
            margin: '0 0 12px 0',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            🎫 Discover Events · {favorites.length} favorites
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9, margin: 0 }}>
            Find concerts, sports, theatre & more
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Search & Filters */}
        <div style={{ marginBottom: '32px' }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px'
              }}>🔍</span>
              <input
                type="text"
                placeholder="Search events, venues, artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 52px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#2563eb';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Category Filters */}, alignItems: 'center' }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: selectedCategory === category ? '#2563eb' : 'white',
                  color: selectedCategory === category ? 'white' : '#6b7280',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.background = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.background = 'white';
                  }
                }}
              >
                {category}
              </button>
            ))}
            
            {/* Favorites Toggle */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: showFavoritesOnly ? '#dc2626' : 'white',
                color: showFavoritesOnly ? 'white' : '#6b7280',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                marginLeft: 'auto'
              }}
              onMouseEnter={(e) => {
                if (!showFavoritesOnly) {
                  e.currentTarget.style.background = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (!showFavoritesOnly) {
                  e.currentTarget.style.background = 'white';
                }
              }}
            >
              {showFavoritesOnly ? '❤️ Favorites' : '🤍 Show Favorites'}
            </button>/button>
            ))}
          </div>

          {/* Sort and Filters Row */}
          <div style={{ 
            marginTop: '20px',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'name')}
                style={{
                  padding: '8px 32px 8px 12px',
                  fontSize: '14px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  background: 'white',
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              background: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              flex: '1',
              minWidth: '250px'
            }}>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                Price: ${priceRange[0]} - ${priceRange[1]}
              </span>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                style={{
                  flex: 1,
                  cursor: 'pointer',
                  accentColor: '#2563eb'
                }}
              />
              {priceRange[1] < maxPrice && (
                <button
                  onClick={() => setPriceRange([0, maxPrice])}
                  style={{
                    padding: '4px 8px',
                    fontSize: '12px',
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ 
          marginBottom: '24px',
          color: '#6b7280',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 20px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ color: '#111827', marginBottom: '8px' }}>No events found</h3>
            <p style={{ color: '#6b7280' }}>
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {filteredEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event}
                isFavorite={isFavorite(event.id)}
                onToggleFavorite={() => toggleFavorite(event.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
