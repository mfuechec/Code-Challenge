import React, { useState } from 'react';
import { SafeAreaView} from 'react-native';
import TopBar from '../Organisms/TopBar';
import JournalList from '../Organisms/JournalList';
import AddNewModal from '../Organisms/AddNewModal';
import { useAuth } from '../AuthContext';

const HomeScreen = ({ entries, handleSave, updateFilters, filters }) => {
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const { logout } = useAuth();
  
  const toggleAddNewModal = () => {
    setIsAddNewOpen(!isAddNewOpen);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBar 
        updateFilters={updateFilters} 
        toggleAddNewModal={toggleAddNewModal} 
        handleLogout={logout}
        filters={filters}
      />
      <JournalList entries={entries} />
      <AddNewModal isOpen={isAddNewOpen} onClose={() => setIsAddNewOpen(false)} onSave={handleSave} />
    </SafeAreaView>
  );
};

export default HomeScreen;