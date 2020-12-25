import React from 'react';
import {View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
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
            <View style={styles.view}>
            <TouchableOpacity onPressIn={handleModalClose}>
                <FontAwesomeIcon icon={faTimesCircle} color={colors.gunsmokeGrey} />
            </TouchableOpacity>
            </View>
            <Text style={styles.contentTitle}>AAPL</Text>
            </View>
      </Modal>
    );
  
}

const styles = StyleSheet.create({
    content: {
      backgroundColor: colors.codGrey,
    //   justifyContent: 'center',
    //   alignItems: 'center',
      borderRadius: 20,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      width: '100%',
      height: '80%',
      position: 'absolute',
      bottom: -30,
      flex: 1,
      padding: 20
    },
    contentTitle: {
      fontSize: 25,
      fontWeight: "800",
      color: 'white'
    },
    pressable: {
        height: '100%',
        width: '100%',
    },
    view: {
        position: 'absolute',
        right: 20,
        top: 25,
        zIndex: 1
    },
  });
  

export default SwipeableModal;