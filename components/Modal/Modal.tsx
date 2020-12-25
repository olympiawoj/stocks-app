import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {colors} from '../../utils/colors'
// @ts-ignore
import Modal from 'react-native-modal';

interface SwipeableModal {
    isModalVisible: boolean;
    handleModalClose:any;
}
export const SwipeableModal = ({isModalVisible, handleModalClose}:SwipeableModal)=>{
    return (
      <Modal 
        testID={'modal'}
        isVisible={isModalVisible}
        onSwipeComplete={handleModalClose}
        useNativeDriverForBackdrop
        swipeDirection={['down']}>
            <View style={styles.content}>
            <Text style={{color: 'white'}}>Hi this is a modal</Text>
            </View>
      </Modal>
    );
  
}

const styles = StyleSheet.create({
    content: {
      backgroundColor: colors.gunsmokeGrey,
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      width: '100%',
      height: '80%'
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
  });
  

export default SwipeableModal;