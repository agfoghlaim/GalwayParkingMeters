import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import colors from '../constants/colors';

import UserInput from '../components/UserInput';
import Headline from '../components/Headline';
import UserDataTile from '../components/UserDataTile';

import * as userDataActions from '../store/actions/userData';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MeterDataScreen = props => {
  const meterData = props.navigation.getParam('meterData');
  const meterId = meterData.meterId;

  const [meterWorking, setMeterWorking] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isSavingReport, setIsSavingReport] = useState(false);
  const [savedReportSuccess, setSavedReportSuccess] = useState(false);
  const [
    modalToReportWorkingMeters,
    setModalToReportWorkingMeters
  ] = useState();
  const [shouldGetLatestNow, setShouldGetLatestNow] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.userData);
  const latestReport = useSelector(state => state.userData.latestReport);

  useEffect(() => {
    props.navigation.setParams({ meterData: meterData });
  }, [meterData]);

  useEffect(() => {
    dispatch(userDataActions.getUserData(meterId));
    return () => {
      setShouldGetLatestNow(false); // TODO - check this, shouldGetLatest is not used...
    };
  }, [dispatch, meterId, savedReportSuccess]);

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleOpenBrokenModal() {
    setModalToReportWorkingMeters(false);
    setMeterWorking(false);
    setShowModal(true);
  }

  function handleOpenWorkingModal() {
    setModalToReportWorkingMeters(true);
    setMeterWorking(true);
    setShowModal(true);
  }

  function handleSubmitReport(report) {
    const { meterMsg } = report;
    const reportData = {
      meterId: meterData.meterId,
      meterWorking,
      meterMsg,
      userId: 'userID',
      userName: 'userName',
      createdAt: new Date().toString(),
      timeAt: new Date().toString()
    };
    setIsSavingReport(true);
    dispatch(userDataActions.addUserData(reportData))
      .then(() => {
        setIsSavingReport(false);
        setSavedReportSuccess(true);
        setTimeout(() => { // TODO - not sure about this
          setSavedReportSuccess(false);
          setShowModal(false);
          setShouldGetLatestNow(true);
        }, 2000);
      })
      .catch(e => console.log(e, 'MeterDataScreen.js: Error saving report'));
  }

  function goToMeterDataDetailScreen() {
    props.navigation.navigate({
      routeName: 'MeterDataDetailScreen',
      params: {
        userData: userData,
        meterId: meterData.meterId,
        locationName: meterData.locationName
      }
    });
  }
  function handleDisplayLatestReport() {
    if (userData.length) {
      return (
        <View style={styles.userDataWrap}>
          {latestReport.meterWorking !== '' ? (
            <UserDataTile
              data={latestReport}
              onPress={() => console.log('User data tile pressed...')}
            />
          ) : null
          }
          <View style={{ marginHorizontal: 10, padding: 10 }}>
            <TouchableOpacity
              style={{ paddingHorizontal: 10, backgroundColor: colors.purple1 }}
              onPress={() => goToMeterDataDetailScreen()}
            >
              <Text style={{ color: colors.white, fontWeight: 'bold' }}>
                Total Reports: {userData.length}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonWrap}>
            <Button
              title={`${
                latestReport.meterWorking === 'false' ? 'Confirm' : 'Report'
              } Broken`}
              color={colors.purple3}
              onPress={handleOpenBrokenModal}
            />
            <Button
              title={`${
                latestReport.meterWorking === 'true' ? 'Confirm' : 'Report'
              } as Working`}
              color={colors.purple5}
              onPress={handleOpenWorkingModal}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.noResultsWrap}>
          <Headline>Sorry no reports for this meter yet</Headline>
          <View style={styles.buttonWrap}>
            <Button
              title="Report Broken"
              color={colors.purple3}
              onPress={handleOpenBrokenModal}
            />
            <Button
              title="Confirm Working"
              color={colors.purple5}
              onPress={handleOpenWorkingModal}
            />
          </View>
        </View>
      );
    }
  }

  return (
    <View style={{ ...styles.screenWrap }}>
      <View style={styles.imageHeadlineWrap}>
        <Image source={require('../assets/meter.png')} />
        <Headline>
          {meterData.locationName} - {meterData.meterId}
        </Headline>
      </View>

      <UserInput
        visible={showModal}
        close={handleCloseModal}
        report={handleSubmitReport}
        isForWorking={modalToReportWorkingMeters}
        isSavingReport={isSavingReport}
        savedReportSuccess={savedReportSuccess}
      />

      {handleDisplayLatestReport()}

    </View>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
    justifyContent: 'center'
  },
  buttonWrap: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 50
  },
  imageHeadlineWrap: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userDataWrap: {
    alignItems: 'center'
  },
  noResultsWrap: {
    alignItems: 'center'
  }
});
MeterDataScreen.navigationOptions = navData => {
  const meterData = navData.navigation.getParam('meterData');

  return {
    headerTitle: `${meterData.locationName} - ${meterData.meterId}`
  };
};

export default MeterDataScreen;
