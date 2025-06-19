import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './components/AuthContext';
import HomeScreen from './components/Screens/HomeScreen';
import LoginScreen from './components/Screens/LoginScreen';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const AppContent = () => {
  const { isLoggedIn, isLoading, currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [filters, setFilters] = useState({});

  const handleSave = (newEntry) => {
    setEntries([...entries, newEntry]);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const getFilteredEntries = () => {
    let filteredEntries = entries;

    if (filters && Object.keys(filters).length > 0) {
      filteredEntries = entries.filter(entry => {
        if (filters.mood && entry.mood && entry.mood.mood && entry.mood.mood.toLowerCase() !== filters.mood.toLowerCase()) {
          return false;
        }

        if (entry.mood.intensity !== undefined) {
          const intensity = parseInt(entry.mood.intensity);
          
          if (filters.minIntensity && intensity < filters.minIntensity) {
            return false;
          }
          
          if (filters.maxIntensity && intensity > filters.maxIntensity) {
            return false;
          }
        }

        return true;
      });
    }

    // Sort entries
    if (filters && filters.sortBy) {
      filteredEntries.sort((a, b) => {
        let aValue, bValue;

        switch (filters.sortBy) {
          case 'date':
            aValue = new Date(a.date);
            bValue = new Date(b.date);
            break;
          case 'mood':
            aValue = a.mood?.mood || '';
            bValue = b.mood?.mood || '';
            break;
          case 'intensity':
            aValue = parseInt(a.mood?.intensity) || 0;
            bValue = parseInt(b.mood?.intensity) || 0;
            break;
          case 'title':
            aValue = a.title || '';
            bValue = b.title || '';
            break;
          default:
            aValue = new Date(a.date);
            bValue = new Date(b.date);
        }

        // Handle string comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        // Apply sort order
        if (filters.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filteredEntries;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isLoggedIn) {
    return (
      <HomeScreen 
        entries={getFilteredEntries()} 
        handleSave={handleSave} 
        updateFilters={updateFilters}
        filters={filters}
      />
    );
  }

  return <LoginScreen />;
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
