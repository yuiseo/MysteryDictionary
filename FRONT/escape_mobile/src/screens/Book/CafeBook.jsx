import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {View, Text, FlatList, ImageBackground, Pressable,  StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Modal } from 'native-base';
import styled from 'styled-components/native';
import {ProgressBar} from 'react-native-ui-lib';
import { getCafeThemeList } from '../../apis/BookApi';
import {useQuery} from '@tanstack/react-query';


const testUnity = 'https://user-images.githubusercontent.com/97578425/199651092-ce04c889-71c8-431f-bfae-1732e4c72f8c.png'
const windowWidth = Dimensions.get('window').width;

const themeWidth = (windowWidth-90) / 3;


export default function CafeBook({navigation, route}){
    const {storeId, storeImg, storeName, clearCnt, totalTheme} = route.params;
    const progressRate = (clearCnt/totalTheme)*100
    const [isModal, setIsModal] = useState(false);
    const opacity_list = [0.5, 0.3, 0];
    const {data} = useQuery(
        ['CafeTheme', storeId],
        getCafeThemeList
        )


    return(
        <ImageBackground source={{uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/book_room01.gif'}} style={{flex:1}}>
        <View style={{justifyContent:'flex-start', flex:1, flexDirection:'column', padding:20, marginTop:10}}>
        {/* <Modal isOpen={isModal} onClose={()=>setIsModal(false)}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>테마이름</Modal.Header>
                <Modal.Body>
                    리뷰 내용이 들어가야 함
                </Modal.Body>
            </Modal.Content>
        </Modal> */}
        <CafeNavBtn style={{flexDirection:'row', marginTop:20, marginBottom:20}}
            onPress={()=>{
                navigation.navigate('CafeDetailScreen', {
                storeId:storeId
            })
            }}>
            <CafeImg source={ storeImg ? {uri:
                        `https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${storeImg}`} : {uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/NoImage.png'}} resizeMode="cover" imageStyle={{borderRadius:10}} />
            <View style={{flexDirection:'column', marginLeft:20, flex:1, marginTop:'auto', marginBottom:'auto'}}>
                <CafeName>{storeName}</CafeName>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <ProgressTitle>진행도</ProgressTitle>
                    <ProgressTitle style={{marginRight:10}}>{clearCnt}/{totalTheme}</ProgressTitle>
                </View>
                <ProgressBar progress={progressRate} progressColor={'red'} style={{height:20}} />
            </View>
        </CafeNavBtn>
        <View style={{marginTop:10}}>
        <FlatList
            style={{marginTop:20}}
            data={data}
            numColumns={3}
            key={3}
            renderItem={(obj) => 
                <>
                <TouchableOpacity style={[{width:themeWidth, position:'relative'}, 
                    obj.index % 3 == 2 ? {marginRight:0} : {marginRight:20}]}
                onPress={()=>{
                    navigation.navigate('ThemeDetailScreen', {
                    themeId:obj.item.themeId
                    })}}
                >
                    <View style={{backgroundColor:'black', height:180, width:themeWidth, position:'absolute', zIndex:3, elevation:3, borderRadius:10, opacity:opacity_list[obj.item.isClear]}} />
                    <ThemeView
                        source={{uri:`https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${obj.item.themeImg}`}}
                        resizeMode="cover"
                        imageStyle={{borderRadius:10}}
                        />
                </TouchableOpacity>
                </>
            }
            />
        </View>
    </View>
    </ImageBackground>
    )
}

const CafeThemeTItle = styled.Text`
    font-family:'SUIT-SemiBold';
    font-size:${({theme}) => theme.fontSizes.body};
    margin: auto 20px auto 20px;
`

const CafeImg = styled.ImageBackground`
    width:100px;
    height:100px;
    margin: auto 0;
`
const CafeNavBtn = styled.TouchableOpacity`
    margin-top: auto;
    margin-bottom: auto;
`

const CafeName = styled.Text`
    font-family: 'SUIT-Bold';
    font-size: ${({theme}) => theme.fontSizes.title2};
    color:white;
    margin-bottom: 10px;
    /* margin: auto 20px auto 20px; */
`

const ProgressTitle = styled.Text`
    font-size: ${({theme}) => theme.fontSizes.title3};
    font-family: 'SUIT-SemiBold';
    color:white;
    margin-bottom: 10px;
`

const ThemeView = styled.ImageBackground`
    height:180px;
    margin-bottom: 20px;
`