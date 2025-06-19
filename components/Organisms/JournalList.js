import React from 'react';
import { ScrollView } from 'react-native';
import JournalEntry from '../Molecules/JournalEntry';

const JournalList = ({ entries }) => {
  return (
    <ScrollView>
        {entries.map((entry) => {
            return <JournalEntry key={entry.id} entry={entry} />
        })}
    </ScrollView>
  );
};

export default JournalList;