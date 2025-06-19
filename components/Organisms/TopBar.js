import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import UpdateFilters from '../Molecules/UpdateFilters';

const TopBar = ({ toggleAddNewModal, handleLogout, updateFilters, filters }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleApplyFilters = (filters) => {
    updateFilters(filters);
  };

  const getActiveFiltersCount = () => {
    if (!filters) return 0;
    
    let count = 0;
    if (filters.mood) count++;
    if (filters.minIntensity) count++;
    if (filters.maxIntensity) count++;
    return count;
  };

  return (
    <View style={styles.container}>
      <Button title="Add New" onPress={toggleAddNewModal} />
      
      <TouchableOpacity 
        style={styles.filterButton} 
        onPress={() => setIsFilterModalOpen(true)}
      >
        <Text style={styles.filterButtonText}>
          Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
        </Text>
      </TouchableOpacity>
      
      <Button title="Logout" onPress={handleLogout} />

      <UpdateFilters 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  filterButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default TopBar;