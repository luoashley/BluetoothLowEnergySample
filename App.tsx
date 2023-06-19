import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import DeviceModal from './DeviceConnectionModal';
import PulseIndicator from './PulseIndicator';
import useBLE from './useBLE';

const App = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    disconnectFromDevice,
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const scanForDevices = () => {
    requestPermissions(isGranted => {
      if (isGranted) {
        scanForPeripherals();
      }
    });
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
          <View>
            <PulseIndicator />
            <Text style={styles.heartRateTitleText}>Connect Successful</Text>
            <Text style={styles.heartRateText}>{heartRate} bpm</Text>
          </View>
        ) : (
          <View style={styles.logoWrapper}>
            <Image
              source={require('./images/earphone_logo.jpg')}
              style={styles.logoStyle}
            />
            <Text style={styles.heartRateTitleText}>BLE Widget</Text>
            <TouchableOpacity
              onPress={connectedDevice ? disconnectFromDevice : openModal}
              style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>
                {connectedDevice ? 'Disconnect' : 'Connect'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heartRateTitleWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartRateTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default App;
