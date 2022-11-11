import React from 'react';

import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';


export default function ReservationComponent({
  reservationId,
  themeName,
  storeName,
  date,
  reserveTime
}) {
  const navigation = useNavigation()

  return (
    <ReservationContainer 
      style={{elevation: 10}}
      onPress={() => {navigation.navigate('ReservationDetailScreen', {
        reservationId: reservationId,
        themeName: themeName,
        storeName: storeName,
        date: date,
        reserveTime: reserveTime
      })}}
      >
      <TextContainer>
        <ThemeTitle>{themeName}</ThemeTitle>
        <CafeTitle>{storeName}</CafeTitle>
      </TextContainer>
      <TimeContainer>
        <TimeText>{date}</TimeText>
      </TimeContainer>
    </ReservationContainer>
  )
}

const ReservationContainer = styled.TouchableOpacity`
  ${({ theme }) => theme.common.flexCenterRow}
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;

  border-width: 1px;
  border-style: solid;
  border-color: #00000010;
`


const TextContainer = styled.View`
`

const TimeContainer = styled.View`
  margin-left: auto;
`

const ThemeTitle = styled.Text`
  font-family: "SUIT-SemiBold";
  font-size: ${({ theme }) => theme.fontSizes.body};
  margin-bottom: 4px;
`
const CafeTitle = styled.Text`
  font-family: "SUIT-Medium";
  font-size: ${({ theme }) => theme.fontSizes.caption1};
  color: #9b989b;
`
const TimeText = styled.Text`
  font-family: "SUIT-Bold";
  font-size: ${({ theme }) => theme.fontSizes.title2};
`