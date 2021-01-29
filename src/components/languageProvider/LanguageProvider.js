/**
 * LanguageProvider component define context and pass to child components
 * ```javascript
 *  <LanguageProvider languge="en" strings={{}}>
 *    <SomeComponent/>
 *  </LanguageProvider>
 * ```
 * @flow
 */
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import LanguageStore from './LanguageStore';

type Props = {
  language: string,
  strings: Object
};
// const languageChange = async () => {
//   let languagename = await AsyncStorage.getItem('language');
  
// };
class LanguageProvider extends Component {
  props: Props;
  language: Object;
  static defaultProps = {
    strings: {
      en: {}
    },
    language: AsyncStorage.getItem('language')
  };
  constructor(p:Props, c) {
    super(p, c);
    this.language = new LanguageStore(this.props.language, this.props.strings);
     if (this.props.language){
      this.language.setLanguage(this.props.language);
    }
  }
  static propTypes = {
    strings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
  }
  // you must specify what you’re adding to the context
  static childContextTypes = {
    strings: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired
  }
  getChildContext(): Object {
   const { strings } = this.props;
   return { strings, language: this.language };
  }
  componentWillReceiveProps(nextProps: Object): void {
    if (nextProps.language !== this.props.language){
      // this.language.setlanguage(nextProps.language);
    }
  }
  render(): void {
    return Children.only(this.props.children);
  }
}

export default LanguageProvider;
