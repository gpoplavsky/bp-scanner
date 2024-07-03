import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Scanner = ({ onScanned, onClose }) => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState([]);
  const [scanningEnabled, setScanningEnabled] = useState(true);

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View>
        <Text>Cargando la cámara...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  let debounceTimeout;
  function handleBarcodeScanned({ type, data }) {
    if (!scanningEnabled) return;

    setScanningEnabled(false); // detiene el escaneado
    const scannedItem = { type, data, timestamp: new Date().toISOString() };
    setScannedData(prevData => [...prevData, scannedItem]);
    onScanned(scannedItem); // llamar a la función onScanned
    alert(`Barcode scanned: ${data}`);

    // debounce para prevenir multiples escaneados
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setScanningEnabled(true); // restablece el escaneado
    }, 5000);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={scanningEnabled ? handleBarcodeScanned : undefined}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.text}>Close Scanner</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scannedDataContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  scannedDataText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Scanner;