import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet
} from 'react-native';

const ButtonRow = ({ 
  options = [], 
  selectedOption, 
  onOptionChange 
}) => {
  return (
    <View style={styles.buttonRow}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.button,
            selectedOption === option.value && styles.selectedButton
          ]}
          onPress={() => onOptionChange(option.value)}
        >
          <Text 
            style={[
              styles.buttonText,
              selectedOption === option.value && styles.selectedButtonText
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    width: '100%'
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e1e5e9',
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
  },
  selectedButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ButtonRow; 