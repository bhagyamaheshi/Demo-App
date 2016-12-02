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
        match('didYouKnow/:id','didYouKnow#show');
        match('methodDefinition','methodDefinition#index');


        /*match('statistics', 'statistics#show');
        match('consumption', 'consumption#show');

        match('dashboard/:uid', 'dashboard#show');
        match('dashboard', 'dashboard#show');
        match('ready', 'ready#show');
        match('ready/:id', 'ready#show');
        match('*anything', '404#show');*/
    };
});
