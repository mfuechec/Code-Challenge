import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JournalEntry = ({ entry }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: '#4CAF50',
      excited: '#FF9800',
      calm: '#2196F3',
      sad: '#9C27B0',
      anxious: '#FF5722',
      angry: '#F44336',
      neutral: '#9E9E9E',
      surprised: '#FFD700',
      indifferent: '#607D8B'
    };
    return moodColors[mood.toLowerCase()] || '#9E9E9E';
  };

  const getSentimentColor = (sentiment) => {
    const sentimentColors = {
      positive: '#4CAF50',
      negative: '#F44336',
      neutral: '#9E9E9E'
    };
    return sentimentColors[sentiment] || '#9E9E9E';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.date}>{formatDate(entry.createdAt)}</Text>
      </View>
      
      <Text style={styles.content} numberOfLines={3}>
        {entry.content}
      </Text>

      {/* Mood Metadata */}
      {entry.mood && (
        <View style={styles.moodContainer}>
          <View style={styles.moodRow}>
            <View style={[styles.moodBadge, { backgroundColor: getMoodColor(entry.mood.mood) }]}>
              <Text style={styles.moodText}>{entry.mood.mood}</Text>
            </View>
            <View style={styles.intensityContainer}>
              <Text style={styles.intensityLabel}>Intensity:</Text>
              <View style={styles.intensityBar}>
                <View 
                  style={[
                    styles.intensityFill, 
                    { 
                      width: `${(entry.mood.intensity / 10) * 100}%`,
                      backgroundColor: getMoodColor(entry.mood.mood)
                    }
                  ]} 
                />
              </View>
              <Text style={styles.intensityText}>{entry.mood.intensity}/10</Text>
            </View>
          </View>
          
          <View style={styles.sentimentRow}>
            <View style={[styles.sentimentBadge, { backgroundColor: getSentimentColor(entry.mood.sentiment) }]}>
              <Text style={styles.sentimentText}>{entry.mood.sentiment}</Text>
            </View>
            {entry.mood.keywords && entry.mood.keywords.length > 0 && (
              <View style={styles.keywordsContainer}>
                {entry.mood.keywords.slice(0, 3).map((keyword, index) => (
                  <Text key={index} style={styles.keyword}>#{keyword}</Text>
                ))}
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
    lineHeight: 26,
  },
  date: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    opacity: 0.9,
    marginBottom: 16,
  },
  moodContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  moodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  moodBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
  },
  moodText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  intensityContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  intensityLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  intensityBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  intensityFill: {
    height: '100%',
    borderRadius: 3,
  },
  intensityText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  sentimentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sentimentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sentimentText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keyword: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 8,
    fontStyle: 'italic',
  },
});

export default JournalEntry;