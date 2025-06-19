import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet
} from 'react-native';
import ButtonRow from '../Atoms/ButtonRow';

const SortOptions = ({ sortBy, sortOrder, onSortChange, onSortOrderChange }) => {
  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'mood', label: 'Mood' },
    { value: 'intensity', label: 'Intensity' },
    { value: 'title', label: 'Title' }
  ];

  const toggleSortOrder = () => {
    onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <View style={styles.filterSection}>
      <Text style={styles.filterLabel}>Sort by:</Text>
      <View style={styles.sortContainer}>
        <ButtonRow 
          options={sortOptions}
          selectedOption={sortBy}
          onOptionChange={onSortChange}
        />
        
        <TouchableOpacity 
          style={styles.sortOrderButton}
          onPress={toggleSortOrder}
        >
          <Text style={styles.sortOrderText}>
            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  sortContainer: {
    marginBottom: 8,
  },
  sortOrderButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
  },
  sortOrderText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});

export default SortOptions; 