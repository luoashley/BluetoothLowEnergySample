import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View, Image} from 'react-native';
import {buttons, logo, menu, mainPageStyles} from './styles/styles';
import DeviceModal from './components/DeviceConnectionModal';
import useBLE from './components/useBLE';

const App = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
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

  const navigateBack = () => {
    disconnectFromDevice();
  };

  return (
    <SafeAreaView style={mainPageStyles.container}>
      <View style={mainPageStyles.mainPageTitleWrapper}>
        {connectedDevice ? (
          <View style={menu.menuWrapper}>
            <Text style={menu.menuTitleText}>Menu</Text>
            <TouchableOpacity style={buttons.optionButton}>
              <Text style={buttons.optionButtonText}>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttons.optionButton}>
              <Text style={buttons.optionButtonText}>Control Panel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttons.optionButton}>
              <Text style={buttons.optionButtonText}>Log</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={navigateBack}
                style={buttons.backButton}>
              <Text style={buttons.optionButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={logo.logoWrapper}>
            <Image
              source={require('./images/earphone_logo.jpg')}
              style={logo.logoStyle}
            />
            <Text style={logo.logoTitleText}>BLE Widget</Text>
            <TouchableOpacity
              onPress={connectedDevice ? disconnectFromDevice : openModal}
              style={buttons.optionButton}>
              <Text style={buttons.optionButtonText}>
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

export default App;
