import React, { Component } from 'react';
import Header from './shared/Header/Header';
import SwipeableTemporaryDrawer from './components/TopMenu/SideBar';
import NavigationMenu from './components/TopMenu/NavigationMenu2';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({});

export default function HeaderSwitch() {
  return (
    <MuiThemeProvider role="region" aria-label="header" theme={theme}>
      <Header title={Header} />
      <SwipeableTemporaryDrawer />
      <NavigationMenu title={NavigationMenu} />
    </MuiThemeProvider>
  );
}
