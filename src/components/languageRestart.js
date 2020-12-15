import RNRestart from 'react-native-restart';
import {I18nManager} from 'react-native';

export const languageRestart = async (isRTL) => {
  if (isRTL) {
    if (I18nManager.isRTL) {
      await I18nManager.forceRTL(false);
    }
  } else {
    if (!I18nManager.isRTL) {
      await I18nManager.forceRTL(true);
    }
  }
  RNRestart.Restart();
};
