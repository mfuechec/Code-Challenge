import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput
} from 'react-native';
import ButtonRow from '../Atoms/ButtonRow';

const FilterOptions = ({ 
  selectedMood, 
  minIntensity, 
  maxIntensity, 
  onMoodChange, 
  onMinIntensityChange, 
  onMaxIntensityChange 
}) => {
  const moodOptions = [
    { value: 'All Moods', label: 'All Moods' },
    { value: 'happy', label: 'Happy' },
    { value: 'excited', label: 'Excited' },
    { value: 'calm', label: 'Calm' },
    { value: 'sad', label: 'Sad' },
    { value: 'anxious', label: 'Anxious' },
    { value: 'angry', label: 'Angry' },
    { value: 'neutral', label: 'Neutral' }
  ];

  return (
    <>
      {/* Mood Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Mood:</Text>
        <View style={styles.moodGrid}>
          <ButtonRow 
            options={moodOptions.slice(0, 4)}
            selectedOption={selectedMood}
            onOptionChange={onMoodChange}
          />
          <ButtonRow 
            options={moodOptions.slice(4)}
            selectedOption={selectedMood}
            onOptionChange={onMoodChange}
          />
        </View>
      </View>

      {/* Intensity Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Intensity Range (1-10):</Text>
        <View style={styles.intensityContainer}>
          <View style={styles.intensityInput}>
            <Text style={styles.intensityLabel}>Min:</Text>
            <TextInput
              style={styles.intensityTextInput}
              value={minIntensity}
              onChangeText={onMinIntensityChange}
              placeholder="1"
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
          <View style={styles.intensityInput}>
            <Text style={styles.intensityLabel}>Max:</Text>
            <TextInput
              style={styles.intensityTextInput}
              value={maxIntensity}
              onChangeText={onMaxIntensityChange}
              placeholder="10"
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
        </View>
      </View>
    </>
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
  moodGrid: {
    marginBottom: 8,
  },
  intensityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intensityInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  intensityLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  intensityTextInput: {
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FilterOptions; 