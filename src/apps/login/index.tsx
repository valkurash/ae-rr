import { EApp } from 'enums';
import { appFactory } from 'shared/appFactory';
import { singleSpaFactory } from 'shared/singleSpaFactory';

import { App } from './App';
import { initStore } from './redux/store';
import { Routes } from './routes';

import './index.scss';

const app = appFactory(initStore, Routes, App);

const singleSpaLyfecycle = singleSpaFactory(EApp.LOGIN, app);

export const bootstrap = singleSpaLyfecycle.bootstrap;

export const mount = singleSpaLyfecycle.mount;

export const unmount = singleSpaLyfecycle.unmount;
