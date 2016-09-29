/*global define*/
define(function () {
    'use strict';

    // The routes for the application. This module returns a function.
    // `match` is match method of the Router
    return function (match) {
        match('', 'home#index');
        match('home', 'home#index');
        match('domains', 'home#show');
        match('sdg', 'sdg#show');
        match('inputData', 'inputData#show');
        match('data/:id', 'data#show');
        match('data','data#show');
        match('compareData','compareData#show');
        match('countryProfiles','countryProfiles#index');
        match('countryProfiles/:id','countryProfiles#show');
        match('didYouKnow','didYouKnow#index');
        /*match('demogDownload', 'demog#download');
        match('health', 'health#show');
        match('healthDownload', 'health#download');
        match('education', 'education#show');
        match('educationDownload', 'education#download');
        match('sti', 'sti#show');
        match('stiDownload', 'sti#download');
        match('gdp', 'gdp#show');
        match('gdpDownload', 'gdp#download');
        match('labour', 'labour#show');
        match('labourDownload', 'labour#download');
        match('trade', 'trade#show');
        match('tradeDownload', 'trade#download');
        match('finance', 'finance#show');
        match('financeDownload', 'finance#download');
        match('energy', 'energy#show');
        match('energyDownload', 'energy#download');
        match('environment', 'environment#show');
        match('environmentDownload', 'environment#download');
        match('disaster', 'disaster#show');
        match('disasterDownload', 'disaster#download');
        match('connectivity', 'connectivity#show');
        match('connectivityDownload', 'connectivity#download');
        match('poverty', 'poverty#show');
        match('povertyDownload', 'poverty#download');
        match('gender', 'gender#show');
        match('genderDownload', 'gender#download');
        match('insecurity', 'insecurity#show');
        match('insecurityDownload', 'insecurity#show');
        match('governance', 'governance#show');
        match('governanceDownload', 'governance#download');*/
        match('goal1','goal1#show');
        match('goal2','goal2#show');
        match('goal3','goal3#show');
        match('goal4','goal4#show');
        match('goal5','goal5#show');
        match('goal6','goal6#show');
        match('goal7','goal7#show');
        match('goal8','goal8#show');
        match('goal9','goal9#show');
        match('goal10','goal10#show');
        match('goal11','goal11#show');
        match('goal12','goal12#show');
        match('goal13','goal13#show');
        match('goal14','goal14#show');
        match('goal15','goal15#show');
        match('goal16','goal16#show');
        match('goal17','goal17#show');
        match('statistics', 'statistics#show');
        match('consumption', 'consumption#show');

        match('dashboard/:uid', 'dashboard#show');
        match('dashboard', 'dashboard#show');
        match('ready', 'ready#show');
        match('ready/:id', 'ready#show');
        match('*anything', '404#show');
    };
});
