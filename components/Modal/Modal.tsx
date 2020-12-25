import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {colors} from '../../utils/colors'
// @ts-ignore
import Modal from 'react-native-modal';
import {  faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface SwipeableModal {
    isModalVisible: boolean;
    handleModalClose:any;
}
export const SwipeableModal = ({isModalVisible, handleModalClose}:SwipeableModal)=>{
    return (
      <Modal
        backdropOpacity={0.7}
        style={{margin: 0}}
        testID={'modal'}
        isVisible={isModalVisible}
        onSwipeComplete={handleModalClose}
        useNativeDriverForBackdrop
        swipeDirection={['down']}>
            
    
            <View style={styles.content}>
            <Pressable onPressIn={handleModalClose}><FontAwesomeIcon icon={faTimesCircle} color={colors.gunsmokeGrey} /></Pressable>
            <Text style={styles.contentTitle}>AAPL</Text>
            </View>
      </Modal>
    );
  
}

const styles = StyleSheet.create({
    content: {
      backgroundColor: colors.codGrey,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      width: '100%',
      height: '80%',
      position: 'absolute',
      bottom: -30,
      flex: 1,
    },
    contentTitle: {
      fontSize: 25,
      fontWeight: "800",
      color: 'white'
    },
  });
  

export default SwipeableModal;