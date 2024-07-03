import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import ItemList from './ItemList';
import Scanner from './Scanner';

const ItemListContainer = () => {
  const [scannedDataArray, setScannedDataArray] = useState([]);
  const [scannerActive, setScannerActive] = useState(false);

  const handleScanned = (scannedItem) => {
    setScannedDataArray(prevData => [...prevData, scannedItem]);
  };

  const handleOpenScanner = () => {
    setScannerActive(true);
  };

  const handleCloseScanner = () => {
    setScannerActive(false);
  };

  return (
    <View style={styles.container}>
      {scannerActive ? (
        <Scanner onScanned={handleScanned} onClose={handleCloseScanner}/>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title='Open scanner' onPress={handleOpenScanner} />
        </View>
      )}
      <ItemList items={scannedDataArray} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemListContainer;
