import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet
} from 'react-native';
import SortOptions from './SortOptions';
import FilterOptions from './FilterOptions';

const UpdateFilters = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [minIntensity, setMinIntensity] = useState('');
  const [maxIntensity, setMaxIntensity] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    if (isOpen && currentFilters) {
      setSelectedMood(currentFilters.mood || '');
      setMinIntensity(currentFilters.minIntensity ? currentFilters.minIntensity.toString() : '');
      setMaxIntensity(currentFilters.maxIntensity ? currentFilters.maxIntensity.toString() : '');
      setSortBy(currentFilters.sortBy || 'date');
      setSortOrder(currentFilters.sortOrder || 'desc');
    }
  }, [isOpen, currentFilters]);

  const handleSubmitFilters = () => {
    const filters = {
      mood: selectedMood === 'All Moods' ? null : selectedMood,
      minIntensity: minIntensity ? parseInt(minIntensity) : null,
      maxIntensity: maxIntensity ? parseInt(maxIntensity) : null,
      sortBy: sortBy,
      sortOrder: sortOrder
    };
    
    onApplyFilters(filters);
    onClose();
  };

  const handleResetFilters = () => {
    setSelectedMood('');
    setMinIntensity('');
    setMaxIntensity('');
    setSortBy('date');
    setSortOrder('desc');
    onApplyFilters({ 
      mood: null, 
      minIntensity: null, 
      maxIntensity: null, 
      sortBy: 'date', 
      sortOrder: 'desc' 
    });
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter & Sort Entries</Text>
          
          {/* Sort Options */}
          <SortOptions
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSortBy}
            onSortOrderChange={setSortOrder}
          />

          {/* Filter Options */}
          <FilterOptions
            selectedMood={selectedMood}
            minIntensity={minIntensity}
            maxIntensity={maxIntensity}
            onMoodChange={setSelectedMood}
            onMinIntensityChange={setMinIntensity}
            onMaxIntensityChange={setMaxIntensity}
          />

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={handleResetFilters}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmitFilters}
            >
              <Text style={styles.submitButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '85%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  resetButtonText: {
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
  },
  submitButton: {
    flex: 2,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  closeButtonText: {
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default UpdateFilters; 