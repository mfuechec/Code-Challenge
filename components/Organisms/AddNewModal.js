import React, { useState } from 'react';
import { 
  Modal, 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
const OPENAI_API_KEY = "Add the OpenAI API key here";

const AddNewModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMood = async (text) => {
    try {
      if (!OPENAI_API_KEY) {
        console.error('OpenAI API key not found in environment variables');
        return null;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Analyze the following journal entry and return ONLY a JSON object with:
              {
                "mood": "primary emotion (happy, sad, anxious, excited, calm, angry, indifferent)",
                "intensity": "1-10 scale",
                "keywords": ["array", "of", "emotion", "keywords"],
                "sentiment": "positive, negative, or neutral"
              }`
            },
            {
              role: 'user',
              content: text
            }
          ],
          max_tokens: 150,
          temperature: 0.3
        })
      });

      const data = await response.json();
      const analysis = JSON.parse(data.choices[0].message.content);
      return analysis;
    } catch (error) {
      console.error('Mood analysis error:', error);
      return null;
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const moodAnalysis = await analyzeMood(content);
      
      const newEntry = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
        mood: moodAnalysis || {
          mood: 'neutral',
          intensity: 5,
          keywords: [],
          sentiment: 'neutral'
        }
      };
      
      onSave(newEntry);
      handleClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze mood. Entry saved without mood data.');
      const newEntry = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
        mood: {
          mood: 'neutral',
          intensity: 5,
          keywords: [],
          sentiment: 'neutral'
        }
      };
      onSave(newEntry);
      handleClose();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Modal 
      visible={isOpen} 
      onRequestClose={handleClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.headerButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Entry</Text>
            <TouchableOpacity 
              onPress={handleSave} 
              style={[
                styles.headerButton, 
                (!title.trim() || !content.trim() || isAnalyzing) && styles.disabledButton
              ]}
              disabled={!title.trim() || !content.trim() || isAnalyzing}
            >
              {isAnalyzing ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                <Text style={[
                  styles.saveText,
                  (!title.trim() || !content.trim()) && styles.disabledText
                ]}>
                  Save
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <TextInput
              style={styles.titleInput}
              placeholder="Entry title..."
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#999"
              maxLength={100}
            />
            
            <TextInput
              style={styles.contentInput}
              placeholder="Write your thoughts..."
              value={content}
              onChangeText={setContent}
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#999',
  },
  form: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
});

export default AddNewModal;